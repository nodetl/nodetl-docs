---
sidebar_position: 2
title: Authentication API
description: API documentation for authentication endpoints in NodeTL including login, registration, OAuth, and token management.
keywords: [nodetl authentication, login api, oauth api, jwt tokens, api auth]
---

# Authentication API

NodeTL uses JWT (JSON Web Token) authentication with support for OAuth providers.

## Login

Authenticate with email and password.

```http
POST /api/v1/auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "roleId": "507f1f77bcf86cd799439012",
    "permissions": ["workflow:view", "workflow:edit"]
  }
}
```

**Example:**

```bash
curl -X POST http://localhost:8602/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@nodetl.com",
    "password": "admin123"
  }'
```

## Register

Create a new user account (if registration is enabled).

```http
POST /api/v1/auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

## Refresh Token

Get a new access token using refresh token.

```http
POST /api/v1/auth/refresh
```

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

## Google OAuth

Initiate Google OAuth flow.

```http
GET /api/v1/auth/google
```

Redirects to Google login page.

### Google OAuth Callback

```http
GET /api/v1/auth/google/callback?code=xxx
```

Returns tokens after successful authentication.

## Microsoft OAuth

Initiate Microsoft OAuth flow.

```http
GET /api/v1/auth/microsoft
```

Redirects to Microsoft login page.

### Microsoft OAuth Callback

```http
GET /api/v1/auth/microsoft/callback?code=xxx
```

Returns tokens after successful authentication.

## Token Usage

Include the access token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Example:**

```bash
curl -X GET http://localhost:8602/api/v1/workflows \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

## Token Expiration

| Token Type | Default Expiry | Configurable |
|------------|----------------|--------------|
| Access Token | 24 hours | `JWT_EXPIRY` |
| Refresh Token | 7 days | `JWT_REFRESH_EXPIRY` |

## Get Current User

Get the authenticated user's profile.

```http
GET /api/v1/auth/me
```

**Response:**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "name": "John Doe",
  "roleId": "507f1f77bcf86cd799439012",
  "permissions": ["workflow:view", "workflow:edit"],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Change Password

```http
POST /api/v1/auth/change-password
```

**Request Body:**

```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```

## Logout

Invalidate current tokens.

```http
POST /api/v1/auth/logout
```

## Error Responses

### Invalid Credentials

```json
{
  "error": "Invalid email or password",
  "code": "INVALID_CREDENTIALS"
}
```

### Token Expired

```json
{
  "error": "Token has expired",
  "code": "TOKEN_EXPIRED"
}
```

### Invalid Token

```json
{
  "error": "Invalid token",
  "code": "INVALID_TOKEN"
}
```

## Security Best Practices

1. **Store tokens securely** - Use httpOnly cookies or secure storage
2. **Refresh proactively** - Refresh before expiration
3. **Handle token errors** - Redirect to login on auth errors
4. **Use HTTPS** - Always in production
5. **Rotate secrets** - Change JWT_SECRET periodically
