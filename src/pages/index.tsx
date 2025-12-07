import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

// SEO-optimized feature list with semantic content
const FeatureList = [
  {
    title: 'Visual Data Mapping',
    icon: '🗺️',
    description: (
      <>
        Design complex data mappings with an intuitive drag-and-drop interface.
        Map fields between source and target schemas visually without writing code.
        Perfect for ETL pipelines and data integration projects.
      </>
    ),
  },
  {
    title: 'Workflow Automation',
    icon: '🔄',
    description: (
      <>
        Build automated data pipelines with a node-based visual designer.
        Connect triggers, transformations, HTTP requests, and conditions
        to create powerful integration workflows.
      </>
    ),
  },
  {
    title: 'AI-Powered Features',
    icon: '🤖',
    description: (
      <>
        Generate test data automatically using AI. Get intelligent mapping
        suggestions based on your schemas. Leverage OpenAI integration for
        smart data transformations.
      </>
    ),
  },
  {
    title: 'Enterprise Security',
    icon: '🔐',
    description: (
      <>
        Role-based access control (RBAC), SSO with Google and Microsoft OAuth,
        JWT authentication, and granular permissions for all resources.
        Production-ready security out of the box.
      </>
    ),
  },
  {
    title: 'Docker & Kubernetes Ready',
    icon: '🐳',
    description: (
      <>
        Deploy anywhere with Docker or Kubernetes. Single command deployment
        with docker-compose. Production-ready Kubernetes manifests included
        for scalable deployments.
      </>
    ),
  },
  {
    title: 'Open Source',
    icon: '📖',
    description: (
      <>
        MIT licensed and open source. Full access to the codebase, 
        active community, and transparent development. Build on a platform
        you can trust and extend.
      </>
    ),
  },
];

function Feature({ title, icon, description }) {
  return (
    <div className={clsx('col col--4')}>
      <article className="feature-card margin-bottom--lg">
        <div className="text--center padding-horiz--md">
          <span style={{ fontSize: '3rem' }} role="img" aria-label={title}>
            {icon}
          </span>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </article>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <img 
          src="/img/logo.svg" 
          alt="NodeTL Logo" 
          className={styles.heroLogo}
          width="120"
          height="120"
        />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          Build ETL pipelines and automate data workflows with a powerful visual interface.
          Transform data between any schemas, integrate APIs, and deploy anywhere.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/installation">
            Get Started →
          </Link>
          <Link
            className="button button--secondary button--lg margin-left--md"
            to="/docs/">
            Learn More
          </Link>
        </div>
      </div>
    </header>
  );
}

function UseCasesSection() {
  return (
    <section className={styles.useCases}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Use Cases
        </Heading>
        <div className="row">
          <div className="col col--6">
            <article className="feature-card">
              <Heading as="h3">🔌 API Integration</Heading>
              <p>
                Map data between different API formats. Handle REST APIs, webhooks,
                and transform payloads seamlessly between services.
              </p>
            </article>
          </div>
          <div className="col col--6">
            <article className="feature-card">
              <Heading as="h3">📊 ETL Pipelines</Heading>
              <p>
                Extract data from sources, transform with visual mapping tools,
                and load into target systems. Perfect for data warehousing.
              </p>
            </article>
          </div>
          <div className="col col--6 margin-top--md">
            <article className="feature-card">
              <Heading as="h3">🔄 Data Migration</Heading>
              <p>
                Migrate data between systems with schema transformation.
                Handle complex nested structures and type conversions automatically.
              </p>
            </article>
          </div>
          <div className="col col--6 margin-top--md">
            <article className="feature-card">
              <Heading as="h3">🔗 Data Synchronization</Heading>
              <p>
                Keep data in sync between multiple services. Set up triggers
                and automated workflows for real-time synchronization.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section className={styles.techStack}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Built with Modern Technology
        </Heading>
        <div className="row text--center">
          <div className="col col--3">
            <div className="padding--md">
              <strong>Go</strong>
              <p>High-performance backend</p>
            </div>
          </div>
          <div className="col col--3">
            <div className="padding--md">
              <strong>React</strong>
              <p>Modern frontend UI</p>
            </div>
          </div>
          <div className="col col--3">
            <div className="padding--md">
              <strong>MongoDB</strong>
              <p>Flexible data storage</p>
            </div>
          </div>
          <div className="col col--3">
            <div className="padding--md">
              <strong>Docker</strong>
              <p>Easy deployment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Visual Data Mapping & ETL Platform"
      description="NodeTL is a powerful visual data mapping and transformation platform for building ETL pipelines and automating data workflows. Open source, Docker ready, with AI-powered features.">
      <main>
        <HomepageHeader />
        <section className={styles.features}>
          <div className="container">
            <Heading as="h2" className="text--center margin-bottom--lg">
              Key Features
            </Heading>
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
        <UseCasesSection />
        <TechStackSection />
      </main>
    </Layout>
  );
}
