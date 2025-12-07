---
sidebar_position: 4
title: Condition Node
description: Learn how to use Condition nodes to create branching logic in NodeTL workflows.
keywords: [nodetl condition, branching, conditional logic, if else, workflow branching]
---

# Condition Node

The Condition node creates branching paths in your workflow based on data conditions.

## Overview

Use Condition nodes to:

- Route data based on values
- Implement if/else logic
- Filter data streams
- Handle different scenarios

## Configuration

### Basic Configuration

```json
{
  "type": "condition",
  "config": {
    "conditions": [
      {
        "name": "high-value",
        "expression": "${amount > 1000}"
      }
    ],
    "defaultOutput": "normal"
  }
}
```

## Outputs

Condition nodes have multiple outputs:

- One output per condition (true branch)
- Default output (when no conditions match)

```text
                    ┌──→ [High Value Path]
[Input] → [Condition] ──→ [Normal Path]
                    └──→ [Default Path]
```

## Expression Syntax

### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal | `${status == 'active'}` |
| `!=` | Not equal | `${status != 'deleted'}` |
| `>` | Greater than | `${amount > 100}` |
| `>=` | Greater or equal | `${age >= 18}` |
| `<` | Less than | `${quantity < 10}` |
| `<=` | Less or equal | `${price <= 50}` |

### Logical Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `&&` | AND | `${age >= 18 && country == 'US'}` |
| `\|\|` | OR | `${status == 'active' \|\| status == 'pending'}` |
| `!` | NOT | `${!isDeleted}` |

### String Operations

```javascript
// Contains
${name.includes('John')}

// Starts with
${email.startsWith('admin')}

// Ends with
${filename.endsWith('.pdf')}

// Regex match
${/^[A-Z]{2}\d{4}$/.test(code)}
```

### Array Operations

```javascript
// Array length
${items.length > 0}

// Contains value
${tags.includes('urgent')}

// Some match
${items.some(item => item.quantity > 10)}

// Every match
${items.every(item => item.price > 0)}
```

### Null Checks

```javascript
// Is null/undefined
${value == null}

// Is not null
${value != null}

// Has property
${'email' in user}

// Optional chaining
${user?.profile?.name != null}
```

## Multiple Conditions

Evaluate multiple conditions in order:

```json
{
  "conditions": [
    {
      "name": "premium",
      "expression": "${customer.tier == 'premium'}"
    },
    {
      "name": "high-value",
      "expression": "${order.total > 500}"
    },
    {
      "name": "new-customer",
      "expression": "${customer.orderCount == 1}"
    }
  ],
  "defaultOutput": "standard"
}
```

First matching condition wins.

## Connecting Outputs

Each condition creates an output port:

```text
Condition Node
├── [premium]      → Premium Processing
├── [high-value]   → High Value Processing
├── [new-customer] → Welcome Flow
└── [default]      → Standard Processing
```

## Examples

### Order Routing

```json
{
  "conditions": [
    {
      "name": "express",
      "expression": "${shipping.method == 'express'}"
    },
    {
      "name": "international",
      "expression": "${shipping.country != 'US'}"
    }
  ],
  "defaultOutput": "standard"
}
```

### Error Handling

```json
{
  "conditions": [
    {
      "name": "success",
      "expression": "${response.status >= 200 && response.status < 300}"
    },
    {
      "name": "client-error",
      "expression": "${response.status >= 400 && response.status < 500}"
    },
    {
      "name": "server-error",
      "expression": "${response.status >= 500}"
    }
  ],
  "defaultOutput": "unknown"
}
```

### Data Validation

```json
{
  "conditions": [
    {
      "name": "valid",
      "expression": "${data.email && data.name && data.phone}"
    }
  ],
  "defaultOutput": "invalid"
}
```

### Amount Tiers

```json
{
  "conditions": [
    {
      "name": "enterprise",
      "expression": "${amount >= 10000}"
    },
    {
      "name": "business",
      "expression": "${amount >= 1000}"
    },
    {
      "name": "starter",
      "expression": "${amount >= 100}"
    }
  ],
  "defaultOutput": "free"
}
```

## Best Practices

1. **Order conditions correctly** - Most specific first
2. **Always have a default** - Handle unexpected cases
3. **Keep expressions simple** - Use Code nodes for complex logic
4. **Test all branches** - Ensure each path works
5. **Document conditions** - Use clear names

## Debugging

View condition evaluation in execution traces:

```json
{
  "nodeId": "condition-1",
  "evaluations": [
    { "name": "premium", "expression": "customer.tier == 'premium'", "result": false },
    { "name": "high-value", "expression": "order.total > 500", "result": true }
  ],
  "selectedOutput": "high-value"
}
```

## Related Topics

- [Workflows](/docs/concepts/workflows)
- [Loop Node](/docs/nodes/loop)
- [Code Node](/docs/nodes/code)
