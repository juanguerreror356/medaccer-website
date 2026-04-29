# MEDACCER — Estado actual de la landing

> Documento para alinear con otras IAs o colaboradores. Actualizado: 18 abril 2026.

---

## 1. Qué es MEDACCER

Asistente de IA para **consultorios independientes de salud ambulatoria en Colombia** (medicina general, odontología, dermatología, psicología, fisioterapia, nutrición, medicina estética, traumatología, pediatría). Se conecta al WhatsApp Business del consultorio y al calendario existente; automatiza:

- Agendamiento 24/7 por WhatsApp
- Confirmación y reagendamiento de citas
- Recordatorios automáticos (reducir ausencias)
- Triage y escalamiento de urgencias
- Generación del **Resumen Digital de Atención (RDA)** requerido por la **Resolución 1888 de 2025** del Ministerio de Salud
- Notas clínicas por voz
- Dashboard de ocupación, ingresos y tiempo recuperado

**Propuesta de valor central:** libera ~26 horas por semana que hoy se van respondiendo WhatsApp manualmente, sin cambiar software ni migrar datos.

---

## 2. Arquitectura del sitio

Stack vanilla (HTML + CSS + JS sin frameworks), conforme a `CLAUDE.md`. Archivos clave:

```
medaccer-v2/
├── index.html          → landing única (scroll largo)
├── styles.css          → sistema de diseño + componentes
├── chat.js             → motor del chat (hero + demo multi-escenario + backstage)
├── effects.js          → partículas, scroll reveal, contadores, parallax
└── tweaks.js           → panel de ajustes en vivo (color, densidad, tipografía, idioma)
```

### Paleta (oficial en `CLAUDE.md`)

- `--bg-primary: #0A1628`
- `--bg-secondary: #111827`
- `--color-primary: #2563EB` (azul)
- `--color-secondary: #06B6D4` (cian)
- `--color-cta: #F59E0B` (ámbar)
- `--color-success: #10B981` (verde)
- `--gradient-brand: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)`

### Tipografía actual
- **Serif titular:** Instrument Serif (Google Fonts) — títulos
- **Sans:** Geist — cuerpo
- **Mono:** Geist Mono — metadatos, código
- Variante `[data-typography="tech"]` reemplaza serif por Geist (sin serifa)

> **Pendiente de usuario:** la tipografía actual no le convence. Necesitamos decidir dirección.

---

## 3. Secciones (orden actual)

1. **Banner urgencia Res. 1888** — barra superior ámbar, countdown al 15 abril 2026
2. **Nav sticky** — logo, links (Producto · Demo en vivo · RDA · Res. 1888 · Precios) + CTAs (Contactar · Probar 4 días gratis → abren WhatsApp prellenado)
3. **Hero**
   - Eyebrow: "MVP activo · Bogotá · Abril 2026"
   - H1: "Libere 26 horas al mes y atienda más pacientes por WhatsApp."
   - Sub: foco en optimizar procesos; sin cifras infundadas
   - CTA: "Probar 4 días gratis →" + "Ver demo en vivo"
   - Stage derecho: iPhone mockup con chat animado (loop de un ejemplo: paciente con dolor → asistente ofrece horarios → confirma)
   - Flotantes: "127 citas agendadas hoy" + "+26h por semana"
4. **Especialidades** — intro + carrusel infinito con 9 especialidades
5. **Impacto real (bento)** — 4 cards con proyecciones (26h recuperadas/semana, <5s respuesta, 24/7 disponibilidad, 95% tasa de apertura WhatsApp, 48h setup)
   - **Aclaración explícita:** "Estas son proyecciones típicas. No son promesas."
6. **Producto (bento)** — 6 tarjetas: chatbot multimedia, agenda 24/7, recordatorios, RDA automático, dashboard, seguimiento post-consulta
7. **Setup sin fricción** — explicación: "Sin migrar datos, sin cambiar software"
8. **Demo en vivo** — 5 escenarios conmutables (Agendar · Recordatorio · Reagendar · Generar RDA · Emergencia), con chat animado + panel lateral "qué hace el asistente" en lenguaje de médico (Entiende → Consulta agenda → Confirma → Le notifica)
9. **Primer día con MEDACCER** — timeline D0→D7 (onboarding)
10. **Cumplimiento RDA / Resolución 1888** — explicación de la obligación, papel oficial visual, código FHIR stylized, multas
11. **FAQ defensiva** — 6 preguntas directas (datos, errores del bot, control clínico, cumplimiento, contrato, horario)
12. **Sobre MEDACCER** — historia, 3 pilares, 3 valores (sticky)
13. **Testimonios** — 3 cards (placeholder hasta tener reales)
14. **Pricing** — 3 planes (Inicio $350k · Profesional $800k · Premium $2M COP/mes) + setup único
15. **Plan clarifications** — grid de 4 tarjetas (qué incluyen los 4 días · qué es el setup · por qué varía el costo · sin permanencia)
16. **Recursos** — 4 posts planeados, banner "primer post en 3 semanas"
17. **CTA final** — "Empiece a recuperar el tiempo perdido" + agendar llamada 15 min
18. **Footer** — 4 columnas: brand · producto · empresa · legal

