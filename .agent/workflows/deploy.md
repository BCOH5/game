---
description: Deploy the application to Vercel
---

# Deploy to Vercel

This workflow guides you through deploying the Sul-Screen application to Vercel.

## Prerequisites

1. Install Vercel CLI if not already installed:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

## Deployment Steps

// turbo-all

1. Build the application locally to verify everything works:
```bash
npm run build
```

2. Deploy to Vercel (production):
```bash
vercel --prod
```

Or deploy to preview environment first:
```bash
vercel
```

## Notes

- The first deployment will prompt you to link the project to Vercel
- Subsequent deployments will automatically use the linked project
- The `vercel.json` configuration is already set up with the correct build settings
- After deployment, Vercel will provide you with a URL to access your application
