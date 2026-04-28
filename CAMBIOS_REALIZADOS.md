# Cambios realizados — MEDACCER

## Archivos modificados

- `index.html`
  - Viewport actualizado para responsive real.
  - Cache buster subido de `v=42` a `v=43`.

- `src/app.jsx`
  - Nuevo helper `MedaccerAuth` con sesión demo en `localStorage`.
  - Protección de rutas `#app/...`.
  - Login rediseñado para CRM médico con roles Doctor / Recepción.
  - Botón de login demo y persistencia de sesión.
  - Cierre de sesión limpiando sesión demo.

- `src/app.css`
  - Estilos completos del nuevo login.
  - Vista previa visual del CRM en la pantalla de acceso.
  - Responsive para tablet y móvil.

- `src/landing.jsx`
  - Nueva sección `#crm` para conectar landing → CRM.
  - CTAs de login demo en hero y CTA final.
  - Copy del hero ajustado a CRM médico.
  - FAQ y textos técnicos suavizados.

- `src/landing.css`
  - Estilos de la sección CRM médico.
  - Mejoras responsive generales para nav, hero, grids, pricing y estadísticas.

## Flujo final

1. Usuario entra a la landing.
2. Ve demo de WhatsApp + sección CRM médico.
3. Da clic en **Iniciar sesión** o **Entrar al CRM demo**.
4. Inicia sesión con demo o correo válido.
5. Entra a `#app/dashboard`.
6. Puede navegar por módulos del CRM.
7. Desde ajustes puede cerrar sesión.
