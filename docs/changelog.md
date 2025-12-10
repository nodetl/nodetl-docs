---
sidebar_position: 99
title: Changelog
description: NodeTL release notes and version history
keywords: [nodetl, changelog, releases, version history]
---

# Changelog

All notable changes to NodeTL are documented here.

## [1.0.1] - 2025-12-10

### Added

- 🔒 **Project Lock Feature**
  - Lock/unlock projects to prevent modifications
  - Visual lock indicator on project headers
  - Permission-based lock control (`projects:lock`)

- 🎨 **Dialog Component System**
  - New reusable Dialog/AlertDialog components
  - `useConfirm` and `useAlert` hooks for easy dialogs
  - Full dark theme support
  - Animated transitions

- 📊 **Project Traces Page**
  - View execution traces by project
  - Filter and pagination support

- 🔐 **Enhanced Permission System**
  - `projects:delete` permission
  - `projects:lock` permission
  - Role-based access control improvements

### Changed

- Improved workflow list UI with better drag-drop visual feedback
- Enhanced pagination component with dark theme support
- Conditional endpoint path display (only for webhook triggers)

### Fixed

- Fixed workflow creation going to wrong project
- Fixed navigation persistence across page refreshes
- Fixed role editing for system roles
- Fixed empty status badge display
- Fixed user action buttons visibility

### Security

- Active workflows cannot be deleted
- Active workflows cannot be moved between projects
- Locked projects cannot have workflows deleted
- Projects with active workflows cannot be deleted

---

## [1.0.0] - 2025-12-05

### Added

- 🎨 **Visual Workflow Designer**
  - Drag-and-drop node placement
  - Interactive edge connections
  - Real-time canvas updates
  - Undo/Redo support
  
- 🔗 **Node System**
  - Webhook Trigger node
  - Schedule Trigger node
  - HTTP Request node
  - Transform node with schema mapping
  - Condition node for branching
  - Loop node for iterations
  - Response node for output configuration
  - Code node for custom logic
  
- 🌐 **API Endpoints**
  - Workflow CRUD operations
  - Version management
  - Schema management
  - Execution tracking
  - Auto-save endpoint
  
- 🔄 **Version Management**
  - Create and manage versions
  - Assign workflows to versions
  - Custom path prefixes per version
  - Default headers and query params
  - Drag-drop workflows between versions
  
- 💾 **Data Persistence**
  - MongoDB integration
  - Workflow state persistence
  - Execution history
  - Schema storage
  
- 🐳 **Docker Support**
  - Multi-container docker-compose setup
  - All-in-one Docker image
  - Volume persistence for data

---

## Upgrade Guide

### From 1.0.0 to 1.0.1

No breaking changes. Simply pull the new image:

```bash
docker pull nodetl/nodetl:1.0.1
docker stop nodetl
docker rm nodetl
docker run -d --name nodetl -p 8602:80 -v nodetl_data:/data/db nodetl/nodetl:1.0.1
```

Your data will be preserved in the `nodetl_data` volume.
