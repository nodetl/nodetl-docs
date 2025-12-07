---
sidebar_position: 1
title: Installation Guide
description: Learn how to install NodeTL using Docker, Docker Compose, or from source. Step-by-step installation instructions for all platforms.
keywords: [nodetl installation, docker, docker-compose, setup, deployment]
---

# Installation Guide

This guide covers all installation methods for NodeTL. Choose the method that best fits your needs.

## Prerequisites

Before installing NodeTL, ensure you have:

- **Docker 20.10+** (for Docker-based installations)
- **Docker Compose v2** (for docker-compose method)
- **Git** (for cloning the repository)

For development setup, you'll also need:
- **Go 1.21+**
- **Node.js 20+**
- **MongoDB 7.0+**

## Installation Methods

### Docker Compose (Recommended) {#docker-compose}

The easiest way to get started with NodeTL is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/nodetl/nodetl.git
cd nodetl

# Start all services
docker compose up -d

# View logs (optional)
docker compose logs -f
```

This will start:
- **Frontend** - React application on port 8602
- **Backend** - Go API server on port 8603 (proxied through nginx)
- **MongoDB** - Database on port 27017

**Access the application:**
- Frontend: http://localhost:8602
- API: http://localhost:8602/api/v1

### All-in-One Docker Image {#all-in-one-docker}

For simpler deployments, use our all-in-one Docker image:

```bash
# Build the image
docker build -f Dockerfile -t nodetl:latest .

# Run the container
docker run -d \
  --name nodetl \
  -p 8602:80 \
  -v nodetl_data:/data/db \
  nodetl:latest

# Access at http://localhost:8602
```

This single container includes:
- Frontend (nginx)
- Backend (Go)
- MongoDB

### Using Pre-built Images

Pull and run from Docker Hub:

```bash
# Pull the latest image
docker pull nodetl/nodetl:latest

# Run with persistent storage
docker run -d \
  --name nodetl \
  -p 8602:80 \
  -v nodetl_data:/data/db \
  -e JWT_SECRET=your-secret-key \
  nodetl/nodetl:latest
```

### Development Setup {#development-setup}

For development or contributing to NodeTL:

#### 1. Start MongoDB

```bash
# Using Docker (recommended)
docker run -d \
  --name mongo \
  -p 27017:27017 \
  mongo:7.0

# Or using docker-compose for just MongoDB
docker compose up -d mongodb
```

#### 2. Start Backend

```bash
cd src/backend

# Copy environment file
cp .env.example .env

# Edit .env with your settings
nano .env

# Download dependencies
go mod download

# Run the server
go run ./cmd/server
```

Backend runs on `http://localhost:8080` by default.

#### 3. Start Frontend

```bash
cd src/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

## Configuration

### Environment Variables

Configure NodeTL using environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017` |
| `MONGODB_DATABASE` | Database name | `nodetl` |
| `JWT_SECRET` | Secret for JWT tokens | Required |
| `JWT_EXPIRY` | Access token expiry | `24h` |
| `JWT_REFRESH_EXPIRY` | Refresh token expiry | `168h` |
| `PORT` | Backend server port | `8080` |
| `OPENAI_API_KEY` | OpenAI API key for AI features | Optional |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Optional |
| `MICROSOFT_CLIENT_ID` | Microsoft OAuth client ID | Optional |
| `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth secret | Optional |

### Example .env File

```bash
# Database
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=nodetl

# Authentication
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRY=24h
JWT_REFRESH_EXPIRY=168h

# Server
PORT=8080

# AI Features (optional)
OPENAI_API_KEY=sk-your-openai-api-key

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
```

## Verifying Installation

After installation, verify everything is working:

### 1. Check Services

```bash
# Docker Compose
docker compose ps

# Should show all services as "Up"
```

### 2. Test API Health

```bash
curl http://localhost:8602/api/v1/health
```

Expected response:
```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

### 3. Access Web Interface

Open http://localhost:8602 in your browser. You should see the NodeTL login page.

## Default Credentials

On first run, NodeTL creates a default admin user:

- **Email**: `admin@nodetl.com`
- **Password**: `admin123`

:::warning Important
Change the default password immediately after first login!
:::

## Troubleshooting

### Container Won't Start

Check logs for errors:
```bash
docker compose logs backend
docker compose logs mongodb
```

### Port Already in Use

Change ports in `docker-compose.yml`:
```yaml
services:
  frontend:
    ports:
      - "8700:80"  # Change 8602 to 8700
```

### MongoDB Connection Failed

Ensure MongoDB is running:
```bash
docker compose logs mongodb
```

Check connection string in `.env`:
```bash
MONGODB_URI=mongodb://mongodb:27017
```

### Permission Denied

On Linux, you may need to fix permissions:
```bash
sudo chown -R $USER:$USER ./data
```

## Next Steps

- [Quick Start Guide](/docs/getting-started/quick-start) - Build your first workflow
- [Configuration Options](/docs/getting-started/configuration) - Advanced configuration
- [Production Deployment](/docs/deployment/production) - Deploy to production
