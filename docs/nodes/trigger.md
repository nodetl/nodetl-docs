---
sidebar_position: 1
title: Trigger Node
description: Learn how to use Trigger nodes to start workflows via webhooks, schedules, or manual triggers in NodeTL.
keywords: [nodetl trigger, webhook trigger, cron trigger, workflow trigger]
---

# Trigger Node

The Trigger node is the entry point for every workflow. It defines how and when a workflow starts executing.

## Trigger Types

### Webhook Trigger

Receive HTTP requests to start the workflow:

```json
{
  "type": "webhook",
  "config": {
    "method": "POST",
    "path": "/custom-path",
    "authentication": "none"
  }
}
```

**Webhook URL Format:**

```text
POST http://localhost:8602/api/v1/webhooks/{workflowId}
```

Or with custom path:

```text
POST http://localhost:8602/api/v1/webhooks/{workflowId}/custom-path
```

### Schedule Trigger (Cron)

Run workflows on a schedule:

```json
{
  "type": "schedule",
  "config": {
    "cron": "0 9 * * *",
    "timezone": "America/New_York"
  }
}
```

**Common Cron Patterns:**

| Pattern | Description |
|---------|-------------|
| `* * * * *` | Every minute |
| `0 * * * *` | Every hour |
| `0 9 * * *` | Every day at 9 AM |
| `0 9 * * 1-5` | Weekdays at 9 AM |
| `0 0 1 * *` | First day of month |

### Manual Trigger

Start workflows manually via UI or API:

```json
{
  "type": "manual",
  "config": {
    "inputSchema": "schema-id"
  }
}
```

## Configuration Options

### Authentication

Secure webhook endpoints:

| Option | Description |
|--------|-------------|
| `none` | No authentication |
| `bearer` | Bearer token required |
| `basic` | Basic auth credentials |
| `header` | Custom header validation |

**Bearer Token Example:**

```json
{
  "authentication": "bearer",
  "token": "your-secret-token"
}
```

Request:

```bash
curl -X POST http://localhost:8602/api/v1/webhooks/{workflowId} \
  -H "Authorization: Bearer your-secret-token" \
  -H "Content-Type: application/json" \
  -d '{"data": "value"}'
```

### Input Validation

Validate incoming data against a schema:

```json
{
  "type": "webhook",
  "config": {
    "inputSchema": "user-input-schema",
    "validateInput": true
  }
}
```

Invalid requests return:

```json
{
  "error": "Validation failed",
  "details": [
    {"path": "/email", "message": "is required"}
  ]
}
```

## Output Data

The Trigger node outputs:

```json
{
  "body": { /* request body */ },
  "headers": { /* request headers */ },
  "query": { /* query parameters */ },
  "params": { /* path parameters */ },
  "metadata": {
    "triggeredAt": "2024-01-15T10:30:00Z",
    "triggerType": "webhook",
    "executionId": "exec-123"
  }
}
```

## Examples

### REST API Endpoint

```json
{
  "type": "webhook",
  "config": {
    "method": "POST",
    "path": "/users",
    "authentication": "bearer"
  }
}
```

### Daily Report Generation

```json
{
  "type": "schedule",
  "config": {
    "cron": "0 8 * * *",
    "timezone": "UTC"
  }
}
```

### Event Processing

```json
{
  "type": "webhook",
  "config": {
    "method": "POST",
    "inputSchema": "event-schema",
    "validateInput": true
  }
}
```

## Best Practices

1. **Use authentication** for production webhooks
2. **Validate inputs** to ensure data quality
3. **Use meaningful paths** for webhook organization
4. **Set appropriate timeouts** for long-running workflows
5. **Monitor trigger frequency** to avoid rate limits

## Related Topics

- [Workflows](/docs/concepts/workflows)
- [HTTP Request Node](/docs/nodes/http-request)
- [Response Node](/docs/nodes/response)
