# AutoWarehouse Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 9-page marketing website for AutoWarehouse at autowarehouse.github.io using Astro 6, Tailwind CSS 4, deployed to GitHub Pages.

**Architecture:** Static site generated with Astro 6 SSG. Pages built from reusable Astro components. Home page is a scroll-triggered pipeline journey. 5 feature pages share a FeatureLayout template. Styling via Tailwind 4 + CSS custom properties for the Gradient Modern theme.

**Tech Stack:** Astro 6.1, Tailwind CSS 4.2 (`@tailwindcss/vite`), MDX (`@astrojs/mdx`), Sitemap (`@astrojs/sitemap`), GitHub Actions (`withastro/action@v6`), Formspree (contact form)

**Spec:** `docs/superpowers/specs/2026-04-08-autowarehouse-website-design.md`

---

## File Map

```
autowarehouse.github.io/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro          # Navigation bar with features dropdown + mobile menu
│   │   │   └── Footer.astro          # Site footer with links, company info
│   │   ├── ui/
│   │   │   ├── Button.astro          # Gradient + ghost variants
│   │   │   ├── Card.astro            # Glassmorphism card
│   │   │   ├── Badge.astro           # Pipeline step badge (color pill)
│   │   │   ├── GradientOrb.astro     # Floating gradient circle (decorative)
│   │   │   ├── PipelineBar.astro     # 5-step horizontal pipeline visualization
│   │   │   └── SectionHeading.astro  # Step label + title + description
│   │   ├── home/
│   │   │   ├── HeroSection.astro     # Main hero with tagline + dual CTA
│   │   │   ├── ConnectSection.astro  # 3-pillar source connectors
│   │   │   ├── ModelSection.astro    # Industry template gallery
│   │   │   ├── MapSection.astro      # AI mapping preview
│   │   │   ├── ExecuteSection.astro  # Dual-mode ETL cards
│   │   │   ├── AnalyzeSection.astro  # Chatbot + dashboard preview
│   │   │   └── CTAFooter.astro       # Final conversion section
│   │   ├── features/
│   │   │   ├── FeatureHero.astro     # Feature page hero with step badge
│   │   │   ├── CapabilityGrid.astro  # Grid of capability chips
│   │   │   └── NextStepCTA.astro     # "Next: [step] →" CTA
│   │   └── common/
│   │       ├── ContactForm.astro     # Formspree-powered form
│   │       └── TechStackGrid.astro   # Technology logos/names grid
│   ├── content/
│   │   └── features/                 # (reserved for future MDX content)
│   ├── data/
│   │   ├── navigation.ts             # Nav items, feature dropdown items
│   │   ├── pipeline.ts               # Pipeline steps with colors, icons, labels
│   │   └── features.ts               # Feature page metadata (title, description, step, color, capabilities)
│   ├── layouts/
│   │   ├── BaseLayout.astro          # HTML head, meta, OG, fonts, global CSS
│   │   ├── PageLayout.astro          # BaseLayout + Header + Footer
│   │   └── FeatureLayout.astro       # PageLayout + FeatureHero + CapabilityGrid + NextStepCTA
│   ├── pages/
│   │   ├── index.astro               # Home page — pipeline journey
│   │   ├── platform.astro            # Platform overview
│   │   ├── pricing.astro             # Enterprise pricing
│   │   ├── contact.astro             # Demo request form
│   │   └── features/
│   │       ├── source-connectors.astro
│   │       ├── data-model-engine.astro
│   │       ├── intelligent-mapping.astro
│   │       ├── etl-engine.astro
│   │       └── analytics.astro
│   └── styles/
│       └── global.css                # Tailwind imports + CSS custom properties + animations
├── public/
│   └── favicon.svg
├── .github/
│   └── workflows/
│       └── deploy.yml
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `public/favicon.svg`
- Create: `.github/workflows/deploy.yml`
- Modify: `.gitignore`

- [ ] **Step 1: Initialize Astro project**

```bash
cd /home/cevheri/projects/intellica/autowarehouse.github.io
pnpm create astro@latest . --template minimal --no-install --typescript strict
```

If prompted about overwriting, accept. This creates the minimal Astro skeleton.

- [ ] **Step 2: Install dependencies**

```bash
pnpm add astro@latest @astrojs/mdx @astrojs/sitemap
pnpm add -D @tailwindcss/vite tailwindcss
```

- [ ] **Step 3: Configure astro.config.mjs**

Replace the generated config with:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://autowarehouse.github.io',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
```

- [ ] **Step 4: Configure tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@data/*": ["src/data/*"]
    }
  }
}
```

- [ ] **Step 5: Update .gitignore**

```
node_modules/
dist/
.astro/
.superpowers/
```

- [ ] **Step 6: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="#0f172a"/>
  <text x="16" y="22" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="18" fill="url(#g)">A</text>
</svg>
```

- [ ] **Step 7: Create GitHub Actions deploy workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build with Astro
        uses: withastro/action@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 8: Verify project builds**

```bash
pnpm run build
```

Expected: Build succeeds, output in `dist/`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro 6 project with Tailwind, MDX, sitemap, deploy workflow"
```

---

## Task 2: Design System — Global Styles & Data

**Files:**
- Create: `src/styles/global.css`
- Create: `src/data/pipeline.ts`, `src/data/navigation.ts`, `src/data/features.ts`

- [ ] **Step 1: Create global CSS with Tailwind + custom properties**

Create `src/styles/global.css`:

```css
@import 'tailwindcss';

/* ── Theme Custom Properties ── */
:root {
  --bg-primary: #0f172a;
  --bg-secondary: #0d1117;
  --bg-card: rgba(255, 255, 255, 0.02);
  --border-subtle: rgba(255, 255, 255, 0.06);

  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  --accent-blue: #3b82f6;
  --accent-purple: #7c3aed;

  --step-connect: #3b82f6;
  --step-model: #8b5cf6;
  --step-map: #ec4899;
  --step-execute: #22c55e;
  --step-analyze: #eab308;
}

/* ── Base Styles ── */
html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
}

/* ── Gradient Utilities ── */
.gradient-text {
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-bg {
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
}

.glass-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(12px);
}

/* ── Scroll Reveal Animation ── */
@supports (animation-timeline: view()) {
  .reveal {
    animation: reveal-up linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }

  @keyframes reveal-up {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Fallback: no animation, just visible */
@supports not (animation-timeline: view()) {
  .reveal {
    opacity: 1;
  }
}

/* ── Gradient Orb Animation ── */
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(10px, -15px); }
  66% { transform: translate(-8px, 10px); }
}

.orb {
  animation: float 12s ease-in-out infinite;
  pointer-events: none;
}
```

- [ ] **Step 2: Create pipeline data**

Create `src/data/pipeline.ts`:

```typescript
export interface PipelineStep {
  id: string;
  label: string;
  icon: string;
  color: string;
  colorVar: string;
  href: string;
}

export const pipelineSteps: PipelineStep[] = [
  {
    id: 'connect',
    label: 'Connect',
    icon: '🔌',
    color: '#3b82f6',
    colorVar: 'var(--step-connect)',
    href: '/features/source-connectors',
  },
  {
    id: 'model',
    label: 'Model',
    icon: '📐',
    color: '#8b5cf6',
    colorVar: 'var(--step-model)',
    href: '/features/data-model-engine',
  },
  {
    id: 'map',
    label: 'Map',
    icon: '🧠',
    color: '#ec4899',
    colorVar: 'var(--step-map)',
    href: '/features/intelligent-mapping',
  },
  {
    id: 'execute',
    label: 'Execute',
    icon: '⚡',
    color: '#22c55e',
    colorVar: 'var(--step-execute)',
    href: '/features/etl-engine',
  },
  {
    id: 'analyze',
    label: 'Analyze',
    icon: '📊',
    color: '#eab308',
    colorVar: 'var(--step-analyze)',
    href: '/features/analytics',
  },
];
```

- [ ] **Step 3: Create navigation data**

Create `src/data/navigation.ts`:

```typescript
import { pipelineSteps } from './pipeline';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: 'Platform', href: '/platform' },
  {
    label: 'Features',
    href: '#',
    children: pipelineSteps.map((step) => ({
      label: `${step.icon} ${step.label}`,
      href: step.href,
    })),
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: 'https://github.com/autowarehouse/autowarehouse' },
];
```

- [ ] **Step 4: Create features data**

Create `src/data/features.ts`:

```typescript
export interface FeaturePageData {
  slug: string;
  stepNumber: number;
  stepLabel: string;
  color: string;
  title: string;
  description: string;
  capabilities: string[];
  nextStep: { label: string; href: string } | null;
}

