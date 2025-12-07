---
sidebar_position: 6
title: Executions API
description: REST API documentation for workflow executions in NodeTL.
keywords: [nodetl executions api, workflow logs, execution history, monitoring api]
---

# Executions API

Access workflow execution history and logs through the REST API.

## List Executions

```http
GET /api/v1/executions
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `workflowId` | string | Filter by workflow |
| `status` | string | Filter by status |
| `from` | string | Start date (ISO 8601) |
| `to` | string | End date (ISO 8601) |

**Response:**

```json
{
  "data": [
    {
      "id": "exec-123",
      "workflowId": "wf-456",
      "status": "completed",
      "startedAt": "2024-01-15T10:00:00Z",
      "completedAt": "2024-01-15T10:00:02Z",
      "duration": 2000
    }
  ]
}
```

## Get Execution

```http
GET /api/v1/executions/:id
```

**Response:**

```json
{
  "id": "exec-123",
  "workflowId": "wf-456",
  "status": "completed",
  "input": { /* trigger input */ },
  "output": { /* final output */ },
  "traces": [
    {
      "nodeId": "trigger-1",
      "nodeName": "Webhook",
      "status": "completed",
      "duration": 5,
      "input": {...},
      "output": {...}
    }
  ],
  "startedAt": "2024-01-15T10:00:00Z",
  "completedAt": "2024-01-15T10:00:02Z"
}
```

## Delete Execution

```http
DELETE /api/v1/executions/:id
```

## Replay Execution

Re-run a workflow with the same input.

```http
POST /api/v1/executions/:id/replay
```

## Get Execution Statistics

```http
GET /api/v1/executions/stats
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `workflowId` | string | Filter by workflow |
| `from` | string | Start date |
| `to` | string | End date |

**Response:**

```json
{
  "total": 1000,
  "completed": 950,
  "failed": 50,
  "averageDuration": 1500,
  "successRate": 0.95
}
```
