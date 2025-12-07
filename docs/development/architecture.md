---
sidebar_position: 2
title: Architecture Overview
description: Technical architecture of NodeTL including backend, frontend, and database design.
keywords: [nodetl architecture, system design, technical overview, backend, frontend]
---

# Architecture Overview

NodeTL uses a modern, scalable architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Flow Canvas │  │  Node Panel │  │  Settings & Config  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Go + Gin)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Handlers  │  │  Executor   │  │    Repositories     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     MongoDB Database                         │
└─────────────────────────────────────────────────────────────┘
```

## Backend Structure

```
src/backend/
├── cmd/server/          # Entry point
├── config/              # Configuration
├── internal/
│   ├── domain/          # Domain models
│   ├── handler/         # HTTP handlers
│   ├── repository/      # Data access
│   ├── service/         # Business logic
│   ├── executor/        # Workflow execution
│   ├── node/            # Node implementations
│   └── middleware/      # HTTP middleware
└── pkg/                 # Shared packages
```

## Frontend Structure

```
src/frontend/
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom hooks
│   ├── stores/          # State management
│   ├── api/             # API clients
│   └── types/           # TypeScript types
```

## Data Flow

1. User creates workflow in UI
2. Frontend sends request to backend API
3. Backend validates and stores in MongoDB
4. When triggered, Executor processes workflow
5. Results stored and returned
