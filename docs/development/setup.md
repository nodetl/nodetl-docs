---
sidebar_position: 1
title: Development Setup
description: Set up a local development environment for NodeTL.
keywords: [nodetl development, local setup, development environment, contributing]
---

# Development Setup

Set up NodeTL for local development.

## Prerequisites

- Go 1.21+
- Node.js 20+
- MongoDB 7.0+
- Git

## Quick Setup

### 1. Clone Repository

```bash
git clone https://github.com/nodetl/nodetl.git
cd nodetl
```

### 2. Start MongoDB

```bash
docker run -d -p 27017:27017 --name mongo mongo:7.0
```

### 3. Backend Setup

```bash
cd src/backend
cp .env.example .env
go mod download
go run ./cmd/server
```

### 4. Frontend Setup

```bash
cd src/frontend
npm install
npm run dev
```

## Access

- Frontend: http://localhost:5173
- Backend: http://localhost:8080

## Development Tools

### Backend

```bash
# Run tests
go test ./...

# Lint
golangci-lint run

# Format
go fmt ./...
```

### Frontend

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Build
npm run build
```
