# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AutoWarehouse.ai — marketing website for an AI-powered Data Warehouse Automation Platform, built by Intellica. Static site deployed to GitHub Pages at https://autowarehouse.ai.

## Commands

```bash
pnpm dev        # Local dev server → http://localhost:4321
pnpm build      # Production build → dist/
pnpm preview    # Preview production build locally
```

Requires Node.js >= 22.12.0 and pnpm 9.15.4. No test framework is configured.

## Tech Stack

- **Astro 6.1** — static site generator (all pages pre-rendered, no SSR)
- **Tailwind CSS 4.2** — via `@tailwindcss/vite` Vite plugin (not @astrojs/tailwind)
- **TypeScript** — strict mode, extending `astro/tsconfigs/strict`
- **MDX** — installed but not yet used
- **Sitemap** — auto-generated via `@astrojs/sitemap`

## Architecture

### Data-Driven Content

Three TypeScript files in `src/data/` drive most of the site content:

- **`pipeline.ts`** — Defines the 5-step pipeline (Connect → Model → Map → Execute → Analyze) with colors, icons, and routes. Changes here propagate to the Header dropdown, PipelineBar, and all feature pages.
- **`navigation.ts`** — Header/footer nav config. Features dropdown is auto-generated from pipeline steps.
- **`features.ts`** — Metadata for each feature deep-dive page (slug, color, capabilities, next-step linking).

### Layout Composition

Three nested layouts: `BaseLayout` (head, meta, fonts, global.css) → `PageLayout` (adds Header + Footer) → `FeatureLayout` (adds feature hero, capability grid, next-step CTA). All 5 feature pages share `FeatureLayout`.

### Path Aliases

```
@/*           → src/*
@components/* → src/components/*
@layouts/*    → src/layouts/*
@data/*       → src/data/*
```

### Pages (9 total)

- `/` — Home with 5 pipeline sections
- `/platform` — Platform overview
- `/features/[slug]` — 5 feature deep-dive pages (source-connectors, data-model-engine, intelligent-mapping, etl-engine, analytics)
- `/pricing` — Pricing tiers
- `/contact` — Contact form (Formspree, form ID not yet configured)

## Design System

**Theme:** Dark base (#0f172a) with blue-purple gradients and glassmorphism.

**Key CSS classes** (defined in `src/styles/global.css`):
- `.gradient-text` — blue→purple gradient text for headings
- `.gradient-bg` — blue→purple gradient background for buttons
- `.glass-card` — translucent card with backdrop blur
- `.reveal` — scroll-driven CSS animation (no JS), with graceful fallback

**Pipeline step colors:** Each step has a CSS variable (`--step-connect` blue, `--step-model` purple, `--step-map` pink, `--step-execute` green, `--step-analyze` yellow) that propagates through badges, borders, and backgrounds via `color-mix()`.

**Typography:** Inter (body) + JetBrains Mono (code), loaded from Google Fonts.

## Deployment

GitHub Actions (`deploy.yml`) builds on push to `main` using `withastro/action@v6` and deploys to GitHub Pages. Custom domain `autowarehouse.ai` via Cloudflare DNS with CNAME in `public/CNAME`.

## Conventions

- Components use `.astro` files with typed `Props` interfaces in the frontmatter
- No client-side JavaScript or state management — everything is static HTML/CSS
- Scroll animations use CSS `animation-timeline: view()` (zero JS)
- Color system is step-aware: adding/modifying a pipeline step should update `pipeline.ts` and `features.ts` together
- License: Proprietary (Copyright Intellica)
