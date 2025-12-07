---
sidebar_position: 5
title: Loop Node
description: Learn how to use Loop nodes to iterate over arrays and collections in NodeTL workflows.
keywords: [nodetl loop, iteration, array processing, foreach, batch processing]
---

# Loop Node

The Loop node iterates over arrays and collections, processing each item through connected nodes.

## Overview

Use Loop nodes to:

- Process each item in an array
- Batch process data
- Transform collections
- Aggregate results

## Configuration

### Basic Configuration

```json
{
  "type": "loop",
  "config": {
    "source": "items",
    "itemVariable": "item",
    "indexVariable": "index"
  }
}
```

### With Options

```json
{
  "type": "loop",
  "config": {
    "source": "orders",
    "itemVariable": "order",
    "indexVariable": "i",
    "parallel": false,
    "batchSize": 10,
    "continueOnError": true
  }
}
```

## Loop Flow

```text
┌─────────────────────────────────────────┐
│              Loop Node                   │
│  ┌─────┐    ┌─────┐    ┌─────┐         │
│  │Item1│ → │Item2│ → │Item3│ → ...    │
│  └─────┘    └─────┘    └─────┘         │
└────────────────┬────────────────────────┘
                 │
                 ▼
        [Process Each Item]
                 │
                 ▼
        [Collect Results]
```

## Input and Output

### Input

Array to iterate over:

```json
{
  "items": [
    { "id": 1, "name": "Product A" },
    { "id": 2, "name": "Product B" },
    { "id": 3, "name": "Product C" }
  ]
}
```

### Loop Body Context

For each iteration:

```json
{
  "item": { "id": 1, "name": "Product A" },
  "index": 0,
  "total": 3,
  "isFirst": true,
  "isLast": false
}
```

### Output

Collected results:

```json
{
  "results": [
    { "processed": true, "productId": 1 },
    { "processed": true, "productId": 2 },
    { "processed": true, "productId": 3 }
  ],
  "count": 3,
  "errors": []
}
```

## Processing Modes

### Sequential (Default)

Process items one at a time:

```json
{
  "parallel": false
}
```

### Parallel

Process multiple items simultaneously:

```json
{
  "parallel": true,
  "maxConcurrency": 5
}
```

### Batch Processing

Process items in batches:

```json
{
  "batchSize": 10,
  "batchDelay": 1000
}
```

## Error Handling

### Stop on Error (Default)

```json
{
  "continueOnError": false
}
```

### Continue on Error

```json
{
  "continueOnError": true,
  "collectErrors": true
}
```

Output includes errors:

```json
{
  "results": [
    { "success": true, "data": {...} },
    { "success": true, "data": {...} }
  ],
  "errors": [
    { "index": 2, "error": "Processing failed" }
  ]
}
```

## Accessing Loop Variables

Inside loop body:

```javascript
${item}           // Current item
${index}          // Current index (0-based)
${total}          // Total items
${isFirst}        // true if first item
${isLast}         // true if last item
```

## Examples

### Transform Each Item

```json
{
  "type": "loop",
  "config": {
    "source": "users",
    "itemVariable": "user"
  }
}
```

Loop body (Transform node):

```json
{
  "userId": "${user.id}",
  "fullName": "${user.firstName} ${user.lastName}",
  "processedAt": "${now()}"
}
```

### API Call per Item

```json
{
  "type": "loop",
  "config": {
    "source": "productIds",
    "itemVariable": "productId",
    "parallel": true,
    "maxConcurrency": 3
  }
}
```

Loop body (HTTP node):

```json
{
  "method": "GET",
  "url": "https://api.example.com/products/${productId}"
}
```

### Batch Import

```json
{
  "type": "loop",
  "config": {
    "source": "records",
    "batchSize": 100,
    "batchDelay": 500
  }
}
```

### Filter and Process

Combine with Condition node:

```text
[Loop] → [Condition: isActive?] → [Process Active Items]
                              └→ [Skip Inactive]
```

## Aggregation

### Collect Results

All iteration outputs are collected:

```json
{
  "results": [/* all outputs */],
  "count": 10
}
```

### Custom Aggregation

Use Code node after loop:

```javascript
const total = results.reduce((sum, r) => sum + r.amount, 0);
const average = total / results.length;
return { total, average, count: results.length };
```

## Performance Tips

1. **Use batch processing** for large arrays
2. **Limit parallel concurrency** to avoid rate limits
3. **Add delays** between batches if needed
4. **Consider chunking** very large datasets

## Limits

| Setting | Default | Description |
|---------|---------|-------------|
| Max items | 10,000 | Maximum array size |
| Max parallel | 10 | Maximum concurrent items |
| Timeout per item | 60s | Individual item timeout |

## Best Practices

1. **Validate array input** - Handle empty arrays
2. **Use appropriate parallelism** - Based on target API limits
3. **Handle errors gracefully** - Use `continueOnError` when appropriate
4. **Monitor performance** - Check execution times
5. **Add logging** - Track progress for large loops

## Related Topics

- [Transform Node](/docs/nodes/transform)
- [Condition Node](/docs/nodes/condition)
- [Code Node](/docs/nodes/code)
