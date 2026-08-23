# Evergreen Design System

The design system for gnazar.io. Green-first, calm, and modern — built for a
site about infrastructure and systems engineering. It replaced the previous
retro-terminal theme (beige CRT paper, scanlines, hard offset shadows,
all-caps mono type) in August 2026.

**Design idea in one line:** a quiet forest floor with jewel-light accents —
layered green-tinted surfaces, soft depth, editorial sans typography, and a
single mint-emerald accent that carries every interactive moment.

A living styleguide lives at **`/design`** (noindex) and renders every token
and component below.

---

## 1. Principles

1. **Green is the system.** Not an accent sprinkled on a neutral theme —
   backgrounds, surfaces, borders, and text all carry a measurable green tint.
   The accent is simply the brightest voice in the same hue family.
2. **Depth over decoration.** Hierarchy comes from layered surfaces, soft
   shadows, and hairline borders — never from scanlines, grids, or heavy
   frames.
3. **Type does the talking.** Big, tight, confident Inter for voice; JetBrains
   Mono reserved for metadata, code, and small technical labels (eyebrows,
   kbd hints). Body copy is full-contrast, never washed out.
4. **Motion is a courtesy.** 120–240 ms, one easing curve, tiny distances.
   Everything collapses under `prefers-reduced-motion`.
5. **Accessible by construction.** Every shipped color pair meets WCAG AA
   (4.5:1 text, 3:1 non-text). Contrast is verified, not guessed — see
   §9.

---

## 2. Color

### 2.1 Brand ramp — "Evergreen green"

A single 11-step ramp anchors everything. Interactive greens live at
400–700; deep greens shade text and dark surfaces.

| Step | Hex | Role |
|------|-----------|-----------------------------------------------|
| 50 | `#f0f9f2` | Lightest mint wash |
| 100 | `#dcf0e1` | Badge / soft fills (light) |
| 200 | `#b9e2c6` | Decorative mint |
| 300 | `#8bd0a3` | Decorative mint, dark-mode gradients |
| 400 | `#4ade80` | **Accent (dark mode)**, glows, terminal text |
| 500 | `#23b268` | Charts, decorative |
| 600 | `#0a8a55` | **Accent (light)** — icons, focus rings, non-text |
| 700 | `#0b7a4e` | Links and accent text (light) |
| 800 | `#067647` | Button fills (light), deep interactive |
| 900 | `#075c3a` | Deep shade |
| 950 | `#042415` | On-accent text (dark mode buttons) |

### 2.2 Semantic tokens

All tokens are CSS custom properties on `:root`, swapped by
`[data-theme="light"]` / `[data-theme="dark"]` and the
`prefers-color-scheme` fallback. **Components never reference raw hex.**

| Token | Light | Dark | Purpose |
|-------|-----------|-----------|----------------------------------|
| `--bg` | `#f6f9f4` | `#0b1510` | Page canvas |
| `--bg-muted` | `#edf3ea` | `#0f1d15` | Recessed zones (code sidebars, inputs) |
| `--surface` | `#ffffff` | `#121f17` | Cards, modals, header chrome |
| `--surface-elevated` | `#ffffff` | `#16281d` | Popovers, hovered cards |
| `--text` | `#101f18` | `#e9f3ec` | Body copy, headings |
| `--text-muted` | `#54695c` | `#9db3a4` | Secondary copy, meta |
| `--border` | `#dce8da` | `#24382c` | Hairlines, card borders |
| `--border-strong` | `#c2d6c4` | `#31493a` | Emphasized borders |
| `--accent` | `#0a8a55` | `#4ade80` | Icons, focus rings, active states |
| `--accent-strong` | `#067647` | `#4ade80` | Links, button fills (hover brightens via `filter`) |
| `--accent-foreground` | `#ffffff` | `#042415` | Text on accent fills |
| `--accent-soft` | `rgba(10,138,85,.12)` | `rgba(74,222,128,.16)` | Tinted fills (badges, hovers) |
| `--code-bg` | `#0e1f15` | `#0e1f15` | Code block surface (always dark) |
| `--code-text` | `#d9efe1` | `#d9efe1` | Code block text |
| `--danger` | `#c4261d` | `#f26d6d` | Errors, destructive |
| `--warning` | `#9a6700` | `#e3b341` | Draft notices, cautions |
| `--glow` | `rgba(10,138,85,.18)` | `rgba(74,222,128,.20)` | Ambient glow behind accents |

