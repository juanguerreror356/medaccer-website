-- ============================================================
-- 004_billing.sql · Medaccer
-- Suscripciones, facturas, eventos de uso
-- ============================================================

-- ============================================================
-- SUBSCRIPTIONS (vínculo con Wompi)
-- ============================================================

create table subscriptions (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  plan            org_plan not null,
  status          subscription_status not null default 'trialing',
  wompi_subscription_id text,             -- ID en Wompi
  wompi_customer_id     text,
  wompi_payment_source_id text,           -- token de tarjeta tokenizada
  amount_cop      bigint not null,        -- en pesos (sin decimales)
  currency        text default 'COP',
  interval        text default 'month',   -- 'month' | 'year'
  current_period_start timestamptz not null default now(),
  current_period_end   timestamptz not null default (now() + interval '1 month'),
  cancel_at       timestamptz,
  cancelled_at    timestamptz,
  trial_end       timestamptz,
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index subscriptions_org_idx on subscriptions(org_id);
create index subscriptions_status_idx on subscriptions(status);

-- ============================================================
-- INVOICES (facturas emitidas)
-- ============================================================

create table invoices (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  subscription_id uuid references subscriptions(id),
  number          text,                   -- número factura DIAN (ej: MED-0001)
  cufe            text,                   -- código único factura electrónica
  dian_status     text,                   -- 'pending', 'accepted', 'rejected'
  amount_cop      bigint not null,
  tax_cop         bigint default 0,       -- IVA (0 en SIMPLE)
  total_cop       bigint not null,
  status          text default 'pending', -- pending, paid, failed, refunded
  paid_at         timestamptz,
  wompi_transaction_id text,
  pdf_url         text,                   -- URL del PDF de factura DIAN
  xml_url         text,                   -- URL del XML enviado a DIAN
  period_start    timestamptz,
  period_end      timestamptz,
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now()
);

create index invoices_org_idx on invoices(org_id, created_at desc);
create index invoices_status_idx on invoices(status);

-- ============================================================
-- USAGE EVENTS (para limit enforcement por plan)
-- ============================================================

create table usage_events (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  kind            text not null,          -- 'wa_message_sent', 'ai_run', 'appointment_created', etc.
  quantity        int default 1,
  cost_usd        numeric(10,6),
  metadata        jsonb default '{}'::jsonb,
  occurred_at     timestamptz default now()
);

create index usage_events_org_kind_idx on usage_events(org_id, kind, occurred_at desc);

-- Vista materializada: uso mensual por org (refresh diaria via cron)
create materialized view monthly_usage as
select
  org_id,
  date_trunc('month', occurred_at) as month,
  kind,
  sum(quantity)::bigint as total_quantity,
  sum(coalesce(cost_usd, 0))::numeric(12,4) as total_cost_usd
from usage_events
group by org_id, date_trunc('month', occurred_at), kind;

create unique index monthly_usage_pk on monthly_usage(org_id, month, kind);

-- ============================================================
-- PLAN LIMITS (configuración de qué incluye cada plan)
-- ============================================================

create table plan_limits (
  plan            org_plan primary key,
  amount_cop      bigint not null,
  max_doctors     int,
  max_patients    int,
  max_wa_messages_month int,
  max_ai_runs_month int,
  features        jsonb default '{}'::jsonb
);

insert into plan_limits (plan, amount_cop, max_doctors, max_patients, max_wa_messages_month, max_ai_runs_month, features) values
  ('trial',   0,        1,  100, 200,  100,  '{"trial":true}'::jsonb),
  ('starter', 129000,   1,  500, 1000, 500,  '{"reminders":true,"crm":true,"ai":true}'::jsonb),
  ('pro',     249000,   3,  2000, 5000, 2500, '{"reminders":true,"crm":true,"ai":true,"telemedicine":true,"integrations":true}'::jsonb),
  ('equipo',  349000,   10, 10000, 20000, 10000, '{"reminders":true,"crm":true,"ai":true,"telemedicine":true,"integrations":true,"sso":true,"priority_support":true}'::jsonb)
on conflict (plan) do update set
  amount_cop = excluded.amount_cop,
  max_doctors = excluded.max_doctors,
  max_patients = excluded.max_patients,
  max_wa_messages_month = excluded.max_wa_messages_month,
  max_ai_runs_month = excluded.max_ai_runs_month,
  features = excluded.features;

-- ============================================================
-- TRIGGERS y RLS
-- ============================================================

create trigger subscriptions_updated_at before update on subscriptions
  for each row execute function set_updated_at();

alter table subscriptions enable row level security;
alter table invoices enable row level security;
alter table usage_events enable row level security;

create policy "admins read subscriptions" on subscriptions for select using (is_org_admin(org_id));
create policy "admins read invoices" on invoices for select using (is_org_admin(org_id));
create policy "members read usage" on usage_events for select using (is_org_member(org_id));
-- writes solo desde service_role (backend)
