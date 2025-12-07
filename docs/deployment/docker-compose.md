---
sidebar_position: 2
title: Docker Compose Configuration
description: Detailed Docker Compose configuration for NodeTL deployment with all services.
keywords: [docker compose, nodetl compose, multi-container, service configuration]
---

# Docker Compose Configuration

Complete Docker Compose setup for NodeTL.

## Full Configuration

```yaml
version: '3.8'

services:
  frontend:
    build: 
      context: ./src/frontend
      dockerfile: Dockerfile
    ports:
      - "8602:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=/api/v1

  backend:
    build:
      context: ./src/backend
      dockerfile: Dockerfile
    environment:
      - MONGODB_URI=mongodb://mongodb:27017
      - MONGODB_DATABASE=nodetl
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXPIRY=24h
      - PORT=8080
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      mongodb:
        condition: service_healthy

  mongodb:
    image: mongo:7.0
    volumes:
      - mongodb_data:/data/db
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongodb_data:
```

## Environment File

Create `.env`:

```bash
JWT_SECRET=your-secure-secret-key
OPENAI_API_KEY=sk-your-key
```

## Commands

```bash
# Start
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down

# Rebuild
docker compose build --no-cache
docker compose up -d
```
