# AutoWarehouse Website — Design Spec

**Date:** 2026-04-08
**Status:** Approved
**Target:** autowarehouse.github.io

## 1. Overview

Marketing website for AutoWarehouse — an AI-powered Data Warehouse Automation Platform. The site tells the end-to-end pipeline story (Connect → Model → Map → Execute → Analyze) while providing deep-dive feature pages for technical audiences.

**Key decisions:**

- **Target audience:** Mixed (Technical Decision Makers + Business Stakeholders)
- **Content architecture:** Hybrid — pipeline journey on home + feature deep-dive pages
- **Visual style:** Gradient Modern (dark base, blue-purple gradients, glassmorphism)
- **CTA strategy:** Hybrid — "Explore Platform" (technical) + "Request Demo" (business)
- **i18n:** English only at launch, Astro i18n routing infrastructure ready for Turkish

## 2. Pages & Sitemap

9 pages organized into 4 categories:

### Home (`/`)
Scroll-triggered pipeline journey with 7 sections:
1. **Hero** — "From Source to Insight, Automatically" + gradient orbs + dual CTA buttons
2. **Pipeline Overview** — 5-step visual bar (Connect → Model → Map → Execute → Analyze), each step with its own color
3. **Connect** — 3 source pillars: Databases (PG, MySQL, Oracle, MSSQL, MongoDB), Documents (PDF, Word → CVs, invoices, contracts, reports), Spreadsheets (Excel, CSV)
4. **Model** — Industry template gallery: HRDM (Ready), TDM (Coming), FDM (Coming), Custom. 3-layer architecture (Foundation → Analytical → Semantic)
5. **Map** — "AI Maps, You Approve" — mapping preview with source→target column visualization + Approve button. Emphasis on transparency
6. **Execute** — "Run It Your Way" dual-mode cards side by side:
   - **Agentic ETL Engine** (BUILT-IN): 5-phase wizard, DAG parallel execution, quality gates, SCD Type 2
   - **Code Generation** (EXPORT): Airflow DAGs, dbt Models, SQL Scripts, Spark Jobs, Snowflake
   - Bottom tagline: "You're always in control. AutoWarehouse designs the pipeline — you decide how and where it runs."
7. **CTA Footer** — "Design the pipeline with AI. Run it your way." + dual CTA

### Platform (`/platform`)
Architecture & technical depth for developer audience:
- Animated data flow architecture diagram
- Tech stack grid (Next.js 16, LangGraph, Drizzle ORM, PostgreSQL, etc.)
- Multi-tenant & RBAC overview
- Security features (AES-256-GCM, OIDC, JWT)
- Deployment options (Docker Compose, self-hosted)
- Integration capabilities (MCP, APIs)

### Feature Pages (`/features/[slug]`)
5 feature pages, each following a shared template with pipeline step color:

**Source Connectors** (`/features/source-connectors`) — Step 1, color: blue
- 3 pillars: Databases, Documents (AI entity extraction), Spreadsheets & Files
- Shared capabilities: Schema Profiling, AI Classification, Encrypted Credentials, Data Dictionary, Raw DB Studio

**Data Model Engine** (`/features/data-model-engine`) — Step 2, color: purple
- Industry template gallery (HRDM, TDM, FDM, Custom)
- 3-layer architecture (Foundation → Analytical → Semantic)
- Visual ER diagram editor preview
- Star schema, SCD Type 2, naming conventions

**Intelligent Mapping** (`/features/intelligent-mapping`) — Step 3, color: pink
- 3-panel mapping editor preview
- AI suggestion with reasoning
- Heuristic + LLM dual approach
- Validation rules, coverage report, human approval workflow

**ETL Engine** (`/features/etl-engine`) — Step 4, color: green
- Dual mode: Agentic Engine + Code Export
- 5-phase wizard (Analyze → Map → Build → Execute → Report)
- Mission Control UI preview
- Export targets: Airflow, dbt, SQL, Spark, Snowflake
- DAG-based parallel execution, quality gates

**Analytics & Dashboards** (`/features/analytics`) — Step 5, color: yellow
- NL-to-SQL chatbot conversation demo
- Auto-chart suggestion (bar, line, pie, KPI)
- Dashboard builder with widget grid
- Saved reports, cross-session memory

### Conversion Pages

**Pricing** (`/pricing`)
- "Contact us" enterprise pricing (no public tiers)
- Feature comparison table placeholder
- Self-hosted vs Managed options
- FAQ section
- CTA: "Request a tailored quote"

**Contact** (`/contact`)
- Demo request form (name, email, company, use case)
- Company info (Intellica)
- GitHub link for technical audience

### Feature Page Template
Each feature page follows this structure:
1. Hero with pipeline step badge + color
2. Visual content (screenshot/animation/diagram) + explanation side by side
3. Key capabilities chips
4. "Next step →" CTA linking to next pipeline stage (creates guided tour)

### Navigation
- Logo: "Auto**Warehouse**" with gradient on "Warehouse"
- Items: Platform | Features (dropdown with 5 items + colors) | Pricing | Docs (external)
- Right side: GitHub star link + "Request Demo" gradient button

## 3. Visual Design System

### Theme: Gradient Modern
- Dark base with blue-purple gradient orbs
- Glassmorphism cards (translucent backgrounds, blur, subtle borders)
- Each pipeline step has a unique color

### Colors
```css
/* Base */
--bg-primary: #0f172a;
--bg-secondary: #0d1117;
--bg-card: rgba(255,255,255,0.02);
--border-subtle: rgba(255,255,255,0.06);

/* Text */
--text-primary: #ffffff;
--text-secondary: #94a3b8;
--text-muted: #64748b;

/* Accent */
--accent-blue: #3b82f6;
--accent-purple: #7c3aed;
--gradient-primary: linear-gradient(90deg, #3b82f6, #7c3aed);
--gradient-orb-blue: radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%);
--gradient-orb-purple: radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%);

/* Pipeline Step Colors */
--step-connect: #3b82f6;    /* blue */
--step-model: #8b5cf6;      /* purple */
--step-map: #ec4899;        /* pink */
--step-execute: #22c55e;    /* green */
--step-analyze: #eab308;    /* yellow */
```

