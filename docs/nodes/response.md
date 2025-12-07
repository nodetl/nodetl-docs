---
sidebar_position: 7
title: Response Node
description: Learn how to use Response nodes to configure HTTP responses in NodeTL workflows.
keywords: [nodetl response, http response, api response, webhook response]
---

# Response Node

The Response node configures the HTTP response returned when a workflow completes.

## Overview

Use Response nodes to:

- Set response status codes
- Configure response headers
- Format response body
- Handle success and error responses

## Configuration

### Basic Configuration

```json
{
  "type": "response",
  "config": {
    "statusCode": 200,
    "body": "${output}"
  }
}
```

### Full Configuration

```json
{
  "type": "response",
  "config": {
    "statusCode": 200,
    "headers": {
      "Content-Type": "application/json",
      "X-Request-Id": "${context.executionId}"
    },
    "body": {
      "success": true,
      "data": "${transformedData}",
      "metadata": {
        "processedAt": "${now()}",
        "version": "1.0"
      }
    }
  }
}
```

## Response Options

### Status Codes

| Code | Description | Use Case |
|------|-------------|----------|
| `200` | OK | Successful GET/PUT |
| `201` | Created | Successful POST |
| `202` | Accepted | Async processing |
| `204` | No Content | Successful DELETE |
| `400` | Bad Request | Invalid input |
| `401` | Unauthorized | Auth required |
| `403` | Forbidden | Access denied |
| `404` | Not Found | Resource missing |
| `500` | Server Error | Internal error |

### Headers

```json
{
  "headers": {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "X-Powered-By": "NodeTL",
    "X-Request-Id": "${context.executionId}"
  }
}
```

### Body Formats

**JSON Object:**

```json
{
  "body": {
    "id": "${data.id}",
    "name": "${data.name}",
    "createdAt": "${now()}"
  }
}
```

**Array:**

```json
{
  "body": "${items}"
}
```

**String:**

```json
{
  "body": "OK"
}
```

## Dynamic Responses

### Based on Processing Result

```json
{
  "statusCode": "${success ? 200 : 400}",
  "body": {
    "success": "${success}",
    "data": "${success ? result : null}",
    "error": "${success ? null : errorMessage}"
  }
}
```

### Conditional Status Code

Use with Condition node:

```text
[Process] → [Condition: success?]
                  │
         ┌───────┴───────┐
         ▼               ▼
  [Response 200]   [Response 400]
```

## Examples

### Success Response

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "success": true,
    "data": {
      "id": "${user.id}",
      "name": "${user.name}",
      "email": "${user.email}"
    }
  }
}
```

### Created Response

```json
{
  "statusCode": 201,
  "headers": {
    "Content-Type": "application/json",
    "Location": "/api/v1/users/${newUser.id}"
  },
  "body": {
    "id": "${newUser.id}",
    "message": "User created successfully"
  }
}
```

### Error Response

```json
{
  "statusCode": 400,
  "body": {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "${validationError}",
      "details": "${validationDetails}"
    }
  }
}
```

### List Response with Pagination

```json
{
  "statusCode": 200,
  "body": {
    "data": "${items}",
    "pagination": {
      "page": "${page}",
      "pageSize": "${pageSize}",
      "total": "${totalCount}",
      "totalPages": "${Math.ceil(totalCount / pageSize)}"
    }
  }
}
```

### Empty Response

```json
{
  "statusCode": 204
}
```

No body for 204 responses.

## Error Handling Patterns

### Standard Error Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": { /* additional info */ },
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "exec-123"
  }
}
```

### Multiple Errors

```json
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Invalid format" },
    { "field": "age", "message": "Must be positive" }
  ]
}
```

## Response Templates

Create reusable response structures:

### Success Template

```json
{
  "statusCode": 200,
  "body": {
    "success": true,
    "data": "${data}",
    "meta": {
      "requestId": "${context.executionId}",
      "timestamp": "${now()}"
    }
  }
}
```

### Error Template

```json
{
  "statusCode": "${errorCode || 500}",
  "body": {
    "success": false,
    "error": {
      "code": "${errorType}",
      "message": "${errorMessage}"
    },
    "meta": {
      "requestId": "${context.executionId}",
      "timestamp": "${now()}"
    }
  }
}
```

## Best Practices

1. **Use appropriate status codes** - Match HTTP semantics
2. **Include request ID** - Aid debugging
3. **Consistent format** - Same structure for all responses
4. **Handle errors gracefully** - Return meaningful messages
5. **Document response schemas** - Help API consumers

## CORS Headers

For cross-origin requests:

```json
{
  "headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  }
}
```

## Related Topics

- [Trigger Node](/docs/nodes/trigger)
- [HTTP Request Node](/docs/nodes/http-request)
- [API Reference](/docs/api/overview)
