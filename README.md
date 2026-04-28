# MEDACCER — Landing + CRM médico demo

Proyecto estático listo para GitHub Pages. Incluye landing pública, flujo de inicio de sesión y CRM demo para doctores.

## Qué se potenció

- Landing conectada al objetivo principal: llevar al doctor desde el marketing hasta el CRM.
- Nueva sección **CRM médico** con vista previa de dashboard, agenda, conversaciones, pacientes, RDA y automatizaciones.
- Ruta `#login` rediseñada como acceso profesional para doctor / recepción.
- Sesión demo con `localStorage`, protección de rutas `#app/...` y redirección al login si no hay sesión.
- Botón **Entrar al CRM demo** desde hero, sección CRM y CTA final.
- Copy más prudente: menos promesas absolutas, menos menciones técnicas internas y más foco en valor clínico-operativo.
- Responsive real: viewport móvil y media queries para landing y login.

## Cómo probar localmente

Abre `index.html` en un navegador o sirve la carpeta con cualquier servidor estático.

Rutas útiles:

- `index.html#landing` — landing
- `index.html#login` — login
- `index.html#app/dashboard` — CRM dashboard, protegido por login demo
- `index.html#app/agenda` — agenda
- `index.html#app/conversaciones` — bandeja de WhatsApp
- `index.html#app/pacientes` — CRM de pacientes
- `index.html#app/rda` — RDA

## Credenciales demo

- Correo: `demo@medaccer.co`
- Contraseña: `medaccer2026`

También funciona el botón **Entrar al CRM demo**.

## Publicar en GitHub Pages

1. Sube todos los archivos de esta carpeta a la raíz del repositorio.
2. En GitHub: `Settings` → `Pages`.
3. Source: branch `main`, folder `/root`.
4. Abre la URL publicada y prueba `#login` y `#app/dashboard`.

## Nota para producción

El login incluido es un prototipo frontend para demostrar flujo y navegación. Para producción debes reemplazar `MedaccerAuth` en `src/app.jsx` por autenticación real con backend, sesiones seguras, recuperación de contraseña, roles y permisos.
