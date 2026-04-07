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
