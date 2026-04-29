-- ============================================================
-- 005_audit.sql · Medaccer
-- Audit log de acceso a datos clínicos (Ley 1581 + Resolución 1995)
-- ============================================================

create type audit_action as enum (
  'create', 'read', 'update', 'delete', 'export',
  'login', 'logout', 'consent_signed', 'consent_revoked'
);

-- ============================================================
-- AUDIT LOG
-- ============================================================

create table audit_log (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid references organizations(id) on delete set null,
  actor_id        uuid references auth.users(id) on delete set null,
  actor_email     text,
  actor_role      text,
  action          audit_action not null,
  resource_type   text not null,          -- 'patient', 'appointment', 'encounter', 'document'
  resource_id     uuid,
  patient_id      uuid,                   -- denormalizado para queries Ley 1581
  ip_address      inet,
  user_agent      text,
  changes         jsonb,                  -- diff de qué cambió
  metadata        jsonb default '{}'::jsonb,
  occurred_at     timestamptz default now()
);

-- Índices para queries frecuentes:
-- (1) "Todos los accesos al paciente X en el último año" (Ley 1581 art. 8 derecho de acceso)
create index audit_patient_idx on audit_log(patient_id, occurred_at desc);
-- (2) "Todo lo que hizo el doctor Y este mes" (auditoría interna)
create index audit_actor_idx on audit_log(actor_id, occurred_at desc);
-- (3) Queries por org+tiempo
create index audit_org_time_idx on audit_log(org_id, occurred_at desc);
-- (4) Búsqueda por tipo de acción
create index audit_action_idx on audit_log(org_id, action, occurred_at desc);

-- Hacer audit_log append-only (nadie puede UPDATE/DELETE)
revoke update, delete on audit_log from public;
revoke update, delete on audit_log from authenticated;

-- ============================================================
-- TRIGGER GENÉRICO: registrar cambios en tablas clínicas
-- ============================================================

create or replace function log_clinical_change() returns trigger as $$
declare
  v_action audit_action;
  v_patient_id uuid;
  v_changes jsonb;
begin
  if tg_op = 'INSERT' then
    v_action = 'create';
    v_changes = to_jsonb(new);
  elsif tg_op = 'UPDATE' then
    v_action = 'update';
    v_changes = jsonb_build_object(
      'before', to_jsonb(old),
      'after', to_jsonb(new)
    );
  elsif tg_op = 'DELETE' then
    v_action = 'delete';
    v_changes = to_jsonb(old);
  end if;

  -- Extraer patient_id según la tabla
  v_patient_id = case tg_table_name
    when 'patients' then coalesce(new.id, old.id)
    when 'appointments' then coalesce(new.patient_id, old.patient_id)
    when 'encounters' then coalesce(new.patient_id, old.patient_id)
    when 'documents' then coalesce(new.patient_id, old.patient_id)
    else null
  end;

  insert into audit_log (
    org_id, actor_id, actor_email, action, resource_type, resource_id,
    patient_id, changes
  ) values (
    coalesce(new.org_id, old.org_id),
    auth.uid(),
    (select email from auth.users where id = auth.uid()),
    v_action,
    tg_table_name,
    coalesce(new.id, old.id),
    v_patient_id,
    v_changes
  );

  return coalesce(new, old);
end;
$$ language plpgsql security definer;

-- Aplicar a tablas clínicas
create trigger audit_patients
  after insert or update or delete on patients
  for each row execute function log_clinical_change();

create trigger audit_appointments
  after insert or update or delete on appointments
  for each row execute function log_clinical_change();

create trigger audit_encounters
  after insert or update or delete on encounters
  for each row execute function log_clinical_change();

create trigger audit_documents
  after insert or update or delete on documents
  for each row execute function log_clinical_change();

-- ============================================================
-- RLS para audit_log
-- ============================================================

alter table audit_log enable row level security;

-- Solo admins pueden leer
create policy "admins read audit log" on audit_log for select using (is_org_admin(org_id));

-- Pacientes con su token pueden ver registros de SU paciente_id (derecho de acceso Ley 1581)
-- Esto requiere un endpoint específico que valide el token, no es vía RLS estándar.

-- ============================================================
-- DATA RETENTION
-- ============================================================
-- Audit logs se guardan 5 años (mínimo Resolución 1995)
-- Job scheduled (pg_cron o Vercel Cron) borra registros >5 años

create or replace function purge_old_audit() returns void as $$
begin
  delete from audit_log
  where occurred_at < now() - interval '5 years';
end;
$$ language plpgsql security definer;

-- ============================================================
-- FUNCIÓN ÚTIL: derecho de acceso del paciente (Ley 1581 art. 8)
-- ============================================================
-- Cuando un paciente pide su historial de accesos, llamamos esto
create or replace function patient_access_log(p_patient_id uuid)
returns table (
  occurred_at timestamptz,
  action audit_action,
  actor_email text,
  resource_type text,
  resource_id uuid
) as $$
  select occurred_at, action, actor_email, resource_type, resource_id
  from audit_log
  where patient_id = p_patient_id
  order by occurred_at desc;
$$ language sql security definer;
