# AutoWarehouse — Agent Handoff

A ready-to-use brief + context for handing this project to a coding/design agent (e.g. Claude Code) to continue developing.

---

## 1. PASTE-READY AGENT PROMPT

> Copy everything in this block into your agent.

```
You are continuing the AutoWarehouse marketing website — an interactive, game-like
landing page for an AI-powered Data Warehouse Automation Platform.

PRODUCT IN ONE LINE
AutoWarehouse turns a messy enterprise data estate into a governed data warehouse.
It is MODEL-FIRST: one governed DataModel (e.g. HRDM) is the center; discovery,
mapping, ETL, reporting, dashboards and Talk-to-DWH all read/write that one model.
An AI Agent does the work; a Data Engineer reviews/approves (human-in-the-loop);
a Business User asks natural-language questions.

WHAT EXISTS (prototype, in this repo)
- "AutoWarehouse Game.dc.html"  — the homepage. A playable 10-step build simulation
  (source select → agent discovery → engineer review → model & mapping → approve
  mappings → ETL build → approve ETL → DWH load → agent report → Talk-to-DWH),
  wrapped in a marketing frame (hero, model-first proof, governance, CTA).
- "AutoWarehouse Brand.dc.html" — logo system (Agent Ribbon), lockups, colorways,
  static usage mockups (slide / PDF / PPTX / favicon / card).
- "RibbonMark.dc.html"          — reusable static logo SVG component.
- "AutoWarehouse Logos.dc.html" — earlier logo exploration (reference only).
- "AutoWarehouse.dc.html"       — earlier hero direction exploration (reference only).
- "AGENT_HANDOFF.md"            — this file.

VISUAL SYSTEM (do not drift from this)
- Aesthetic: industrial / technical / schematic / blueprint. Bold, aggressive, NOT a
  generic AI-SaaS landing page. Conveyor/foundry metaphor; kinetic but purposeful.
- Dark theme (default): bg #16110c, panels #0d0a07 / #120d09, text #f3eedd.
- Accents: caution yellow #ffce1f (primary), forge orange #f25c1f (agent/action),
  ok green #41d18a (success/approve), alert #e0533c (issues).
- Light theme (Work Order kraft) — NOT yet built: bg #d9cdb4, panel #f1e9d6,
  ink #1c1206, orange #f25c1f. See "Pending work".
- Type: Archivo (700–900) + Anton for display; JetBrains Mono for labels/data;
  Space Grotesk for body. Google Fonts.
- Logo: "Agent Ribbon" — three stacked layers (foundation/analytical/semantic) with
  an orange ribbon (the AI agent) weaving through them. SVG in section 4 below.

TECH NOTE
The prototype is authored as "Design Components" (.dc.html) that render via a runtime.
For PRODUCTION, port to <YOUR STACK — e.g. Next.js + Tailwind, or Astro + React>:
- Recreate the game as a React component with a state machine (the 10 steps + per-step
  state). The current logic is a single class; mirror its state shape (section 5).
- Keep ALL copy, colors, fonts, animations and the model-first messaging identical.
- Animations that must run in a backgrounded tab use CSS keyframes or setInterval —
  NOT requestAnimationFrame / IntersectionObserver (both are throttled there).
- Make it responsive with auto-fit grids + clamp(); no fixed desktop-only widths.

YOUR TASKS (in priority order)
1. Port the homepage + game to <STACK> with pixel/behavior parity to the prototype.
2. Implement the light/dark theme toggle (dark default) — see "Pending work" for the
   token map and the Work Order kraft light hero treatment.
3. Wire real CTAs (book-a-review form), real nav routes, SEO/meta, analytics.
4. Replace mock data (sources, mappings, report numbers, Talk-to-DWH Q&A) with a
   small typed fixtures module so it's easy to swap for live API data later.
5. Accessibility pass: focus states, keyboard nav for the game steps, reduced-motion.

CONSTRAINTS
- Model-first message must stay central and explicit.
- Keep human-in-the-loop approval gates visible at every review step.
- Do not introduce a new visual language; extend the one above.
- Ask before adding new sections/content; don't pad with filler.
```

---

## 2. PROJECT FILES

| File | Role | Keep / port |
|---|---|---|
| `AutoWarehouse Game.dc.html` | **Homepage** — playable build sim + marketing frame | Primary — port to production |
| `AutoWarehouse Brand.dc.html` | Logo system + static usage sheet | Reference for brand rules |
| `RibbonMark.dc.html` | Reusable static logo SVG | Port to a `<Logo/>` component |
| `AutoWarehouse Logos.dc.html` | Logo exploration (10 + ribbon variants) | Reference only |
| `AutoWarehouse.dc.html` | Hero exploration (8 directions) | Reference only |
| `uploads/redesign.html` | Original wireframe brief | Reference only |

> `.dc.html` files open directly in a browser. A dev porting to React/Astro should read
> them for structure, copy, colors and animation timings, then reimplement natively.

---

## 3. DESIGN TOKENS

