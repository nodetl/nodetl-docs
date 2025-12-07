---
sidebar_position: 7
title: Users API
description: REST API documentation for user management in NodeTL.
keywords: [nodetl users api, user management, rbac api, permissions]
---

# Users API

Manage users through the REST API.

## List Users

```http
GET /api/v1/users
```

## Get User

```http
GET /api/v1/users/:id
```

## Create User

```http
POST /api/v1/users
```

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "securePassword123",
  "roleId": "role-editor"
}
```

## Update User

```http
PUT /api/v1/users/:id
```

## Delete User

```http
DELETE /api/v1/users/:id
```

## Invite User

Send invitation email.

```http
POST /api/v1/invitations
```

**Request Body:**

```json
{
  "email": "newuser@example.com",
  "roleId": "role-viewer"
}
```
