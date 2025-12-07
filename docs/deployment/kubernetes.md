---
sidebar_position: 3
title: Kubernetes Deployment
description: Deploy NodeTL on Kubernetes for scalable production deployments.
keywords: [kubernetes, k8s, nodetl kubernetes, scalable deployment, production]
---

# Kubernetes Deployment

Deploy NodeTL on Kubernetes for production-grade scalability.

## Prerequisites

- Kubernetes cluster (1.24+)
- kubectl configured
- Helm (optional)

## Quick Deploy

```bash
kubectl apply -f k8s/
```

## Manifests

### Backend Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodetl-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nodetl-backend
  template:
    metadata:
      labels:
        app: nodetl-backend
    spec:
      containers:
      - name: backend
        image: nodetl/backend:latest
        ports:
        - containerPort: 8080
        env:
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: nodetl-secrets
              key: mongodb-uri
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: nodetl-secrets
              key: jwt-secret
```

### Frontend Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodetl-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nodetl-frontend
  template:
    spec:
      containers:
      - name: frontend
        image: nodetl/frontend:latest
        ports:
        - containerPort: 80
```

### MongoDB StatefulSet

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb
spec:
  serviceName: mongodb
  replicas: 1
  template:
    spec:
      containers:
      - name: mongodb
        image: mongo:7.0
        volumeMounts:
        - name: data
          mountPath: /data/db
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi
```

### Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nodetl-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: nodetl.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nodetl-frontend
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: nodetl-backend
            port:
              number: 8080
```

## Secrets

```bash
kubectl create secret generic nodetl-secrets \
  --from-literal=jwt-secret=your-secret \
  --from-literal=mongodb-uri=mongodb://mongodb:27017/nodetl
```

## Scaling

```bash
kubectl scale deployment nodetl-backend --replicas=5
```
