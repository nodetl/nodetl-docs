---
sidebar_position: 2
title: Transform Node
description: Learn how to use Transform nodes to map and transform data between schemas in NodeTL.
keywords: [nodetl transform, data transformation, field mapping, etl transform]
---

# Transform Node

The Transform node is the core of NodeTL's data transformation capabilities. It applies mappings to convert data from one format to another.

## Overview

Transform nodes:

- Apply predefined mappings
- Convert data between schemas
- Execute transformations on each field
- Support complex nested transformations

## Configuration

### Basic Configuration

```json
{
  "type": "transform",
  "config": {
    "mappingId": "mapping-123"
  }
}
```

### Inline Mapping

Define mappings directly in the node:

```json
{
  "type": "transform",
  "config": {
    "sourceSchema": "user-schema",
    "targetSchema": "customer-schema",
    "fieldMappings": [
      {
        "source": "email",
        "target": "contactEmail"
      },
      {
        "source": ["firstName", "lastName"],
        "target": "fullName",
        "expression": "${firstName} ${lastName}"
      }
    ]
  }
}
```

## Input and Output

### Input

Transform receives data from the previous node:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "birthDate": "1990-05-15"
}
```

### Output

Transformed data based on mapping:

```json
{
  "fullName": "John Doe",
  "contactEmail": "john@example.com",
  "age": 34
}
```

## Transformation Types

### Direct Mapping

Copy value without transformation:

```json
{
  "source": "email",
  "target": "contactEmail"
}
```

### Expression Mapping

Apply transformations:

```json
{
  "source": "price",
  "target": "formattedPrice",
  "expression": "$${price.toFixed(2)}"
}
```

### Concatenation

Combine multiple fields:

```json
{
  "source": ["firstName", "lastName"],
  "target": "fullName",
  "expression": "${firstName} ${lastName}"
}
```

### Calculated Fields

Compute new values:

```json
{
  "target": "totalPrice",
  "expression": "${quantity} * ${unitPrice} * (1 + ${taxRate})"
}
```

### Conditional Values

Set values based on conditions:

```json
{
  "target": "status",
  "expression": "${amount > 1000 ? 'high' : 'normal'}"
}
```

## Working with Arrays

### Array Mapping

Transform each item in an array:

```json
{
  "source": "items",
  "target": "lineItems",
  "type": "array",
  "itemMappings": [
    { "source": "productId", "target": "sku" },
    { "source": "qty", "target": "quantity" }
  ]
}
```

Input:

```json
{
  "items": [
    { "productId": "P001", "qty": 2 },
    { "productId": "P002", "qty": 1 }
  ]
}
```

Output:

```json
{
  "lineItems": [
    { "sku": "P001", "quantity": 2 },
    { "sku": "P002", "quantity": 1 }
  ]
}
```

### Array Aggregation

```json
{
  "target": "itemCount",
  "expression": "${items.length}"
}
```

```json
{
  "target": "totalQuantity",
  "expression": "${items.reduce((sum, item) => sum + item.qty, 0)}"
}
```

## Nested Objects

### Flatten Nested Data

```json
{
  "source": "user.profile.firstName",
  "target": "firstName"
}
```

### Create Nested Structure

```json
{
  "source": "firstName",
  "target": "customer.name.first"
}
```

### Object Mapping

```json
{
  "source": "address",
  "target": "shippingAddress",
  "type": "object",
  "nestedMappings": [
    { "source": "street", "target": "line1" },
    { "source": "city", "target": "city" },
    { "source": "zip", "target": "postalCode" }
  ]
}
```

## Built-in Functions

### String Functions

```javascript
${upper(name)}           // "JOHN"
${lower(name)}           // "john"
${trim(name)}            // Remove whitespace
${substring(name, 0, 3)} // "Joh"
${replace(text, 'a', 'b')} // Replace all 'a' with 'b'
${split(csv, ',')}       // Split to array
```

### Number Functions

```javascript
${round(price, 2)}       // 19.99
${floor(quantity)}       // 5
${ceil(quantity)}        // 6
${abs(difference)}       // Absolute value
${min(a, b)}             // Minimum
${max(a, b)}             // Maximum
```

### Date Functions

```javascript
${now()}                              // Current timestamp
${formatDate(date, 'YYYY-MM-DD')}     // Format date
${parseDate(str, 'MM/DD/YYYY')}       // Parse string to date
${addDays(date, 7)}                   // Add days
${diffDays(start, end)}               // Days between dates
```

### Type Conversion

```javascript
${toString(id)}          // Convert to string
${toNumber(quantity)}    // Convert to number
${toBoolean(active)}     // Convert to boolean
${toArray(item)}         // Wrap in array
```

## Error Handling

### Missing Fields

Handle null/undefined values:

```json
{
  "source": "middleName",
  "target": "middleName",
  "defaultValue": ""
}
```

### Validation

Add validation expressions:

```json
{
  "source": "email",
  "target": "email",
  "validate": "${isEmail(email)}",
  "onInvalid": "skip"
}
```

## Performance Tips

1. **Use predefined mappings** - More efficient than inline
2. **Minimize nested transforms** - Flatten when possible
3. **Avoid complex expressions** - Use Code nodes for heavy logic
4. **Batch array operations** - Process in chunks if large

## Best Practices

1. **Create reusable mappings** - Share across workflows
2. **Test with sample data** - Validate transformations
3. **Handle edge cases** - null values, empty arrays
4. **Document complex expressions** - Add comments
5. **Version your mappings** - Track changes

## Related Topics

- [Data Mappings](/docs/concepts/mappings)
- [Schemas](/docs/concepts/schemas)
- [Code Node](/docs/nodes/code)
