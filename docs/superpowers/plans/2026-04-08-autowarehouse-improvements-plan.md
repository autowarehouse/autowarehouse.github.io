# AutoWarehouse.ai Website Improvements — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform AutoWarehouse.ai from a standalone product site into Intellica's flagship platform — adding corporate trust signals, use cases from real DWH expertise, SEO structured data, and new pages (About, Use Cases, Legal).

**Architecture:** Data-driven Astro 6.1 SSG. New content goes into `src/data/` files, new components into `src/components/`, new pages into `src/pages/`. All changes are additive — existing pages keep their structure, we add corporate layers and new pages on top.

**Tech Stack:** Astro 6.1, Tailwind CSS 4.2 (via Vite plugin), TypeScript (strict)

---

## Task 1: Add "by Intellica" Badge to Header

**Files:**
- Modify: `src/components/layout/Header.astro`

- [ ] **Step 1: Add Intellica sub-brand text to desktop logo**

In `src/components/layout/Header.astro`, replace the logo `<a>` block (lines 8-11):

```astro
<a href="/" class="flex items-center gap-2">
  <img src="/android-chrome-192x192.png" alt="AutoWarehouse" class="h-8 w-8" />
  <div class="flex flex-col">
    <span class="text-lg font-extrabold leading-tight text-white">Auto<span class="gradient-text">Warehouse</span></span>
    <span class="text-[9px] leading-tight tracking-wide text-slate-500">by <a href="https://www.intellica.net" target="_blank" rel="noopener" class="text-slate-400 hover:text-white transition-colors">Intellica</a></span>
  </div>
</a>
```

- [ ] **Step 2: Update mobile logo to match**

In the same file, the mobile menu also uses the logo in the Footer component — no mobile logo change needed since Header logo is shared. Verify by visual inspection.

- [ ] **Step 3: Build and verify**

Run: `pnpm build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.astro
git commit -m "feat: add 'by Intellica' sub-brand to header logo"
```

---

## Task 2: Enrich Footer with Corporate Info

**Files:**
- Modify: `src/components/layout/Footer.astro`

- [ ] **Step 1: Replace the Company column and add corporate info**

Replace the entire content of `src/components/layout/Footer.astro`:

```astro
---
const year = new Date().getFullYear();
---

<footer class="border-t border-white/[0.06] bg-[var(--bg-secondary)]">
  <div class="mx-auto max-w-6xl px-6 py-12">
    <div class="grid gap-8 md:grid-cols-4">
      <!-- Brand -->
      <div>
        <a href="/" class="flex items-center gap-2">
          <img src="/android-chrome-192x192.png" alt="" class="h-7 w-7" />
          <span class="text-lg font-extrabold text-white">Auto<span class="gradient-text">Warehouse</span></span>
        </a>
        <p class="mt-3 text-sm text-slate-400">
          AI-Powered Data Warehouse Automation Platform
        </p>
        <p class="mt-2 text-xs text-slate-500">
          An <a href="https://www.intellica.net" target="_blank" rel="noopener" class="text-slate-400 hover:text-white transition-colors">Intellica</a> product — A PiA Group Company
        </p>
      </div>

      <!-- Product -->
      <div>
        <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Product</h3>
        <ul class="space-y-2 text-sm text-slate-400">
          <li><a href="/platform" class="hover:text-white transition-colors">Platform</a></li>
          <li><a href="/features/source-connectors" class="hover:text-white transition-colors">Source Connectors</a></li>
          <li><a href="/features/data-model-engine" class="hover:text-white transition-colors">Data Model Engine</a></li>
          <li><a href="/features/intelligent-mapping" class="hover:text-white transition-colors">Intelligent Mapping</a></li>
          <li><a href="/features/etl-engine" class="hover:text-white transition-colors">ETL Engine</a></li>
          <li><a href="/features/analytics" class="hover:text-white transition-colors">Analytics</a></li>
        </ul>
      </div>

      <!-- Resources -->
      <div>
        <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Resources</h3>
        <ul class="space-y-2 text-sm text-slate-400">
          <li><a href="/use-cases" class="hover:text-white transition-colors">Use Cases</a></li>
          <li><a href="/pricing" class="hover:text-white transition-colors">Pricing</a></li>
          <li><a href="https://github.com/autowarehouse/autowarehouse" target="_blank" rel="noopener" class="hover:text-white transition-colors">GitHub</a></li>
          <li><a href="/contact" class="hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Company</h3>
        <ul class="space-y-2 text-sm text-slate-400">
          <li><a href="/about" class="hover:text-white transition-colors">About</a></li>
          <li><a href="https://www.intellica.net" target="_blank" rel="noopener" class="hover:text-white transition-colors">Intellica</a></li>
          <li><a href="https://www.intellica.net/careers" target="_blank" rel="noopener" class="hover:text-white transition-colors">Careers</a></li>
          <li><a href="https://www.linkedin.com/company/intellica" target="_blank" rel="noopener" class="hover:text-white transition-colors">LinkedIn</a></li>
        </ul>
        <div class="mt-4 space-y-1 text-xs text-slate-500">
          <div>+90 216 688 45 46</div>
          <div>info@intellica.net</div>
        </div>
      </div>
    </div>

    <div class="mt-12 flex flex-col items-center gap-2 border-t border-white/[0.06] pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
      <span>&copy; {year} Intellica. All rights reserved.</span>
      <div class="flex gap-4">
        <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.astro
git commit -m "feat: enrich footer with corporate info, legal links, and contact details"
```

