# NodeTL Documentation

[![Built with Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus-green.svg)](https://docusaurus.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official documentation website for [NodeTL](https://github.com/nodetl/nodetl) - a visual data mapping and transformation platform.

## 🌐 Live Site

Visit the documentation at: https://nodetl.github.io/nodetl-docs/

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/nodetl/nodetl-docs.git
cd nodetl-docs

# Install dependencies
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory.

### Deployment

```bash
npm run deploy
```

Deploys to GitHub Pages.

## 📚 Documentation Structure

```
docs/
├── intro.md                    # Introduction
├── getting-started/            # Getting started guides
│   ├── installation.md
│   ├── quick-start.md
│   └── configuration.md
├── concepts/                   # Core concepts
│   ├── workflows.md
│   ├── nodes.md
│   ├── schemas.md
│   ├── mappings.md
│   └── executions.md
├── nodes/                      # Node type documentation
│   ├── trigger.md
│   ├── transform.md
│   ├── http-request.md
│   ├── condition.md
│   ├── loop.md
│   ├── code.md
│   └── response.md
├── api/                        # API reference
│   ├── overview.md
│   ├── authentication.md
│   ├── workflows.md
│   ├── schemas.md
│   ├── mappings.md
│   ├── executions.md
│   ├── users.md
│   └── settings.md
├── deployment/                 # Deployment guides
│   ├── docker.md
│   ├── docker-compose.md
│   ├── kubernetes.md
│   └── production.md
└── development/                # Development guides
    ├── setup.md
    ├── architecture.md
    └── contributing.md
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](https://github.com/nodetl/nodetl/blob/main/CONTRIBUTING.md) first.

### How to Contribute

1. Fork this repository
2. Create a new branch (`git checkout -b docs/my-improvement`)
3. Make your changes
4. Commit your changes (`git commit -m 'docs: improve section X'`)
5. Push to the branch (`git push origin docs/my-improvement`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [NodeTL Repository](https://github.com/nodetl/nodetl)
- [Issue Tracker](https://github.com/nodetl/nodetl-docs/issues)
- [Discussions](https://github.com/nodetl/nodetl/discussions)
