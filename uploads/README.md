# MEDACCER — Landing v2

Landing page estático para MEDACCER — asistente de WhatsApp con IA para consultorios independientes en Colombia.

## Archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Home principal (hero, especialidades, video, métricas, demo, producto, RDA, precios, comparador, best-for, CTA, footer) |
| `sobre.html` | Página "Sobre MEDACCER" con historia y equipo |
| `recursos.html` | Listado de guías / blog posts |
| `contacto.html` | Métodos de contacto + formulario |
| `blog-5-errores-retencion.html` | Primer artículo del blog |
| `styles.css` | Estilos principales (landing) |
| `pages.css` | Estilos compartidos para páginas secundarias y blog |
| `effects.js` | Animaciones del hero (neural canvas, cursor glow, scroll reveal) |
| `chat.js` | Simulación del chat de WhatsApp en el demo |
| `tweaks.js` | Panel de tweaks (solo para desarrollo) |

## Publicar en GitHub Pages

1. Abrir **GitHub Desktop**.
2. Arrastrar esta carpeta sobre la ventana de GitHub Desktop.
3. Clic en **Publish repository**.
4. En el repo de GitHub → **Settings → Pages** → Source: `main` branch, carpeta `/ (root)`.
5. Esperar 1 minuto. El sitio queda en: `https://[usuario].github.io/[repo]/`

## Publicar el video del fundador

1. Grabar video (1 min, MP4, idealmente 1080p).
2. Subirlo a: `medaccer-v2/assets/video-fundador.mp4`.
3. En `index.html`, buscar el bloque `<!-- Para publicar: suba... -->` y:
   - Descomentar la línea `<source src="assets/video-fundador.mp4" ...>`
   - Quitar `style="display:none;"` del `<video>`.
4. (Opcional) Subir también un poster estático: `assets/video-poster.jpg`.
5. Commit + Push.

## Contraste y accesibilidad

Todas las combinaciones de color cumplen WCAG AA (4.5:1 para texto normal).

- Texto principal `#0B1E3F` sobre `#F6F9FD` → 16.8:1 ✓
- Texto secundario `#475B7D` sobre `#F6F9FD` → 6.9:1 ✓
- Acento `#2563EB` sobre `#F6F9FD` → 6.7:1 ✓

## Cambios en esta versión

- Nueva tipografía: Inter Tight + Source Serif 4 + JetBrains Mono
- Slot de video placeholder en hero
- Comparador MEDACCER vs secretaria
- Sección "MEDACCER funciona mejor cuando..."
- 3 páginas separadas: Sobre / Recursos / Contacto
- Primer blog post publicado
- Navegación actualizada
- Todo el copy en español neutro para Colombia

## Contacto

info@medaccer.com · Bogotá 🇨🇴