export const featurePages: FeaturePageData[] = [
  {
    slug: 'source-connectors',
    stepNumber: 1,
    stepLabel: 'CONNECT',
    color: 'var(--step-connect)',
    title: 'Connect Any Source',
    description:
      'Databases, documents, spreadsheets — bring all your data into one platform. AI-powered parsing extracts structured data from any format.',
    capabilities: [
      'PostgreSQL, MySQL, Oracle, MSSQL, MongoDB',
      'PDF & Word parsing (CVs, invoices, contracts)',
      'Excel & CSV import with auto schema detection',
      'AI-powered schema profiling & classification',
      'Encrypted credential storage (AES-256-GCM)',
      'Raw Database Studio for direct exploration',
      'Data Dictionary with column-level insights',
    ],
    nextStep: { label: 'Data Model Engine', href: '/features/data-model-engine' },
  },
  {
    slug: 'data-model-engine',
    stepNumber: 2,
    stepLabel: 'MODEL',
    color: 'var(--step-model)',
    title: 'Choose an Industry Template',
    description:
      'Pre-built data models for HR, Telecom, Finance, and more. Each template includes Foundation, Analytical, and Semantic layers with star schema design.',
    capabilities: [
      'Industry templates: HRDM, TDM, FDM, Custom',
      '3-layer architecture: Foundation → Analytical → Semantic',
      'Star schema with dimensions and fact tables',
      'SCD Type 2 dimension handling',
      'Visual ER diagram editor (React Flow)',
      'Configurable naming conventions',
      'DDL preview before execution',
    ],
    nextStep: { label: 'Intelligent Mapping', href: '/features/intelligent-mapping' },
  },
  {
    slug: 'intelligent-mapping',
    stepNumber: 3,
    stepLabel: 'MAP',
    color: 'var(--step-map)',
    title: 'AI Maps, You Approve',
    description:
      'LLM-powered source-to-target column mapping with reasoning. Every suggestion is transparent — review, refine, and approve before anything runs.',
    capabilities: [
      '3-panel mapping editor (source ↔ rules ↔ target)',
      'AI-suggested mappings with reasoning',
      'Heuristic + LLM dual approach with fallback',
      'Validation rules generator',
      'Coverage report (matched vs unmapped)',
      'Human review and approval workflow',
      'Mapping project version history',
    ],
    nextStep: { label: 'ETL Engine', href: '/features/etl-engine' },
  },
  {
    slug: 'etl-engine',
    stepNumber: 4,
    stepLabel: 'EXECUTE',
    color: 'var(--step-execute)',
    title: 'Run It Your Way',
    description:
      'Execute within AutoWarehouse or export production-ready code to your existing tools. You design the pipeline — you decide how and where it runs.',
    capabilities: [
      'Agentic ETL: 5-phase wizard with human approval',
      'Code export: Airflow, dbt, SQL, Spark, Snowflake',
      'DAG-based parallel execution (Kahn\'s algorithm)',
      'Quality gates & data validation',
      'SCD Type 2 load with change detection',
      'Real-time Mission Control monitoring',
      'Retry policies with exponential backoff',
    ],
    nextStep: { label: 'Analytics', href: '/features/analytics' },
  },
  {
    slug: 'analytics',
    stepNumber: 5,
    stepLabel: 'ANALYZE',
    color: 'var(--step-analyze)',
    title: 'Query with Natural Language',
    description:
      'Ask questions in plain English. The chatbot writes SQL, executes it, and visualizes results with auto-suggested charts. Build KPI dashboards in minutes.',
    capabilities: [
      'Natural language to SQL translation',
      'Auto-chart suggestion (bar, line, pie, KPI)',
      'Configurable dashboard with widget grid',
      'Saved reports with one-click execution',
      'Cross-session conversation memory',
      'Multi-language support (English, Turkish)',
      'Data-driven decision making insights',
    ],
    nextStep: null,
  },
];

export function getFeatureBySlug(slug: string): FeaturePageData | undefined {
  return featurePages.find((f) => f.slug === slug);
}
```

- [ ] **Step 5: Verify build still passes**

```bash
pnpm run build
```

Expected: Build succeeds (data files are just TS modules, not pages).

- [ ] **Step 6: Commit**

```bash
git add src/styles/ src/data/
git commit -m "feat: add design system (global CSS, pipeline/nav/feature data)"
```

---

## Task 3: Layouts — Base, Page, Feature

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/layouts/PageLayout.astro`, `src/layouts/FeatureLayout.astro`

- [ ] **Step 1: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '@/styles/global.css';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage } = Astro.props;
const canonicalUrl = new URL(Astro.url.pathname, Astro.site);
const ogImageUrl = ogImage
  ? new URL(ogImage, Astro.site).toString()
  : new URL('/og/default.png', Astro.site).toString();
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonicalUrl} />

    <title>{title} | AutoWarehouse</title>
    <meta name="description" content={description} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={`${title} | AutoWarehouse`} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImageUrl} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${title} | AutoWarehouse`} />
    <meta name="twitter:description" content={description} />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="min-h-screen antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Create PageLayout**

Create `src/layouts/PageLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';
import Header from '@components/layout/Header.astro';
import Footer from '@components/layout/Footer.astro';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage } = Astro.props;
---

<BaseLayout title={title} description={description} ogImage={ogImage}>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 3: Create FeatureLayout**

Create `src/layouts/FeatureLayout.astro`:

```astro
---
import PageLayout from './PageLayout.astro';
import FeatureHero from '@components/features/FeatureHero.astro';
import CapabilityGrid from '@components/features/CapabilityGrid.astro';
import NextStepCTA from '@components/features/NextStepCTA.astro';
import type { FeaturePageData } from '@data/features';

interface Props {
  feature: FeaturePageData;
}

const { feature } = Astro.props;
---

<PageLayout title={feature.title} description={feature.description}>
  <FeatureHero
    stepNumber={feature.stepNumber}
    stepLabel={feature.stepLabel}
    color={feature.color}
    title={feature.title}
    description={feature.description}
  />

  <section class="mx-auto max-w-6xl px-6 py-16">
    <slot />
  </section>

  <CapabilityGrid capabilities={feature.capabilities} color={feature.color} />

  {feature.nextStep && (
    <NextStepCTA label={feature.nextStep.label} href={feature.nextStep.href} />
  )}
</PageLayout>
```

- [ ] **Step 4: Note — this task will not build yet**

Layouts reference Header, Footer, FeatureHero, CapabilityGrid, NextStepCTA which don't exist yet. These are created in Task 4 and Task 5. Do NOT run build here.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/
git commit -m "feat: add Base, Page, and Feature layouts"
```

---

## Task 4: UI Components + Layout Components (Header, Footer)

**Files:**
- Create: `src/components/ui/Button.astro`, `Badge.astro`, `Card.astro`, `GradientOrb.astro`, `PipelineBar.astro`, `SectionHeading.astro`
- Create: `src/components/layout/Header.astro`, `Footer.astro`

- [ ] **Step 1: Create Button component**

Create `src/components/ui/Button.astro`:

```astro
---
interface Props {
  href: string;
  variant?: 'gradient' | 'ghost';
  class?: string;
}

const { href, variant = 'gradient', class: className = '' } = Astro.props;

const baseClasses = 'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105';
const variantClasses = {
  gradient: 'gradient-bg text-white shadow-lg shadow-blue-500/20',
  ghost: 'border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10',
};
---

<a href={href} class:list={[baseClasses, variantClasses[variant], className]}>
  <slot />
</a>
```

- [ ] **Step 2: Create Badge component**

Create `src/components/ui/Badge.astro`:

```astro
---
interface Props {
  color?: string;
  class?: string;
}

const { color = 'var(--accent-blue)', class: className = '' } = Astro.props;
---

<span
  class:list={['inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest', className]}
  style={`color: ${color}; background: color-mix(in srgb, ${color} 15%, transparent); border: 1px solid color-mix(in srgb, ${color} 30%, transparent);`}
>
  <slot />
</span>
```

- [ ] **Step 3: Create Card component**

Create `src/components/ui/Card.astro`:

```astro
---
interface Props {
  class?: string;
}

const { class: className = '' } = Astro.props;
---

<div class:list={['glass-card rounded-xl p-6', className]}>
  <slot />
</div>
```

- [ ] **Step 4: Create GradientOrb component**

Create `src/components/ui/GradientOrb.astro`:

```astro
---
interface Props {
  color?: 'blue' | 'purple';
  size?: string;
  position?: string;
  class?: string;
}

const { color = 'blue', size = '300px', position = '', class: className = '' } = Astro.props;

const gradient = color === 'blue'
  ? 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)'
  : 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)';
---

<div
  class:list={['orb absolute rounded-full pointer-events-none', className]}
  style={`width: ${size}; height: ${size}; background: ${gradient}; ${position}`}
  aria-hidden="true"
