---
sidebar_position: 8
title: Settings API
description: REST API documentation for application settings in NodeTL.
keywords: [nodetl settings api, configuration api, app settings]
---

# Settings API

Manage application settings through the REST API.

## Get Settings

```http
GET /api/v1/settings
```

**Response:**

```json
{
  "appName": "NodeTL",
  "logo": "/uploads/logo.png",
  "primaryColor": "#2563eb",
  "enableRegistration": true,
  "defaultTheme": "system",
  "executionRetentionDays": 30
}
```

## Update Settings

```http
PUT /api/v1/settings
```

**Request Body:**

```json
{
  "appName": "My Data Platform",
  "primaryColor": "#10b981",
  "enableRegistration": false
}
```

## Get Public Settings

No authentication required.

```http
GET /api/v1/settings/public
```

**Response:**

```json
{
  "appName": "NodeTL",
  "logo": "/uploads/logo.png",
  "primaryColor": "#2563eb",
  "enableRegistration": true,
  "googleOAuthEnabled": true,
  "microsoftOAuthEnabled": true
}
```
