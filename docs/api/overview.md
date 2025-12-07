---
sidebar_position: 1
title: API Overview
description: Complete REST API reference for NodeTL. Learn how to integrate and automate data workflows programmatically.
keywords: [nodetl api, rest api, api reference, api documentation, integration api]
---

# API Overview

NodeTL provides a comprehensive REST API for programmatic access to all features.

## Base URL

```text
http://localhost:8602/api/v1
```

In production, replace with your domain.

## Authentication

Most endpoints require JWT authentication:

```bash
curl -X GET http://localhost:8602/api/v1/workflows \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Getting Tokens

```bash
curl -X POST http://localhost:8602/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Response Format

### Success Response

```json
{
  "data": { /* response data */ },
  "message": "Success"
}
```

### Error Response

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { /* additional info */ }
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `204` | No Content |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `422` | Validation Error |
| `500` | Server Error |

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/register` | Register |
| `POST` | `/auth/refresh` | Refresh token |
| `GET` | `/auth/google` | Google OAuth |
| `GET` | `/auth/microsoft` | Microsoft OAuth |

### Workflows

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/workflows` | List workflows |
| `POST` | `/workflows` | Create workflow |
| `GET` | `/workflows/:id` | Get workflow |
| `PUT` | `/workflows/:id` | Update workflow |
| `DELETE` | `/workflows/:id` | Delete workflow |

### Schemas

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/schemas` | List schemas |
| `POST` | `/schemas` | Create schema |
| `GET` | `/schemas/:id` | Get schema |
| `PUT` | `/schemas/:id` | Update schema |
| `DELETE` | `/schemas/:id` | Delete schema |

### Mappings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/mappings` | List mappings |
| `POST` | `/mappings` | Create mapping |
| `GET` | `/mappings/:id` | Get mapping |
| `PUT` | `/mappings/:id` | Update mapping |
| `DELETE` | `/mappings/:id` | Delete mapping |
| `POST` | `/mappings/:id/test` | Test mapping |

### Executions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/executions` | List executions |
| `GET` | `/executions/:id` | Get execution |
| `DELETE` | `/executions/:id` | Delete execution |
| `POST` | `/executions/:id/replay` | Replay execution |

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/webhooks/:workflowId` | Trigger workflow |
| `GET` | `/webhooks/:workflowId/:path` | Custom webhook path |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | List users |
| `POST` | `/users` | Create user |
| `GET` | `/users/:id` | Get user |
| `PUT` | `/users/:id` | Update user |
| `DELETE` | `/users/:id` | Delete user |

### Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/settings` | Get settings |
| `PUT` | `/settings` | Update settings |
| `GET` | `/settings/public` | Public settings |

## Pagination

List endpoints support pagination:

```bash
GET /api/v1/workflows?page=1&limit=20
```

Response includes pagination info:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## Filtering

Filter list results:

```bash
GET /api/v1/workflows?status=active&projectId=xxx
GET /api/v1/executions?workflowId=xxx&status=completed
```

## Sorting

Sort results:

```bash
GET /api/v1/workflows?sort=createdAt&order=desc
```

## Rate Limiting

API requests are rate limited:

- **Default**: 100 requests per minute
- **Authenticated**: 1000 requests per minute

Headers indicate limit status:

```text
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1705312200
```

## SDKs and Libraries

### JavaScript/TypeScript

```bash
npm install @nodetl/sdk
```

```javascript
import { NodeTL } from '@nodetl/sdk';

const client = new NodeTL({
  baseUrl: 'http://localhost:8602/api/v1',
  accessToken: 'your-token'
});

const workflows = await client.workflows.list();
```

### Python

```bash
pip install nodetl
```

```python
from nodetl import NodeTL

client = NodeTL(
    base_url='http://localhost:8602/api/v1',
    access_token='your-token'
)

workflows = client.workflows.list()
```

## API Versioning

The API is versioned via URL path:

- Current: `/api/v1`

Breaking changes will increment the version number.

## Related Topics

- [Authentication](/docs/api/authentication)
- [Workflows API](/docs/api/workflows)
- [Schemas API](/docs/api/schemas)
