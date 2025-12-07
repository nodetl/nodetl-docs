---
sidebar_position: 3
title: Configuration Guide
description: Complete guide to configuring NodeTL including environment variables, OAuth, AI features, and advanced settings.
keywords: [nodetl configuration, settings, environment variables, oauth, openai]
---

# Configuration Guide

This guide covers all configuration options for NodeTL.

## Environment Variables

### Database Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017` | Yes |
| `MONGODB_DATABASE` | Database name | `nodetl` | Yes |

**Example:**
```bash
MONGODB_URI=mongodb://user:password@mongodb.example.com:27017
MONGODB_DATABASE=nodetl_production
```

### Authentication

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | Secret key for JWT signing | - | Yes |
| `JWT_EXPIRY` | Access token expiration | `24h` | No |
| `JWT_REFRESH_EXPIRY` | Refresh token expiration | `168h` | No |

**Example:**
```bash
JWT_SECRET=your-super-secret-key-minimum-32-characters
JWT_EXPIRY=12h
JWT_REFRESH_EXPIRY=7d
```

:::warning Security
Always use a strong, unique JWT secret in production. Generate one with:
```bash
openssl rand -base64 32
```
:::

### Server Settings

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Backend server port | `8080` | No |
| `GIN_MODE` | Gin framework mode | `debug` | No |
| `CORS_ORIGINS` | Allowed CORS origins | `*` | No |

**Example:**
```bash
PORT=8603
GIN_MODE=release
CORS_ORIGINS=https://app.example.com,https://admin.example.com
```

### OAuth Configuration

#### Google OAuth

| Variable | Description |
|----------|-------------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_REDIRECT_URL` | OAuth callback URL |

**Setup Steps:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:8602/api/v1/auth/google/callback`

**Example:**
```bash
GOOGLE_CLIENT_ID=123456789.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
GOOGLE_REDIRECT_URL=https://your-domain.com/api/v1/auth/google/callback
```

#### Microsoft OAuth

| Variable | Description |
|----------|-------------|
| `MICROSOFT_CLIENT_ID` | Microsoft/Azure AD client ID |
| `MICROSOFT_CLIENT_SECRET` | Microsoft/Azure AD client secret |
| `MICROSOFT_REDIRECT_URL` | OAuth callback URL |

**Setup Steps:**

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to Azure Active Directory → App registrations
3. Create new registration
4. Add redirect URI: `http://localhost:8602/api/v1/auth/microsoft/callback`
5. Create client secret under "Certificates & secrets"

### AI Features

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key | For AI features |
| `OPENAI_MODEL` | Model to use | No (default: `gpt-3.5-turbo`) |

**Example:**
```bash
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4
```

**AI Features enabled with OpenAI:**
- Generate test data from schemas
- Suggest field mappings
- Intelligent data transformations

## Application Settings

### Via UI

Navigate to **Settings** in the NodeTL UI to configure:

- **App Name** - Custom application name
- **Logo** - Upload custom logo
- **Theme** - Default theme (Light/Dark/System)
- **Primary Color** - Brand color
- **Registration** - Enable/disable user registration

### Via API

```bash
curl -X PUT http://localhost:8602/api/v1/settings \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "appName": "My Data Platform",
    "enableRegistration": true,
    "defaultTheme": "dark"
  }'
```

## Role-Based Access Control

### Default Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access to all resources |
| **Editor** | Create/edit workflows, schemas, mappings |
| **Viewer** | View-only access |

### Custom Roles

Create custom roles via the UI or API:

```bash
curl -X POST http://localhost:8602/api/v1/roles \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Developer",
    "permissions": [
      "workflow:view",
      "workflow:edit",
      "workflow:execute",
      "schema:view",
      "schema:edit"
    ]
  }'
```

### Available Permissions

| Resource | Permissions |
|----------|-------------|
| **workflow** | `view`, `create`, `edit`, `delete`, `execute` |
| **schema** | `view`, `create`, `edit`, `delete` |
| **mapping** | `view`, `create`, `edit`, `delete` |
| **execution** | `view`, `delete` |
| **user** | `view`, `create`, `edit`, `delete` |
| **role** | `view`, `create`, `edit`, `delete` |
| **settings** | `view`, `edit` |

## Docker Configuration

### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: ./src/frontend
    ports:
      - "8602:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=/api/v1

  backend:
    build: ./src/backend
    environment:
      - MONGODB_URI=mongodb://mongodb:27017
      - MONGODB_DATABASE=nodetl
      - JWT_SECRET=${JWT_SECRET}
      - PORT=8080
    depends_on:
      - mongodb

  mongodb:
    image: mongo:7.0
    volumes:
      - mongodb_data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongodb_data:
```

### Environment File

Create `.env` in the project root:

```bash
# Required
JWT_SECRET=your-production-secret-key

# Optional - OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=

# Optional - AI
OPENAI_API_KEY=
```

## Production Configuration

For production deployments, ensure:

1. **Strong JWT Secret**
   ```bash
   JWT_SECRET=$(openssl rand -base64 32)
   ```

2. **Secure MongoDB**
   ```bash
   MONGODB_URI=mongodb://user:password@host:27017/nodetl?authSource=admin
   ```

3. **HTTPS enabled** (via reverse proxy)

4. **Gin in release mode**
   ```bash
   GIN_MODE=release
   ```

5. **Limited CORS origins**
   ```bash
   CORS_ORIGINS=https://your-domain.com
   ```

See [Production Deployment Guide](/docs/deployment/production) for complete instructions.

## Configuration Validation

Validate your configuration:

```bash
# Check environment variables
docker compose config

# Test database connection
curl http://localhost:8602/api/v1/health

# Verify OAuth (if configured)
curl http://localhost:8602/api/v1/auth/google
```

## Troubleshooting

### Common Issues

**JWT Secret errors:**
- Ensure JWT_SECRET is set and at least 32 characters

**MongoDB connection failed:**
- Check MONGODB_URI format
- Verify MongoDB is running
- Check network connectivity

**OAuth not working:**
- Verify redirect URLs match exactly
- Check client ID/secret are correct
- Ensure OAuth app is not in test mode

### Debug Mode

Enable debug logging:

```bash
GIN_MODE=debug
LOG_LEVEL=debug
```