---

## Task 3: Create Client Logos Component

**Files:**
- Create: `src/components/common/ClientLogos.astro`

- [ ] **Step 1: Create the client logos strip component**

Create `src/components/common/ClientLogos.astro`:

```astro
---
const clients = [
  'Akbank', 'Vodafone', 'Turkcell', 'Yapı Kredi',
  'ING', 'DenizBank', 'Türk Telekom', 'T-Mobile',
  'LC Waikiki', 'Garanti BBVA',
];
---

<section class="border-y border-white/[0.06] bg-[var(--bg-secondary)] py-10">
  <div class="mx-auto max-w-5xl px-6">
    <p class="mb-6 text-center text-[10px] font-semibold uppercase tracking-[3px] text-slate-500">
      Trusted by enterprises powered by Intellica
    </p>
    <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      {clients.map((name) => (
        <span class="text-sm font-medium text-slate-600 transition-colors hover:text-slate-400">
          {name}
        </span>
      ))}
    </div>
  </div>
</section>
```

> Note: Text-based logos for now. Can be replaced with actual SVG/PNG logos later.

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/ClientLogos.astro
git commit -m "feat: add client logos strip component"
```

---

## Task 4: Create Trust Metrics Component

**Files:**
- Create: `src/components/common/TrustMetrics.astro`

- [ ] **Step 1: Create the trust metrics component**

Create `src/components/common/TrustMetrics.astro`:

```astro
---
const metrics = [
  { value: '2006', label: 'Established' },
  { value: '450+', label: 'Data & AI Professionals' },
  { value: '80+', label: 'Enterprise Projects' },
  { value: '20+', label: 'Countries' },
];
---

<div class="mx-auto max-w-4xl px-6 py-10">
  <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
    {metrics.map((m) => (
      <div class="text-center">
        <div class="text-2xl font-extrabold text-white md:text-3xl">{m.value}</div>
        <div class="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{m.label}</div>
      </div>
    ))}
  </div>
  <p class="mt-6 text-center text-xs text-slate-500">
    Backed by <a href="https://www.intellica.net" target="_blank" rel="noopener" class="text-slate-400 hover:text-white transition-colors">Intellica</a> — nearly two decades of enterprise data platform delivery
  </p>
</div>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/common/TrustMetrics.astro
git commit -m "feat: add trust metrics component with Intellica credentials"
```

---

## Task 5: Integrate Client Logos & Trust Metrics into Home Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add imports and components between HeroSection and PipelineBar**

Replace the full content of `src/pages/index.astro`:

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
import HeroSection from '@components/home/HeroSection.astro';
import ClientLogos from '@components/common/ClientLogos.astro';
import TrustMetrics from '@components/common/TrustMetrics.astro';
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
  <ClientLogos />
  <TrustMetrics />

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

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds, 10 pages generated (9 existing + counting).

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add client logos and trust metrics to home page"
```

---

## Task 6: Create Use Case Data File

**Files:**
- Create: `src/data/use-cases.ts`

- [ ] **Step 1: Create the use case data file with 3 DWH scenarios**

Create `src/data/use-cases.ts`:

```typescript
export interface UseCaseCapability {
  title: string;
  description: string;
}

export interface UseCase {
  id: string;
  number: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  scenario: string;
  capabilities: UseCaseCapability[];
  outcome: string;
}

export const useCases: UseCase[] = [
  {
    id: 'ready-made-model',
    number: 1,
    icon: '📦',
    title: 'Deploy a Ready-Made Industry Model',
    subtitle: 'From zero to analytics-ready DWH in days, not months',
    description:
      'Your organization needs a data warehouse but has no existing model. Pick a battle-tested industry template — Finance (IFDM), Telecom (ITDM), HR (HRDM), or others — and deploy a fully structured star-schema DWH with pre-built dimensions, fact tables, and SCD Type 2 handling.',
    scenario:
      'A mid-size bank wants to consolidate regulatory reporting. They connect their core banking system, select the IFDM (Finance Data Model), and AutoWarehouse instantly provisions Foundation, Analytical, and Semantic layers. The ETL Code Generator exports production-ready Airflow DAGs and dbt models — deployed to the bank\'s own infrastructure within a week.',
    capabilities: [
      {
        title: 'Industry Templates',
        description:
          'Pre-built data models refined across 80+ enterprise projects: Finance (IFDM), Telecom (ITDM), HR (HRDM), and custom. Each includes star-schema design with dimensions, facts, bridges, and SCD Type 2 patterns.',
      },
      {
        title: 'Database DNA Report',
        description:
          'Connect your source systems and get a comprehensive discovery report: table row counts, column profiling (nulls, uniques, cardinality), heavily-used vs. zero-record tables, reference/lookup table detection, anomaly flags — the full DNA of your data landscape.',
      },
      {
        title: 'Deterministic Code Generation',
        description:
          'Generate production-ready ETL code with zero AI hallucination. Plugin-based exporters for Airflow, dbt, Snowflake, Spark, and PL/SQL. Each plugin is independently versioned and licensable — new plugins never break existing ones.',
      },
    ],
    outcome:
      'Analytics-ready data warehouse with production ETL code, deployed on your own infrastructure. Weeks instead of months.',
  },
  {
    id: 'extend-existing-model',
    number: 2,
    icon: '🔧',
    title: 'Extend & Customize an Existing Model',
    subtitle: 'Evolve your DWH with new requirements — without starting over',
    description:
      'You already have a data model or a partial warehouse. Import it, overlay new business requirements, and let AutoWarehouse extend the model — adding dimensions, facts, or entire subject areas while preserving what already works.',
    scenario:
      'A telecom operator has been running ITDM for 3 years. New regulatory requirements demand a customer churn prediction subject area. They import their existing model, add new source tables from the CRM, and use the table-level mapping screen to see the full source-to-target picture. The AI suggests column mappings for new tables while preserving all existing mappings. A "Save as New Version" snapshot ensures rollback safety. The ETL plugin generates incremental dbt models that slot into their existing pipeline.',
    capabilities: [
      {
        title: 'Source-to-Target Table Mapping',
        description:
          'Before diving into column details, get the big picture: a full table-level mapping view showing every source table matched to its target. Spot gaps at a glance — no table gets left behind. This is traditionally done at project kickoff and ensures completeness from day one.',
      },
      {
        title: 'Similar Column Detection',
        description:
          'During column mapping, the sidebar highlights columns with similar or identical names across all source tables: "customer_rep", "branch_rep", "phone_number" — making it easy to identify join candidates, duplicates, and standardization opportunities.',
      },
      {
        title: 'Model Versioning',
        description:
          'Save your data model as a new copy at any point. Branch, experiment, and compare model versions without risk. Every mapping project maintains full version history with change tracking.',
      },
    ],
    outcome:
      'Extended data model with surgical precision — new subject areas integrated without disrupting existing production pipelines.',
  },
  {
    id: 'build-from-scratch',
    number: 3,
    icon: '🏗️',
    title: 'Build from Scratch with AI Discovery',
    subtitle: 'From business requirements to a fully modeled DWH — AI-assisted, human-approved',
    description:
      'No existing model, complex source systems, specific business requirements. AutoWarehouse connects to your sources, generates a comprehensive Database DNA report, helps you design the target model from discovered insights, and maps everything — with human review and approval at every step.',
    scenario:
      'A manufacturing conglomerate with 12 ERP instances across 4 countries needs a unified analytics platform. AutoWarehouse connects to all source systems and generates a Database DNA report: 2,400 tables profiled, 847 identified as actively used, 340 flagged as reference/lookup tables, 198 anomalies detected. The AI generates a comprehensive database dictionary with column-level documentation. Data engineers review and approve the discovery. They design a custom target model using insights from the DNA report, map all 847 active tables, and export PL/SQL ETL scripts and Spark jobs — all verified and approved before any code touches production.',
    capabilities: [
      {
        title: 'Comprehensive Database Discovery',
        description:
          'Inductive analysis across all connected databases: row counts, column-level profiling (null rates, unique counts, min/max, cardinality), anomaly detection, heavily-used table identification, zero-record table flagging, reference table classification. An interactive, customer-facing report that serves as the DNA of your entire data landscape.',
      },
      {
        title: 'AI-Generated Database Dictionary',
        description:
          'Automatic documentation for every table and column: inferred descriptions, data type analysis, relationship detection, quality scores. All AI-generated content goes through human review and approval workflows before it becomes official documentation.',
      },
      {
        title: 'Data Quality Dashboard',
        description:
          'Real-time status across all databases and source systems: null percentages, record counts, unique value distributions, anomaly alerts, completeness scores. A single screen that tells you the health of every table in your ecosystem — reviewed and approved by your data team.',
      },
      {
        title: 'Plugin-Based ETL Export',
        description:
          'Deterministic code generation — no AI in the ETL output. Choose your target platform: Airflow DAGs, dbt models, Snowflake SQL, Spark jobs, or PL/SQL packages. Each exporter is an independent plugin: separately versioned, separately licensable, and guaranteed not to break when new plugins are added.',
      },
    ],
    outcome:
      'A fully documented, quality-assessed, mapped, and code-generated DWH — built from scratch with full traceability from source discovery to production deployment.',
  },
];
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds (data file is just TypeScript, no page references it yet).

- [ ] **Step 3: Commit**

```bash
git add src/data/use-cases.ts
git commit -m "feat: add use case data with 3 DWH scenarios from domain expertise"
```

---

## Task 7: Create Use Cases Page

**Files:**
- Create: `src/pages/use-cases.astro`

- [ ] **Step 1: Create the use cases page**

Create `src/pages/use-cases.astro`:

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
import Badge from '@components/ui/Badge.astro';
import Button from '@components/ui/Button.astro';
import GradientOrb from '@components/ui/GradientOrb.astro';
import { useCases } from '@data/use-cases';

const entryPoints = [
  { icon: '📦', label: 'Use a ready-made industry model', color: 'var(--step-connect)' },
  { icon: '🔧', label: 'Extend an existing model with new requirements', color: 'var(--step-model)' },
  { icon: '🏗️', label: 'Build from scratch — discover, model, map, generate', color: 'var(--step-execute)' },
];
---

<PageLayout
  title="Use Cases"
  description="Three paths to your data warehouse: deploy a ready-made model, extend an existing one, or build from scratch with AI-assisted discovery. Real enterprise scenarios backed by 20 years of DWH expertise."
>
  <!-- Hero -->
  <section class="relative overflow-hidden py-20">
    <GradientOrb color="blue" size="400px" position="top: -100px; right: -100px;" />
    <GradientOrb color="purple" size="300px" position="bottom: -80px; left: -60px;" />
    <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
      <Badge>Use Cases</Badge>
      <h1 class="mt-4 text-3xl font-extrabold text-white md:text-5xl">
        Three Paths to Your <span class="gradient-text">Data Warehouse</span>
      </h1>
      <p class="mt-4 text-base text-slate-400 md:text-lg">
        Every DWH project starts differently. AutoWarehouse meets you where you are — whether you need a turnkey deployment, an incremental extension, or a greenfield build from source discovery.
      </p>
    </div>
  </section>

  <!-- 3 Entry Points Overview -->
  <section class="bg-[var(--bg-secondary)] py-12">
    <div class="mx-auto max-w-4xl px-6">
      <div class="grid gap-4 md:grid-cols-3">
        {entryPoints.map((ep, i) => (
          <a href={`#use-case-${i + 1}`} class="glass-card rounded-xl p-5 text-center transition-all hover:scale-[1.02]">
            <div class="text-2xl">{ep.icon}</div>
            <div class="mt-2 text-xs font-semibold text-white">{ep.label}</div>
          </a>
        ))}
      </div>
    </div>
  </section>

  <!-- Use Cases -->
  {useCases.map((uc) => (
    <section id={`use-case-${uc.number}`} class:list={['py-16', uc.number % 2 === 0 ? 'bg-[var(--bg-secondary)]' : '']}>
      <div class="mx-auto max-w-5xl px-6">
        <!-- Header -->
        <div class="mb-10 text-center">
          <span class="text-3xl">{uc.icon}</span>
          <div class="mt-2 text-[10px] font-semibold uppercase tracking-[3px] text-slate-500">
            Entry Point {uc.number}
          </div>
          <h2 class="mt-2 text-2xl font-extrabold text-white md:text-3xl">{uc.title}</h2>
          <p class="mt-2 text-sm font-medium text-slate-300">{uc.subtitle}</p>
          <p class="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">{uc.description}</p>
        </div>

        <!-- Scenario -->
        <div class="glass-card mx-auto mb-10 max-w-3xl rounded-xl p-6">
          <div class="mb-2 text-[10px] font-semibold uppercase tracking-[2px] text-slate-500">
            Real-World Scenario
          </div>
          <p class="text-sm leading-relaxed text-slate-300">{uc.scenario}</p>
        </div>

        <!-- Capabilities -->
        <div class="grid gap-4 md:grid-cols-2">
          {uc.capabilities.map((cap) => (
            <div class="glass-card rounded-xl p-5">
              <h3 class="text-sm font-semibold text-white">{cap.title}</h3>
              <p class="mt-2 text-xs leading-relaxed text-slate-400">{cap.description}</p>
            </div>
          ))}
        </div>

        <!-- Outcome -->
        <div class="mt-8 rounded-lg border border-green-500/20 bg-green-500/5 px-5 py-3 text-center">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-green-400">Outcome: </span>
          <span class="text-sm text-green-300">{uc.outcome}</span>
        </div>
      </div>
    </section>
  ))}

  <!-- Cross-cutting Features -->
  <section class="py-16">
    <div class="mx-auto max-w-5xl px-6">
      <h2 class="mb-8 text-center text-2xl font-extrabold text-white">
        Across All Scenarios
      </h2>
      <div class="grid gap-4 md:grid-cols-3">
        <div class="glass-card rounded-xl p-5 text-center">
          <div class="text-2xl">🔒</div>
          <h3 class="mt-2 text-sm font-semibold text-white">Deterministic ETL</h3>
          <p class="mt-1 text-xs text-slate-400">Code generation is 100% deterministic — no AI in the output. Every generated pipeline is predictable, auditable, and production-safe.</p>
        </div>
        <div class="glass-card rounded-xl p-5 text-center">
          <div class="text-2xl">🧩</div>
          <h3 class="mt-2 text-sm font-semibold text-white">Plugin Architecture</h3>
          <p class="mt-1 text-xs text-slate-400">Each ETL exporter (Airflow, dbt, Snowflake, Spark, PL/SQL) is an independent plugin. Separately versioned, separately licensable, backward-compatible.</p>
        </div>
        <div class="glass-card rounded-xl p-5 text-center">
          <div class="text-2xl">👁️</div>
          <h3 class="mt-2 text-sm font-semibold text-white">Human-in-the-Loop</h3>
          <p class="mt-1 text-xs text-slate-400">AI assists discovery and mapping. Humans review, approve, and control. Nothing reaches production without explicit approval.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-gradient-to-br from-indigo-950 to-[var(--bg-primary)] py-16 text-center">
    <div class="mx-auto max-w-2xl px-6">
      <h2 class="text-2xl font-extrabold text-white">Which path fits your project?</h2>
      <p class="mt-3 text-sm text-slate-400">Tell us about your data warehouse needs. We'll show you the fastest path to production.</p>
      <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button href="/contact">Request Demo</Button>
        <Button href="/platform" variant="ghost">Explore Platform</Button>
      </div>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds, now 10 pages generated.