/>
```

- [ ] **Step 5: Create PipelineBar component**

Create `src/components/ui/PipelineBar.astro`:

```astro
---
import { pipelineSteps } from '@data/pipeline';
---

<div class="flex flex-wrap items-center justify-center gap-2">
  {pipelineSteps.map((step, i) => (
    <>
      <a
        href={step.href}
        class="rounded-lg px-4 py-2 text-center text-xs font-semibold transition-all hover:scale-105"
        style={`color: ${step.color}; background: color-mix(in srgb, ${step.color} 12%, transparent); border: 1px solid color-mix(in srgb, ${step.color} 30%, transparent);`}
      >
        {step.icon} {step.label}
      </a>
      {i < pipelineSteps.length - 1 && (
        <span class="text-slate-700">→</span>
      )}
    </>
  ))}
</div>
```

- [ ] **Step 6: Create SectionHeading component**

Create `src/components/ui/SectionHeading.astro`:

```astro
---
interface Props {
  step?: string;
  stepColor?: string;
  title: string;
  description?: string;
}

const { step, stepColor, title, description } = Astro.props;
---

<div class="mb-8">
  {step && (
    <div
      class="mb-2 text-[10px] font-semibold uppercase tracking-[2px]"
      style={stepColor ? `color: ${stepColor}` : ''}
    >
      {step}
    </div>
  )}
  <h2 class="text-2xl font-extrabold text-white md:text-3xl">{title}</h2>
  {description && (
    <p class="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">{description}</p>
  )}
</div>
```

- [ ] **Step 7: Create Header component**

Create `src/components/layout/Header.astro`:

```astro
---
import { mainNav } from '@data/navigation';
---

