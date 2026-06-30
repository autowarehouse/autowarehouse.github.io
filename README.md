# AutoWarehouse.ai

Marketing website for **AutoWarehouse** — an AI-powered, model-first Data Warehouse Automation Platform by [Intellica](https://www.intellica.net).

**Live:** [autowarehouse.ai](https://autowarehouse.ai)

## Overview

AutoWarehouse automates the entire data warehouse lifecycle: connect any source, apply a governed DataModel, let an AI agent map and build the ETL pipeline (with human approval at every gate), then query results in natural language. The homepage tells that story as a **playable 10-station build mission**; the rest of the site is a conventional, industrial-themed marketing site.

### Pages

| Page            | Route                | Description                                                    |
| --------------- | -------------------- | -------------------------------------------------------------- |
| Home            | `/`                  | Hero + interactive build game + model-first proof + governance |
| Platform        | `/platform`          | Architecture, tech stack, security, isolation, deployment      |
| Features        | `/features/[slug]`   | 5 pipeline stages (dynamic route from `src/data/site.ts`)      |
| Use Cases       | `/use-cases`         | Three adoption paths with real-world scenarios                 |
| Pricing         | `/pricing`           | Enterprise tiers + FAQ                                         |
| About           | `/about`             | Company story, timeline, industries                            |
| Contact         | `/contact`           | Demo request form (Web3Forms)                                  |
| Privacy / Terms | `/privacy`, `/terms` | Legal                                                          |

## Tech Stack

| Technology                              | Version | Purpose                                        |
| --------------------------------------- | ------- | ---------------------------------------------- |
| [Astro](https://astro.build)            | 7.0     | Static site framework (SSG)                    |
| [Tailwind CSS](https://tailwindcss.com) | 4.3     | Styling via `@tailwindcss/vite`                |
| [Bun](https://bun.sh)                   | 1.3.14  | Package manager + test runner (`.bun-version`) |
| Node.js                                 | 22.12+  | Toolchain runtime (CI uses Node 24)            |

The interactive game and theme toggle are **vanilla TypeScript islands** — no UI framework.

## Getting Started

```bash
bun install        # install deps (also wires git hooks via `prepare`)
bun run dev        # dev server → http://localhost:4321
bun run build      # production build → dist/
bun run preview    # preview the production build
```

## Quality Gate

A single `gate` script is the contract — the same checks run in the `pre-push` hook and in CI:

```bash
bun run gate   # typecheck → format → lint → knip → test
```

| Stage       | Tool                          | What it checks                             |
| ----------- | ----------------------------- | ------------------------------------------ |
| `typecheck` | `astro check` + TypeScript    | Types across `.astro` + `.ts`              |
| `format`    | Prettier (+ astro & tailwind) | Formatting (`bun run format:fix` to apply) |
| `lint`      | oxlint                        | Correctness (errors), suspicious (warn)    |
| `knip`      | knip                          | Dead code / unused files & dependencies    |
| `test`      | `bun test`                    | Unit tests (`src/**/*.test.ts`)            |

Outside the gate (run in hooks/CI, advisory): `bun run secrets` (secretlint) and `bun run audit` (non-blocking — current advisories are transitive build-time deps with no static-site attack surface; Dependabot tracks upstream fixes).

**Git hooks** (`core.hooksPath .githooks`, wired by `bun install`):

- `pre-commit` → `secrets` + `format` (fast)
- `pre-push` → full `gate` + `audit` (advisory)

## Project Structure

```
src/
├── components/
│   ├── layout/   # Header, Footer
│   ├── ui/       # Logo (Agent Ribbon), ThemeToggle, Icon, SectionHeading, Stat
│   ├── home/     # HomeHero (model-first system map)
│   ├── game/     # WarehouseGame — the 10-station build mission (vanilla TS island)
│   └── common/   # CookieConsent
├── data/
│   ├── site.ts        # Single source of truth: features, nav, footer, contact
│   └── site.test.ts   # Data-integrity unit tests
├── layouts/      # BaseLayout (head/theme/SEO) → PageLayout (header+footer) → FeatureLayout
├── pages/        # index, platform, pricing, use-cases, about, contact, privacy, terms, features/[slug]
└── styles/
    └── global.css     # Design tokens (dark + light) + utilities + keyframes
```

## Design System

**Aesthetic:** industrial / blueprint / foundry. **Dark is default**, with a light "Work Order kraft" theme toggled via a header button (persisted in `localStorage`, applied before paint to avoid FOUC).

Every surface color is a CSS variable that flips between themes — never hardcode hex for theme surfaces/text:

- Surfaces: `--bg`, `--panel`, `--panel-2`, `--panel-3`
- Text: `--ink`, `--ink-muted`, `--ink-dim`, `--ink-faint`
- Accents: `--yellow`, `--orange`, `--green`, `--alert` (text on accent: `--on-accent`)
- Fonts: `--font-display` (Archivo), `--font-mono` (JetBrains Mono), `--font-body` (Space Grotesk)

**Key classes:** `.shell`, `.eyebrow`, `.btn` + `.btn-primary|accent|success|outline`, `.panel`, `.card-frame`, `.grid-bg`, `.hard-shadow`, `.caution-tape`, `.barcode`, `.highlight`, `.reveal` (zero-JS scroll reveal).

## Deployment

**Build verification** (`ci.yml`) runs on every PR and push to `main` — it runs the gate, secrets, audit, and build, but **does not deploy**.

**Production deploy** (`deploy.yml`) is gated on **publishing a GitHub Release** (or manual `workflow_dispatch`). Going live = create a git tag + GitHub release. Both workflows use Bun and pin every action to a commit SHA.

**Custom domain:** `autowarehouse.ai` via Cloudflare DNS → GitHub Pages (`public/CNAME`).

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   autowarehouse.github.io
```

Dependencies are kept current via Dependabot (Bun + GitHub Actions ecosystems).

## Adding / Editing Content

- **Pipeline stages & nav:** edit `src/data/site.ts` — `FEATURES` drives the Header dropdown, footer, and all `/features/[slug]` pages.
- **New icon:** add a path to `src/components/ui/Icon.astro` (stroke line-icon set).
- **Game data:** the mission's sources, mappings, and Talk-to-DWH Q&A live as constants in `src/components/game/WarehouseGame.astro`.

## i18n

English only. Astro i18n routing is configured (`locales: ['en']`) and ready for more locales.

## License

Proprietary. Copyright Intellica.