### Typography
- Headings: Inter or system font stack, weight 700-800
- Body: 14-16px, weight 400, line-height 1.6
- Code/monospace: JetBrains Mono or system monospace
- Pipeline labels: 10-11px, uppercase, letter-spacing 2px

### Components
- **Gradient button**: `linear-gradient(90deg, blue, purple)` with border-radius 8px
- **Ghost button**: transparent bg, subtle white border
- **Card**: translucent bg, 1px subtle border, border-radius 12px
- **Badge**: small pill with step color background, uppercase text
- **Stats card**: glassmorphism, gradient number, muted label

## 4. Technical Architecture

### Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| Astro | 6.1.x | Static site framework, SSG |
| Tailwind CSS | 4.2.x | Utility-first CSS via `@tailwindcss/vite` |
| Vite | 7 | Bundled with Astro 6 |
| Node.js | 22.12+ | Astro 6 requirement |
| MDX | @astrojs/mdx | Rich content for feature pages |
| Sitemap | @astrojs/sitemap | Auto-generated sitemap.xml |

### Project Structure
```
autowarehouse.github.io/
├── src/
│   ├── components/
│   │   ├── layout/              # Header, Footer, Navigation, MobileMenu
│   │   ├── ui/                  # Button, Card, Badge, GradientOrb, PipelineBar
│   │   ├── home/                # HeroSection, PipelineOverview, ConnectSection,
│   │   │                        # ModelSection, MapSection, ExecuteSection,
│   │   │                        # AnalyzeSection, CTAFooter
│   │   ├── features/            # FeatureHero, CapabilityGrid, NextStepCTA
│   │   └── common/              # ContactForm, StatsRow, TechStackGrid
│   ├── content/
│   │   └── features/            # MDX content per feature (if needed)
│   ├── content.config.ts        # Content Layer API config with glob() loader
│   ├── layouts/
│   │   ├── BaseLayout.astro     # HTML head, meta, OG, fonts, theme
│   │   ├── PageLayout.astro     # Nav + Footer wrapper
│   │   └── FeatureLayout.astro  # Feature page template with step color
│   ├── pages/
│   │   ├── index.astro          # Home — pipeline journey
│   │   ├── platform.astro
│   │   ├── pricing.astro
│   │   ├── contact.astro
│   │   └── features/
│   │       ├── source-connectors.astro
│   │       ├── data-model-engine.astro
│   │       ├── intelligent-mapping.astro
│   │       ├── etl-engine.astro
│   │       └── analytics.astro
│   ├── i18n/
│   │   └── en.json              # English UI strings
│   ├── styles/
│   │   └── global.css           # Tailwind imports + CSS custom properties
│   └── assets/                  # Images, icons, diagrams
├── public/
│   ├── og/                      # Open Graph images per page
│   └── favicon.svg
├── .github/
│   └── workflows/
│       └── deploy.yml           # withastro/action@v6 → GitHub Pages
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### Astro Configuration
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://autowarehouse.github.io',
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    // Future: add 'tr' locale
  },
});
```

### Animations
- **Pipeline scroll**: CSS scroll-driven animations (native, zero-JS)
- **Page transitions**: `<ClientRouter />` (Astro 6 API, replaces ViewTransitions)
- **Scroll reveal**: CSS `animation-timeline: view()` for section fade-ins
- **Gradient orbs**: CSS `@keyframes` for subtle floating motion
- **Fallback**: Graceful degradation for older browsers (static content, no animation)

### Deployment
- **GitHub Actions**: `.github/workflows/deploy.yml` with `withastro/action@v6`
- **Trigger**: Push to `main` branch
- **Output**: Static HTML/CSS/JS → GitHub Pages at `autowarehouse.github.io`

### SEO
- Per-page `<title>`, `<meta description>`, Open Graph images
- Structured data (JSON-LD) for SoftwareApplication schema
- Sitemap.xml via `@astrojs/sitemap`
- Canonical URLs
- Semantic HTML (proper heading hierarchy, landmarks)

### Forms
- Contact/demo form: Formspree (free tier, static form service)
- No backend required — GitHub Pages compatible

### Analytics
- Privacy-first analytics (Plausible or Umami)
- No cookie banner required (GDPR-compliant by design)

## 5. Key Messaging

### Tagline
"From Source to Insight, Automatically"

### Sub-tagline
"Design the pipeline with AI. Run it your way."

### Core messages
1. **Industry-agnostic**: "Pre-built data models for HR, Telecom, Finance — or build your own"
2. **AI + Human control**: "AI Maps, You Approve" — every step is transparent
3. **Dual execution**: "Run within AutoWarehouse or export to Airflow, dbt, Spark, Snowflake"
4. **Full pipeline**: "Connect → Model → Map → Execute → Analyze — one platform"
5. **Self-hosted**: "Deploy on your infrastructure. No cloud lock-in."

### Pipeline step colors convey progression:
Blue (connect) → Purple (model) → Pink (map) → Green (execute) → Yellow (analyze)

## 6. Content Strategy

### Day 1 content
- All 9 pages with full copy
- Architecture diagram for Platform page
- Mockup screenshots or wireframe illustrations for feature pages
- OG images per page

### Future additions (not in scope for v1)
- Blog section
- Changelog / Roadmap page
- Case studies
- Video walkthroughs
- Turkish language content
- Community / Contributors page
