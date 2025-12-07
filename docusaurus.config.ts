import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'NodeTL',
  tagline: 'Visual Data Mapping and Transformation Platform',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://nodetl.moclawr.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'nodetl',
  projectName: 'nodetl-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/nodetl/nodetl-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/nodetl/nodetl-docs/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/nodetl-social-card.png',
    navbar: {
      title: 'NodeTL',
      logo: {
        alt: 'NodeTL Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/api/overview',
          label: 'API Reference',
          position: 'left',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/nodetl/nodetl',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'API Reference',
              to: '/docs/api/overview',
            },
            {
              label: 'Deployment',
              to: '/docs/deployment/docker-compose',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/nodetl/nodetl/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/nodetl/nodetl/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/nodetl/nodetl',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/nodetl/nodetl/blob/main/CHANGELOG.md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} NodeTL. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'go', 'typescript', 'yaml', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
