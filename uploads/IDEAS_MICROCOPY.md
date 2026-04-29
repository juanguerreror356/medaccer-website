# MEDACCER — Ideas de microcopy y siguientes pasos

Documento interno con propuestas de texto para afinar conversión. No está implementado en la web — son ideas para que usted elija cuáles quiere usar.

---

## 1. CTAs principales — microcopy bajo el botón

Todo CTA en la web actualmente dice: **"Probar 4 días gratis"** o **"Hablar por WhatsApp"**.

**Propuesta:** agregar una línea pequeña debajo que reduzca fricción:

| CTA | Microcopy debajo (elegir 1) |
|-----|------------------------------|
| Probar 4 días gratis | `Sin tarjeta · Cancela en 1 clic` |
| Probar 4 días gratis | `Setup en 48h · Sin permanencia` |
| Probar 4 días gratis | `Menos de 2 min para empezar` |
| Hablar por WhatsApp | `Le respondemos el mismo día hábil` |
| Hablar por WhatsApp | `Sin agendamiento · Chat directo` |
| Enviar mensaje (form) | `Respuesta en menos de 4 horas` |

### Variantes A/B para probar
- **Urgencia**: "Quedan 3 cupos del programa piloto este mes"
- **Prueba social** (cuando haya): "+37 consultorios ya lo usan en Bogotá"
- **Beneficio concreto**: "Recupera 12h al mes desde el día 1"

---

## 2. Sección de Video — dónde y qué mostrar

Actualmente hay un **placeholder de video** en home. Ideas de contenido concreto:

### Video 1 · Hero (60 seg) — "El problema en 60 segundos"
- 0:00-0:10 — Una doctora viendo 47 WhatsApps sin responder mientras atiende
- 0:10-0:25 — "Cada mensaje sin respuesta es un paciente que no vuelve"
- 0:25-0:45 — Pantalla partida: MEDACCER respondiendo automáticamente
- 0:45-0:60 — "Libere 12 horas al mes. Sin cambiar su WhatsApp."

### Video 2 · Demo producto (90 seg)
- Narración en primera persona del founder
- Muestra el flujo real: paciente escribe → IA responde → cita en calendario
- Termina con: "¿Quiere verlo con sus propios pacientes? 4 días gratis."

### Video 3 · Testimonio piloto (cuando haya)
- Un doctor del programa piloto hablando
- 30-45 seg, grabado con celular (autenticidad > producción)
- "Antes perdía 3 pacientes por semana. Ahora ninguno."

### Dónde colocarlos
- **Video 1** → Hero, reemplazando el placeholder actual
- **Video 2** → Sección "Producto" o en página sobre.html
- **Video 3** → Después de pricing, antes del footer (cierre emocional)

---

## 3. Pricing — microcopy y elementos a añadir

### Actualmente muestra 3 planes con precio mensual
Faltan elementos que aumentan conversión:

#### a) Toggle Mensual / Anual (con -20% anual)
```
┌─────────────┬─────────────┐
│   Mensual   │   Anual -20%│ ← badge de ahorro
└─────────────┴─────────────┘
```

#### b) "Más popular" en el plan del medio
- Badge amarillo/acento en el plan Pro
- Ligeramente más grande que los otros
- Texto: `Más elegido por odontólogos y fisios`

#### c) Microcopy de cada plan
| Plan | Eyebrow | Título | Subtítulo |
|------|---------|--------|-----------|
| Esencial | Para empezar | **Esencial** | Perfecto si atiende solo |
| Pro | ⭐ Más elegido | **Pro** | Para consultorios con 1-3 especialistas |
| Clínica | Para equipos | **Clínica** | Multi-doctor, reportes avanzados |

#### d) FAQ pricing inline (justo debajo de los planes)
- ¿Puedo cambiar de plan en cualquier momento? → **Sí, sin costo**
- ¿Cobran por mensaje? → **No, incluidos todos los mensajes de WhatsApp**
- ¿Qué pasa al terminar los 4 días gratis? → **Nada. Si no continúa, se pausa sin cargo.**

#### e) Bottom-of-pricing CTA
Después de los 3 planes, una franja:
> **¿No está seguro de qué plan necesita?**
> Conversemos 15 minutos sin compromiso.
> `[ Agendar llamada ]`

---

## 4. FAQ — preguntas reales a incluir

Estructura sugerida: **acordeón en home + página /faq completa**.

### FAQ en home (6 preguntas — las más buscadas)

**1. ¿Necesito cambiar mi WhatsApp actual?**
No. MEDACCER se integra por encima de su WhatsApp Business. Sigue siendo su número, sus chats, su equipo.

**2. ¿Qué tan rápido se configura?**
48 horas. Nosotros conectamos WhatsApp, calendario y entrenamos el asistente con las preguntas específicas de su consultorio. Usted solo aprueba.

**3. ¿Cumple con la Resolución 1888 de 2025?**
Sí. Genera automáticamente el Resumen Digital de Atención (RDA) con todos los campos exigidos por el Ministerio de Salud.

