---
sidebar_position: 3
title: HTTP Request Node
description: Learn how to use HTTP Request nodes to call external APIs and services in NodeTL workflows.
keywords: [nodetl http, api calls, rest api, http request, api integration]
---

# HTTP Request Node

The HTTP Request node allows you to call external APIs and services from your workflows.

## Overview

Use HTTP Request nodes to:

- Call REST APIs
- Send webhooks to other services
- Fetch data from external sources
- Submit data to third-party systems

## Configuration

### Basic Configuration

```json
{
  "type": "http",
  "config": {
    "method": "GET",
    "url": "https://api.example.com/users"
  }
}
```

### Full Configuration

```json
{
  "type": "http",
  "config": {
    "method": "POST",
    "url": "https://api.example.com/users",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer ${token}"
    },
    "body": {
      "name": "${user.name}",
      "email": "${user.email}"
    },
    "timeout": 30000,
    "retries": 3
  }
}
```

## HTTP Methods

| Method | Description | Has Body |
|--------|-------------|----------|
| `GET` | Retrieve data | No |
| `POST` | Create resource | Yes |
| `PUT` | Update/replace resource | Yes |
| `PATCH` | Partial update | Yes |
| `DELETE` | Delete resource | Optional |

## Request Options

### Headers

Set custom headers:

```json
{
  "headers": {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-API-Key": "${apiKey}",
    "Authorization": "Bearer ${token}"
  }
}
```

### Query Parameters

Add query string parameters:

```json
{
  "url": "https://api.example.com/search",
  "queryParams": {
    "q": "${searchTerm}",
    "limit": 10,
    "page": "${page}"
  }
}
```

Produces: `https://api.example.com/search?q=value&limit=10&page=1`

### Request Body

JSON body:

```json
{
  "body": {
    "name": "${user.name}",
    "email": "${user.email}",
    "metadata": {
      "source": "nodetl"
    }
  }
}
```

Form data:

```json
{
  "bodyType": "form",
  "body": {
    "username": "${username}",
    "password": "${password}"
  }
}
```

## Authentication

### Bearer Token

```json
{
  "auth": {
    "type": "bearer",
    "token": "${accessToken}"
  }
}
```

### Basic Auth

```json
{
  "auth": {
    "type": "basic",
    "username": "${username}",
    "password": "${password}"
  }
}
```

### API Key

```json
{
  "auth": {
    "type": "apiKey",
    "key": "X-API-Key",
    "value": "${apiKey}",
    "in": "header"
  }
}
```

### OAuth 2.0

```json
{
  "auth": {
    "type": "oauth2",
    "grantType": "client_credentials",
    "clientId": "${clientId}",
    "clientSecret": "${clientSecret}",
    "tokenUrl": "https://auth.example.com/token"
  }
}
```

## Response Handling

### Response Structure

```json
{
  "status": 200,
  "statusText": "OK",
  "headers": {
    "content-type": "application/json"
  },
  "body": {
    "id": "123",
    "name": "John Doe"
  }
}
```

### Accessing Response Data

In subsequent nodes:

```javascript
${response.status}           // 200
${response.body.id}          // "123"
${response.headers['content-type']}  // "application/json"
```

## Error Handling

### Timeout Configuration

```json
{
  "timeout": 30000,
  "retries": 3,
  "retryDelay": 1000
}
```

### Retry on Specific Errors

```json
{
  "retryOn": [500, 502, 503, 504],
  "retries": 3,
  "retryDelay": 2000,
  "retryBackoff": "exponential"
}
```

### Continue on Error

```json
{
  "continueOnError": true,
  "errorOutput": "error"
}
```

This allows the workflow to continue even if the request fails.

## Dynamic URLs

Use expressions in URLs:

```json
{
  "url": "https://api.example.com/users/${userId}/orders/${orderId}"
}
```

## Examples

### GET Request

```json
{
  "method": "GET",
  "url": "https://api.example.com/users",
  "queryParams": {
    "status": "active",
    "limit": 100
  },
  "headers": {
    "Authorization": "Bearer ${token}"
  }
}
```

### POST with JSON Body

```json
{
  "method": "POST",
  "url": "https://api.example.com/users",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "name": "${input.name}",
    "email": "${input.email}",
    "role": "user"
  }
}
```

### Webhook Call

```json
{
  "method": "POST",
  "url": "https://hooks.slack.com/services/xxx",
  "body": {
    "text": "New order received: ${order.id}",
    "channel": "#orders"
  }
}
```

### File Upload

```json
{
  "method": "POST",
  "url": "https://api.example.com/upload",
  "bodyType": "multipart",
  "body": {
    "file": "${fileContent}",
    "filename": "data.csv"
  }
}
```

## Best Practices

1. **Use timeout** - Always set appropriate timeouts
2. **Handle errors** - Plan for API failures
3. **Add retries** - For transient errors
4. **Secure credentials** - Use environment variables
5. **Log requests** - Enable for debugging
6. **Rate limiting** - Respect API limits

## Debugging

Enable request logging:

```json
{
  "debug": true,
  "logRequest": true,
  "logResponse": true
}
```

View in execution traces to see full request/response details.

## Related Topics

- [Trigger Node](/docs/nodes/trigger)
- [Transform Node](/docs/nodes/transform)
- [Response Node](/docs/nodes/response)
