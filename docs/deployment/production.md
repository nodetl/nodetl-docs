---
sidebar_position: 4
title: Production Deployment Guide
description: Best practices for deploying NodeTL in production environments.
keywords: [production deployment, nodetl production, security, performance, scaling]
---

# Production Deployment

Best practices for deploying NodeTL in production.

## Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] HTTPS enabled
- [ ] MongoDB authentication enabled
- [ ] Environment variables secured
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Regular backups configured

## Environment Configuration

```bash
# Required
JWT_SECRET=your-very-secure-32-character-secret
MONGODB_URI=mongodb://user:pass@host:27017/nodetl?authSource=admin

# Production settings
GIN_MODE=release
CORS_ORIGINS=https://your-domain.com

# Optional
OPENAI_API_KEY=sk-xxx
```

## Reverse Proxy (Nginx)

```nginx
server {
    listen 443 ssl http2;
    server_name nodetl.example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:8602;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Database Backup

```bash
# Backup
mongodump --uri="mongodb://localhost:27017/nodetl" --out=/backup

# Restore
mongorestore --uri="mongodb://localhost:27017/nodetl" /backup/nodetl
```

## Monitoring

Enable health checks:

```bash
curl https://nodetl.example.com/api/v1/health
```

## Scaling Considerations

- Use MongoDB replica set for high availability
- Scale backend horizontally
- Use CDN for static assets
- Implement caching for frequently accessed data
