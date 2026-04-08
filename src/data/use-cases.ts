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
