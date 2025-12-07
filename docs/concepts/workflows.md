---
sidebar_position: 1
title: Workflows in NodeTL
description: Learn about workflows in NodeTL - the core building blocks for automating data pipelines and transformations.
keywords: [nodetl workflows, data pipelines, workflow automation, etl workflows]
---

# Workflows

Workflows are the core building blocks of NodeTL. They define automated data processing pipelines using a visual, node-based approach.

## What is a Workflow?

A workflow is a collection of connected nodes that process data from input to output. Each node performs a specific function:

```text
[Trigger] → [Transform] → [HTTP Request] → [Response]
```

## Workflow Components

### Nodes

Nodes are the building blocks of workflows. Each node type serves a specific purpose:

| Node Type | Description |
|-----------|-------------|
| **Trigger** | Starts the workflow (webhook, schedule, manual) |
| **Transform** | Applies data mappings and transformations |
| **HTTP Request** | Calls external APIs |
| **Condition** | Branches based on data values |
| **Loop** | Iterates over arrays |
| **Code** | Executes custom JavaScript |
| **Response** | Configures HTTP response |

### Connections

Connections link nodes together, defining the data flow. Data flows from node outputs to node inputs through these connections.

### Versions

Workflows support versioning using semantic versioning (e.g., `1.0.0`, `1.1.0`, `2.0.0`). This allows you to:

- Track changes over time
- Roll back to previous versions
- Run different versions simultaneously

## Creating a Workflow

### Via UI

1. Navigate to your project
2. Click "New Workflow"
3. Enter name and description
4. Use the visual editor to add and connect nodes

### Via API

```bash
curl -X POST http://localhost:8602/api/v1/workflows \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Workflow",
    "description": "Process incoming data",
    "projectId": "project-id"
  }'
```

## Workflow States

| State | Description |
|-------|-------------|
| **Draft** | Being edited, not executable |
| **Published** | Active and can receive triggers |
| **Disabled** | Temporarily deactivated |
| **Archived** | No longer in use |

## Execution Flow

When a workflow executes:

1. **Trigger** receives input data
2. Data flows through connected nodes
3. Each node processes and outputs data
4. **Response** node returns final output

### Error Handling

If a node fails:

- Execution stops at that node
- Error is logged with details
- Previous successful steps are recorded
- Workflow can be retried

## Best Practices

1. **Use descriptive names** - Make workflows easy to identify
2. **Version your workflows** - Track changes with semantic versioning
3. **Test with sample data** - Validate before publishing
4. **Monitor executions** - Check logs regularly
5. **Use conditions wisely** - Keep branching logic simple

## Example Workflow

Here's a typical API integration workflow:

```text
┌──────────────┐
│   Webhook    │  ← Receives POST request
│   Trigger    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Transform   │  ← Maps data to target format
│    Node      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    HTTP      │  ← Sends to external API
│   Request    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Response    │  ← Returns result
│    Node      │
└──────────────┘
```

## Related Topics

- [Node Types Overview](/docs/nodes/trigger)
- [Schemas and Mappings](/docs/concepts/schemas)
- [Executions](/docs/concepts/executions)
