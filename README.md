# AutoWarehouse.ai

Marketing website for **AutoWarehouse** — an AI-powered Data Warehouse Automation Platform.

**Live:** [autowarehouse.ai](https://autowarehouse.ai)

## Overview

AutoWarehouse automates the entire data warehouse lifecycle: connect any data source, apply industry data models, let AI agents map and build your ETL pipeline, and query results with natural language. This website tells that story through a scroll-driven pipeline journey.

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Pipeline journey: Connect → Model → Map → Execute → Analyze |
| Platform | `/platform` | Architecture, tech stack, security, deployment |
| Source Connectors | `/features/source-connectors` | Databases, documents, spreadsheets |
| Data Model Engine | `/features/data-model-engine` | Industry templates (HRDM, TDM, FDM, Custom) |
| Intelligent Mapping | `/features/intelligent-mapping` | AI-powered column mapping |
| ETL Engine | `/features/etl-engine` | Agentic ETL + code export (Airflow, dbt, SQL, Spark, Snowflake) |
| Analytics | `/features/analytics` | NL-to-SQL chatbot + dashboard builder |
| Pricing | `/pricing` | Enterprise pricing, FAQ |
| Contact | `/contact` | Demo request form (Formspree) |

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Astro](https://astro.build) | 6.1 | Static site framework (SSG) |
| [Tailwind CSS](https://tailwindcss.com) | 4.2 | Utility-first CSS via `@tailwindcss/vite` |
| [MDX](https://mdxjs.com) | @astrojs/mdx | Rich content support |
| Node.js | 22.12+ | Runtime |
| pnpm | 9.15.4 | Package manager |

## Getting Started

### Prerequisites

- Node.js 22.12 or higher
- pnpm 9.x

### Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
# → http://localhost:4321

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer (shared navigation)
│   ├── ui/              # Button, Card, Badge, GradientOrb, PipelineBar, SectionHeading
│   ├── home/            # 7 scroll sections: Hero, Connect, Model, Map, Execute, Analyze, CTA
│   ├── features/        # FeatureHero, CapabilityGrid, NextStepCTA
│   └── common/          # ContactForm, TechStackGrid
├── data/
│   ├── pipeline.ts      # 5 pipeline steps with colors, icons, routes
│   ├── navigation.ts    # Nav items + features dropdown
│   └── features.ts      # Feature page metadata (title, capabilities, step color)
├── layouts/
│   ├── BaseLayout.astro     # HTML head, meta, OG, fonts
│   ├── PageLayout.astro     # Header + content + Footer
│   └── FeatureLayout.astro  # Feature page template with step badge + capabilities
├── pages/
│   ├── index.astro          # Home (pipeline journey)
│   ├── platform.astro
│   ├── pricing.astro
│   ├── contact.astro
│   └── features/            # 5 feature deep-dive pages
└── styles/
    └── global.css           # Tailwind + CSS custom properties + animations
```

## Design System

**Theme:** Gradient Modern — dark base (`#0f172a`) with blue-purple gradient accents and glassmorphism cards.

**Pipeline step colors:**

| Step | Color | Hex |
|------|-------|-----|
| Connect | Blue | `#3b82f6` |
| Model | Purple | `#8b5cf6` |
| Map | Pink | `#ec4899` |
| Execute | Green | `#22c55e` |
| Analyze | Yellow | `#eab308` |

**Key CSS classes:**
- `.gradient-text` — Blue-to-purple gradient text
- `.gradient-bg` — Blue-to-purple gradient background
- `.glass-card` — Translucent card with blur backdrop
- `.reveal` — Scroll-triggered fade-in animation (CSS scroll-driven, zero JS)
- `.orb` — Floating gradient orb animation

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on push to `main`.

**Workflow:** `.github/workflows/deploy.yml` uses `withastro/action@v6`

**Custom domain:** `autowarehouse.ai` via Cloudflare DNS → GitHub Pages

### DNS Configuration

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   autowarehouse.github.io
```

## i18n

English only at launch. Astro i18n routing is configured and ready for additional locales (Turkish planned).

```javascript
// astro.config.mjs
i18n: {
  locales: ['en'],
  defaultLocale: 'en',
}
```

## Adding Content

### New feature page

1. Add entry to `src/data/features.ts`
2. Create `src/pages/features/[slug].astro` using `FeatureLayout`
3. Update the previous feature's `nextStep` to link to the new page

### Modifying pipeline steps

Edit `src/data/pipeline.ts` — colors, labels, and routes propagate to PipelineBar, Header dropdown, and all feature pages automatically.

## License

Proprietary. Copyright Intellica.