---

## 4. Animaciones e interacción

- **Partículas canvas** en el hero (`effects.js`)
- **Chat hero** en loop continuo (`chat.js`)
- **Chat demo** con 5 escenarios + backstage sincronizado (panel de pasos que se iluminan conforme avanza)
- **Scroll reveal** con IntersectionObserver (clase `.reveal` → `.active`)
- **Contadores animados** (data-count)
- **Parallax sutil** en tarjetas flotantes del hero
- **Marquee infinito** en franja de especialidades
- **Paneles sticky** en sección "Sobre" (valores quedan fijos mientras se hace scroll de la historia)
- **Timeline interactiva** en "Primer día" (pasos se activan al scroll)
- **Panel de Tweaks** (toggle desde toolbar) — permite cambiar: color primario, densidad, tipografía (serif/tech), idioma (ES/EN). Persistido en archivo vía `EDITMODE-BEGIN/END`.

---

## 5. Reglas editoriales aplicadas

Restricciones explícitas del usuario que se respetan en todo el copy:

- ❌ **No mencionar proveedores técnicos:** Claude, Haiku, Vision, Whisper, n8n, WhatsApp Business API, HL7 FHIR, SISPRO, Google Calendar (como tech stack) — se oculta el stack
- ❌ **No cifras no verificadas:** "reduce no-shows 40%", "6M COP/mes recuperados", "+42% ingresos" → reemplazadas por proyecciones con disclaimer "no son promesas"
- ❌ **No sesgo por especialidad:** quitado "Dr. Rodríguez · Odontología" del header del chat; ahora dice "Consultorio MEDACCER"
- ❌ **Lenguaje de desarrollador:** backstage del demo reescrito a lenguaje de médico
- ✅ **Claridad de plan:** 4 días gratis (no 14), setup único explicado, costo diferencial explicado, sin permanencia claro
- ✅ **CTAs van a WhatsApp prellenado:** `wa.me/573001234567?text=...`

---

## 6. Decisiones pendientes con el usuario

1. **Tipografía** — la serif actual no convence; evaluar alternativas
2. **Contraste de colores en algunas secciones** — usuario reportó problema de legibilidad en zona de especialidades (ya corregido con gradiente más oscuro)
3. **Separar en múltiples páginas** — "Sobre MEDACCER", "Guías y recursos", "Contacto" deberían tener su propia URL, no ser ancla en landing
4. **Video del doctor** — el usuario grabará y hay que dejar slot
5. **Nuevas secciones propuestas:**
   - Comparador MEDACCER vs. secretaria (tabla honesta)
   - "No es para usted si..." (honestidad sobre límites)
6. **Blog completo** — redactar primeros artículos SEO (Res. 1888, Ley 1581 Habeas Data, WhatsApp en clínica, ahorro operativo)
7. **Bug visual hero** — cards flotantes 127 y +26h se superponían con el iPhone; corregido reposicionándolas fuera y eliminando la tercera card (+42% promesa no verificada)

---

## 7. Cómo desplegar (GitHub Pages)

1. Clonar repo `medaccer-website` local o usar GitHub Desktop
2. Reemplazar `index.html`, `styles.css`, `chat.js`, `effects.js`, `tweaks.js` en la raíz del repo
3. Commit + push a `main`
4. GitHub Pages publica automáticamente

Claude **no puede hacer push directo** al repo desde esta interfaz, pero puede preparar todos los archivos listos para copiar.

---

## 8. Para otra IA / colaborador

Si estás tomando este proyecto:

- Lee `CLAUDE.md` primero — manda la paleta y convenciones
- No modifiques tokens de color sin pedirlo al usuario
- Respeta las reglas editoriales de §5 — el usuario es explícito sobre lenguaje
- El sitio es **vanilla JS, sin frameworks** — no introduzcas React ni dependencias
- Todo contenido en español colombiano
- El target es **doctores dueños de consultorio en Colombia**, no técnicos
