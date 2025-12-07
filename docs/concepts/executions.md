---
sidebar_position: 5
title: Workflow Executions
description: Learn about workflow executions, logging, and monitoring in NodeTL.
keywords: [nodetl executions, workflow logs, monitoring, debugging]
---

# Workflow Executions

Executions represent individual runs of a workflow. NodeTL provides detailed logging and monitoring for every execution.

## Execution Lifecycle

```text
[Triggered] → [Running] → [Completed/Failed]
```

### Execution States

| State | Description |
|-------|-------------|
| `pending` | Queued for execution |
| `running` | Currently executing |
| `completed` | Finished successfully |
| `failed` | Encountered an error |
| `cancelled` | Manually stopped |

## Viewing Executions

### Via UI

1. Navigate to "Executions" in sidebar
2. Filter by workflow, status, or date range
3. Click an execution to see details

### Via API

```bash
# List executions
curl -X GET "http://localhost:8602/api/v1/executions?workflowId=xxx" \
  -H "Authorization: Bearer $TOKEN"

# Get execution details
curl -X GET http://localhost:8602/api/v1/executions/{id} \
  -H "Authorization: Bearer $TOKEN"
```

## Execution Details

Each execution record contains:

### Metadata

```json
{
  "id": "exec-123",
  "workflowId": "wf-456",
  "versionId": "v-789",
  "status": "completed",
  "startedAt": "2024-01-15T10:30:00Z",
  "completedAt": "2024-01-15T10:30:02Z",
  "duration": 2000
}
```

### Input Data

The original data that triggered the workflow:

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

### Output Data

The final result after all transformations:

```json
{
  "output": {
    "customer": {
      "fullName": "John Doe"
    }
  }
}
```

### Node Traces

Step-by-step execution trace for each node:

```json
{
  "traces": [
    {
      "nodeId": "trigger-1",
      "nodeName": "Webhook Trigger",
      "status": "completed",
      "startedAt": "2024-01-15T10:30:00Z",
      "duration": 5,
      "input": { /* trigger input */ },
      "output": { /* trigger output */ }
    },
    {
      "nodeId": "transform-1",
      "nodeName": "User Transform",
      "status": "completed",
      "startedAt": "2024-01-15T10:30:00Z",
      "duration": 10,
      "input": { /* transform input */ },
      "output": { /* transform output */ }
    }
  ]
}
```

## Debugging Failed Executions

### Error Information

Failed executions include error details:

```json
{
  "status": "failed",
  "error": {
    "nodeId": "http-request-1",
    "message": "Connection timeout",
    "code": "TIMEOUT",
    "details": {
      "url": "https://api.example.com/users",
      "timeout": 30000
    }
  }
}
```

### Debugging Steps

1. **Check the failed node** - Identify which node caused the failure
2. **Review input data** - Ensure data matches expected format
3. **Check node configuration** - Verify settings are correct
4. **Review error message** - Understand the root cause
5. **Test with sample data** - Reproduce the issue

## Monitoring

### Execution Statistics

View aggregated statistics:

```bash
curl -X GET "http://localhost:8602/api/v1/executions/stats?workflowId=xxx" \
  -H "Authorization: Bearer $TOKEN"
```

Response:

```json
{
  "total": 1000,
  "completed": 950,
  "failed": 50,
  "averageDuration": 1500,
  "successRate": 0.95
}
```

### Setting Up Alerts

Configure alerts for:

- Failed executions
- High error rates
- Long execution times
- Specific error types

## Retention Policy

Executions are retained based on your settings:

| Setting | Default | Description |
|---------|---------|-------------|
| `execution_retention_days` | 30 | Days to keep execution records |
| `execution_retention_count` | 10000 | Maximum records per workflow |

Configure via settings API:

```bash
curl -X PUT http://localhost:8602/api/v1/settings \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "executionRetentionDays": 60,
    "executionRetentionCount": 50000
  }'
```

## Replaying Executions

Re-run a workflow with the same input data:

```bash
curl -X POST http://localhost:8602/api/v1/executions/{id}/replay \
  -H "Authorization: Bearer $TOKEN"
```

This creates a new execution with the original input.

## Best Practices

1. **Monitor regularly** - Check execution logs for issues
2. **Set up alerts** - Get notified of failures
3. **Review failed executions** - Fix recurring issues
4. **Use appropriate retention** - Balance storage and history needs
5. **Test before production** - Validate workflows thoroughly

## Related Topics

- [Workflows](/docs/concepts/workflows)
- [Node Types](/docs/concepts/nodes)
- [API Reference](/docs/api/executions)
