-- ============================================================
-- 002_clinical.sql · Medaccer
-- Pacientes, citas, encuentros clínicos, documentos
-- ============================================================

create type appointment_status as enum (
  'scheduled', 'confirmed', 'in_progress', 'completed',
  'cancelled', 'no_show', 'rescheduled'
);

create type appointment_type as enum (
  'first_visit', 'follow_up', 'urgent', 'control',
  'procedure', 'telemedicine'
);

create type document_kind as enum (
  'lab_result', 'imaging', 'prescription', 'consent',
  'referral', 'medical_history', 'other'
);

-- ============================================================
-- PATIENTS
-- ============================================================

create table patients (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  external_id     text,                   -- ID interno del consultorio si lo tiene
  document_type   text not null default 'CC', -- CC, TI, CE, PA, RC
  document_number text not null,
  full_name       text not null,
  birth_date      date,
  gender          text,                   -- M, F, X
  phone           text,                   -- formato +57XXXXXXXXXX
  email           citext,
  address         text,
  city            text default 'Bogotá',
  blood_type      text,                   -- O+, A-, etc.
  allergies       jsonb default '[]'::jsonb,
  medications     jsonb default '[]'::jsonb,
  conditions      jsonb default '[]'::jsonb, -- enfermedades crónicas
  emergency_contact jsonb default '{}'::jsonb,
  consent_data_treatment boolean default false, -- Ley 1581
  consent_marketing      boolean default false,
  consent_telemedicine   boolean default false,
  consent_signed_at      timestamptz,
  notes           text,
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  unique(org_id, document_type, document_number)
);

create index patients_org_idx on patients(org_id);
create index patients_phone_idx on patients(org_id, phone);
create index patients_name_trgm_idx on patients using gin(full_name gin_trgm_ops);

-- ============================================================
-- APPOINTMENTS
-- ============================================================

create table appointments (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  patient_id      uuid not null references patients(id) on delete cascade,
  doctor_id       uuid references members(id),
  starts_at       timestamptz not null,
  ends_at         timestamptz not null,
  duration_min    int generated always as (extract(epoch from (ends_at - starts_at))/60) stored,
  status          appointment_status not null default 'scheduled',
  type            appointment_type not null default 'first_visit',
  reason          text,                   -- motivo consulta
  notes           text,
  reminder_sent_24h boolean default false,
  reminder_sent_2h  boolean default false,
  confirmation_received_at timestamptz,
  cancelled_at    timestamptz,
  cancelled_by    text,                   -- 'patient' | 'doctor' | 'system'
  cancellation_reason text,
  rescheduled_from uuid references appointments(id),
  created_via     text default 'manual',  -- 'manual' | 'whatsapp_ai' | 'web' | 'api'
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index appointments_org_starts_idx on appointments(org_id, starts_at);
create index appointments_patient_idx on appointments(patient_id);
create index appointments_doctor_idx on appointments(doctor_id);
create index appointments_status_idx on appointments(org_id, status);

-- Constraint: no overlap del mismo doctor
create or replace function check_appointment_overlap() returns trigger as $$
begin
  if new.status in ('cancelled', 'no_show') then return new; end if;
  if exists (
    select 1 from appointments
    where doctor_id = new.doctor_id
      and id <> coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid)
      and status not in ('cancelled', 'no_show')
      and tstzrange(starts_at, ends_at) && tstzrange(new.starts_at, new.ends_at)
  ) then
    raise exception 'Appointment overlap for doctor %', new.doctor_id;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger appointments_no_overlap
  before insert or update on appointments
  for each row execute function check_appointment_overlap();

-- ============================================================
-- ENCOUNTERS (consultas realizadas, ficha clínica)
-- ============================================================

create table encounters (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  patient_id      uuid not null references patients(id) on delete cascade,
  appointment_id  uuid references appointments(id),
  doctor_id       uuid references members(id),
  occurred_at     timestamptz not null default now(),
  chief_complaint text,                   -- motivo de consulta
  history         text,                   -- enfermedad actual
  exam            jsonb default '{}'::jsonb, -- examen físico estructurado
  diagnosis       jsonb default '[]'::jsonb, -- [{code: 'CIE10:J00', label: '...'}]
  plan            text,                   -- plan terapéutico
  prescription    jsonb default '[]'::jsonb,
  next_steps      text,
  follow_up_at    timestamptz,
  signed          boolean default false,
  signed_at       timestamptz,
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index encounters_patient_idx on encounters(patient_id, occurred_at desc);
create index encounters_org_idx on encounters(org_id, occurred_at desc);

-- ============================================================
-- DOCUMENTS (laboratorios, imágenes, recetas, consentimientos)
-- ============================================================

create table documents (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  patient_id      uuid references patients(id) on delete cascade,
  encounter_id    uuid references encounters(id) on delete set null,
  uploaded_by     uuid references members(id),
  kind            document_kind not null,
  title           text not null,
  description     text,
  file_path       text not null,          -- path en Supabase Storage
  file_size       bigint,
  mime_type       text,
  ocr_text        text,                   -- texto extraído (búsqueda)
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now()
);

create index documents_patient_idx on documents(patient_id, created_at desc);
create index documents_kind_idx on documents(org_id, kind);

-- ============================================================
-- TRIGGERS updated_at
-- ============================================================

create trigger patients_updated_at before update on patients
  for each row execute function set_updated_at();
create trigger appointments_updated_at before update on appointments
  for each row execute function set_updated_at();
create trigger encounters_updated_at before update on encounters
  for each row execute function set_updated_at();

-- ============================================================
-- RLS
-- ============================================================

alter table patients enable row level security;
alter table appointments enable row level security;
alter table encounters enable row level security;
alter table documents enable row level security;

create policy "members read patients" on patients for select using (is_org_member(org_id));
create policy "members write patients" on patients for all using (is_org_member(org_id));

create policy "members read appointments" on appointments for select using (is_org_member(org_id));
create policy "members write appointments" on appointments for all using (is_org_member(org_id));

create policy "members read encounters" on encounters for select using (is_org_member(org_id));
create policy "members write encounters" on encounters for all using (is_org_member(org_id));

create policy "members read documents" on documents for select using (is_org_member(org_id));
create policy "members write documents" on documents for all using (is_org_member(org_id));

-- pg_trgm para búsqueda fuzzy de pacientes
create extension if not exists pg_trgm;
