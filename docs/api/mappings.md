---
sidebar_position: 5
title: Mappings API
description: REST API documentation for managing data mappings in NodeTL.
keywords: [nodetl mappings api, data mapping, field mapping api, transformation api]
---

# Mappings API

Manage data mappings through the REST API.

## List Mappings

```http
GET /api/v1/mappings
```

## Get Mapping

```http
GET /api/v1/mappings/:id
```

## Create Mapping

```http
POST /api/v1/mappings
```

**Request Body:**

```json
{
  "name": "User to Customer",
  "description": "Transform user data to customer format",
  "sourceSchemaId": "schema-user",
  "targetSchemaId": "schema-customer",
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
    },
    {
      "target": "source",
      "type": "static",
      "value": "nodetl"
    }
  ]
}
```

## Update Mapping

```http
PUT /api/v1/mappings/:id
```

## Delete Mapping

```http
DELETE /api/v1/mappings/:id
```

## Test Mapping

Test a mapping with sample data.

```http
POST /api/v1/mappings/:id/test
```

**Request Body:**

```json
{
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

**Response:**

```json
{
  "result": {
    "fullName": "John Doe",
    "contactEmail": "john@example.com",
    "source": "nodetl"
  },
  "executionTime": 5
}
```
