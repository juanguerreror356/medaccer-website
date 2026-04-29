# MEDACCER — Design System

## Color palette

### Primary brand (OKLCH equivalents)
- **Background primary:** `#0A1628` → `oklch(12% 0.04 250)` — deep navy
- **Background secondary:** `#111827` → `oklch(15% 0.025 255)` — dark slate
- **Brand blue:** `#2563EB` → `oklch(52% 0.22 264)` — primary CTA, links
- **Brand teal:** `#06B6D4` → `oklch(72% 0.14 195)` — accents, highlights
- **CTA amber:** `#F59E0B` → `oklch(77% 0.16 85)` — early access badge, urgency
- **Success green:** `#10B981` → `oklch(69% 0.15 163)` — confirmations, trust signals
- **Ink 900:** `#0F172A` — body text on light
- **Ink 600:** `#475569` — secondary text

### Usage rules
- Never pure black (#000) or pure white (#FFF) — use near-black navy or near-white with 0.005 chroma
- Gradient brand: `linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)`
- Dark sections use `#0A1628` with white text at 0.7 opacity for secondary content
- Specialty accent colors are dynamic (teal for dental, coral for dermatology, etc.)

## Typography

### Typefaces
- **Serif (headings):** Instrument Serif — emotional, editorial, trust-building
- **Sans (body):** Geist — clean, technical, modern
- **Mono (metadata):** Geist Mono — timestamps, codes, clinical data

### Scale (modular, 1.25 ratio)
- Display: 72px / 1.0 lh — hero headlines
- H1: 52px / 1.05 lh
- H2: 38px / 1.15 lh  
- H3: 28px / 1.25 lh
- Body: 16px / 1.6 lh — minimum, always rem
- Caption: 13px / 1.4 lh — labels, metadata

### Rules
- Heading max-width: 760px for readability
- Letter-spacing: −0.025em for display, −0.02em for h2, −0.01em for h3
- Body text: max 68ch per column

## Spacing
- Base unit: 4px
- Component padding: 24px (6 units)
- Section padding: 120px vertical (30 units)
- Card gap: 16–24px
- Grid gutter: 48px

## Elevation & surfaces
- Cards: `background: rgba(255,255,255,0.04)` on dark, `border: 1px solid rgba(255,255,255,0.08)`
- Glow effects: `box-shadow: 0 0 60px rgba(37,99,235,0.15)` for hero elements
- No heavy drop shadows — use borders and subtle glows instead

## Motion
- Default duration: 300ms (UI transitions), 500ms (section reveals)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` — ease-in-out for layout shifts
- Entrance: `ease-out`, exit: `ease-in`
- Never animate on scroll for essential content — only decorative enhancements

## Components

### Buttons
- Primary (filled): `background: var(--brand-blue)`, 12px radius, 44px min height
- Outline: `border: 1.5px solid currentColor`, same radius
- Never gradients on interactive buttons (save gradients for decorative elements)

### Cards
- Subtle glass effect on dark backgrounds
- 16px border-radius
- Hover: translate −2px Y + shadow increase

### Chat demo (hero)
- Mimics WhatsApp UI — green send bubbles (user), white receive bubbles (bot)
- Show real medical language, not placeholder text
- Animate message-by-message with natural typing delays

## Anti-patterns (never use)
- Side-stripe accent borders on cards
- Gradient text (except very sparingly on display headings)
- Decorative glassmorphism with heavy blur on functional UI
- Identical grid of feature cards with no visual hierarchy
- Hero with centered text + CTA over a stock image
- Modal-first onboarding
