# AutoWarehouse Website — Project Context

**Last updated:** 2026-04-08
**Version:** 0.1.0
**Domain:** https://autowarehouse.ai
**Repo:** autowarehouse.github.io
**Path:** `/home/cevheri/projects/intellica/autowarehouse.github.io`

---

## What Is This?

Marketing website for **AutoWarehouse** — an AI-powered Data Warehouse Automation Platform built by **Intellica** (www.intellica.net). The platform automates the entire DWH lifecycle using AI agents. The website tells this story through an animated pipeline journey.

AutoWarehouse is **industry-agnostic** — not an HR tool. HRDM (Human Resources Data Model) is just the first template. TDM (Telecom), FDM (Finance), and custom models are planned. The platform has two ETL execution modes: a built-in Agentic ETL Engine and Code Generation (export to Airflow, dbt, SQL, Spark, Snowflake). The messaging emphasizes **user control** — "AI designs, you decide."

## Current State (2026-04-08)

**Status:** v0.1.0 — all 9 pages built, deployed to GitHub Pages, custom domain configured.

**What's done:**
- 9 pages fully implemented and building (849ms build time)
- Gradient Modern visual theme (dark base, blue-purple gradients, glassmorphism)
- Scroll-reveal animations (CSS scroll-driven, zero JS)
- Brand logo/favicon set integrated (brain/node icon)
- GitHub Actions auto-deploy on push to `main`
- Custom domain `autowarehouse.ai` configured (Cloudflare DNS → GitHub Pages)
- Sitemap auto-generated via @astrojs/sitemap
- i18n routing infrastructure ready (English only, Turkish planned)

**What's NOT done yet (future scope):**
- Formspree form ID not set (placeholder `YOUR_FORM_ID` in ContactForm.astro)
- No OG images per page (public/og/ directory is empty)
- No blog section
- No changelog/roadmap page
- No Turkish content
- No analytics (Plausible/Umami not integrated)
- Screenshots/diagrams for feature pages are text-based mockups, not real product screenshots
- `full-logo.png` is in `src/assets/images/` but not used in pages (header uses icon + styled text)

## Tech Stack

| Technology | Version | Notes |
|-----------|---------|-------|
| Astro | 6.1.4 | SSG, `astro.config.mjs` |
| Tailwind CSS | 4.2.2 | Via `@tailwindcss/vite` (NOT @astrojs/tailwind — deprecated) |
| MDX | @astrojs/mdx 5.0.3 | Installed, ready for use |
| Sitemap | @astrojs/sitemap 3.7.2 | Auto-generates sitemap-index.xml |
| Node.js | 24 (CI) / 22.12+ (min) | `engines` in package.json |
| pnpm | 9.15.4 | `packageManager` field in package.json |
| Vite | 7 | Bundled with Astro 6 |

## Architecture

### Pages (9 total)

```
/                              → Home: 7-section scroll pipeline journey
/platform                      → Architecture, tech stack, security, deployment
/features/source-connectors    → Step 1: Databases + Documents + Spreadsheets
/features/data-model-engine    → Step 2: Industry templates (HRDM, TDM, FDM, Custom)
/features/intelligent-mapping  → Step 3: AI column mapping with approval
/features/etl-engine           → Step 4: Agentic ETL + Code Export dual mode
/features/analytics            → Step 5: NL-to-SQL chatbot + dashboards
/pricing                       → Enterprise pricing, FAQ
/contact                       → Demo request form (Formspree)
```

### File Structure

```
src/
├── components/
│   ├── layout/          # Header.astro, Footer.astro
│   ├── ui/              # Button, Card, Badge, GradientOrb, PipelineBar, SectionHeading
│   ├── home/            # HeroSection, ConnectSection, ModelSection, MapSection,
│   │                    # ExecuteSection, AnalyzeSection, CTAFooter
│   ├── features/        # FeatureHero, CapabilityGrid, NextStepCTA
│   └── common/          # ContactForm, TechStackGrid
├── data/                # pipeline.ts, navigation.ts, features.ts
├── layouts/             # BaseLayout, PageLayout, FeatureLayout
├── pages/               # 9 .astro page files
└── styles/              # global.css (Tailwind + CSS custom properties)
```

### Data-Driven Architecture

Content is not hardcoded in pages. Three data files drive the entire site:

- **`src/data/pipeline.ts`** — 5 pipeline steps (id, label, icon, color, href). Used by PipelineBar, Header dropdown, home page sections.
- **`src/data/navigation.ts`** — Nav items. Features dropdown is auto-generated from pipeline steps.
- **`src/data/features.ts`** — Feature page metadata (slug, stepNumber, stepLabel, color, title, description, capabilities[], nextStep). Used by FeatureLayout and all 5 feature pages.

To add a new feature page: add entry to `features.ts`, create the `.astro` page, update previous page's `nextStep`.

### Layout Hierarchy

```
BaseLayout.astro          → HTML head, meta, OG, fonts, global.css
  └── PageLayout.astro    → Header + <slot> + Footer
        └── FeatureLayout.astro → FeatureHero + <slot> + CapabilityGrid + NextStepCTA
```

### Home Page Sections (scroll order)

