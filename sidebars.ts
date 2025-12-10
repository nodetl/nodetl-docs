import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'concepts/workflows',
        'concepts/nodes',
        'concepts/schemas',
        'concepts/mappings',
        'concepts/executions',
      ],
    },
    {
      type: 'category',
      label: 'Node Types',
      items: [
        'nodes/trigger',
        'nodes/transform',
        'nodes/http-request',
        'nodes/condition',
        'nodes/loop',
        'nodes/code',
        'nodes/response',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/authentication',
        'api/workflows',
        'api/schemas',
        'api/mappings',
        'api/executions',
        'api/users',
        'api/settings',
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      items: [
        'deployment/docker',
        'deployment/docker-compose',
        'deployment/kubernetes',
        'deployment/production',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/setup',
        'development/architecture',
        'development/contributing',
      ],
    },
    'changelog',
  ],
};

export default sidebars;