**Status hues** (`--danger`, `--warning`) are the only non-green chromatics,
reserved for diff highlighting, error pages, and draft indicators.

### 2.3 Atmosphere

The canvas is a flat `--bg`; depth comes from a fixed two-blob **aurora**
(`.site-body::before`): soft radial gradients of `--accent` mixed toward
transparent, concentrated top-of-page. Dark mode runs the same aurora at
higher intensity. The old grid + scanline overlays are gone.

### 2.4 Code blocks

Code surfaces are **always deep green** (`--code-bg`) in both themes — a
modern touch that also guarantees one consistent reading environment for
code. Inline code uses `--accent-soft` fills with `--accent-strong` text.

---

## 3. Typography

Self-hosted variable fonts (latin subset), preloaded.

| Role | Family | Notes |
|----------|--------------------|---------------------------------------|
| Sans | Inter var (100–900) | Everything except code/meta |
| Mono | JetBrains Mono var (100–800) | Code, eyebrows, kbd, card meta |

### Type scale (fluid)

| Style | Size | Weight | Tracking | Line |
|------------|---------------------------------|------------------|------|
| Display | `clamp(2.6rem, 4vw + 1rem, 4rem)` | 800 | −0.035em | 1.05 |
| H1 | `clamp(2.2rem, 3vw + 1rem, 3rem)` | 750 | −0.03em | 1.1 |
| H2 | `clamp(1.6rem, 2vw + .8rem, 2.1rem)` | 700 | −0.02em | 1.2 |
| H3 | `1.3rem` | 650 | −0.01em | 1.3 |
| Body | `1rem` | 400 | −0.006em | 1.65 |
| Small | `0.875rem` | 400 | 0 | 1.5 |
| Eyebrow | `0.75rem` mono | 550 | +0.12em, caps | 1 |
| Kbd/meta | `0.7rem` mono | 500 | +0.06em, caps | 1 |

Rules:

- Headlines are **sentence case, tight-tracked Inter**. No uppercase outside
  mono eyebrows/meta labels.
- The hero headline uses a **green gradient** (`#0b7a4e → #109a62` light,
  `#4ade80 → #86efac` dark); both endpoints clear 3:1 for large text.
- Body copy uses `--text`, never `--text-muted`.
- Prose measure caps at ~70ch.

---

## 4. Space, shape, elevation

### Spacing
4px base grid; component rhythm uses 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64.
Sections breathe at `4.5rem` vertical padding; content max-width `1120px`.

### Radius

| Token | Value | Used for |
|----------|--------|----------------------------------|
| `--radius-sm` | `8px` | Inputs, badges, small controls |
| `--radius` | `12px` | Buttons, code blocks, dropdowns |
| `--radius-lg` | `16px` | Cards, callouts, hero card |
| `--radius-xl` | `24px` | Modals, feature panels |
| pill | `999px` | Nav active states, tags chips |

### Elevation

| Token | Value (light) |
|----------|----------------------------------------------|
| `--shadow-sm` | `0 1px 2px rgba(16,31,24,.06)` |
| `--shadow-md` | `0 2px 4px rgba(16,31,24,.05), 0 10px 28px -10px rgba(16,31,24,.16)` |
| `--shadow-lg` | `0 4px 8px rgba(16,31,24,.05), 0 28px 56px -16px rgba(16,31,24,.24)` |

Dark mode replaces shadow strength with lighter surfaces + a 1px top
inner-highlight on elevated chrome (`inset 0 1px 0 rgba(255,255,255,.04)`)
and accent-tinted glows on interactive hover.

---

## 5. Motion

| Token | Value |
|--------|----------------------------------------|
| `--ease` | `cubic-bezier(.2, 0, 0, 1)` |
| `--dur-fast` | `120ms` (color/opacity) |
| `--dur-med` | `180ms` (transforms, hovers) |
| `--dur-slow` | `240ms` (modals, page transitions) |

Hover lifts never exceed `translateY(-2px)`. Focus rings appear without
transition. Everything honors `prefers-reduced-motion: reduce` (global
kill-switch retained).

---

## 6. Components

