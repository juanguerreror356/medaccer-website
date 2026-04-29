# Medaccer App — Código base

Next.js 15 + Supabase + Vercel AI SDK + Gemini 2.5 Flash + WhatsApp Cloud API.
Todo lo necesario para arrancar el SaaS de tu consultorio.

## Quick start

```bash
# 1. Clonar/copiar este folder al repo medaccer-app
git init
git remote add origin git@github.com:medaccer/medaccer-app.git

# 2. Instalar
pnpm install   # o npm install

# 3. Variables de entorno
cp .env.example .env.local
# editar con tus llaves reales (Supabase, Meta, Gemini, Groq, Wompi, Resend)

# 4. Aplicar migraciones DB
supabase login
supabase link --project-ref <tu-ref>
supabase db push  # ejecuta migrations/001..005 en orden

# 5. Dev
pnpm dev
# abrí http://localhost:3000
```

## Estructura

```
codigo-base/
├── app/
│   ├── (auth)/                 # signup, login
│   ├── (dashboard)/            # CRM, agenda, conversaciones
│   ├── api/
│   │   ├── webhooks/whatsapp/  # ← webhook Meta
│   │   ├── webhooks/wompi/     # ← webhook pagos
│   │   └── crons/              # recordatorios, billing
│   └── layout.tsx
├── lib/
│   ├── ai/
│   │   ├── system-prompts.ts   # prompts por especialidad
│   │   ├── tools.ts            # tools del agente
│   │   └── agent.ts            # runner principal
│   ├── supabase/
│   │   ├── client.ts           # cliente browser
│   │   ├── server.ts           # cliente server (RSC)
│   │   └── service.ts          # cliente service_role (webhooks)
│   ├── whatsapp/
│   │   ├── send.ts             # enviar mensajes via Graph API
│   │   └── templates.ts        # HSM
│   ├── billing/
│   │   ├── wompi.ts            # cliente Wompi
│   │   └── invoices.ts         # facturas DIAN
│   └── utils.ts
├── components/
│   ├── ui/                     # shadcn primitives
│   ├── inbox/                  # UI conversaciones
│   ├── calendar/               # UI agenda
│   └── patients/               # CRUD pacientes
├── migrations/                 # ← aplicar en orden
│   ├── 001_init.sql
│   ├── 002_clinical.sql
│   ├── 003_messaging.sql
│   ├── 004_billing.sql
│   └── 005_audit.sql
└── package.json
```

## Variables de entorno (`.env.example`)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Meta WhatsApp Cloud API
META_VERIFY_TOKEN=  # cualquier string secreto que vos elegís
META_APP_SECRET=    # del Meta Developer Dashboard
META_ACCESS_TOKEN=  # System User Access Token (permanente)
META_PHONE_NUMBER_ID=
META_BUSINESS_ID=

# IA
GOOGLE_GENERATIVE_AI_API_KEY=  # Gemini (AI Studio)
GROQ_API_KEY=                  # Llama fallback + Whisper

# Pagos Colombia
WOMPI_PUBLIC_KEY=
WOMPI_PRIVATE_KEY=
WOMPI_EVENTS_SECRET=

# Email
RESEND_API_KEY=

# Otros
NEXT_PUBLIC_APP_URL=https://app.medaccer.com
```

## Flujo de un mensaje WhatsApp (resumen)

```
Paciente WA → Meta → POST /api/webhooks/whatsapp
  ├─ verifica HMAC
  ├─ persiste en `messages` (idempotente por wamid)
  ├─ resuelve conversation + patient
  └─ si ai_mode=auto → runAgent()
        ├─ obtiene contexto (org, paciente, últimos 10 msgs)
        ├─ buildSystemPrompt(specialty, ctx)
        ├─ generateText({ tools, maxSteps: 5 })
        ├─ tools posibles: checkAvailability, createAppointment, escalateToHuman, ...
        └─ envía respuesta vía sendWhatsApp() → graph.facebook.com
```

## Próximos pasos

1. Aplicar `migrations/` (ver `migrations/README.md`)
2. Configurar Meta Business Manager + Cloud API
3. Setear `.env.local`
4. `pnpm dev` y probar signup → onboarding → dashboard
5. Configurar webhook en Meta apuntando a `https://tu-dominio.com/api/webhooks/whatsapp`

## Recursos

- Plan operativo 12 semanas: `../docs/checklist-12-semanas.html`
- Guía RUT DIAN: `../docs/guia-rut.html`
- Guía técnica completa: `../docs/guia-tecnica.html`