```json
{
  "dark": {
    "bg": "#16110c", "panel": "#0d0a07", "panel2": "#120d09",
    "ink": "#f3eedd", "inkMuted": "rgba(243,238,221,.6)",
    "line": "rgba(255,206,31,.25)",
    "yellow": "#ffce1f", "orange": "#f25c1f", "green": "#41d18a", "alert": "#e0533c"
  },
  "light_workorder": {
    "bg": "#d9cdb4", "panel": "#f1e9d6", "panel2": "#fbf7ee",
    "ink": "#1c1206", "inkMuted": "#5a4c34",
    "line": "rgba(28,18,6,.25)",
    "yellow": "#e0a000", "orange": "#f25c1f", "green": "#2f7d4f", "alert": "#b64036"
  },
  "fonts": {
    "display": "Archivo (700-900), Anton",
    "mono": "JetBrains Mono (400-700)",
    "body": "Space Grotesk (500-700)",
    "googleFontsHref": "https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
  },
  "radius": { "panel": "14px", "card": "11px", "pill": "999px" },
  "shadow": { "hard": "4px 4px 0 <accent>" }
}
```

---

## 4. LOGO — "Agent Ribbon" (canonical static SVG)

Three layers + an orange ribbon (the AI agent) weaving through them. `layer` and
`accent` are colors; for one-color print set `accent === layer`. On the web hero the
ribbon may animate a flowing comet (CSS dash); in static media it is a solid stroke.

```html
<svg viewBox="0 0 64 64" width="64" height="64">
  <polygon points="18,13 46,13 39,21 11,21" fill="none" stroke="{layer}" stroke-width="2.5"/>
  <polygon points="18,29 46,29 39,37 11,37" fill="none" stroke="{layer}" stroke-width="2.5"/>
  <polygon points="18,45 46,45 39,53 11,53" fill="none" stroke="{layer}" stroke-width="2.5"/>
  <path d="M10 17 C 30 17, 34 33, 54 33 C 34 33, 30 49, 10 49"
        fill="none" stroke="{accent}" stroke-width="3.6" stroke-linecap="round"/>
</svg>
```
- Wordmark: Archivo 800, `Auto` + `Warehouse` at 50% opacity. Tagline (mono):
  "agent flows · model holds".
- Brand mark elsewhere: hexagon `clip-path:polygon(25% 5%,75% 5%,100% 50%,75% 95%,25% 95%,0 50%)`
  with mono "AW".
- Clear space ≥ one layer-height; min 20px screen / 7mm print.

---

## 5. GAME STATE MODEL (mirror this when porting)

10 stations, each owned by AI / DE (Data Engineer) / BU (Business User):

1. Sources (DE)   — select ≥1 of: HR DB, CV Pool, Payroll, ATS, Excel, Ops APIs
2. Discovery (AI) — scan; emit schema/PII/entities/relationships; show results
3. Review (DE)    — approve discovery (human-in-the-loop)
4. Model & Map (AI) — pick HRDM; map source→target with confidence; flag 3 low-conf
5. Approve Map (DE) — "Fix" each flagged mapping, then approve
6. ETL Build (AI) — DAG nodes light up: DDL → Extract → SCD2 → Quality gates → Reports
7. Approve ETL (DE) — review plan (38 objects, SCD2, 7 gates, 21 tasks), start
8. DWH Load (AI)  — belt animation; warehouse tables go LIVE one by one
9. Report (AI)    — 21 jobs ok / 2 warnings / 0 issues / 100% QC + recommendations
10. Talk-to-DWH (BU) — pick NL question → show SQL → animated bar chart + insight

State shape (current prototype):
```
step:1..10, sources:{hrdb,cv,payroll,ats,excel,api: bool},
discTick/discRun/discDone/discApproved,
mapFixed:number[], mapApproved,
etlTick/etlRun/etlDone/etlApproved,
loadTick/loadRun/loadDone,
activeQ:number|null, done:bool
```
Auto-running steps (2,6,8) advance a `tick` counter via setInterval; UI derives
progress %, revealed log lines, node/table states from the tick.

HUD: progress bar, 3 character chips (active one highlighted), unlockable artifact
badges, vertical mission map. Hero shows a model-first architecture flow
(Sources → Discover → **Model core** → Deliver) with animated data packets and
human-approval gates.

Mock data (sources, mappings, report numbers, 3 Talk-to-DWH Q&A with SQL + chart
data + insight) lives in the logic class — extract to a fixtures module on port.

---

## 6. PROOF POINTS (must appear)

Multi-source discovery · AI-assisted mapping · Human-in-the-loop review ·
HRDM model templates · DAG-based ETL · SCD Type 2 · Quality gates ·
Agent-generated reports · NL-to-SQL (Talk-to-DWH) · RBAC + audit + tenant isolation.

---

## 7. PENDING WORK (not yet built)

**Light/dark theme toggle.** Dark is default and complete. To add light:
1. Add `theme` state (`'dark'|'light'`), persist in `localStorage`, header toggle button.
2. Build a token map (section 3) and drive every surface color from tokens instead of
   the current hardcoded hex literals (hero, game HUD/stage/panels, proof, governance, CTA).
3. Light hero = "Work Order" treatment: kraft job-ticket card, barcode strip, rotated
   "APPROVED" stamp, ink-on-kraft type. (Reference: `AutoWarehouse.dc.html` option 2a.)
4. Verify both themes: contrast, the belt/flow animation, the Talk-to-DWH chart, buttons.

---

## 8. GOTCHAS

- **Backgrounded-tab animations:** use CSS keyframes or `setInterval`; never
  `requestAnimationFrame` or `IntersectionObserver` for count-ups/progress — both pause
  when the preview/tab isn't focused (this bit the original count-up; it now uses setInterval).
- **Responsiveness:** achieved with `repeat(auto-fit, minmax(...))` grids + `clamp()`,
  no media queries. Keep that approach or replace with your framework's responsive utils.
- **Model-first** is the differentiator — keep the DataModel visually central everywhere.
