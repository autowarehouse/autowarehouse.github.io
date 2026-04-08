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
      "DAG-based parallel execution (Kahn's algorithm)",
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
