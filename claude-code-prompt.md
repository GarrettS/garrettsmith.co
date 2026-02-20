# garrettsmith.co — Claude Code Iteration Prompt

## Context

This is a static personal training website for Garrett Smith. The current working version is `preview-v4.html` (single-file preview with inline CSS). The production site will split into separate files: `index.html`, `styles.css`, `articles/index.html`, and `articles/androgen-overclocking/index.html`.

Strategic decisions are made elsewhere. This task is execution: layout, styling, and file structure.

## Current State

v4 is a single HTML file with inline `<style>`. It has:
- Fluid typography via `clamp()` CSS variables
- `prefers-color-scheme: dark` media query
- A two-column hero with a photo placeholder (dashed border box)
- Four "How I Work" items in a 2×2 grid
- Three service cards in a 3-column grid
- A CTA band, contact section, and footer
- Google Fonts `@import` (must be removed for production)

## Tasks

### 1. Remove Hero Photo Column

The photo placeholder creates a ~200px dead space gap because the text block is shorter than the 3:4 placeholder. No professional photo exists yet. Remove the photo column entirely.

Make the hero full-width text. Layout should be:
- `PERSONAL TRAINING & HEALTH OPTIMIZATION` (label)
- `Garrett Smith` (h1)
- Positioning statement (italic serif)
- Credential strip: `NASM CPT 7 · Mountain View, CA · Mobile Training`

The credential strip currently uses `margin-top: auto` to push to the bottom of a flex column that matched the photo height. Without the photo column, rework this. The strip should sit directly below the positioning statement with modest spacing — not floating at the bottom of a tall container.

Hero should feel like a confident text-only opening, not a layout missing an image. When professional photos arrive later, the photo column will be re-added — design the hero so that swap is easy (keep the photo-related CSS commented out, not deleted).

### 2. Self-Hosted Fonts

Remove the Google Fonts `@import` line entirely.

Add `@font-face` declarations for:
- **Newsreader**: Regular (400), Medium (500), Italic (400 italic)
- **DM Sans**: Regular (400), Medium (500), SemiBold (600)

Font files will be placed in `/fonts/` directory. Use this pattern:

```css
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf') format('truetype');
  font-weight: 400 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf') format('truetype');
  font-weight: 400 600;
  font-style: italic;
  font-display: swap;
}
```

Match filenames to whatever is in the `/fonts/` directory. If `.woff2` versions exist, prefer those with `.ttf` fallback. If only `.ttf` exists, use that alone.

### 3. Tighten Remaining Gaps

v4 still has excessive vertical spacing in several places. The principle: content should flow as a continuous page, not isolated sections floating in space.

Specific areas to compress:
- **Nav → Hero transition**: Nav bottom padding should be near-zero. Hero top padding should be minimal. The label "PERSONAL TRAINING & HEALTH OPTIMIZATION" should feel like it starts right under the nav.
- **Hero bottom → "How I Work" section**: The credential strip should be the last thing before the section border. Minimal padding between the strip and the border, minimal padding between the border and the "HOW I WORK" label.
- **Section label → heading → content**: The vertical stack of label, heading, and first grid row should be tight. Currently there's visible air between "HOW I WORK" label, "Training built on understanding" heading, and the first grid items.
- **Between grid rows**: The 2×2 approach grid and the 3-column service grid should have modest but not generous gaps.
- **CTA band**: Padding above and below should be compact.
- **Contact section**: Same — tight.
- **Footer**: Minimal.

Do not make the page feel cramped. But err on the side of tight. It's easier to add breathing room than to diagnose where 200px of mystery space lives.

### 4. Split Into Production Files

Separate the single-file preview into:

```
/
├── index.html          (homepage)
├── styles.css          (shared stylesheet)
├── fonts/              (font files — already placed by Garrett)
├── articles/
│   ├── index.html      (article listing page)
│   └── androgen-overclocking/
│       └── index.html  (article page — content placeholder for now)
```