### Button
- **Primary:** `--accent-strong` fill, `--accent-foreground` label, mono
  uppercase label at 0.78rem/+0.08em (technical signature), `--radius`,
  `--shadow-sm`. Hover: brighten + `translateY(-1px)` + accent glow. Active:
  pressed (`translateY(0)`).
- **Ghost:** transparent, 1.5px `--accent` border, accent text. Hover fills
  with `--accent-soft`.

### Badge / pill
Rounded `--radius-sm`, `--accent-soft` fill, `--accent-strong` text, mono
0.7rem caps. Tags on cards render as these pills.

### Card
`--surface` on `--bg`, 1px `--border`, `--radius-lg`, `--shadow-sm`.
A 1px gradient hairline crowns the top edge (accent → transparent).
Hover: `--border-strong`, `--shadow-md`, `translateY(-2px)`, glow halo.
Card titles: H3 sans; meta row: mono 0.75rem caps `--text-muted`.

### Hero
Aurora-backed, display-gradient headline, muted supporting copy, button pair
(primary + ghost), and a portrait card with the standard card treatment.

### Header (chrome)
Sticky, frosted glass: `color-mix(--bg 78%, transparent)` +
`backdrop-filter: blur(14px) saturate(1.4)`, 1px bottom hairline. Nav links
are quiet mono labels; the active route sits in an `--accent-soft` pill with
`--accent-strong` text.

### Callout
`--accent-soft` tinted surface, 1px `--border`, `--radius-lg`, accent left
rule (3px), mono title.

### Code block
Always-dark `--code-bg` panel, `--radius`, language label chip and copy
button float on the surface; line numbers in a recessed
`color-mix(--code-bg 80%, black)` sidebar.

### Forms / controls
Inputs: `--bg-muted` fill, 1px `--border`, `--radius-sm`; focus ring 2px
`--accent` + offset. Icon buttons (share, copy, scroll-top): 36px squares,
`--radius-sm`, quiet until hover (accent border + text).

### Terminal (404)
Kept as the site's one playful moment, retuned to Evergreen: deep green-black
glass (`#07120c`), mint `--accent` prompt glow, standard buttons below.

---

## 7. Interaction states

| State | Treatment |
|--------|-----------------------------------------------|
| Hover | Accent tint or 1-step elevation + lift |
| Focus | **2px `--accent` outline, 2px offset** — never removed |
| Active | Pressed: translate reset, darkened fill |
| Current page | Nav pill (see Header) |
| Visited card | `✓` in `--accent` after title |

`:focus:not(:focus-visible)` resets the outline for pointer users; keyboard
users always get the ring.

---

## 8. Theming

- Default follows `prefers-color-scheme`; the toggle stamps
  `data-theme="{light|dark}"` on `<html>` and persists in `localStorage`.
- `color-scheme` is set per theme so form controls and scrollbars match.
- `theme-color` meta ships both media variants (light `#f6f9f4`, dark
  `#0b1510`).
- Print: monochrome fallback (black on white, no chrome) — unchanged.

---

## 9. Accessibility contract

Every default-state pair is machine-verified against WCAG 2.1 AA
(`docs/design-system.md` §2.2 values):

- Text on bg/surface/elevated: **≥ 7:1** both themes
- Muted text: **≥ 5.5:1** (light) / **≥ 7.6:1** (dark)
- Links on any surface: **≥ 5:1**
- Button label on fill: **≥ 5.6:1** (light) / **≥ 9.5:1** (dark)
- Non-text accents (borders, icons, rings): **≥ 3:1**
- Gradient-text endpoints: **≥ 3:1** (large text only)

Non-negotiables: visible focus rings, reduced-motion kill-switch, skip-link,
sr-only utilities, `aria-current` for nav — all retained from the previous
system.

---

## 10. Implementation map

| Concern | Where |
|-------------------------|--------------------------------------------|
| Tokens + all components | `src/styles.css` (single stylesheet) |
| Styleguide route | `src/routes/design.tsx` (`/design`, noindex) |
| theme-color meta | `src/routes/__root.tsx` |
| OG images | `scripts/generate-post-og-images.mjs` |
| Lighthouse shots | `scripts/generate-screenshots.mjs` |

When changing any token: update `styles.css`, this doc, and re-run the
contrast check for affected pairs. Never hardcode hex in components — the
two legacy exceptions (select-chevron data-URI, terminal window chrome) are
theme-scoped inside `styles.css` on purpose.
