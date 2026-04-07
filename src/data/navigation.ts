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
