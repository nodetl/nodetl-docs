---
sidebar_position: 3
title: Data Schemas
description: Learn how to define and manage data schemas in NodeTL for data validation and mapping.
keywords: [nodetl schemas, json schema, data validation, data structures]
---

# Data Schemas

Schemas define the structure of your data. They are essential for data validation, mapping, and transformation in NodeTL.

## What is a Schema?

A schema is a JSON Schema definition that describes:

- Field names and types
- Required vs optional fields
- Nested structures
- Arrays and their items
- Validation rules

## Schema Structure

```json
{
  "name": "User",
  "description": "User data structure",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "User email address"
    },
    "name": {
      "type": "string",
      "description": "Full name"
    },
    "age": {
      "type": "number",
      "minimum": 0,
      "description": "Age in years"
    },
    "active": {
      "type": "boolean",
      "default": true
    }
  },
  "required": ["id", "email", "name"]
}
```

## Supported Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text values | `"hello"` |
| `number` | Numeric values | `42`, `3.14` |
| `integer` | Whole numbers | `42` |
| `boolean` | True/false | `true`, `false` |
| `object` | Nested objects | `{ "key": "value" }` |
| `array` | Lists of items | `[1, 2, 3]` |
| `null` | Null value | `null` |

## Creating Schemas

### Via UI

1. Navigate to "Schemas" in sidebar
2. Click "New Schema"
3. Enter name and description
4. Define properties using the visual editor or JSON

### Via API

```bash
curl -X POST http://localhost:8602/api/v1/schemas \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer",
    "description": "Customer data structure",
    "schema": {
      "type": "object",
      "properties": {
        "customerId": { "type": "string" },
        "company": { "type": "string" },
        "contacts": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "email": { "type": "string" }
            }
          }
        }
      }
    }
  }'
```

## Complex Schemas

### Nested Objects

```json
{
  "type": "object",
  "properties": {
    "user": {
      "type": "object",
      "properties": {
        "profile": {
          "type": "object",
          "properties": {
            "firstName": { "type": "string" },
            "lastName": { "type": "string" }
          }
        }
      }
    }
  }
}
```

### Arrays

```json
{
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "quantity": { "type": "number" }
        }
      }
    }
  }
}
```

### Enums

```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["pending", "active", "completed", "cancelled"]
    }
  }
}
```

## Schema Validation

Schemas are used to validate data at runtime:

- Input validation on triggers
- Output validation on transforms
- Request/response validation for HTTP nodes

### Validation Errors

When validation fails, you get detailed error messages:

```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": "/email",
      "message": "must be a valid email format"
    },
    {
      "path": "/age",
      "message": "must be >= 0"
    }
  ]
}
```

## AI-Powered Features

With OpenAI integration, you can:

### Generate Test Data

```bash
curl -X POST http://localhost:8602/api/v1/ai/generate-data \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "schemaId": "schema-id",
    "count": 5
  }'
```

### Get Mapping Suggestions

AI can suggest field mappings between source and target schemas based on field names and types.

## Best Practices

1. **Use descriptive names** - Schema names should reflect the data they describe
2. **Add descriptions** - Document each field's purpose
3. **Mark required fields** - Validate essential data
4. **Use appropriate types** - Choose the most specific type
5. **Version schemas** - Track changes to data structures

## Related Topics

- [Data Mappings](/docs/concepts/mappings)
- [Transform Node](/docs/nodes/transform)
- [API Reference](/docs/api/schemas)
