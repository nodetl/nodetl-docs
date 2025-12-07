---
sidebar_position: 3
title: Contributing Guide
description: How to contribute to NodeTL - code contributions, bug reports, and documentation.
keywords: [nodetl contributing, open source, pull requests, bug reports]
---

# Contributing to NodeTL

We welcome contributions! Here's how to get involved.

## Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📖 Improve documentation
- 🔧 Submit code changes

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Workflow

```bash
# Create branch
git checkout -b feature/my-feature

# Make changes
# ...

# Commit
git commit -m "feat: add new feature"

# Push
git push origin feature/my-feature
```

## Commit Messages

Follow conventional commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `refactor:` Code refactoring
- `test:` Tests

## Code Standards

### Go

- Run `go fmt` before committing
- Pass `golangci-lint run`
- Add tests for new features

### TypeScript

- Pass `npm run lint`
- Pass `npm run typecheck`
- Add tests for components

## Pull Request Process

1. Update documentation
2. Add tests
3. Ensure CI passes
4. Request review

## Code of Conduct

Be respectful and inclusive. See CODE_OF_CONDUCT.md.
