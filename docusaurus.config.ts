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

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'google-site-verification',
        content: 'I_1RsHQ7QpnWMZGMJ72yXWpUfkbmp4jrDw77xzboGVs',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/img/logo.svg',
        as: 'image',
        type: 'image/svg+xml',
      },
    },
    // Structured Data for Organization
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'NodeTL',
        url: 'https://nodetl.moclawr.com',
        logo: 'https://nodetl.moclawr.com/img/logo.svg',
        sameAs: [
          'https://github.com/nodetl/nodetl',
          'https://github.com/nodetl/nodetl-docs',
        ],
      }),
    },
    // Structured Data for WebSite with SearchAction
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'NodeTL Documentation',
        url: 'https://nodetl.moclawr.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://nodetl.moclawr.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    // Structured Data for SoftwareApplication
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'NodeTL',
        alternateName: 'NodeTL Data Mapping Platform',
        description: 'A powerful visual data mapping and transformation platform for building ETL pipelines and automating data workflows.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        softwareVersion: '1.0.0',
        url: 'https://github.com/nodetl/nodetl',
        downloadUrl: 'https://github.com/nodetl/nodetl/releases',
        screenshot: 'https://nodetl.moclawr.com/img/dashboard.png',
        author: {
          '@type': 'Organization',
          name: 'NodeTL',
          url: 'https://github.com/nodetl',
        },
        license: 'https://opensource.org/licenses/MIT',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }),
    },
  ],

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
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
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
    image: 'img/dashboard.png',
    // Global metadata for SEO
    metadata: [
      { name: 'keywords', content: 'NodeTL, ETL, data mapping, data transformation, workflow automation, API integration, visual programming, open source, Docker, Kubernetes' },
      { name: 'author', content: 'NodeTL Team' },
      { name: 'application-name', content: 'NodeTL' },
      { property: 'og:site_name', content: 'NodeTL Documentation' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:site', content: '@nodetl' },
      { name: 'twitter:creator', content: '@nodetl' },
    ],
    navbar: {
      title: 'NodeTL',
      logo: {
        alt: 'NodeTL Logo',
        src: 'img/logo.svg',
        width: 32,
        height: 32,
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
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'go', 'typescript', 'yaml', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
