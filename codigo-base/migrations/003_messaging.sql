-- ============================================================
-- 003_messaging.sql · Medaccer
-- Conversaciones WhatsApp, mensajes, runs del agente IA
-- ============================================================

create type channel_kind as enum ('whatsapp', 'sms', 'web', 'email');
create type message_direction as enum ('inbound', 'outbound');
create type message_kind as enum ('text', 'audio', 'image', 'video', 'document', 'location', 'template', 'interactive');
create type conversation_status as enum ('open', 'pending_human', 'snoozed', 'closed');
create type ai_mode as enum ('auto', 'assisted', 'off');

-- ============================================================
-- CONVERSATIONS
-- ============================================================

create table conversations (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  patient_id      uuid references patients(id) on delete set null,
  channel         channel_kind not null default 'whatsapp',
  external_id     text,                   -- wa_id de Meta
  contact_phone   text,
  contact_name    text,
  status          conversation_status not null default 'open',
  ai_mode         ai_mode not null default 'auto',
  assigned_to     uuid references members(id),
  last_message_at timestamptz,
  unread_count    int default 0,
  summary         text,                   -- resumen rolling para context
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index conversations_org_status_idx on conversations(org_id, status, last_message_at desc);
create index conversations_phone_idx on conversations(org_id, contact_phone);
create index conversations_external_idx on conversations(channel, external_id);

-- ============================================================
-- MESSAGES
-- ============================================================

create table messages (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  conversation_id uuid not null references conversations(id) on delete cascade,
  external_id     text,                   -- wamid de Meta (idempotencia)
  direction       message_direction not null,
  kind            message_kind not null default 'text',
  body            text,                   -- texto plano (transcrito si es audio)
  media_url       text,                   -- url Supabase Storage
  media_mime      text,
  template_name   text,                   -- si es template HSM
  template_params jsonb,
  sent_by         uuid references members(id),  -- null si fue IA o paciente
  ai_run_id       uuid,                   -- ref a ai_runs
  status          text default 'sent',    -- sent, delivered, read, failed
  status_updates  jsonb default '[]'::jsonb,
  error           text,
  cost_usd        numeric(10,6),          -- costo del mensaje (Meta cobra por categoría)
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now()
);

create unique index messages_external_uq on messages(org_id, external_id) where external_id is not null;
create index messages_conv_idx on messages(conversation_id, created_at);
create index messages_org_idx on messages(org_id, created_at desc);

-- ============================================================
-- AI RUNS (cada vez que el agente decide algo)
-- ============================================================

create table ai_runs (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  conversation_id uuid references conversations(id) on delete cascade,
  trigger_message_id uuid references messages(id) on delete set null,
  model           text not null,          -- 'gemini-2.5-flash' | 'llama-3.3-70b-versatile'
  provider        text not null,          -- 'google' | 'groq'
  system_prompt_version text,
  input_tokens    int,
  output_tokens   int,
  total_tokens    int generated always as (coalesce(input_tokens,0) + coalesce(output_tokens,0)) stored,
  latency_ms      int,
  cost_usd        numeric(10,6),
  tools_called    jsonb default '[]'::jsonb, -- [{name, args, result}]
  output_text     text,
  decision        text,                   -- 'reply' | 'escalate' | 'silent'
  confidence      numeric(3,2),           -- 0.00–1.00
  error           text,
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now()
);

create index ai_runs_conv_idx on ai_runs(conversation_id, created_at desc);
create index ai_runs_org_idx on ai_runs(org_id, created_at desc);

-- ============================================================
-- TEMPLATES (HSM aprobados por Meta)
-- ============================================================

create table message_templates (
  id              uuid primary key default uuid_generate_v4(),
  org_id          uuid not null references organizations(id) on delete cascade,
  meta_id         text,                   -- ID en Meta Business
  name            text not null,
  language        text default 'es_CO',
  category        text,                   -- UTILITY, MARKETING, AUTHENTICATION
  body            text not null,
  variables       jsonb default '[]'::jsonb,
  status          text default 'pending', -- approved, pending, rejected
  approved_at     timestamptz,
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now()
);

create unique index message_templates_org_name on message_templates(org_id, name);

-- ============================================================
-- TRIGGERS y vistas
-- ============================================================

create trigger conversations_updated_at before update on conversations
  for each row execute function set_updated_at();

-- Trigger: actualizar last_message_at en conversation cuando llega nuevo mensaje
create or replace function bump_conversation_last_msg() returns trigger as $$
begin
  update conversations
  set last_message_at = new.created_at,
      unread_count = case
        when new.direction = 'inbound' then unread_count + 1
        else unread_count
      end
  where id = new.conversation_id;
  return new;
end;
$$ language plpgsql;

create trigger messages_bump_conv after insert on messages
  for each row execute function bump_conversation_last_msg();

-- ============================================================
-- RLS
-- ============================================================

alter table conversations enable row level security;
alter table messages enable row level security;
alter table ai_runs enable row level security;
alter table message_templates enable row level security;

create policy "members rw conversations" on conversations for all using (is_org_member(org_id));
create policy "members rw messages" on messages for all using (is_org_member(org_id));
create policy "members r ai_runs" on ai_runs for select using (is_org_member(org_id));
create policy "members rw templates" on message_templates for all using (is_org_member(org_id));
