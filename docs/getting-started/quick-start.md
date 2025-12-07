---
sidebar_position: 2
title: Quick Start Guide
description: Get started with NodeTL in 5 minutes. Create your first workflow, define schemas, and transform data.
keywords: [nodetl quickstart, first workflow, tutorial, getting started, data transformation]
---

# Quick Start Guide

This guide will help you create your first data transformation workflow in NodeTL in under 5 minutes.

## What We'll Build

We'll create a simple workflow that:
1. Receives data via a webhook
2. Transforms the data to a different format
3. Returns the transformed result

## Step 1: Login to NodeTL

1. Open http://localhost:8602 in your browser
2. Login with the default credentials:
   - Email: `admin@nodetl.com`
   - Password: `admin123`

## Step 2: Create a New Project

Projects help organize your workflows:

1. Click **"New Project"** in the sidebar
2. Enter project details:
   - Name: `My First Project`
   - Description: `Learning NodeTL basics`
3. Click **"Create"**

## Step 3: Create a Workflow

1. Inside your project, click **"New Workflow"**
2. Enter workflow details:
   - Name: `User Transform`
   - Description: `Transform user data format`
3. Click **"Create"**

You'll be taken to the visual workflow editor.

## Step 4: Add a Trigger Node

Every workflow starts with a trigger:

1. From the node panel on the left, drag a **"Trigger"** node onto the canvas
2. Click the node to configure it:
   - Type: `Webhook`
   - Method: `POST`
3. Note the generated webhook URL (you'll use this to test)

## Step 5: Define Input Schema

Define the structure of incoming data:

1. Click **"Schemas"** in the sidebar
2. Click **"New Schema"**
3. Create the input schema:

```json
{
  "name": "User Input",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "User's first name"
    },
    "lastName": {
      "type": "string", 
      "description": "User's last name"
    },
    "email": {
      "type": "string",
      "description": "User's email address"
    },
    "age": {
      "type": "number",
      "description": "User's age"
    }
  }
}
```

4. Create the output schema:

```json
{
  "name": "Customer Output",
  "type": "object",
  "properties": {
    "fullName": {
      "type": "string",
      "description": "Combined full name"
    },
    "contactEmail": {
      "type": "string",
      "description": "Contact email"
    },
    "isAdult": {
      "type": "boolean",
      "description": "Whether user is 18+"
    },
    "metadata": {
      "type": "object",
      "properties": {
        "source": {
          "type": "string"
        },
        "processedAt": {
          "type": "string"
        }
      }
    }
  }
}
```

## Step 6: Create a Data Mapping

1. Click **"Mappings"** in the sidebar
2. Click **"New Mapping"**
3. Select:
   - Source Schema: `User Input`
   - Target Schema: `Customer Output`
4. Use the visual mapper to connect fields:

| Source | Target | Transformation |
|--------|--------|---------------|
| `firstName` + `lastName` | `fullName` | Concatenate with space |
| `email` | `contactEmail` | Direct map |
| `age >= 18` | `isAdult` | Expression |

5. Add static values for metadata:
   - `metadata.source` → `"nodetl"`
   - `metadata.processedAt` → `$now()` (current timestamp)

## Step 7: Add Transform Node

1. Go back to the workflow editor
2. Drag a **"Transform"** node onto the canvas
3. Connect the Trigger node output to Transform node input
4. Configure the Transform node:
   - Select your mapping: `User Input → Customer Output`

## Step 8: Add Response Node

1. Drag a **"Response"** node onto the canvas
2. Connect Transform output to Response input
3. Configure:
   - Status Code: `200`
   - Content-Type: `application/json`

## Step 9: Save and Test

1. Click **"Save"** to save the workflow
2. Click **"Publish"** to make it active
3. Copy the webhook URL from the Trigger node

### Test with cURL

```bash
curl -X POST http://localhost:8602/api/v1/webhooks/your-workflow-id \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 25
  }'
```

### Expected Response

```json
{
  "fullName": "John Doe",
  "contactEmail": "john@example.com",
  "isAdult": true,
  "metadata": {
    "source": "nodetl",
    "processedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Step 10: View Execution Logs

1. Click **"Executions"** in the sidebar
2. Find your recent execution
3. Click to see:
   - Input data received
   - Transformation steps
   - Output data sent
   - Execution duration

## What's Next?

Congratulations! You've created your first NodeTL workflow. Here are some next steps:

### Add More Nodes

Try adding these nodes to your workflow:

- **HTTP Request** - Call external APIs
- **Condition** - Branch based on data values
- **Loop** - Process arrays of items
- **Code** - Custom JavaScript logic

### Explore Features

- [Workflow Concepts](/docs/concepts/workflows) - Deep dive into workflows
- [All Node Types](/docs/nodes/trigger) - Learn about each node
- [API Integration](/docs/api/overview) - Automate with the API

### Example Use Cases

- [API Integration Tutorial](/docs/tutorials/api-integration)
- [ETL Pipeline Example](/docs/tutorials/etl-pipeline)
- [Webhook Processing](/docs/tutorials/webhook-processing)

## Tips for Success

:::tip Best Practices
1. **Name things clearly** - Use descriptive names for workflows and schemas
2. **Start simple** - Build and test incrementally
3. **Use version control** - NodeTL supports workflow versioning
4. **Check execution logs** - Debug issues with detailed logging
:::

:::info AI Features
Enable AI features by adding your OpenAI API key to generate:
- Sample test data matching your schemas
- Suggested field mappings
:::