- [ ] **Step 3: Commit**

```bash
git add src/pages/use-cases.astro
git commit -m "feat: add use cases page with 3 DWH entry-point scenarios"
```

---

## Task 8: Update Navigation with Use Cases

**Files:**
- Modify: `src/data/navigation.ts`

- [ ] **Step 1: Add Use Cases to the main nav**

Replace the content of `src/data/navigation.ts`:

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
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: 'https://github.com/autowarehouse/autowarehouse' },
];
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds. Header nav now shows "Use Cases" link.

- [ ] **Step 3: Commit**

```bash
git add src/data/navigation.ts
git commit -m "feat: add Use Cases to main navigation"
```

---

## Task 9: Create About Page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create the about page**

Create `src/pages/about.astro`:

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
import Badge from '@components/ui/Badge.astro';
import GradientOrb from '@components/ui/GradientOrb.astro';
import TrustMetrics from '@components/common/TrustMetrics.astro';
import ClientLogos from '@components/common/ClientLogos.astro';

const timeline = [
  { year: '2006', event: 'Intellica founded by Dr. Kemal Unaltuna and Can Alhas' },
  { year: '2010s', event: 'Industry data models launched: IFDM (Finance), ITDM (Telecom), HRDM (HR)' },
  { year: '2020s', event: 'AI product portfolio: Talk To, Blue Octopus, VAR' },
  { year: '2025', event: 'AutoWarehouse — the convergence of 20 years of data platform expertise into one AI-powered platform' },
];

