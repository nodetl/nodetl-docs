---
sidebar_position: 2
title: Node Types Overview
description: Complete guide to all node types in NodeTL including triggers, transforms, HTTP requests, conditions, loops, and more.
keywords: [nodetl nodes, workflow nodes, trigger node, transform node, http node]
---

# Node Types

NodeTL provides several built-in node types for building data transformation workflows. Each node type serves a specific purpose in the data pipeline.

## Available Node Types

| Node | Icon | Purpose |
|------|------|---------|
| [Trigger](/docs/nodes/trigger) | ⚡ | Start workflow execution |
| [Transform](/docs/nodes/transform) | 🔄 | Map and transform data |
| [HTTP Request](/docs/nodes/http-request) | 🌐 | Call external APIs |
| [Condition](/docs/nodes/condition) | ❓ | Branch based on conditions |
| [Loop](/docs/nodes/loop) | 🔁 | Iterate over arrays |
| [Code](/docs/nodes/code) | 💻 | Custom JavaScript logic |
| [Response](/docs/nodes/response) | 📤 | Configure HTTP response |

## Node Anatomy

Every node has:

- **Inputs** - Data entry points (left side)
- **Outputs** - Data exit points (right side)
- **Configuration** - Node-specific settings
- **Status** - Current execution state

## Node Categories

### Entry Nodes

**Trigger** - The only entry node type. Every workflow must start with a Trigger node.

### Processing Nodes

- **Transform** - Apply data mappings
- **Code** - Custom JavaScript expressions
- **Loop** - Process arrays

### Flow Control Nodes

- **Condition** - Branch workflow paths

### Integration Nodes

- **HTTP Request** - External API calls

### Exit Nodes

- **Response** - Return data to caller

## Data Flow

Data flows through nodes as JSON objects:

```json
{
  "input": { /* data from previous node */ },
  "context": { /* workflow context */ },
  "metadata": { /* execution metadata */ }
}
```

## Node Configuration

### Common Properties

All nodes share these properties:

| Property | Description |
|----------|-------------|
| `id` | Unique node identifier |
| `type` | Node type (trigger, transform, etc.) |
| `label` | Display name |
| `position` | Canvas coordinates |
| `data` | Node-specific configuration |

### Type-Specific Data

Each node type has its own configuration options. See individual node documentation for details.

## Connecting Nodes

Nodes connect through handles:

1. Click an output handle (right side of node)
2. Drag to an input handle (left side of target node)
3. Release to create connection

### Connection Rules

- One output can connect to multiple inputs
- One input can receive from multiple outputs
- Circular connections are not allowed
- Data merges when multiple connections enter one input

## Custom Node Types

NodeTL supports defining custom node types for specialized use cases.

### Creating Custom Nodes

```bash
curl -X POST http://localhost:8602/api/v1/node-types \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Custom API",
    "category": "integration",
    "icon": "🔌",
    "configSchema": {
      "type": "object",
      "properties": {
        "apiKey": { "type": "string" },
        "endpoint": { "type": "string" }
      }
    }
  }'
```

## Best Practices

1. **Keep workflows simple** - Break complex logic into multiple workflows
2. **Use Transform for mapping** - Don't use Code nodes for simple mappings
3. **Handle errors** - Add condition nodes for error handling
4. **Name nodes clearly** - Use descriptive labels
5. **Document purpose** - Add comments in Code nodes

## Next Steps

- [Trigger Node](/docs/nodes/trigger)
- [Transform Node](/docs/nodes/transform)
- [HTTP Request Node](/docs/nodes/http-request)
