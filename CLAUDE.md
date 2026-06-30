# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AutoWarehouse.ai — marketing website for an AI-powered, **model-first** Data Warehouse Automation Platform, built by Intellica. Static site deployed to GitHub Pages at https://autowarehouse.ai. The homepage is an interactive, game-like build mission; the rest is an industrial-themed marketing site.

## Commands

```bash
bun install        # install deps (also wires git hooks via the `prepare` script)
bun run dev        # dev server → http://localhost:4321
bun run build      # production build → dist/
bun run preview    # preview production build

bun run gate       # the quality gate: typecheck → format → lint → knip → test
bun run format:fix # apply Prettier formatting
bun test           # unit tests only
```

Uses **Bun** (1.3.14, pinned in `.bun-version`) as package manager + test runner. Node.js >= 22.12 for tooling (CI uses Node 24).

## Tech Stack

- **Astro 7** — static site generator (all pages pre-rendered, no SSR)
- **Tailwind CSS 4.3** — via `@tailwindcss/vite` Vite plugin (not @astrojs/tailwind)
- **TypeScript** — strict mode (`astro/tsconfigs/strict`), `types: ["bun"]` for `bun:test`
- **Sitemap** — auto-generated via `@astrojs/sitemap`
- Versions are **exact-pinned** (`bunfig.toml` `exact = true`); bumps come via Dependabot.

## Architecture

### Data-Driven Content

`src/data/site.ts` is the single source of truth:

- **`FEATURES`** — the 5 pipeline stages (Connect → Model → Map → Execute → Analyze): slug, step, label, name, icon, color, hero, sub, capabilities. Drives the Header dropdown, the footer, and every `/features/[slug]` page.
- **`PRIMARY_NAV`, `FOOTER_GROUPS`, `CONTACT`** — nav, footer, and contact details.
- `src/data/site.test.ts` enforces invariants on this data (`bun test`).

### Layout Composition

Three nested layouts: `BaseLayout` (head, meta, fonts, global.css, **theme bootstrap script**) → `PageLayout` (adds Header + Footer) → `FeatureLayout` (feature hero with pipeline-position nav, capability grid, next-step CTA). The 5 feature pages render from a single dynamic route `src/pages/features/[slug].astro`.

### The Game (homepage centerpiece)

`src/components/game/WarehouseGame.astro` is a **vanilla-TypeScript island** — a 10-station build mission (sources → discovery → review → model & map → approve → ETL → approve → load → report → Talk-to-DWH) implemented as a small state machine that re-renders three regions (HUD, mission map, stage) via `innerHTML` with event delegation. Its mock data (sources, mappings, Talk-to-DWH Q&A) lives as constants at the top of the file.

> Because the game builds its DOM at runtime, its `<style>` block is `is:global` — Astro's scoped styles only tag build-time elements and would not reach injected markup.

### Path Aliases

```
@/*           → src/*
@components/* → src/components/*
@layouts/*    → src/layouts/*
@data/*       → src/data/*
```

### Pages

- `/` — Home: hero (model-first system map) + the interactive game + proof + governance + CTA
- `/platform` — Platform overview (tech stack, security, data isolation, deployment topologies, architecture)
- `/features/[slug]` — 5 feature pages (source-connectors, data-model-engine, intelligent-mapping, etl-engine, analytics)
- `/use-cases` — Three adoption paths with scenarios
- `/pricing` — Tiers + FAQ · `/about` — story, timeline, industries
- `/contact` — Formspree form (action is a placeholder: `REPLACE_FORM_ID`)
- `/privacy`, `/terms` — legal

## Design System

**Aesthetic:** industrial / blueprint / foundry. **Dark is the default theme**; a light "Work Order kraft" theme is toggled via a header button (`ThemeToggle`), persisted in `localStorage` as `aw-theme`, and applied before paint by an inline script in `BaseLayout` (no FOUC).

**Tokens drive everything** — defined in `src/styles/global.css` on `:root`/`[data-theme='dark']` and `[data-theme='light']`. **Never hardcode hex for theme surfaces/text**; use the variables so both themes work:

- Surfaces: `--bg`, `--panel`, `--panel-2`, `--panel-3`; terminals stay dark via `--terminal` / `--terminal-ink`
- Text: `--ink`, `--ink-muted`, `--ink-dim`, `--ink-faint`; on accent fills: `--on-accent`
- Lines: `--line`, `--line-soft` · Accents: `--yellow`, `--orange`, `--green`, `--alert`
- Fonts: `--font-display` (Archivo), `--font-mono` (JetBrains Mono), `--font-body` (Space Grotesk), `--font-anton`

**Key CSS classes** (in `global.css`): `.shell` (max-width container), `.eyebrow`, `.mono-label`, `.btn` + `.btn-primary|accent|success|outline` (+`.btn-sm`), `.panel`/`.panel-2`/`.card-frame`, `.hard-shadow`, `.grid-bg`, `.caution-tape`, `.barcode`, `.highlight`, `.pill`, `.hex-mark`, and `.reveal` (zero-JS scroll-driven reveal via `animation-timeline: view()`, guarded by `@supports` so unsupported browsers just show content).

**Icons:** stroke line-icons from `src/components/ui/Icon.astro` (`currentColor`, technical style — no emoji). The logo is the "Agent Ribbon" (`src/components/ui/Logo.astro`).

## Quality Gate

`bun run gate` chains five stages (any failure stops the chain) — the same command runs in the `pre-push` hook and in CI:

1. **typecheck** — `astro check`
2. **format** — `prettier --check .` (config in `.prettierrc.json`; `format:fix` to apply)
3. **lint** — `oxlint` (`.oxlintrc.json`: correctness=error, suspicious=warn, style off — Prettier owns style)
4. **knip** — dead code / unused dependencies (`knip.json`)
5. **test** — `bun test` (`src/**/*.test.ts`)

Outside the gate (advisory, run in hooks/CI): `bun run secrets` (secretlint) and `bun run audit` (**non-blocking** — current advisories are transitive build-time deps with no static-site attack surface).

**Git hooks** are wired via `core.hooksPath .githooks` (set by the `prepare` script on `bun install`): `pre-commit` runs secrets + format; `pre-push` runs the full gate + audit.

## Deployment

Two GitHub Actions workflows, both with SHA-pinned actions:

- **`ci.yml`** — build verification on PRs and pushes to `main`: gate + secrets + audit + build. **Does NOT deploy.**
- **`deploy.yml`** — production deploy **only on publishing a GitHub Release** (or manual `workflow_dispatch`). Going live = git tag + GitHub release. Uses Bun, uploads `dist/`, deploys to Pages via OIDC.

Custom domain `autowarehouse.ai` via Cloudflare DNS with CNAME in `public/CNAME`. Dependabot keeps Bun + GitHub Actions deps current.

## Conventions

- Components are `.astro` files with typed `Props` interfaces in the frontmatter.
- **No UI framework** — the only client JS is small vanilla-TS islands (the game, theme toggle, count-up stat, mobile menu, cookie consent). Everything else is static HTML/CSS.
- Runtime-injected DOM needs `is:global` styles (scoped styles won't apply to it).
- Count-ups / progress use `setInterval`, **not** `requestAnimationFrame` (which is throttled in backgrounded tabs).
- Responsive layout uses `repeat(auto-fit, minmax(...))` grids + `clamp()`, minimal media queries.
- Adding/changing a pipeline stage = edit `src/data/site.ts` (`FEATURES`); add a new icon = add a path in `Icon.astro`.
- License: Proprietary (Copyright Intellica).
