---
sidebar_position: 4
title: Schemas API
description: REST API documentation for managing data schemas in NodeTL.
keywords: [nodetl schemas api, json schema, data schemas, schema management]
---

# Schemas API

Manage data schemas through the REST API.

## List Schemas

```http
GET /api/v1/schemas
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `search` | string | Search by name |

**Response:**

```json
{
  "data": [
    {
      "id": "schema-123",
      "name": "User",
      "description": "User data structure",
      "schema": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "email": { "type": "string" },
          "name": { "type": "string" }
        }
      },
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15
  }
}
```

## Get Schema

```http
GET /api/v1/schemas/:id
```

## Create Schema

```http
POST /api/v1/schemas
```

**Request Body:**

```json
{
  "name": "Customer",
  "description": "Customer data structure",
  "schema": {
    "type": "object",
    "properties": {
      "customerId": { "type": "string" },
      "company": { "type": "string" },
      "contacts": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "email": { "type": "string" }
          }
        }
      }
    },
    "required": ["customerId", "company"]
  }
}
```

## Update Schema

```http
PUT /api/v1/schemas/:id
```

## Delete Schema

```http
DELETE /api/v1/schemas/:id
```

## Validate Data

Validate data against a schema.

```http
POST /api/v1/schemas/:id/validate
```

**Request Body:**

```json
{
  "data": {
    "customerId": "C001",
    "company": "Acme Corp"
  }
}
```

**Response (Valid):**

```json
{
  "valid": true
}
```

**Response (Invalid):**

```json
{
  "valid": false,
  "errors": [
    {
      "path": "/email",
      "message": "is required"
    }
  ]
}
```