<header class="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a1a]/80 backdrop-blur-xl">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
    <!-- Logo -->
    <a href="/" class="text-lg font-extrabold text-white">
      Auto<span class="gradient-text">Warehouse</span>
    </a>

    <!-- Desktop Nav -->
    <nav class="hidden items-center gap-6 md:flex">
      {mainNav.map((item) =>
        item.children ? (
          <div class="group relative">
            <button class="flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white">
              {item.label}
              <svg class="h-3 w-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="invisible absolute left-0 top-full min-w-[200px] rounded-lg border border-white/10 bg-[#0d1117] p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
              {item.children.map((child) => (
                <a href={child.href} class="block rounded-md px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <a
            href={item.href}
            class="text-sm text-slate-400 transition-colors hover:text-white"
            {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
          >
            {item.label}
          </a>
        )
      )}
    </nav>

    <!-- Right side -->
    <div class="flex items-center gap-3">
      <a href="https://github.com/autowarehouse/autowarehouse" target="_blank" rel="noopener" class="hidden text-xs text-slate-400 transition-colors hover:text-white md:block">
        ⭐ GitHub
      </a>
      <a href="/contact" class="gradient-bg rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105">
        Request Demo
      </a>

      <!-- Mobile menu toggle -->
      <button id="mobile-toggle" class="text-slate-400 md:hidden" aria-label="Toggle menu">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="hidden border-t border-white/[0.06] bg-[#0a0a1a] px-6 py-4 md:hidden">
    {mainNav.map((item) =>
      item.children ? (
        <>
          <div class="py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</div>
          {item.children.map((child) => (
            <a href={child.href} class="block py-2 text-sm text-slate-400 hover:text-white">
              {child.label}
            </a>
          ))}
        </>
      ) : (
        <a href={item.href} class="block py-2 text-sm text-slate-400 hover:text-white">
          {item.label}
        </a>
      )
    )}
  </div>
</header>

<script>
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle?.addEventListener('click', () => menu?.classList.toggle('hidden'));
</script>
```

- [ ] **Step 8: Create Footer component**

Create `src/components/layout/Footer.astro`:

```astro
---
const year = new Date().getFullYear();
---

<footer class="border-t border-white/[0.06] bg-[var(--bg-secondary)]">
  <div class="mx-auto max-w-6xl px-6 py-12">
    <div class="grid gap-8 md:grid-cols-4">
      <!-- Brand -->
      <div>
        <a href="/" class="text-lg font-extrabold text-white">
          Auto<span class="gradient-text">Warehouse</span>
        </a>
        <p class="mt-3 text-sm text-slate-400">
          AI-Powered Data Warehouse Automation Platform
        </p>
      </div>

      <!-- Product -->
      <div>
        <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Product</h3>
        <ul class="space-y-2 text-sm text-slate-400">
          <li><a href="/platform" class="hover:text-white">Platform</a></li>
          <li><a href="/features/source-connectors" class="hover:text-white">Source Connectors</a></li>
          <li><a href="/features/data-model-engine" class="hover:text-white">Data Model Engine</a></li>
          <li><a href="/features/intelligent-mapping" class="hover:text-white">Intelligent Mapping</a></li>
          <li><a href="/features/etl-engine" class="hover:text-white">ETL Engine</a></li>
          <li><a href="/features/analytics" class="hover:text-white">Analytics</a></li>
        </ul>
      </div>

      <!-- Resources -->
      <div>
        <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Resources</h3>
        <ul class="space-y-2 text-sm text-slate-400">
          <li><a href="/pricing" class="hover:text-white">Pricing</a></li>
          <li><a href="https://github.com/autowarehouse/autowarehouse" target="_blank" rel="noopener" class="hover:text-white">GitHub</a></li>
          <li><a href="/contact" class="hover:text-white">Contact</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Company</h3>
        <ul class="space-y-2 text-sm text-slate-400">
          <li><a href="https://www.intellica.net" target="_blank" rel="noopener" class="hover:text-white">Intellica</a></li>
        </ul>
      </div>
    </div>

    <div class="mt-12 border-t border-white/[0.06] pt-6 text-center text-xs text-slate-500">
      &copy; {year} Intellica. All rights reserved.
    </div>
  </div>
</footer>
```

- [ ] **Step 9: Verify build**

```bash
pnpm run build
```

Expected: May fail because layouts reference feature components not yet created. That's OK — commit components only.

- [ ] **Step 10: Commit**

```bash
git add src/components/
git commit -m "feat: add UI components (Button, Card, Badge, Orb, Pipeline) and Header/Footer"
```

---

## Task 5: Feature Page Components

**Files:**
- Create: `src/components/features/FeatureHero.astro`, `CapabilityGrid.astro`, `NextStepCTA.astro`

- [ ] **Step 1: Create FeatureHero**

Create `src/components/features/FeatureHero.astro`:

```astro
---
import Badge from '@components/ui/Badge.astro';
import GradientOrb from '@components/ui/GradientOrb.astro';

interface Props {
  stepNumber: number;
  stepLabel: string;
  color: string;
  title: string;
  description: string;
}

const { stepNumber, stepLabel, color, title, description } = Astro.props;
---

<section class="relative overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] py-20">
  <GradientOrb color="blue" size="400px" position="top: -100px; right: -100px;" />
  <GradientOrb color="purple" size="300px" position="bottom: -80px; left: -60px;" />

  <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
    <Badge color={color}>Step {stepNumber} — {stepLabel}</Badge>
    <h1 class="mt-4 text-3xl font-extrabold text-white md:text-5xl">{title}</h1>
    <p class="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">{description}</p>
  </div>
</section>
```

- [ ] **Step 2: Create CapabilityGrid**

Create `src/components/features/CapabilityGrid.astro`:

```astro
---
interface Props {
  capabilities: string[];
  color: string;
}

const { capabilities, color } = Astro.props;
---

<section class="bg-[var(--bg-secondary)] py-16">
  <div class="mx-auto max-w-6xl px-6">
    <div class="mb-8 text-center text-[10px] font-semibold uppercase tracking-[2px] text-slate-500">
      Key Capabilities
    </div>
    <div class="flex flex-wrap justify-center gap-3">
      {capabilities.map((cap) => (
        <div
          class="rounded-lg px-4 py-2.5 text-sm"
          style={`color: color-mix(in srgb, ${color} 80%, white); background: color-mix(in srgb, ${color} 10%, transparent); border: 1px solid color-mix(in srgb, ${color} 20%, transparent);`}
        >
          {cap}
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create NextStepCTA**

Create `src/components/features/NextStepCTA.astro`:

```astro
---
interface Props {
  label: string;
  href: string;
}

const { label, href } = Astro.props;
---

<section class="py-12 text-center">
  <a
    href={href}
    class="gradient-bg inline-flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
  >
    Next: {label} →
  </a>
</section>
```

- [ ] **Step 4: Verify build with a test page**

Create a temporary `src/pages/index.astro` to verify everything compiles:

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
---

<PageLayout title="Home" description="AI-Powered Data Warehouse Automation">
  <div class="py-20 text-center">
    <h1 class="text-4xl font-extrabold text-white">AutoWarehouse</h1>
    <p class="mt-4 text-slate-400">Site under construction</p>
  </div>
</PageLayout>
```

```bash
pnpm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/features/ src/pages/index.astro
git commit -m "feat: add feature page components (Hero, CapabilityGrid, NextStepCTA)"
```

---

## Task 6: Home Page — All 7 Sections

**Files:**
- Create: `src/components/home/HeroSection.astro`, `ConnectSection.astro`, `ModelSection.astro`, `MapSection.astro`, `ExecuteSection.astro`, `AnalyzeSection.astro`, `CTAFooter.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create HeroSection**

Create `src/components/home/HeroSection.astro`:

```astro
---
import Button from '@components/ui/Button.astro';
import GradientOrb from '@components/ui/GradientOrb.astro';
---

<section class="relative overflow-hidden py-24 md:py-32">
  <GradientOrb color="blue" size="400px" position="top: -120px; right: -80px;" />
  <GradientOrb color="purple" size="300px" position="bottom: -100px; left: -60px;" />

  <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
    <span class="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-[11px] font-medium text-blue-400">
      AI-Powered Data Warehouse Automation
    </span>

    <h1 class="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
      From Source to Insight,
      <span class="gradient-text">Automatically</span>
    </h1>

    <p class="mt-6 text-base leading-relaxed text-slate-400 md:text-lg">
      Connect any database. Apply industry data models. Let AI agents build your ETL pipeline. Query with natural language.
    </p>

    <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Button href="/platform">Explore Platform</Button>
      <Button href="/contact" variant="ghost">Request Demo</Button>
    </div>

    <div class="mt-16 text-[10px] uppercase tracking-[3px] text-slate-600">
      ▼ Scroll to explore the pipeline
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create ConnectSection**

Create `src/components/home/ConnectSection.astro`:

```astro
---
import SectionHeading from '@components/ui/SectionHeading.astro';

const databases = [
  { icon: '🐘', name: 'PostgreSQL' },
  { icon: '🐬', name: 'MySQL' },
  { icon: '🔶', name: 'Oracle' },
  { icon: '🟦', name: 'MSSQL' },
  { icon: '🍃', name: 'MongoDB' },
];

const documents = ['CVs / Resumes', 'Invoices', 'Contracts', 'Reports'];
---

<section class="reveal bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] py-20">
  <div class="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
    <div>
      <SectionHeading
        step="Step 1"
        stepColor="var(--step-connect)"
        title="Connect Any Source"
        description="PostgreSQL, MySQL, Oracle, MSSQL, MongoDB — connect in seconds. Upload documents, spreadsheets, and flat files."
      />
      <a href="/features/source-connectors" class="text-sm font-medium text-blue-400 hover:text-blue-300">
        → Source Connectors
      </a>
    </div>

    <div class="glass-card rounded-xl p-6">
      <div class="mb-4 text-[10px] font-semibold uppercase tracking-[1px] text-blue-400">Databases</div>
      <div class="grid grid-cols-2 gap-2">
        {databases.map((db) => (
          <div class="rounded-md border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-center text-xs text-slate-400">
            {db.icon} {db.name}
          </div>
        ))}
      </div>

      <div class="mt-4 text-[10px] font-semibold uppercase tracking-[1px] text-pink-400">Documents & Files</div>
      <div class="mt-2 flex flex-wrap gap-1.5">
        <span class="rounded border border-pink-500/20 bg-pink-500/5 px-2 py-1 text-[10px] text-pink-300">📑 PDF</span>
        <span class="rounded border border-pink-500/20 bg-pink-500/5 px-2 py-1 text-[10px] text-pink-300">📝 Word</span>
        <span class="rounded border border-green-500/20 bg-green-500/5 px-2 py-1 text-[10px] text-green-300">📗 Excel</span>
        <span class="rounded border border-green-500/20 bg-green-500/5 px-2 py-1 text-[10px] text-green-300">📋 CSV</span>
      </div>
      <div class="mt-3 rounded-md bg-pink-500/[0.06] p-2">
        <div class="text-[9px] font-semibold uppercase tracking-[1px] text-pink-400">Use Cases</div>
        <div class="mt-1 flex flex-wrap gap-1">
          {documents.map((doc) => (
            <span class="rounded bg-pink-500/10 px-2 py-0.5 text-[9px] text-pink-300">{doc}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create ModelSection**

Create `src/components/home/ModelSection.astro`:

```astro
---
import SectionHeading from '@components/ui/SectionHeading.astro';

const templates = [
  { icon: '👥', code: 'HRDM', name: 'Human Resources Data Model', status: 'READY', statusColor: '#22c55e' },
  { icon: '📡', code: 'TDM', name: 'Telecom Data Model', status: 'COMING', statusColor: '#eab308' },
  { icon: '🏦', code: 'FDM', name: 'Finance Data Model', status: 'COMING', statusColor: '#eab308' },
];
---

<section class="reveal bg-[var(--bg-secondary)] py-20">
  <div class="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
    <div class="glass-card rounded-xl p-6">
      <div class="mb-3 text-[10px] font-semibold uppercase tracking-[1px] text-purple-400">
        Industry Templates
      </div>
      <div class="space-y-2">
        {templates.map((t) => (
          <div class="flex items-center gap-3 rounded-lg border border-purple-500/20 bg-purple-500/[0.06] px-3 py-2.5">
            <span class="text-lg">{t.icon}</span>
            <div class="flex-1">
              <div class="text-xs font-semibold text-white">{t.code}</div>
              <div class="text-[10px] text-slate-400">{t.name}</div>
            </div>
            <span
              class="rounded-full px-2 py-0.5 text-[9px] font-semibold"
              style={`color: ${t.statusColor}; background: color-mix(in srgb, ${t.statusColor} 15%, transparent);`}
            >
              {t.status}
            </span>
          </div>
        ))}
        <div class="flex items-center gap-3 rounded-lg border border-dashed border-white/15 px-3 py-2.5">
          <span class="text-lg">➕</span>
          <div>
            <div class="text-xs font-semibold text-slate-400">Custom</div>
            <div class="text-[10px] text-slate-500">Build your own data model</div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <SectionHeading
        step="Step 2"
        stepColor="var(--step-model)"
        title="Choose an Industry Template"
        description="Pre-built data models for HR, Telecom, Finance, and more. Each template includes Foundation, Analytical, and Semantic layers with star schema design, SCD Type 2 dimensions, and visual ER diagrams. Or build your own custom data model from scratch."
      />
      <a href="/features/data-model-engine" class="text-sm font-medium text-purple-400 hover:text-purple-300">
        → Data Model Engine
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create MapSection**

Create `src/components/home/MapSection.astro`:

```astro
---
import SectionHeading from '@components/ui/SectionHeading.astro';

const mappings = [
  { source: 'src.employee_name', target: 'dim_employee.full_name' },
  { source: 'src.dept_code', target: 'dim_department.code' },
  { source: 'src.salary_amt', target: 'fact_compensation.amount' },
];
---

<section class="reveal bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] py-20">
  <div class="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
    <div>
      <SectionHeading
        step="Step 3"
        stepColor="var(--step-map)"
        title="AI Maps, You Approve"
        description="LLM-powered source-to-target column mapping with reasoning. Every suggestion is transparent — review, refine, and approve before anything runs."
      />
      <a href="/features/intelligent-mapping" class="text-sm font-medium text-pink-400 hover:text-pink-300">
        → Intelligent Mapping
      </a>
    </div>

    <div class="glass-card rounded-xl p-6">
      <div class="mb-3 text-[10px] font-semibold uppercase tracking-[1px] text-pink-400">Mapping Preview</div>
      <div class="space-y-2">
        {mappings.map((m) => (
          <div class="flex items-center gap-2">
            <code class="rounded border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] text-slate-400">{m.source}</code>
            <span class="text-xs text-pink-400">→</span>
            <code class="rounded border border-pink-500/20 bg-pink-500/[0.08] px-2 py-1 text-[10px] text-pink-300">{m.target}</code>
          </div>
        ))}
      </div>
      <div class="mt-3 text-right">
        <span class="rounded border border-green-500/30 bg-green-500/10 px-3 py-1 text-[10px] font-medium text-green-400">
          ✓ Approve
        </span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Create ExecuteSection**

Create `src/components/home/ExecuteSection.astro`:

```astro
---
import SectionHeading from '@components/ui/SectionHeading.astro';

const agenticFeatures = ['Auto DDL', 'Parallel DAG', 'Quality Gates', 'SCD Type 2'];
const exportTargets = ['Airflow DAGs', 'dbt Models', 'SQL Scripts', 'Spark Jobs', 'Snowflake'];
---

<section class="reveal bg-[var(--bg-secondary)] py-20">
  <div class="mx-auto max-w-6xl px-6">
    <div class="mb-10 text-center">
      <SectionHeading
        step="Step 4"
        stepColor="var(--step-execute)"
        title="Run It Your Way"
        description="Execute within AutoWarehouse, or export code to your existing tools."
      />
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <!-- Agentic Mode -->
      <div class="relative glass-card rounded-xl p-6">
        <span class="absolute right-4 top-4 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[9px] font-semibold text-green-400">BUILT-IN</span>
        <div class="text-2xl">🤖</div>
        <h3 class="mt-2 text-lg font-bold text-white">Agentic ETL Engine</h3>
        <p class="mt-2 text-xs leading-relaxed text-slate-400">
          AI agent builds and runs your pipeline end-to-end. 5-phase wizard with human-in-the-loop approval. DAG-based parallel execution with real-time monitoring.
        </p>
        <div class="mt-4 flex flex-wrap gap-1.5">
          {agenticFeatures.map((f) => (
            <span class="rounded bg-green-500/10 px-2 py-1 text-[10px] text-green-300">{f}</span>
          ))}
        </div>
      </div>

      <!-- Export Mode -->
      <div class="relative glass-card rounded-xl p-6">
        <span class="absolute right-4 top-4 rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-[9px] font-semibold text-yellow-400">EXPORT</span>
        <div class="text-2xl">📦</div>
        <h3 class="mt-2 text-lg font-bold text-white">Code Generation</h3>
        <p class="mt-2 text-xs leading-relaxed text-slate-400">
          Generate production-ready code for your existing stack. Take the generated artifacts, deploy them in your own environment. You own the code.
        </p>
        <div class="mt-4 flex flex-wrap gap-1.5">
          {exportTargets.map((t) => (
            <span class="rounded bg-yellow-500/10 px-2 py-1 text-[10px] text-yellow-300">⬡ {t}</span>
          ))}
        </div>
      </div>
    </div>

    <div class="mt-6 rounded-lg border border-white/[0.06] bg-white/[0.01] p-4 text-center">
      <p class="text-sm text-slate-400">
        <strong class="text-white">You're always in control.</strong> AutoWarehouse designs the pipeline — you decide how and where it runs.
      </p>
    </div>

    <div class="mt-4 text-center">
      <a href="/features/etl-engine" class="text-sm font-medium text-green-400 hover:text-green-300">→ ETL Engine</a>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Create AnalyzeSection**

Create `src/components/home/AnalyzeSection.astro`:

```astro
---
import SectionHeading from '@components/ui/SectionHeading.astro';
---

<section class="reveal bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] py-20">
  <div class="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
    <div>
      <SectionHeading
        step="Step 5"
        stepColor="var(--step-analyze)"
        title="Query with Natural Language"
        description="Ask questions in plain English. The chatbot writes SQL, executes it, and visualizes results with auto-suggested charts. Build KPI dashboards in minutes."
      />
      <a href="/features/analytics" class="text-sm font-medium text-yellow-400 hover:text-yellow-300">
        → Analytics & Dashboards
      </a>
    </div>

    <div class="glass-card rounded-xl p-6">
      <div class="rounded-lg bg-white/[0.02] p-3">
        <div class="text-xs text-slate-400">💬 "Show revenue by region for Q4"</div>
      </div>
      <div class="mt-3 rounded-lg bg-yellow-500/[0.06] p-3">
        <div class="text-xs text-yellow-400">📊 4 regions, $12.4M total</div>
        <div class="mt-2 flex items-end gap-1">
          <div class="h-7 flex-1 rounded-t bg-yellow-500/40"></div>
          <div class="h-[18px] flex-1 rounded-t bg-yellow-500/25"></div>
          <div class="h-[34px] flex-1 rounded-t bg-yellow-500/50"></div>
          <div class="h-3.5 flex-1 rounded-t bg-yellow-500/20"></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 7: Create CTAFooter**

Create `src/components/home/CTAFooter.astro`:

```astro
---
import Button from '@components/ui/Button.astro';
---

<section class="bg-gradient-to-br from-indigo-950 to-[var(--bg-primary)] py-20 text-center">
  <div class="mx-auto max-w-2xl px-6">
    <h2 class="text-2xl font-extrabold text-white md:text-3xl">
      Ready to automate your data warehouse?
    </h2>
    <p class="mt-3 text-sm text-slate-400">
      Design the pipeline with AI. Run it your way.
    </p>
    <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Button href="/platform">Explore Platform</Button>
      <Button href="/contact" variant="ghost">Request Demo</Button>
    </div>
  </div>
</section>
```

- [ ] **Step 8: Assemble Home page**

Replace `src/pages/index.astro`:

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
import HeroSection from '@components/home/HeroSection.astro';
import PipelineBar from '@components/ui/PipelineBar.astro';
import ConnectSection from '@components/home/ConnectSection.astro';
import ModelSection from '@components/home/ModelSection.astro';
import MapSection from '@components/home/MapSection.astro';
import ExecuteSection from '@components/home/ExecuteSection.astro';
import AnalyzeSection from '@components/home/AnalyzeSection.astro';
import CTAFooter from '@components/home/CTAFooter.astro';
---

<PageLayout
  title="From Source to Insight, Automatically"
  description="AI-Powered Data Warehouse Automation Platform. Connect any database, apply industry data models, let AI agents build your ETL pipeline, query with natural language."
>
  <HeroSection />

  <div class="bg-[var(--bg-secondary)] py-8">
    <PipelineBar />
  </div>

  <ConnectSection />
  <ModelSection />
  <MapSection />
  <ExecuteSection />
  <AnalyzeSection />
  <CTAFooter />
</PageLayout>
```

- [ ] **Step 9: Verify build**

```bash
pnpm run build
```

Expected: Build succeeds with full home page.

- [ ] **Step 10: Run dev server and visually check**

```bash
pnpm run dev
```

Open `http://localhost:4321` — verify hero, pipeline bar, all 5 pipeline sections render.

- [ ] **Step 11: Commit**

```bash
git add src/components/home/ src/pages/index.astro
git commit -m "feat: build home page with 7-section pipeline journey"
```

---

## Task 7: Feature Pages (all 5)

**Files:**
- Create: `src/pages/features/source-connectors.astro`, `data-model-engine.astro`, `intelligent-mapping.astro`, `etl-engine.astro`, `analytics.astro`

Each feature page uses `FeatureLayout` and adds custom content in the slot. The custom content is the unique visual/explanatory section between the hero and capability grid.

- [ ] **Step 1: Create source-connectors page**

Create `src/pages/features/source-connectors.astro`:

```astro
---
import FeatureLayout from '@layouts/FeatureLayout.astro';
import { getFeatureBySlug } from '@data/features';

const feature = getFeatureBySlug('source-connectors')!;

const databases = [
  { icon: '🐘', name: 'PostgreSQL' },
  { icon: '🐬', name: 'MySQL' },
  { icon: '🔶', name: 'Oracle' },
  { icon: '🟦', name: 'MSSQL' },
  { icon: '🍃', name: 'MongoDB' },
];
---

<FeatureLayout feature={feature}>
  <div class="grid gap-8 md:grid-cols-3">
    <!-- Databases -->
    <div class="glass-card rounded-xl p-6">
      <div class="mb-3 text-2xl">🗄️</div>
      <h3 class="text-base font-bold text-white">Databases</h3>
      <p class="mt-2 text-xs text-slate-400 leading-relaxed">Connect to any relational or NoSQL database. Auto-discover schemas, profile data quality, classify columns with AI.</p>
      <div class="mt-4 space-y-1.5">
        {databases.map((db) => (
          <div class="flex items-center gap-2 rounded-md bg-white/[0.02] px-2.5 py-1.5 text-xs text-slate-400">
            <span>{db.icon}</span> {db.name}
          </div>
        ))}
      </div>
    </div>

    <!-- Documents -->
    <div class="glass-card rounded-xl p-6">
      <div class="mb-3 text-2xl">📄</div>
      <h3 class="text-base font-bold text-white">Documents</h3>
      <p class="mt-2 text-xs text-slate-400 leading-relaxed">AI-powered document parsing. Upload any document type — the platform extracts structured entities automatically.</p>
      <div class="mt-4 space-y-1.5">
        <div class="rounded-md bg-pink-500/[0.06] px-2.5 py-1.5 text-xs text-pink-300">📑 PDF — parse & extract</div>
        <div class="rounded-md bg-pink-500/[0.06] px-2.5 py-1.5 text-xs text-pink-300">📝 Word — parse & extract</div>
      </div>
      <div class="mt-3 flex flex-wrap gap-1">
        {['CVs', 'Invoices', 'Contracts', 'Reports'].map((uc) => (
          <span class="rounded bg-pink-500/10 px-2 py-0.5 text-[9px] text-pink-300">{uc}</span>
        ))}
      </div>
    </div>

    <!-- Files -->
    <div class="glass-card rounded-xl p-6">
      <div class="mb-3 text-2xl">📊</div>
      <h3 class="text-base font-bold text-white">Spreadsheets & Files</h3>
      <p class="mt-2 text-xs text-slate-400 leading-relaxed">Import structured data from spreadsheets and flat files. Auto-detect schemas, data types, and relationships.</p>
      <div class="mt-4 space-y-1.5">
        <div class="rounded-md bg-green-500/[0.06] px-2.5 py-1.5 text-xs text-green-300">📗 Excel (.xlsx)</div>
        <div class="rounded-md bg-green-500/[0.06] px-2.5 py-1.5 text-xs text-green-300">📋 CSV</div>
      </div>
      <div class="mt-3 flex flex-wrap gap-1">
        {['Auto schema', 'Type detect', 'Multi-sheet'].map((c) => (
          <span class="rounded bg-green-500/10 px-2 py-0.5 text-[9px] text-green-300">{c}</span>
        ))}
      </div>
    </div>
  </div>
</FeatureLayout>
```

- [ ] **Step 2: Create data-model-engine page**

Create `src/pages/features/data-model-engine.astro`:

```astro
---
import FeatureLayout from '@layouts/FeatureLayout.astro';
import { getFeatureBySlug } from '@data/features';

const feature = getFeatureBySlug('data-model-engine')!;

const templates = [
  { icon: '👥', code: 'HRDM', name: 'Human Resources', status: 'READY', statusColor: '#22c55e' },
  { icon: '📡', code: 'TDM', name: 'Telecom', status: 'COMING', statusColor: '#eab308' },
  { icon: '🏦', code: 'FDM', name: 'Finance', status: 'COMING', statusColor: '#eab308' },
];

const layers = [
  { name: 'Foundation', desc: 'ODS tables — normalized operational data', color: '#3b82f6' },
  { name: 'Analytical', desc: 'Star schema — dimensions & fact tables', color: '#8b5cf6' },
  { name: 'Semantic', desc: 'Business views & calculated metrics', color: '#ec4899' },
];
---

<FeatureLayout feature={feature}>
  <div class="grid gap-8 md:grid-cols-2">
    <!-- Templates -->
    <div>
      <h3 class="mb-4 text-lg font-bold text-white">Industry Templates</h3>
      <div class="space-y-2">
        {templates.map((t) => (
          <div class="flex items-center gap-3 glass-card rounded-lg px-4 py-3">
            <span class="text-xl">{t.icon}</span>
            <div class="flex-1">
              <div class="text-sm font-semibold text-white">{t.code}</div>
              <div class="text-xs text-slate-400">{t.name}</div>
            </div>
            <span class="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={`color: ${t.statusColor}; background: color-mix(in srgb, ${t.statusColor} 15%, transparent);`}>
              {t.status}
            </span>
          </div>
        ))}
        <div class="flex items-center gap-3 rounded-lg border border-dashed border-white/15 px-4 py-3">
          <span class="text-xl">➕</span>
          <div>
            <div class="text-sm font-semibold text-slate-400">Custom</div>
            <div class="text-xs text-slate-500">Build your own data model</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Layers -->
    <div>
      <h3 class="mb-4 text-lg font-bold text-white">3-Layer Architecture</h3>
      <div class="space-y-3">
        {layers.map((l, i) => (
          <div class="flex items-start gap-3">
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={`background: ${l.color};`}>
              {i + 1}
            </div>
            <div>
              <div class="text-sm font-semibold text-white">{l.name}</div>
              <div class="text-xs text-slate-400">{l.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div class="mt-6 text-center text-xs text-slate-500">
        Foundation → Analytical → Semantic
      </div>
    </div>
  </div>
</FeatureLayout>
```

- [ ] **Step 3: Create intelligent-mapping page**

Create `src/pages/features/intelligent-mapping.astro`:

```astro
---
import FeatureLayout from '@layouts/FeatureLayout.astro';
import { getFeatureBySlug } from '@data/features';

const feature = getFeatureBySlug('intelligent-mapping')!;

const mappingRows = [
  { source: 'employees.first_name', target: 'dim_employee.full_name', confidence: '95%' },
  { source: 'departments.dept_id', target: 'dim_department.dept_key', confidence: '99%' },
  { source: 'salaries.amount', target: 'fact_compensation.salary_amount', confidence: '92%' },
  { source: 'positions.title', target: 'dim_position.job_title', confidence: '88%' },
];
---

<FeatureLayout feature={feature}>
  <div class="grid gap-8 md:grid-cols-2">
    <!-- Mapping preview -->
    <div class="glass-card rounded-xl p-6">
      <div class="mb-3 text-[10px] font-semibold uppercase tracking-[1px] text-pink-400">AI-Suggested Mappings</div>
      <div class="space-y-2">
        {mappingRows.map((row) => (
          <div class="flex items-center gap-2 rounded-md bg-white/[0.02] p-2">
            <code class="flex-1 truncate text-[10px] text-slate-400">{row.source}</code>
            <span class="text-xs text-pink-400">→</span>
            <code class="flex-1 truncate text-[10px] text-pink-300">{row.target}</code>
            <span class="text-[9px] font-medium text-green-400">{row.confidence}</span>
          </div>
        ))}
      </div>
      <div class="mt-4 flex justify-between">
        <span class="text-[10px] text-slate-500">4 of 42 columns mapped</span>
        <span class="rounded border border-green-500/30 bg-green-500/10 px-3 py-1 text-[10px] font-medium text-green-400">✓ Approve All</span>
      </div>
    </div>

    <!-- How it works -->
    <div>
      <h3 class="mb-4 text-lg font-bold text-white">How It Works</h3>
      <div class="space-y-4">
        <div class="flex gap-3">
          <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-[10px] font-bold text-pink-400">1</div>
          <div>
            <div class="text-sm font-semibold text-white">Discover</div>
            <div class="text-xs text-slate-400">AI scans source schema — tables, columns, types, relationships</div>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-[10px] font-bold text-pink-400">2</div>
          <div>
            <div class="text-sm font-semibold text-white">Match</div>
            <div class="text-xs text-slate-400">Heuristic + LLM dual approach suggests mappings with reasoning</div>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-[10px] font-bold text-pink-400">3</div>
          <div>
            <div class="text-sm font-semibold text-white">Validate</div>
            <div class="text-xs text-slate-400">Generate validation rules — null checks, ranges, uniqueness</div>
          </div>
        </div>
        <div class="flex gap-3">
          <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-[10px] font-bold text-pink-400">4</div>
          <div>
            <div class="text-sm font-semibold text-white">Approve</div>
            <div class="text-xs text-slate-400">Review, refine, and approve before anything runs</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</FeatureLayout>
```

- [ ] **Step 4: Create etl-engine page**

Create `src/pages/features/etl-engine.astro`:

```astro
---
import FeatureLayout from '@layouts/FeatureLayout.astro';
import { getFeatureBySlug } from '@data/features';

const feature = getFeatureBySlug('etl-engine')!;

const phases = [
  { num: 1, name: 'Analyze', desc: 'Profile source database with AI classification' },
  { num: 2, name: 'Map', desc: 'Auto-suggest column mappings with reasoning' },
  { num: 3, name: 'Build', desc: 'Create ETL pipeline (DDL → Extract → Load)' },
  { num: 4, name: 'Execute', desc: 'Run pipeline with real-time monitoring' },
  { num: 5, name: 'Report', desc: 'AI-generated execution summary with stats' },
];

const exportTargets = [
  { name: 'Airflow DAGs', desc: 'Apache Airflow workflow definitions' },
  { name: 'dbt Models', desc: 'dbt transformation models' },
  { name: 'SQL Scripts', desc: 'Raw SQL DDL and DML scripts' },
  { name: 'Spark Jobs', desc: 'PySpark transformation jobs' },
  { name: 'Snowflake', desc: 'Snowflake-optimized SQL' },
];
---

<FeatureLayout feature={feature}>
  <div class="grid gap-8 md:grid-cols-2">
    <!-- Agentic mode -->
    <div>
      <h3 class="mb-1 text-lg font-bold text-white">🤖 Agentic ETL Engine</h3>
      <p class="mb-4 text-xs text-slate-400">5-phase wizard with human-in-the-loop approval at every step.</p>
      <div class="space-y-2">
        {phases.map((p) => (
          <div class="flex items-start gap-3 glass-card rounded-lg px-4 py-3">
            <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-400">{p.num}</div>
            <div>
              <div class="text-sm font-semibold text-white">{p.name}</div>
              <div class="text-xs text-slate-400">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <!-- Export mode -->
    <div>
      <h3 class="mb-1 text-lg font-bold text-white">📦 Code Generation</h3>
      <p class="mb-4 text-xs text-slate-400">Export production-ready code to your existing stack. You own the output.</p>
      <div class="space-y-2">
        {exportTargets.map((t) => (
          <div class="flex items-start gap-3 glass-card rounded-lg px-4 py-3">
            <span class="text-yellow-400">⬡</span>
            <div>
              <div class="text-sm font-semibold text-white">{t.name}</div>
              <div class="text-xs text-slate-400">{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  <div class="mt-8 rounded-lg border border-white/[0.06] bg-white/[0.01] p-4 text-center">
    <p class="text-sm text-slate-400">
      <strong class="text-white">You're always in control.</strong> AutoWarehouse designs the pipeline — you decide how and where it runs.
    </p>
  </div>
</FeatureLayout>
```

- [ ] **Step 5: Create analytics page**

Create `src/pages/features/analytics.astro`:

```astro
---
import FeatureLayout from '@layouts/FeatureLayout.astro';
import { getFeatureBySlug } from '@data/features';

const feature = getFeatureBySlug('analytics')!;
---

<FeatureLayout feature={feature}>
  <div class="grid gap-8 md:grid-cols-2">
    <!-- Chatbot demo -->
    <div class="glass-card rounded-xl p-6">
      <div class="mb-3 text-[10px] font-semibold uppercase tracking-[1px] text-yellow-400">Natural Language Query</div>
      <div class="space-y-3">
        <div class="rounded-lg bg-white/[0.02] p-3">
          <div class="text-xs text-slate-400">💬 "How many employees joined last quarter?"</div>
        </div>
        <div class="rounded-lg bg-yellow-500/[0.06] p-3">
          <div class="text-xs text-yellow-400 mb-2">📊 Result: 247 new hires across 4 departments</div>
          <div class="flex items-end gap-1 h-12">
            <div class="flex-1 rounded-t bg-yellow-500/40" style="height: 70%"></div>
            <div class="flex-1 rounded-t bg-yellow-500/25" style="height: 45%"></div>
            <div class="flex-1 rounded-t bg-yellow-500/50" style="height: 85%"></div>
            <div class="flex-1 rounded-t bg-yellow-500/20" style="height: 35%"></div>
          </div>
          <div class="mt-1 flex gap-1 text-[8px] text-slate-500">
            <span class="flex-1 text-center">Sales</span>
            <span class="flex-1 text-center">Eng</span>
            <span class="flex-1 text-center">Ops</span>
            <span class="flex-1 text-center">HR</span>
          </div>
        </div>
        <div class="rounded-lg bg-white/[0.02] p-3">
          <div class="text-xs text-slate-400">💬 "Break it down by month"</div>
        </div>
      </div>
    </div>

    <!-- Dashboard preview -->
    <div>
      <h3 class="mb-4 text-lg font-bold text-white">Dashboard Builder</h3>
      <div class="grid grid-cols-2 gap-3">
        <div class="glass-card rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-yellow-400">1,247</div>
          <div class="text-[10px] text-slate-500">Total Headcount</div>
        </div>
        <div class="glass-card rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-400">+12%</div>
          <div class="text-[10px] text-slate-500">Growth YoY</div>
        </div>
        <div class="glass-card rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-400">$82K</div>
          <div class="text-[10px] text-slate-500">Avg Salary</div>
        </div>
        <div class="glass-card rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-pink-400">4.2%</div>
          <div class="text-[10px] text-slate-500">Turnover Rate</div>
        </div>
      </div>
      <p class="mt-4 text-xs text-slate-400 leading-relaxed">
        Configurable KPI widget grids. Save queries as reports. Auto-suggest chart types based on data shape. One-click execution with interactive visualizations.
      </p>
    </div>
  </div>
</FeatureLayout>
```

- [ ] **Step 6: Verify build**

```bash
pnpm run build
```

Expected: Build succeeds, all 5 feature pages generated.

- [ ] **Step 7: Commit**

```bash
git add src/pages/features/
git commit -m "feat: add 5 feature pages (connectors, data model, mapping, ETL, analytics)"
```

---

## Task 8: Platform Page

**Files:**
- Create: `src/components/common/TechStackGrid.astro`
- Create: `src/pages/platform.astro`

- [ ] **Step 1: Create TechStackGrid**

Create `src/components/common/TechStackGrid.astro`:

```astro
---
interface Props {
  items: { name: string; description: string }[];
}

const { items } = Astro.props;
---

<div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
  {items.map((item) => (
    <div class="glass-card rounded-lg p-4">
      <div class="text-sm font-semibold text-white">{item.name}</div>
      <div class="mt-1 text-xs text-slate-400">{item.description}</div>
    </div>
  ))}
</div>
```

- [ ] **Step 2: Create platform page**

Create `src/pages/platform.astro`:

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
import Badge from '@components/ui/Badge.astro';
import GradientOrb from '@components/ui/GradientOrb.astro';
import PipelineBar from '@components/ui/PipelineBar.astro';
import TechStackGrid from '@components/common/TechStackGrid.astro';

const techStack = [
  { name: 'Next.js 16', description: 'React-based web application' },
  { name: 'LangGraph.js', description: 'Agent orchestration framework' },
  { name: 'LangChain.js', description: 'LLM integration & tools' },
  { name: 'Drizzle ORM', description: 'Type-safe database access' },
  { name: 'PostgreSQL', description: 'Primary database + pgvector' },
  { name: 'Turborepo', description: 'Monorepo build system' },
  { name: 'Tailwind CSS', description: 'Utility-first styling' },
  { name: 'Docker', description: 'Container deployment' },
];

const security = [
  { icon: '🔐', title: 'AES-256-GCM', desc: 'Encryption for all credentials' },
  { icon: '🔑', title: 'OIDC-First Auth', desc: 'Keycloak, Auth0, LDAP support' },
  { icon: '🛡️', title: 'RBAC', desc: '30+ granular permissions' },
  { icon: '📋', title: 'Audit Logging', desc: 'LangSmith tracing for AI actions' },
];
---

<PageLayout title="Platform" description="Architecture, tech stack, security, and deployment options for AutoWarehouse.">
  <!-- Hero -->
  <section class="relative overflow-hidden py-20">
    <GradientOrb color="blue" size="400px" position="top: -100px; right: -100px;" />
    <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
      <Badge>Platform Overview</Badge>
      <h1 class="mt-4 text-3xl font-extrabold text-white md:text-5xl">Built for Enterprise Data</h1>
      <p class="mt-4 text-base text-slate-400">
        Multi-tenant, AI-powered, self-hosted. One platform from source ingestion to business intelligence.
      </p>
    </div>
  </section>

  <!-- Pipeline -->
  <section class="bg-[var(--bg-secondary)] py-8">
    <PipelineBar />
  </section>

  <!-- Tech Stack -->
  <section class="py-16">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="mb-8 text-center text-2xl font-extrabold text-white">Tech Stack</h2>
      <TechStackGrid items={techStack} />
    </div>
  </section>

  <!-- Security -->
  <section class="bg-[var(--bg-secondary)] py-16">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="mb-8 text-center text-2xl font-extrabold text-white">Security & Compliance</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {security.map((s) => (
          <div class="glass-card rounded-xl p-5 text-center">
            <div class="text-2xl">{s.icon}</div>
            <div class="mt-2 text-sm font-semibold text-white">{s.title}</div>
            <div class="mt-1 text-xs text-slate-400">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Deployment -->
  <section class="py-16">
    <div class="mx-auto max-w-4xl px-6 text-center">
      <h2 class="mb-4 text-2xl font-extrabold text-white">Deploy Your Way</h2>
      <p class="mb-8 text-sm text-slate-400">Self-hosted on your infrastructure. No cloud lock-in. Docker Compose for single-machine, Kubernetes for scale.</p>
      <div class="glass-card mx-auto max-w-md rounded-xl p-6">
        <code class="block text-left text-xs text-slate-300">
          <span class="text-slate-500">$</span> docker compose up -d<br />
          <span class="text-green-400">✓</span> postgres:16 — ready<br />
          <span class="text-green-400">✓</span> web (Next.js) — :3000<br />
          <span class="text-green-400">✓</span> worker (ETL) — running<br />
          <span class="text-green-400">✓</span> ollama (LLM) — ready
        </code>
      </div>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 3: Verify build**

```bash
pnpm run build
```

Expected: Build succeeds, `/platform` page generated.

- [ ] **Step 4: Commit**

```bash
git add src/components/common/TechStackGrid.astro src/pages/platform.astro
git commit -m "feat: add platform page with tech stack, security, deployment"
```

---

## Task 9: Pricing & Contact Pages

**Files:**
- Create: `src/components/common/ContactForm.astro`
- Create: `src/pages/pricing.astro`, `src/pages/contact.astro`

- [ ] **Step 1: Create ContactForm component**

Create `src/components/common/ContactForm.astro`:

```astro
---
const formspreeUrl = 'https://formspree.io/f/YOUR_FORM_ID';
---

<form action={formspreeUrl} method="POST" class="space-y-4">
  <div class="grid gap-4 md:grid-cols-2">
    <div>
      <label for="name" class="mb-1 block text-xs font-medium text-slate-400">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        class="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        placeholder="Your name"
      />
    </div>
    <div>
      <label for="email" class="mb-1 block text-xs font-medium text-slate-400">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        class="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
        placeholder="you@company.com"
      />
    </div>
  </div>
  <div>
    <label for="company" class="mb-1 block text-xs font-medium text-slate-400">Company</label>
    <input
      type="text"
      id="company"
      name="company"
      class="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
      placeholder="Company name"
    />
  </div>
  <div>
    <label for="message" class="mb-1 block text-xs font-medium text-slate-400">Use Case</label>
    <textarea
      id="message"
      name="message"
      rows="4"
      class="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
      placeholder="Tell us about your data warehouse needs..."
    ></textarea>
  </div>
  <button
    type="submit"
    class="gradient-bg w-full rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
  >
    Request Demo
  </button>
</form>
```

**Note:** Replace `YOUR_FORM_ID` with a real Formspree form ID after creating one at formspree.io.

- [ ] **Step 2: Create pricing page**

Create `src/pages/pricing.astro`:

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
import Badge from '@components/ui/Badge.astro';
import Button from '@components/ui/Button.astro';
import GradientOrb from '@components/ui/GradientOrb.astro';

const faq = [
  { q: 'Is AutoWarehouse open source?', a: 'The core platform is available for self-hosted deployment. Contact us for licensing details.' },
  { q: 'What databases do you support?', a: 'PostgreSQL, MySQL, Oracle, MSSQL, and MongoDB. More connectors are on the roadmap.' },
  { q: 'Can I use my own LLM?', a: 'Yes. AutoWarehouse supports Ollama (self-hosted), OpenAI, and Anthropic Claude. Bring your own model.' },
  { q: 'How does the ETL code export work?', a: 'AutoWarehouse generates production-ready Airflow DAGs, dbt models, SQL scripts, Spark jobs, or Snowflake code that you deploy in your own environment.' },
];
---

<PageLayout title="Pricing" description="Enterprise pricing for AutoWarehouse. Self-hosted or managed deployment options.">
  <section class="relative overflow-hidden py-20">
    <GradientOrb color="blue" size="400px" position="top: -100px; right: -100px;" />
    <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
      <Badge>Pricing</Badge>
      <h1 class="mt-4 text-3xl font-extrabold text-white md:text-5xl">Enterprise Pricing</h1>
      <p class="mt-4 text-base text-slate-400">
        Tailored to your data infrastructure needs. Self-hosted on your hardware, or managed by us.
      </p>
    </div>
  </section>

  <section class="pb-20">
    <div class="mx-auto grid max-w-4xl gap-6 px-6 md:grid-cols-2">
      <!-- Self-Hosted -->
      <div class="glass-card rounded-xl p-8">
        <h3 class="text-lg font-bold text-white">Self-Hosted</h3>
        <p class="mt-2 text-sm text-slate-400">Deploy on your infrastructure with full control.</p>
        <ul class="mt-6 space-y-2 text-sm text-slate-300">
          <li>✓ Docker Compose deployment</li>
          <li>✓ All features included</li>
          <li>✓ Bring your own LLM</li>
          <li>✓ Data stays on-premise</li>
          <li>✓ Priority support</li>
        </ul>
        <div class="mt-8">
          <Button href="/contact" class="w-full text-center">Contact Sales</Button>
        </div>
      </div>

      <!-- Managed -->
      <div class="glass-card rounded-xl p-8">
        <h3 class="text-lg font-bold text-white">Managed</h3>
        <p class="mt-2 text-sm text-slate-400">We handle infrastructure, you focus on data.</p>
        <ul class="mt-6 space-y-2 text-sm text-slate-300">
          <li>✓ Fully managed cloud</li>
          <li>✓ Automatic updates</li>
          <li>✓ Built-in LLM access</li>
          <li>✓ SLA guarantees</li>
          <li>✓ Dedicated support</li>
        </ul>
        <div class="mt-8">
          <Button href="/contact" variant="ghost" class="w-full text-center">Coming Soon</Button>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="bg-[var(--bg-secondary)] py-16">
    <div class="mx-auto max-w-3xl px-6">
      <h2 class="mb-8 text-center text-2xl font-extrabold text-white">FAQ</h2>
      <div class="space-y-4">
        {faq.map((item) => (
          <div class="glass-card rounded-xl p-5">
            <h3 class="text-sm font-semibold text-white">{item.q}</h3>
            <p class="mt-2 text-xs leading-relaxed text-slate-400">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 3: Create contact page**

Create `src/pages/contact.astro`:

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
import Badge from '@components/ui/Badge.astro';
import GradientOrb from '@components/ui/GradientOrb.astro';
import ContactForm from '@components/common/ContactForm.astro';
---

<PageLayout title="Contact" description="Request a demo of AutoWarehouse. Get in touch with our team.">
  <section class="relative overflow-hidden py-20">
    <GradientOrb color="purple" size="350px" position="top: -80px; left: -60px;" />

    <div class="relative z-10 mx-auto max-w-4xl px-6">
      <div class="grid gap-12 md:grid-cols-2">
        <!-- Form -->
        <div>
          <Badge>Get in Touch</Badge>
          <h1 class="mt-4 text-3xl font-extrabold text-white">Request a Demo</h1>
          <p class="mt-3 mb-8 text-sm text-slate-400">
            See AutoWarehouse in action. Tell us about your data warehouse needs and we'll set up a personalized walkthrough.
          </p>
          <ContactForm />
        </div>

        <!-- Info -->
        <div class="flex flex-col justify-center">
          <div class="glass-card rounded-xl p-6">
            <h3 class="mb-4 text-sm font-semibold text-white">Other Ways to Reach Us</h3>
            <div class="space-y-4 text-sm text-slate-400">
              <div>
                <div class="text-xs font-medium text-slate-500">Company</div>
                <a href="https://www.intellica.net" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300">Intellica</a>
              </div>
              <div>
                <div class="text-xs font-medium text-slate-500">GitHub</div>
                <a href="https://github.com/autowarehouse/autowarehouse" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300">autowarehouse/autowarehouse</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 4: Verify build**

```bash
pnpm run build
```

Expected: Build succeeds, all 9 pages generated.

- [ ] **Step 5: Commit**

```bash
git add src/components/common/ContactForm.astro src/pages/pricing.astro src/pages/contact.astro
git commit -m "feat: add pricing and contact pages with Formspree form"
```

---

## Task 10: Final — SEO, Robots, Build Verification

**Files:**
- Create: `public/robots.txt`
- Verify: Full build + all pages

- [ ] **Step 1: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://autowarehouse.github.io/sitemap-index.xml
```

- [ ] **Step 2: Full build**

```bash
pnpm run build
```

Expected: Build succeeds with all 9 pages + sitemap.xml.

- [ ] **Step 3: List generated pages**

```bash
ls -la dist/
ls -la dist/features/
cat dist/sitemap-index.xml
```

Expected: `index.html`, `platform/index.html`, `pricing/index.html`, `contact/index.html`, and 5 feature pages under `features/`.

- [ ] **Step 4: Run dev server for visual check**

```bash
pnpm run dev
```

Verify in browser:
- `http://localhost:4321` — Home page with all 7 sections
- `http://localhost:4321/platform` — Platform page
- `http://localhost:4321/features/source-connectors` — Feature page with 3-pillar layout
- `http://localhost:4321/features/etl-engine` — Dual-mode ETL page
- `http://localhost:4321/pricing` — Pricing with FAQ
- `http://localhost:4321/contact` — Form renders
- Navigation works — dropdown, mobile menu, all links
- Scroll reveal animations fire on home page

- [ ] **Step 5: Commit**

```bash
git add public/robots.txt
git commit -m "feat: add robots.txt with sitemap reference"
```

- [ ] **Step 6: Final verification commit**

```bash
git log --oneline
```

Expected: ~10 commits covering full site implementation.
