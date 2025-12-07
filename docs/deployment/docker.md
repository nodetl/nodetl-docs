---
sidebar_position: 1
title: Docker Deployment
description: Deploy NodeTL using Docker containers. Complete guide for Docker and Docker Compose deployments.
keywords: [nodetl docker, docker deployment, container deployment, docker compose]
---

# Docker Deployment

Deploy NodeTL using Docker for quick and easy setup.

## Prerequisites

- Docker 20.10+
- Docker Compose v2

## Docker Compose (Recommended)

```bash
# Clone repository
git clone https://github.com/nodetl/nodetl.git
cd nodetl

# Start all services
docker compose up -d
```

Access at http://localhost:8602

## All-in-One Image

Single container with all components:

```bash
docker run -d \
  --name nodetl \
  -p 8602:80 \
  -v nodetl_data:/data/db \
  -e JWT_SECRET=your-secret-key \
  nodetl/nodetl:latest
```

## Environment Variables

```bash
docker run -d \
  --name nodetl \
  -p 8602:80 \
  -e MONGODB_URI=mongodb://mongo:27017 \
  -e JWT_SECRET=your-secret \
  -e OPENAI_API_KEY=sk-xxx \
  nodetl/nodetl:latest
```

## Persistent Storage

```bash
docker run -d \
  --name nodetl \
  -p 8602:80 \
  -v nodetl_db:/data/db \
  -v nodetl_uploads:/app/uploads \
  nodetl/nodetl:latest
```

## Custom docker-compose.yml

```yaml
version: '3.8'

services:
  nodetl:
    image: nodetl/nodetl:latest
    ports:
      - "8602:80"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/nodetl
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb
    volumes:
      - uploads:/app/uploads

  mongodb:
    image: mongo:7.0
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
  uploads:
```

## Health Check

```bash
curl http://localhost:8602/api/v1/health
```

## Updating

```bash
docker compose pull
docker compose up -d
```
