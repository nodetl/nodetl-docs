---
sidebar_position: 3
title: Workflows API
description: REST API documentation for managing workflows in NodeTL including CRUD operations and execution.
keywords: [nodetl workflows api, create workflow, workflow endpoints, workflow management]
---

# Workflows API

Manage workflows programmatically through the REST API.

## List Workflows

Get all workflows accessible to the user.

```http
GET /api/v1/workflows
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20) |
| `projectId` | string | Filter by project |
| `status` | string | Filter by status |
| `sort` | string | Sort field |
| `order` | string | Sort order (asc/desc) |

**Response:**

```json
{
  "data": [
    {
      "id": "wf-123",
      "name": "User Transform",
      "description": "Transform user data",
      "projectId": "proj-456",
      "status": "active",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

**Example:**

```bash
curl -X GET "http://localhost:8602/api/v1/workflows?status=active&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

## Get Workflow

Get a single workflow by ID.

```http
GET /api/v1/workflows/:id
```

**Response:**

```json
{
  "id": "wf-123",
  "name": "User Transform",
  "description": "Transform user data",
  "projectId": "proj-456",
  "status": "active",
  "nodes": [
    {
      "id": "trigger-1",
      "type": "trigger",
      "position": { "x": 100, "y": 100 },
      "data": { "triggerType": "webhook" }
    },
    {
      "id": "transform-1",
      "type": "transform",
      "position": { "x": 300, "y": 100 },
      "data": { "mappingId": "map-789" }
    }
  ],
  "edges": [
    {
      "source": "trigger-1",
      "target": "transform-1"
    }
  ],
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T12:00:00Z"
}
```

## Create Workflow

Create a new workflow.

```http
POST /api/v1/workflows
```

**Request Body:**

```json
{
  "name": "My Workflow",
  "description": "Process incoming data",
  "projectId": "proj-456",
  "nodes": [
    {
      "id": "trigger-1",
      "type": "trigger",
      "position": { "x": 100, "y": 100 },
      "data": {
        "triggerType": "webhook",
        "method": "POST"
      }
    }
  ],
  "edges": []
}
```

**Response:**

```json
{
  "id": "wf-789",
  "name": "My Workflow",
  "description": "Process incoming data",
  "projectId": "proj-456",
  "status": "draft",
  "createdAt": "2024-01-15T14:00:00Z"
}
```

## Update Workflow

Update an existing workflow.

```http
PUT /api/v1/workflows/:id
```

**Request Body:**

```json
{
  "name": "Updated Workflow Name",
  "description": "Updated description",
  "nodes": [...],
  "edges": [...]
}
```

## Delete Workflow

Delete a workflow.

```http
DELETE /api/v1/workflows/:id
```

**Response:**

```json
{
  "message": "Workflow deleted successfully"
}
```

## Publish Workflow

Publish a workflow to make it executable.

```http
POST /api/v1/workflows/:id/publish
```

**Response:**

```json
{
  "id": "wf-123",
  "status": "active",
  "version": "1.0.0",
  "webhookUrl": "http://localhost:8602/api/v1/webhooks/wf-123"
}
```

## Execute Workflow

Manually execute a workflow.

```http
POST /api/v1/workflows/:id/execute
```

**Request Body:**

```json
{
  "input": {
    "user": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

**Response:**

```json
{
  "executionId": "exec-456",
  "status": "running",
  "startedAt": "2024-01-15T15:00:00Z"
}
```

## Get Workflow Versions

List all versions of a workflow.

```http
GET /api/v1/workflows/:id/versions
```

**Response:**

```json
{
  "data": [
    {
      "id": "v-1",
      "version": "1.0.0",
      "createdAt": "2024-01-15T10:00:00Z"
    },
    {
      "id": "v-2",
      "version": "1.1.0",
      "createdAt": "2024-01-16T10:00:00Z"
    }
  ]
}
```

## Clone Workflow

Create a copy of an existing workflow.

```http
POST /api/v1/workflows/:id/clone
```

**Request Body:**

```json
{
  "name": "Cloned Workflow",
  "projectId": "proj-789"
}
```

## Export Workflow

Export workflow definition as JSON.

```http
GET /api/v1/workflows/:id/export
```

## Import Workflow

Import a workflow from JSON.

```http
POST /api/v1/workflows/import
```

**Request Body:**

```json
{
  "projectId": "proj-456",
  "workflow": { /* exported workflow JSON */ }
}
```