1. **HeroSection** — Tagline + gradient orbs + dual CTA (Explore Platform / Request Demo)
2. **PipelineBar** — 5-step horizontal bar (Connect → Model → Map → Execute → Analyze)
3. **ConnectSection** — Step 1: 3 source pillars (Databases, Documents, Spreadsheets)
4. **ModelSection** — Step 2: Template gallery (HRDM ready, TDM/FDM coming, Custom)
5. **MapSection** — Step 3: AI mapping preview with source→target columns + Approve
6. **ExecuteSection** — Step 4: Dual-mode (Agentic built-in / Code Export)
7. **AnalyzeSection** — Step 5: Chatbot conversation mockup + chart
8. **CTAFooter** — "Design the pipeline with AI. Run it your way."

## Design System

### Theme: Gradient Modern

Dark backgrounds, blue-purple gradient accents, glassmorphism cards, scroll-reveal animations.

### CSS Custom Properties (defined in `src/styles/global.css`)

```css
--bg-primary: #0f172a;       --bg-secondary: #0d1117;
--text-primary: #ffffff;      --text-secondary: #94a3b8;     --text-muted: #64748b;
--accent-blue: #3b82f6;       --accent-purple: #7c3aed;
--step-connect: #3b82f6;      /* blue */
--step-model: #8b5cf6;        /* purple */
--step-map: #ec4899;          /* pink */
--step-execute: #22c55e;      /* green */
--step-analyze: #eab308;      /* yellow */
```

### Key CSS Classes

- `.gradient-text` — Blue→purple gradient on text
- `.gradient-bg` — Blue→purple gradient background (buttons)
- `.glass-card` — Translucent bg + subtle border + backdrop blur
- `.reveal` — CSS scroll-driven fade-in (zero JS, graceful fallback)
- `.orb` — Floating gradient decorative circle

### Typography

- Headings: Inter, weight 700-800
- Body: Inter, 14-16px, weight 400
- Monospace: JetBrains Mono
- Pipeline labels: 10-11px, uppercase, letter-spacing 2px
- Fonts loaded from Google Fonts in BaseLayout.astro

## Deployment

### GitHub Actions

`.github/workflows/deploy.yml`:
- Trigger: push to `main` or manual dispatch
- Uses: `actions/checkout@v6` → `withastro/action@v6` (node 24, pnpm 9.15.4) → `actions/deploy-pages@v5`
- Output: Static HTML/CSS/JS to GitHub Pages

### Custom Domain

`autowarehouse.ai` via Cloudflare DNS:

```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
CNAME www autowarehouse.github.io
```

Cloudflare proxy OFF (gray cloud) — GitHub Pages provides its own Let's Encrypt SSL.
`public/CNAME` file contains `autowarehouse.ai`.

### Brand Assets

```
public/
├── favicon.ico, favicon-16x16.png, favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png, android-chrome-512x512.png  ← brain/node logo icon
├── site.webmanifest
└── CNAME

src/assets/images/
└── full-logo.png  ← Full logo with icon + "AutoWarehouse.ai" text (not yet used in pages)

images/  ← Original source files (not deployed)
```

Header and Footer use `android-chrome-192x192.png` as the icon next to styled "Auto**Warehouse**" text.

## Key Design Decisions (from brainstorming session)

These decisions were made collaboratively and should be preserved:

1. **Target audience is mixed** — Technical (CTO, data engineers) + Business (HR directors, COO). Home page tells the business story, feature pages provide technical depth.

2. **Pipeline-journey narrative** — Home page is organized as Connect → Model → Map → Execute → Analyze scroll experience. Each step has its own color that carries through the entire site.

3. **Industry-agnostic positioning** — HRDM is just one template. TDM, FDM, and Custom are shown. Never position the product as "HR-only."

4. **Dual ETL execution messaging** — "Run It Your Way": Agentic built-in engine OR code export (Airflow, dbt, SQL, Spark, Snowflake). Emphasize user control: "AutoWarehouse designs the pipeline — you decide how and where it runs."

5. **Source connectors = 3 pillars** — Databases (5 types), Documents (PDF/Word → AI entity extraction for CVs, invoices, contracts, reports), Spreadsheets (Excel, CSV).

6. **CTA strategy is hybrid** — "Explore Platform" for technical audience, "Request Demo" for business audience. Both appear in hero and CTA footer.

7. **i18n-ready, English-first** — Astro i18n routing configured but only English content exists. Turkish can be added later by creating `/tr/` page variants.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Dev server → http://localhost:4321
pnpm build            # Production build → dist/
pnpm preview          # Preview production build
```

## Related Documents

- **Design Spec:** `docs/superpowers/specs/2026-04-08-autowarehouse-website-design.md`
- **Implementation Plan:** `docs/superpowers/plans/2026-04-08-autowarehouse-website-plan.md`
- **Main product repo:** `/home/cevheri/projects/intellica/querypeople` (AutoWarehouse platform)

## Session History

### 2026-04-08: Initial build (this session)

1. Brainstormed website design with visual companion (mockups in browser)
2. Made 5 key decisions: audience, sitemap, visual style, CTA strategy, i18n
3. Created design spec with full page wireframes
4. Researched latest tech versions (Astro 6.1, Tailwind 4.2, etc.)
5. Wrote 10-task implementation plan with full code
6. Executed all 10 tasks via subagent-driven development
7. Integrated brand favicon/logo set
8. Fixed GitHub Actions deploy (pnpm version, action versions, node 24)
9. Configured custom domain (autowarehouse.ai via Cloudflare)
10. Created README.md
