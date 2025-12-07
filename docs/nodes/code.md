---
sidebar_position: 6
title: Code Node
description: Learn how to use Code nodes to execute custom JavaScript logic in NodeTL workflows.
keywords: [nodetl code, javascript, custom logic, scripting, expressions]
---

# Code Node

The Code node allows you to execute custom JavaScript code for advanced data transformations and logic.

## Overview

Use Code nodes when you need:

- Complex business logic
- Custom calculations
- Data manipulation beyond built-in functions
- Integration with custom libraries

## Configuration

### Basic Configuration

```json
{
  "type": "code",
  "config": {
    "language": "javascript",
    "code": "return { result: input.value * 2 };"
  }
}
```

## Execution Context

### Available Variables

| Variable | Description |
|----------|-------------|
| `input` | Data from previous node |
| `context` | Workflow execution context |
| `env` | Environment variables |
| `console` | Logging functions |

### Input Access

```javascript
// Access input data
const user = input.user;
const items = input.items;

// Nested access
const email = input.user.profile.email;
```

### Return Output

```javascript
// Return object to pass to next node
return {
  processedData: transformedData,
  metadata: {
    processedAt: new Date().toISOString()
  }
};
```

## Examples

### Data Transformation

```javascript
const { firstName, lastName, email } = input;

return {
  fullName: `${firstName} ${lastName}`,
  emailDomain: email.split('@')[1],
  initials: `${firstName[0]}${lastName[0]}`.toUpperCase()
};
```

### Array Processing

```javascript
const items = input.items;

// Filter and transform
const activeItems = items
  .filter(item => item.status === 'active')
  .map(item => ({
    id: item.id,
    name: item.name.toUpperCase(),
    value: item.price * item.quantity
  }));

// Calculate totals
const total = activeItems.reduce((sum, item) => sum + item.value, 0);

return {
  items: activeItems,
  count: activeItems.length,
  total
};
```

### Conditional Logic

```javascript
const { amount, customerType, isFirstOrder } = input;

let discount = 0;

if (customerType === 'premium') {
  discount = 0.2;
} else if (amount > 1000) {
  discount = 0.1;
} else if (isFirstOrder) {
  discount = 0.05;
}

const finalAmount = amount * (1 - discount);

return {
  originalAmount: amount,
  discount: discount * 100 + '%',
  discountAmount: amount * discount,
  finalAmount
};
```

### Date Manipulation

```javascript
const { birthDate, eventDate } = input;

const birth = new Date(birthDate);
const event = new Date(eventDate);

// Calculate age
const today = new Date();
let age = today.getFullYear() - birth.getFullYear();
const monthDiff = today.getMonth() - birth.getMonth();
if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
  age--;
}

// Days until event
const daysUntilEvent = Math.ceil((event - today) / (1000 * 60 * 60 * 24));

return {
  age,
  daysUntilEvent,
  isUpcoming: daysUntilEvent > 0 && daysUntilEvent <= 30
};
```

### String Parsing

```javascript
const { rawData } = input;

// Parse CSV line
const parts = rawData.split(',').map(s => s.trim());
const [id, name, email, phone] = parts;

// Parse key-value pairs
const kvString = 'name=John;age=30;city=NYC';
const params = Object.fromEntries(
  kvString.split(';').map(pair => pair.split('='))
);

return {
  parsed: { id, name, email, phone },
  params
};
```

### API Response Processing

```javascript
const response = input.response;

if (response.status !== 200) {
  return {
    success: false,
    error: response.body.message || 'Unknown error'
  };
}

const data = response.body;

return {
  success: true,
  users: data.results.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  })),
  pagination: {
    total: data.total,
    page: data.page,
    hasMore: data.page < data.totalPages
  }
};
```

### Validation Logic

```javascript
const { email, phone, age } = input;

const errors = [];

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  errors.push({ field: 'email', message: 'Invalid email format' });
}

// Phone validation
const phoneRegex = /^\+?[\d\s-]{10,}$/;
if (!phoneRegex.test(phone)) {
  errors.push({ field: 'phone', message: 'Invalid phone format' });
}

// Age validation
if (age < 18 || age > 120) {
  errors.push({ field: 'age', message: 'Age must be between 18 and 120' });
}

return {
  isValid: errors.length === 0,
  errors,
  data: errors.length === 0 ? { email, phone, age } : null
};
```

## Async Operations

### Async/Await Support

```javascript
// Async operations are supported
const result = await someAsyncOperation();

return { result };
```

### Timeouts

Code execution has a default timeout of 30 seconds.

## Logging

Use console for debugging:

```javascript
console.log('Processing started');
console.log('Input:', JSON.stringify(input, null, 2));

// ... processing ...

console.log('Result:', result);
return result;
```

Logs appear in execution traces.

## Error Handling

### Try-Catch

```javascript
try {
  const result = riskyOperation(input);
  return { success: true, result };
} catch (error) {
  console.error('Error:', error.message);
  return { 
    success: false, 
    error: error.message 
  };
}
```

### Throwing Errors

```javascript
if (!input.requiredField) {
  throw new Error('requiredField is missing');
}
```

This stops workflow execution with an error.

## Limitations

- No external HTTP requests (use HTTP node)
- No file system access
- Limited to safe JavaScript subset
- 30-second execution timeout
- 10MB memory limit

## Best Practices

1. **Keep code simple** - Use Transform nodes when possible
2. **Handle errors** - Use try-catch blocks
3. **Validate inputs** - Check for required fields
4. **Add logging** - Debug with console.log
5. **Comment complex logic** - Document your code
6. **Return clean data** - Structure output clearly

## Security

- Code runs in sandboxed environment
- No access to server file system
- No network access (use HTTP nodes)
- Environment variables are read-only

## Related Topics

- [Transform Node](/docs/nodes/transform)
- [Condition Node](/docs/nodes/condition)
- [Data Mappings](/docs/concepts/mappings)
