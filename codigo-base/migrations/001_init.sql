-- ============================================================
-- 001_init.sql · Medaccer
-- Multi-tenant base: organizations, members, invitations
-- ============================================================

-- Extensiones útiles
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "citext"; -- emails case-insensitive

-- ============================================================
-- ENUMS compartidos
-- ============================================================

create type org_plan as enum ('trial', 'starter', 'pro', 'equipo');
create type member_role as enum ('owner', 'admin', 'doctor', 'asistente', 'viewer');
create type subscription_status as enum ('trialing', 'active', 'past_due', 'canceled', 'paused');

-- ============================================================
-- ORGANIZATIONS (tenants)
-- ============================================================

create table organizations (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  name            text not null,
  legal_name      text,
  rut             text,                  -- NIT/RUT del consultorio
  specialty       text not null,          -- 'medicina_general', 'pediatria', etc.
  timezone        text not null default 'America/Bogota',
  locale          text not null default 'es-CO',
  plan            org_plan not null default 'trial',
  trial_ends_at   timestamptz default (now() + interval '14 days'),
  whatsapp_phone  text,                   -- número WA Business asociado
  whatsapp_phone_id text,                 -- phone_number_id de Meta
  whatsapp_business_id text,              -- business_id de Meta
  metadata        jsonb default '{}'::jsonb,
  onboarded_at    timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index organizations_slug_idx on organizations(slug);
create index organizations_specialty_idx on organizations(specialty);

-- ============================================================
-- MEMBERS (usuarios dentro de una org)
-- ============================================================

create table members (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  user_id         uuid not null references auth.users(id) on delete cascade,
  email           citext not null,
  full_name       text,
  role            member_role not null default 'doctor',
  permissions     jsonb default '{}'::jsonb,
  last_seen_at    timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  unique(org_id, user_id)
);

create index members_org_idx on members(org_id);
create index members_user_idx on members(user_id);
create index members_email_idx on members(email);

-- ============================================================
-- INVITATIONS (invitar nuevos miembros)
-- ============================================================

create table invitations (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  email           citext not null,
  role            member_role not null default 'doctor',
  token           text not null unique,
  invited_by      uuid references members(id),
  accepted_at     timestamptz,
  expires_at      timestamptz not null default (now() + interval '7 days'),
  created_at      timestamptz default now()
);

create index invitations_token_idx on invitations(token);
create index invitations_org_email_idx on invitations(org_id, email);

-- ============================================================
-- TRIGGERS: updated_at automático
-- ============================================================

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger organizations_updated_at before update on organizations
  for each row execute function set_updated_at();
create trigger members_updated_at before update on members
  for each row execute function set_updated_at();

-- ============================================================
-- HELPER: org actual del usuario (para RLS)
-- ============================================================

create or replace function current_org_id() returns uuid as $$
  select org_id from members
  where user_id = auth.uid()
  order by created_at asc
  limit 1;
$$ language sql stable;

create or replace function is_org_member(target_org uuid) returns boolean as $$
  select exists (
    select 1 from members
    where org_id = target_org and user_id = auth.uid()
  );
$$ language sql stable;

create or replace function is_org_admin(target_org uuid) returns boolean as $$
  select exists (
    select 1 from members
    where org_id = target_org
      and user_id = auth.uid()
      and role in ('owner', 'admin')
  );
$$ language sql stable;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table organizations enable row level security;
alter table members enable row level security;
alter table invitations enable row level security;

-- Organizations: solo ven la(s) suya(s)
create policy "members can read their org" on organizations for select
  using (is_org_member(id));
create policy "admins can update their org" on organizations for update
  using (is_org_admin(id));

-- Members: solo ven miembros de su misma org
create policy "members can read same-org members" on members for select
  using (is_org_member(org_id));
create policy "admins can manage members" on members for all
  using (is_org_admin(org_id));

-- Invitations: solo admins de la org
create policy "admins manage invitations" on invitations for all
  using (is_org_admin(org_id));