**`styles.css`**: All CSS extracted from the `<style>` block, plus `@font-face` declarations. This file is linked from every HTML page.

**`index.html`**: Homepage. Links to `/styles.css`. No inline styles except truly page-specific overrides (there shouldn't be any).

**`articles/index.html`**: Article listing page. Same nav and footer as homepage. Content:
- "Articles" label
- "Writing" h1
- Description: "Mechanistic breakdowns of training science, hormone optimization, and human performance. The same depth I bring to client work, in long form."
- One article entry:
  - Date: "2026"
  - Title (linked): "Androgen Overclocking" → `/articles/androgen-overclocking/`
  - Description: "A four-supplement protocol for natural androgen optimization. Covers enzymatic shielding via aromatase modulation, the inositol paradox, SHBG competing pathways, and why every DCI study in men has the same critical data gap."

**`articles/androgen-overclocking/index.html`**: Article page wrapper. Same nav and footer. Content is a placeholder for now — the full article (from `protocol.html`) will be migrated later as a separate task. Include style overrides for article-specific elements: `.protocol-box`, `.guardrails`, `.labs`, `figure`, `figcaption`, `table` — these exist in `protocol.html` and will need to render correctly when the content is dropped in. Put those overrides in a `<style>` block on the article page or in a section of `styles.css`.

### 5. Copy Change

In the contact section, change:
```
Mountain View, CA — serving a 12-mile radius.
```
to:
```
Mountain View, CA — and nearby areas.
```

Also appears in the CTA band — verify and update there too if present. The CTA band currently says "Mountain View + 12-mile radius" — change to "Mountain View and nearby areas".

### 6. Dark Mode Verification

After splitting files, verify `prefers-color-scheme: dark` still works correctly across all pages. The dark palette:
- Background: `#141210`
- Alt background: `#1c1a17`
- Text: `#e8e5de`
- Secondary text: `#9a9590`
- Accent: `#d4944a`
- Borders: `#2e2b26` / `#252320`

Service card borders, CTA band background, section borders, and the credential strip border should all look correct in dark mode.

## Positioning Statement (Do Not Change)

> "I teach you how your body works — then build your training around what we find. Functional mobility, corrective exercise, and custom programming matched to your movement patterns. The depth of a specialist, without the referral."

This is locked. Do not edit.

## Design Principles

- Professional and credible without clinical
- Editorial warmth, not sterile corporate
- Fonts: Newsreader (serif) for headings and the positioning statement; DM Sans for body and UI text
- Palette: warm off-white (`#faf9f6`), near-black text (`#1a1a1a`), bronze/amber accent (`#b5793a`)
- No stock photos, no generic fitness language, no hype
- The page should feel crafted, not generated
- Mobile-responsive

## What NOT to Add

- Published rates or pricing
- Intake forms or data collection (Singular Fitness handles that)
- SEO meta tags, GMaps, analytics scripts
- JavaScript (unless strictly necessary for a specific feature)
- Scheduling system, client portal, testimonials
- Any Google-hosted resources (fonts, analytics, CDNs)

## Credentials to Display

- NASM CPT 7 (footer and credential strip)
- Do NOT list PRI Pelvis Restoration yet (course is Feb 21-22, 2026 — list after completion)
- Do NOT list SMHP (not obtained)

## CTA Behavior

All "Get in Touch" / "Contact" buttons should be `mailto:garrett@garrettsmith.co`. This is a slot — it will later be swapped to `app.garrettsmith.co/intake` when Singular Fitness is live. Keep it as a single link target that's easy to find-and-replace across all pages.

## After Completing These Tasks

Show Garrett the result. Remaining work (separate future tasks):
- Download and place font files in `/fonts/`
- Migrate `protocol.html` article content into the article wrapper
- Add professional photos when available (re-add hero photo column)
- Deploy to hosting (Netlify, Vercel, or similar static host)
- Set up `app.garrettsmith.co` subdomain routing for Singular Fitness