**4. ¿Qué pasa con los datos de mis pacientes?**
Cumplimos la Ley 1581 de 2012. Datos cifrados, no se comparten con terceros, usted conserva control total. [Ver política →]

**5. ¿Puedo cancelar cuando quiera?**
Sí. Sin permanencia ni penalidades. Cancela con un mensaje y le enviamos sus datos por correo.

**6. ¿Funciona si no tengo secretaria?**
Perfectamente. MEDACCER es especialmente útil para consultorios que operan sin personal administrativo — le permite tener la capacidad de una secretaria digital sin el costo.

### FAQ página completa (/faq) — 15-20 preguntas agrupadas en 4 categorías

**Producto (5 preguntas)**
- ¿Qué diferencia a MEDACCER de un chatbot normal?
- ¿Puede manejar varios idiomas?
- ¿El paciente sabe que está hablando con una IA?
- ¿Qué pasa cuando el caso es complejo?
- ¿Qué integraciones tiene? (Google Calendar, sí · Outlook/iCal, no por ahora)

**Setup y onboarding (4)**
- ¿Qué necesito para empezar?
- ¿Quién entrena al asistente?
- ¿Qué pasa en los 4 días gratis?
- ¿Puedo traer datos de pacientes existentes?

**Legal y datos (4)**
- ¿Dónde se almacenan los datos? (Colombia/LATAM, proveedor certificado)
- ¿Hay un contrato de tratamiento de datos?
- ¿Cumple HIPAA? (no aplica en Colombia; cumplimos Ley 1581 y Res. 1888)
- ¿Puedo exportar mis datos?

**Precios y facturación (4)**
- ¿Hay costo por mensaje?
- ¿Facturan con NIT?
- ¿Hay descuento por anual?
- ¿Qué pasa si supero el plan?

**Soporte (3)**
- ¿Cómo los contacto si algo falla?
- ¿En qué horario atienden?
- ¿Hay capacitación para mi equipo?

---

## 5. Otros afinamientos de copy recomendados

### Hero — subheadline actual vs. alternativas

**Actual**: "El asistente de WhatsApp con IA que optimiza su consultorio."

**Alternativas a probar**:
- "Su WhatsApp responde solo. Usted atiende al paciente."
- "Deja de perder pacientes porque nadie contestó."
- "12 horas al mes que volvieron a usted."
- "La capacidad de una secretaria. Sin el costo de una."

### Badges / chips en secciones
- Cambiar `WhatsApp Business · Google Calendar` por algo más concreto:
  `"Funciona con su WhatsApp actual · Setup 48h · Cumple Res. 1888"`

### Sección "Cómo funciona" (si existe)
Agregar tiempos específicos:
- Paso 1: *Conectamos WhatsApp · 30 min*
- Paso 2: *Sincronizamos agenda · 20 min*
- Paso 3: *Entrenamos al asistente · 40 min*
- Paso 4: *Prueba con 5 pacientes · 2 días*
- **Total: 48 horas para estar activo**

### Footer — bottom line
Cambiar `© 2026 MEDACCER · Hecho en Bogotá, Colombia` por:
`© 2026 MEDACCER · Hecho en Bogotá, con café ☕ para doctores que no tienen tiempo para tomarlo`

---

## 6. Elementos visuales que potenciarían más

### Social proof (incluso sin testimonios aún)
- **"Programa piloto — 10 primeros consultorios"** con contador visible: `4/10 cupos ocupados`
- Crea escasez honesta + invita a pertenecer

### Trust badges row
En la sección de compliance, reemplazar badges genéricos por:
- `✓ Ley 1581 de 2012`
- `✓ Resolución 1888 de 2025`
- `✓ Datos cifrados AES-256`
- `✓ Servidores en LATAM`
- `✓ Soporte en español`

### "Quién está detrás" snippet en home
Un mini-card antes del footer:
```
[ Foto del founder ]
"Construyo MEDACCER porque vi a mi hermano
 (odontólogo) perder pacientes por no contestar
 mensajes a tiempo. Esto es para ustedes."
                        — [Nombre], Fundador
```
Humaniza muchísimo, especialmente cuando no hay testimonios aún.

---

## 7. Experimentos rápidos de conversión

| Experimento | Esfuerzo | Impacto esperado |
|-------------|----------|------------------|
| Microcopy bajo CTA | 10 min | +5-10% clicks |
| Toggle mensual/anual en pricing | 2h | +8% conversión a anual |
| FAQ en home | 3h | -30% tickets de soporte |
| Calculadora ROI interactiva | 4h | +15% tiempo en página |
| "Quién está detrás" con foto | 1h | +10% confianza percibida |
| Video hero 60s | 2 semanas (producir) | +25% conversión hero |
| Social proof "4/10 cupos" | 30 min | +20% urgencia |

---

*Documento vivo. Actualice conforme pruebe.*
