# Migraciones Medaccer

Aplicar **en orden** desde el SQL Editor de Supabase, o usando la CLI:

```bash
supabase db push
```

| # | Archivo | Descripción |
|---|---|---|
| 001 | `001_init.sql` | Multi-tenant base: orgs, members, invitations, helpers RLS |
| 002 | `002_clinical.sql` | Pacientes, citas, encuentros, documentos |
| 003 | `003_messaging.sql` | Conversaciones WhatsApp, mensajes, AI runs |
| 004 | `004_billing.sql` | Suscripciones Wompi, facturas DIAN, usage events |
| 005 | `005_audit.sql` | Audit log Ley 1581 con triggers automáticos |

## Cómo aplicarlas (Supabase Dashboard)

1. Project Settings → Database → SQL Editor
2. Copiar contenido de `001_init.sql` → Run
3. Repetir con 002, 003, 004, 005 **en ese orden**
4. Verificar en Tables que existan: `organizations`, `members`, `patients`, `appointments`, `conversations`, `messages`, `subscriptions`, `audit_log`

## Cómo aplicarlas (Supabase CLI local — recomendado)

```bash
# Una vez:
npm install -g supabase
supabase login
supabase link --project-ref <tu-project-ref>

# Cada vez que añadís migración:
cp migrations/*.sql supabase/migrations/
supabase db push
```

## Verificar RLS

Después de aplicar, hacer un test rápido en SQL Editor:

```sql
-- Como anon (sin auth), debería devolver 0 filas:
select * from patients;

-- Como usuario auth de org A, debería ver solo patients de org A:
-- (probar logueando un usuario y corriendo desde el cliente)
```

## Rollback

No hay rollback automático. Para borrar todo y empezar:

```sql
drop schema public cascade;
create schema public;
grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on schema public to postgres, anon, authenticated, service_role;
```

Luego reaplicar 001-005.

## Seed de datos demo

Después de aplicar las 5, correr `seed.sql` (opcional, para tener datos de prueba):

```bash
psql $DATABASE_URL < seed.sql
```
