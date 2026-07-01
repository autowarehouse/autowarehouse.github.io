/**
 * Single source of truth for navigation + the 5 pipeline/feature stages.
 * Header, Footer, and the /features/[slug] pages all read this.
 * Step colors are theme-aware accent hexes (used as small badges/glyphs).
 */

export interface FeatureStage {
  slug: string;
  step: number;
  label: string; // short nav label
  name: string; // full feature name
  icon: string; // glyph (mono, not emoji)
  color: string; // accent hex for this stage
  hero: string;
  sub: string;
  capabilities: string[];
}

export const FEATURES: FeatureStage[] = [
  {
    slug: 'source-connectors',
    step: 1,
    label: 'Connect',
    name: 'Source Connectors',
    icon: '⟜',
    color: '#36a0d6',
    hero: 'Connect Any Source',
    sub: 'Databases, documents, spreadsheets — bring all your data into one platform. AI-powered parsing extracts structured data from any format.',
    capabilities: [
      'PostgreSQL, MySQL, Oracle, MSSQL, MongoDB',
      'PDF & Word parsing (CVs, invoices, contracts)',
      'Excel & CSV import with auto schema detection',
      'AI-powered schema profiling & classification',
      'Encrypted credential storage (AES-256-GCM)',
      'Raw Database Studio for direct exploration',
      'Data Dictionary with column-level insights',
    ],
  },
  {
    slug: 'data-model-engine',
    step: 2,
    label: 'Model',
    name: 'Data Model Engine',
    icon: '◫',
    color: '#f25c1f',
    hero: 'Choose an Industry Template',
    sub: 'Pre-built data models for HR, Telecom, Finance, and more. Each template includes Foundation, Analytical, and Semantic layers with star schema design.',
    capabilities: [
      'Industry templates: HRDM, TDM, FDM, Custom',
      '3-layer architecture: Foundation → Analytical → Semantic',
      'Star schema with dimensions and fact tables',
      'SCD Type 2 dimension handling',
      'Visual ER diagram editor',
      'Configurable naming conventions',
      'DDL preview before execution',
    ],
  },
  {
    slug: 'intelligent-mapping',
    step: 3,
    label: 'Map',
    name: 'Intelligent Mapping',
    icon: '⇄',
    color: '#ffce1f',
    hero: 'AI Maps, You Approve',
    sub: 'LLM-powered source-to-target column mapping with reasoning. Every suggestion is transparent — review, refine, and approve before anything runs.',
    capabilities: [
      '3-panel mapping editor (source ↔ rules ↔ target)',
      'AI-suggested mappings with reasoning',
      'Heuristic + LLM dual approach with fallback',
      'Validation rules generator',
      'Coverage report (matched vs unmapped)',
      'Human review and approval workflow',
      'Mapping project version history',
    ],
  },
  {
    slug: 'etl-engine',
    step: 4,
    label: 'Execute',
    name: 'ETL Engine',
    icon: '⚙',
    color: '#41d18a',
    hero: 'Run It Your Way',
    sub: 'Execute within AutoWarehouse or export production-ready code to your existing tools. You design the pipeline — you decide how and where it runs.',
    capabilities: [
      'Agentic ETL: 5-phase wizard with human approval',
      'Code export: Airflow, dbt, SQL, Spark, Snowflake',
      'DAG-based parallel execution (Kahn’s algorithm)',
      'Quality gates & data validation',
      'SCD Type 2 load with change detection',
      'Real-time Mission Control monitoring',
      'Retry policies with exponential backoff',
    ],
  },
  {
    slug: 'analytics',
    step: 5,
    label: 'Analyze',
    name: 'Analytics & Dashboards',
    icon: '▤',
    color: '#c78bff',
    hero: 'Query with Natural Language',
    sub: 'Ask questions in plain English. The chatbot writes SQL, executes it, and visualizes results with auto-suggested charts. Build KPI dashboards in minutes.',
    capabilities: [
      'Natural language to SQL translation',
      'Auto-chart suggestion (bar, line, pie, KPI)',
      'Configurable dashboard with widget grid',
      'Saved reports with one-click execution',
      'Cross-session conversation memory',
      'Multi-language support (English, Turkish)',
      'Data-driven decision making insights',
    ],
  },
];

export const PRIMARY_NAV = [
  { label: 'Platform', href: '/platform' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

export const CONTACT = {
  phone: '+90 216 688 45 46',
  phoneHref: 'tel:+902166884546',
  email: 'info@intellica.net',
  address: ['Atatürk Mah. Turgut Özal Blv.', 'Gardenya 1 Plaza, Floor 1', 'Ataşehir, Istanbul, Turkey'],
  intellica: 'https://www.intellica.net',
  linkedin: 'https://www.linkedin.com/company/autowarehouse',
  careers: 'https://www.intellica.net/careers',
  // Web3Forms public access key — safe to embed in the static page. The form
  // posts to api.web3forms.com, which emails submissions to whichever recipient
  // is configured for this key in the Web3Forms dashboard.
  web3formsAccessKey: 'f24e930f-6df2-463e-a2a8-3900136129ed',
};

export const FOOTER_GROUPS = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Source Connectors', href: '/features/source-connectors' },
      { label: 'Data Model Engine', href: '/features/data-model-engine' },
      { label: 'Intelligent Mapping', href: '/features/intelligent-mapping' },
      { label: 'ETL Engine', href: '/features/etl-engine' },
      { label: 'Analytics', href: '/features/analytics' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Intellica', href: 'https://www.intellica.net' },
      { label: 'Careers', href: 'https://www.intellica.net/careers' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/autowarehouse' },
    ],
  },
];
