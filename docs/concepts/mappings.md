---
sidebar_position: 4
title: Data Mappings
description: Learn how to create visual data mappings between schemas in NodeTL for data transformation.
keywords: [nodetl mappings, data mapping, field mapping, data transformation, etl mapping]
---

# Data Mappings

Mappings define how data transforms from one schema to another. They are the core feature of NodeTL's data transformation capabilities.

## What is a Mapping?

A mapping connects fields from a source schema to a target schema, optionally applying transformations along the way.

```text
Source Schema              Target Schema
├── firstName      →       ├── fullName (concat with lastName)
├── lastName       →       │
├── email          →       ├── contactEmail
└── birthDate      →       └── age (calculate from date)
```

## Mapping Types

### Direct Mapping

Simple 1:1 field mapping without transformation:

```json
{
  "source": "email",
  "target": "contactEmail",
  "type": "direct"
}
```

### Expression Mapping

Apply transformations using expressions:

```json
{
  "source": ["firstName", "lastName"],
  "target": "fullName",
  "type": "expression",
  "expression": "${firstName} ${lastName}"
}
```

### Computed Mapping

Calculate values from multiple fields:

```json
{
  "target": "totalPrice",
  "type": "computed",
  "expression": "${quantity} * ${unitPrice}"
}
```

### Static Mapping

Set constant values:

```json
{
  "target": "source",
  "type": "static",
  "value": "nodetl"
}
```

## Creating Mappings

### Via Visual Editor

1. Go to "Mappings" in sidebar
2. Click "New Mapping"
3. Select source and target schemas
4. Drag fields from source to target
5. Configure transformations
6. Save mapping

### Via API

```bash
curl -X POST http://localhost:8602/api/v1/mappings \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User to Customer",
    "sourceSchemaId": "source-schema-id",
    "targetSchemaId": "target-schema-id",
    "fieldMappings": [
      {
        "source": "email",
        "target": "contactEmail",
        "type": "direct"
      },
      {
        "source": ["firstName", "lastName"],
        "target": "fullName",
        "type": "expression",
        "expression": "${firstName} ${lastName}"
      }
    ]
  }'
```

## Transformation Functions

### String Functions

| Function | Description | Example |
|----------|-------------|---------|
| `upper()` | Uppercase | `${upper(name)}` → "JOHN" |
| `lower()` | Lowercase | `${lower(name)}` → "john" |
| `trim()` | Remove whitespace | `${trim(name)}` |
| `concat()` | Join strings | `${concat(first, ' ', last)}` |
| `substring()` | Extract part | `${substring(name, 0, 3)}` |
| `replace()` | Replace text | `${replace(text, 'old', 'new')}` |

### Number Functions

| Function | Description | Example |
|----------|-------------|---------|
| `round()` | Round number | `${round(price, 2)}` |
| `floor()` | Round down | `${floor(quantity)}` |
| `ceil()` | Round up | `${ceil(quantity)}` |
| `abs()` | Absolute value | `${abs(difference)}` |
| `min()` | Minimum | `${min(a, b)}` |
| `max()` | Maximum | `${max(a, b)}` |

### Date Functions

| Function | Description | Example |
|----------|-------------|---------|
| `now()` | Current timestamp | `${now()}` |
| `formatDate()` | Format date | `${formatDate(date, 'YYYY-MM-DD')}` |
| `parseDate()` | Parse string to date | `${parseDate(str, 'MM/DD/YYYY')}` |
| `addDays()` | Add days | `${addDays(date, 7)}` |
| `diffDays()` | Days between | `${diffDays(start, end)}` |

### Array Functions

| Function | Description | Example |
|----------|-------------|---------|
| `length()` | Array length | `${length(items)}` |
| `first()` | First element | `${first(items)}` |
| `last()` | Last element | `${last(items)}` |
| `join()` | Join to string | `${join(tags, ', ')}` |
| `map()` | Transform each | See below |

### Type Conversion

| Function | Description | Example |
|----------|-------------|---------|
| `toString()` | Convert to string | `${toString(id)}` |
| `toNumber()` | Convert to number | `${toNumber(quantity)}` |
| `toBoolean()` | Convert to boolean | `${toBoolean(active)}` |

## Complex Mappings

### Nested Object Mapping

```json
{
  "fieldMappings": [
    {
      "source": "user.profile.firstName",
      "target": "customer.name.first",
      "type": "direct"
    },
    {
      "source": "user.address",
      "target": "customer.shippingAddress",
      "type": "object",
      "nestedMappings": [
        { "source": "street", "target": "line1" },
        { "source": "city", "target": "city" },
        { "source": "zip", "target": "postalCode" }
      ]
    }
  ]
}
```

### Array Mapping

```json
{
  "source": "orderItems",
  "target": "lineItems",
  "type": "array",
  "itemMappings": [
    { "source": "productId", "target": "sku" },
    { "source": "qty", "target": "quantity" },
    { "source": "price", "target": "unitPrice" }
  ]
}
```

### Conditional Mapping

```json
{
  "target": "customerType",
  "type": "conditional",
  "conditions": [
    {
      "when": "${totalOrders > 100}",
      "value": "premium"
    },
    {
      "when": "${totalOrders > 10}",
      "value": "regular"
    }
  ],
  "default": "new"
}
```

## Using Mappings in Workflows

1. Create your mapping
2. Add a Transform node to your workflow
3. Select the mapping in the Transform node configuration
4. Connect input and output

The Transform node applies the mapping to incoming data.

## Testing Mappings

### Test with Sample Data

```bash
curl -X POST http://localhost:8602/api/v1/mappings/{id}/test \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    }
  }'
```

### Generate Test Data

Use AI to generate sample data matching your source schema.

## Best Practices

1. **Start with direct mappings** - Add complexity only when needed
2. **Test incrementally** - Validate each field mapping
3. **Use descriptive names** - Document what the mapping does
4. **Handle nulls** - Consider missing data scenarios
5. **Version mappings** - Track changes over time

## Related Topics

- [Schemas](/docs/concepts/schemas)
- [Transform Node](/docs/nodes/transform)
- [API Reference](/docs/api/mappings)