const industries = [
  { icon: '🏦', name: 'Banking & Finance' },
  { icon: '📡', name: 'Telecommunications' },
  { icon: '🏛️', name: 'Public Sector' },
  { icon: '🏭', name: 'Manufacturing' },
  { icon: '⚡', name: 'Energy' },
  { icon: '🛒', name: 'Retail' },
  { icon: '🛡️', name: 'Insurance' },
];
---

<PageLayout
  title="About"
  description="AutoWarehouse is built by Intellica — a Data & AI company with 450+ professionals, 80+ enterprise projects, and nearly two decades of data warehouse expertise across 20+ countries."
>
  <!-- Hero -->
  <section class="relative overflow-hidden py-20">
    <GradientOrb color="blue" size="400px" position="top: -100px; right: -100px;" />
    <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
      <Badge>About</Badge>
      <h1 class="mt-4 text-3xl font-extrabold text-white md:text-5xl">
        20 Years of Data Expertise,
        <span class="gradient-text">One Platform</span>
      </h1>
      <p class="mt-4 text-base text-slate-400 md:text-lg">
        AutoWarehouse is the culmination of nearly two decades of enterprise data platform delivery.
        Built by Intellica — a PiA Group company — it brings proven industry models, AI-powered discovery, and deterministic code generation into a single, unified platform.
      </p>
    </div>
  </section>

  <!-- Trust Metrics -->
  <TrustMetrics />

  <!-- Story -->
  <section class="bg-[var(--bg-secondary)] py-16">
    <div class="mx-auto max-w-3xl px-6">
      <h2 class="mb-8 text-center text-2xl font-extrabold text-white">Our Journey</h2>
      <div class="space-y-6">
        {timeline.map((t) => (
          <div class="flex gap-4">
            <div class="w-16 shrink-0 text-right text-sm font-bold text-blue-400">{t.year}</div>
            <div class="border-l border-white/10 pl-4 text-sm text-slate-400">{t.event}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Why AutoWarehouse -->
  <section class="py-16">
    <div class="mx-auto max-w-4xl px-6">
      <h2 class="mb-4 text-center text-2xl font-extrabold text-white">Why AutoWarehouse?</h2>
      <p class="mx-auto mb-8 max-w-2xl text-center text-sm text-slate-400">
        After building 80+ enterprise data platforms manually, we identified the patterns that repeat across every project.
        AutoWarehouse automates those patterns while preserving the engineering rigor our clients expect.
      </p>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="glass-card rounded-xl p-5">
          <h3 class="text-sm font-semibold text-white">Battle-Tested Models</h3>
          <p class="mt-2 text-xs text-slate-400">IFDM, ITDM, HRDM — industry data models refined across dozens of enterprise deployments. Not theoretical frameworks — production-proven schemas.</p>
        </div>
        <div class="glass-card rounded-xl p-5">
          <h3 class="text-sm font-semibold text-white">AI Where It Helps, Not Where It Hurts</h3>
          <p class="mt-2 text-xs text-slate-400">AI assists in discovery, documentation, and mapping suggestions. But ETL code generation is 100% deterministic — no hallucinations in your production pipeline.</p>
        </div>
        <div class="glass-card rounded-xl p-5">
          <h3 class="text-sm font-semibold text-white">Your Infrastructure, Your Control</h3>
          <p class="mt-2 text-xs text-slate-400">AutoWarehouse generates code for your stack: Airflow, dbt, Snowflake, Spark, PL/SQL. You deploy it. You run it. No vendor lock-in.</p>
        </div>
        <div class="glass-card rounded-xl p-5">
          <h3 class="text-sm font-semibold text-white">Enterprise-Grade Delivery</h3>
          <p class="mt-2 text-xs text-slate-400">Backed by Intellica's delivery methodology: Discovery & GAP Analysis → Architecture → Implementation → Go-Live → Operations. Proven across 20+ countries.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Industries -->
  <section class="bg-[var(--bg-secondary)] py-16">
    <div class="mx-auto max-w-4xl px-6">
      <h2 class="mb-8 text-center text-2xl font-extrabold text-white">Industry Experience</h2>
      <div class="flex flex-wrap justify-center gap-4">
        {industries.map((ind) => (
          <div class="glass-card rounded-lg px-5 py-3 text-center">
            <span class="text-lg">{ind.icon}</span>
            <div class="mt-1 text-xs font-medium text-slate-300">{ind.name}</div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Client Logos -->
  <ClientLogos />
</PageLayout>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds, 11 pages generated.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add about page with Intellica history, industry expertise, and trust signals"
```

---

## Task 10: Update Contact Page with Real Info

**Files:**
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Add Intellica contact details to the info panel**

In `src/pages/contact.astro`, replace the `<!-- Info -->` div (the second column, lines 25-39):

```astro
        <!-- Info -->
        <div class="flex flex-col justify-center gap-4">
          <div class="glass-card rounded-xl p-6">
            <h3 class="mb-4 text-sm font-semibold text-white">Contact Information</h3>
            <div class="space-y-4 text-sm text-slate-400">
              <div>
                <div class="text-xs font-medium text-slate-500">Phone</div>
                <div class="text-slate-300">+90 216 688 45 46</div>
              </div>
              <div>
                <div class="text-xs font-medium text-slate-500">Email</div>
                <a href="mailto:info@intellica.net" class="text-blue-400 hover:text-blue-300">info@intellica.net</a>
              </div>
              <div>
                <div class="text-xs font-medium text-slate-500">Office</div>
                <div class="text-slate-300">Atatürk Mah. Turgut Özal Blv.<br/>Gardenya 1 Plaza, Floor 1<br/>Ataşehir, Istanbul, Turkey</div>
              </div>
            </div>
          </div>

          <div class="glass-card rounded-xl p-6">
            <h3 class="mb-4 text-sm font-semibold text-white">Other Resources</h3>
            <div class="space-y-4 text-sm text-slate-400">
              <div>
                <div class="text-xs font-medium text-slate-500">Company</div>
                <a href="https://www.intellica.net" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300">Intellica</a>
              </div>
              <div>
                <div class="text-xs font-medium text-slate-500">GitHub</div>
                <a href="https://github.com/autowarehouse/autowarehouse" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300">autowarehouse/autowarehouse</a>
              </div>
              <div>
                <div class="text-xs font-medium text-slate-500">LinkedIn</div>
                <a href="https://www.linkedin.com/company/intellica" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300">Intellica on LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add Intellica contact info, address, and LinkedIn to contact page"
```

---

## Task 11: Create Privacy & Terms Placeholder Pages

**Files:**
- Create: `src/pages/privacy.astro`
- Create: `src/pages/terms.astro`

- [ ] **Step 1: Create privacy policy placeholder**

Create `src/pages/privacy.astro`:

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
---

<PageLayout title="Privacy Policy" description="Privacy policy for AutoWarehouse by Intellica.">
  <section class="py-20">
    <div class="mx-auto max-w-3xl px-6">
      <h1 class="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p class="mt-4 text-sm text-slate-400">
        AutoWarehouse is a product of Intellica (a PiA Group company). This privacy policy will be updated with
        full details regarding data collection, processing, and storage practices.
      </p>
      <p class="mt-4 text-sm text-slate-400">
        For questions about privacy, contact us at
        <a href="mailto:info@intellica.net" class="text-blue-400 hover:text-blue-300">info@intellica.net</a>.
      </p>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 2: Create terms of service placeholder**

Create `src/pages/terms.astro`:

```astro
---
import PageLayout from '@layouts/PageLayout.astro';
---

<PageLayout title="Terms of Service" description="Terms of service for AutoWarehouse by Intellica.">
  <section class="py-20">
    <div class="mx-auto max-w-3xl px-6">
      <h1 class="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p class="mt-4 text-sm text-slate-400">
        AutoWarehouse is a product of Intellica (a PiA Group company). Terms of service will be updated with
        full licensing terms, usage policies, and service level agreements.
      </p>
      <p class="mt-4 text-sm text-slate-400">
        For licensing inquiries, contact us at
        <a href="mailto:info@intellica.net" class="text-blue-400 hover:text-blue-300">info@intellica.net</a>.
      </p>
    </div>
  </section>
</PageLayout>
```

- [ ] **Step 3: Build and verify**

Run: `pnpm build`
Expected: Build succeeds, 13 pages generated.

- [ ] **Step 4: Commit**

```bash
git add src/pages/privacy.astro src/pages/terms.astro
git commit -m "feat: add privacy policy and terms of service placeholder pages"
```

---

## Task 12: Add "Powered by Intellica" Badges to Feature Pages

**Files:**
- Modify: `src/components/features/FeatureHero.astro`

- [ ] **Step 1: Add Intellica provenance badge to feature hero**

Replace the content of `src/components/features/FeatureHero.astro`:

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
  poweredBy?: string;
}

const { stepNumber, stepLabel, color, title, description, poweredBy } = Astro.props;
---

<section class="relative overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] py-20">
  <GradientOrb color="blue" size="400px" position="top: -100px; right: -100px;" />
  <GradientOrb color="purple" size="300px" position="bottom: -80px; left: -60px;" />

  <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
    <Badge color={color}>Step {stepNumber} — {stepLabel}</Badge>
    <h1 class="mt-4 text-3xl font-extrabold text-white md:text-5xl">{title}</h1>
    <p class="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">{description}</p>
    {poweredBy && (
      <p class="mt-3 text-xs text-slate-500">
        Powered by Intellica's {poweredBy}
      </p>
    )}
  </div>
</section>
```

- [ ] **Step 2: Update FeatureLayout to pass poweredBy prop**

In `src/layouts/FeatureLayout.astro`, update the FeatureHero usage. Replace the full file:

```astro
---
import PageLayout from './PageLayout.astro';
import FeatureHero from '@components/features/FeatureHero.astro';
import CapabilityGrid from '@components/features/CapabilityGrid.astro';
import NextStepCTA from '@components/features/NextStepCTA.astro';
import type { FeaturePageData } from '@data/features';

interface Props {
  feature: FeaturePageData;
  poweredBy?: string;
}

const { feature, poweredBy } = Astro.props;
---

<PageLayout title={feature.title} description={feature.description}>
  <FeatureHero
    stepNumber={feature.stepNumber}
    stepLabel={feature.stepLabel}
    color={feature.color}
    title={feature.title}
    description={feature.description}
    poweredBy={poweredBy}
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

- [ ] **Step 3: Add poweredBy to feature page files**

In `src/pages/features/data-model-engine.astro`, add the `poweredBy` prop to the FeatureLayout:

Find the `<FeatureLayout feature={feature}` tag and change to:
```astro
<FeatureLayout feature={feature} poweredBy="proven IFDM, ITDM, HRDM industry models">
```

In `src/pages/features/analytics.astro`, add:
```astro
<FeatureLayout feature={feature} poweredBy="Talk To natural language technology">
```

In `src/pages/features/etl-engine.astro`, add:
```astro
<FeatureLayout feature={feature} poweredBy="enterprise-grade orchestration engine">
```

Leave `source-connectors.astro` and `intelligent-mapping.astro` without `poweredBy` (no direct Intellica product mapping).

- [ ] **Step 4: Build and verify**

Run: `pnpm build`
Expected: Build succeeds. Feature pages now show provenance badges.

- [ ] **Step 5: Commit**

```bash
git add src/components/features/FeatureHero.astro src/layouts/FeatureLayout.astro src/pages/features/data-model-engine.astro src/pages/features/analytics.astro src/pages/features/etl-engine.astro
git commit -m "feat: add 'Powered by Intellica' provenance badges to feature pages"
```

---

## Task 13: Add Ecosystem Section to Platform Page

**Files:**
- Modify: `src/pages/platform.astro`

- [ ] **Step 1: Add Intellica Ecosystem section before the Deployment section**

In `src/pages/platform.astro`, add a new section between the Security section (line 67) and the Deployment section (line 69). Insert after the closing `</section>` of Security and before `<!-- Deployment -->`:

```astro
  <!-- Intellica Ecosystem -->
  <section class="py-16">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="mb-3 text-center text-2xl font-extrabold text-white">Intellica Ecosystem</h2>
      <p class="mb-8 text-center text-sm text-slate-400">
        AutoWarehouse integrates with and builds upon Intellica's proven product family
      </p>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="glass-card rounded-xl p-5">
          <div class="text-xs font-semibold text-blue-400">Data Models</div>
          <div class="mt-1 text-sm font-semibold text-white">IFDM · ITDM · HRDM</div>
          <p class="mt-2 text-xs text-slate-400">Industry-standard warehouse models for Finance, Telecom, and HR — refined across dozens of deployments</p>
        </div>
        <div class="glass-card rounded-xl p-5">
          <div class="text-xs font-semibold text-purple-400">Quality</div>
          <div class="mt-1 text-sm font-semibold text-white">ICC</div>
          <p class="mt-2 text-xs text-slate-400">Central data consistency management — reconciliation rules, quality gates, and drift monitoring</p>
        </div>
        <div class="glass-card rounded-xl p-5">
          <div class="text-xs font-semibold text-pink-400">NL Analytics</div>
          <div class="mt-1 text-sm font-semibold text-white">Talk To</div>
          <p class="mt-2 text-xs text-slate-400">Natural language data interaction — ask questions, get SQL queries and visualizations instantly</p>
        </div>
        <div class="glass-card rounded-xl p-5">
          <div class="text-xs font-semibold text-green-400">Orchestration</div>
          <div class="mt-1 text-sm font-semibold text-white">Orqenta</div>
          <p class="mt-2 text-xs text-slate-400">Workflow orchestration and automation for regulated environments and complex data pipelines</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds. Platform page now includes ecosystem section.

- [ ] **Step 3: Commit**

```bash
git add src/pages/platform.astro
git commit -m "feat: add Intellica Ecosystem section to platform page"
```

---

## Task 14: Add JSON-LD Structured Data to BaseLayout

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Add Organization and SoftwareApplication schema**

In `src/layouts/BaseLayout.astro`, add the following JSON-LD script block just before the closing `</head>` tag (before line 51):

```astro
    <!-- Structured Data -->
    <script type="application/ld+json" set:html={JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "Intellica",
          "url": "https://www.intellica.net",
          "logo": "https://www.intellica.net/img/intellica-logo.png",
          "foundingDate": "2006",
          "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 450 },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Atatürk Mah. Turgut Özal Blv. Gardenya 1 Plaza, Floor 1",
            "addressLocality": "Ataşehir, Istanbul",
            "addressCountry": "TR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-216-688-45-46",
            "email": "info@intellica.net",
            "contactType": "sales"
          },
          "sameAs": ["https://www.linkedin.com/company/intellica"]
        },
        {
          "@type": "SoftwareApplication",
          "name": "AutoWarehouse",
          "url": "https://autowarehouse.ai",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "description": description,
          "creator": { "@type": "Organization", "name": "Intellica", "url": "https://www.intellica.net" },
          "offers": { "@type": "Offer", "category": "Enterprise" }
        },
        {
          "@type": "WebSite",
          "name": "AutoWarehouse",
          "url": "https://autowarehouse.ai"
        }
      ]
    })} />
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds. View source of built HTML should contain valid JSON-LD.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add JSON-LD structured data (Organization, SoftwareApplication, WebSite)"
```

---

## Task 15: Update Meta Descriptions for All Pages

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/platform.astro`
- Modify: `src/pages/pricing.astro`
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Update meta descriptions with keyword-rich content**

In `src/pages/index.astro`, update the description prop:
```
description="AutoWarehouse by Intellica — AI-powered data warehouse automation. Connect any database, apply industry data models (IFDM, ITDM, HRDM), generate production-ready ETL code for Airflow, dbt, Snowflake, Spark. Backed by 20 years of enterprise DWH expertise."
```

In `src/pages/platform.astro`, update:
```
description="AutoWarehouse platform architecture: self-hosted, multi-tenant, AI-powered. Tech stack, security (AES-256-GCM, RBAC), deployment options, and Intellica ecosystem integration."
```

In `src/pages/pricing.astro`, update:
```
description="Enterprise pricing for AutoWarehouse by Intellica. Self-hosted or managed deployment. All features included, bring your own LLM, data stays on-premise."
```

In `src/pages/contact.astro`, update:
```
description="Request a demo of AutoWarehouse. Contact the Intellica team: +90 216 688 45 46, info@intellica.net. Ataşehir, Istanbul."
```

- [ ] **Step 2: Build and verify**

Run: `pnpm build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro src/pages/platform.astro src/pages/pricing.astro src/pages/contact.astro
git commit -m "feat: update meta descriptions with keyword-rich content and Intellica branding"
```

---

## Verification

After all tasks are complete:

- [ ] Run `pnpm build` — expect 13 pages (9 original + use-cases + about + privacy + terms)
- [ ] Run `pnpm preview` — manually check:
  - Header shows "by Intellica" under logo
  - Footer has full corporate info, legal links, phone/email
  - Home page: client logos strip + trust metrics between hero and pipeline
  - `/use-cases` — 3 scenarios with capabilities and outcomes
  - `/about` — timeline, trust metrics, industries, client logos
  - `/contact` — phone, email, address, LinkedIn
  - `/privacy` and `/terms` — placeholder pages render
  - Feature pages (`/features/data-model-engine`, `/features/analytics`, `/features/etl-engine`) — "Powered by Intellica" text visible
  - `/platform` — Intellica Ecosystem section visible
  - View source: JSON-LD block present in `<head>`
  - Navigation: "Use Cases" link visible in header
