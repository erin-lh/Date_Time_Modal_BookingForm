# Deployment Guide

This guide covers deploying the Calendar Booking Form to various platforms.

## Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

### Prerequisites

- GitHub account
- Vercel account (free tier available)
- Code pushed to GitHub repository

### Automatic Deployment

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   \`\`\`
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   \`\`\`

3. **Environment Variables** (if needed)
   \`\`\`
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   \`\`\`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application
   - You'll get a unique URL like `https://your-app.vercel.app`

### Custom Domain

1. **Add Domain**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - HTTPS is enabled by default

### Continuous Deployment

- Automatic deployments on every push to main branch
- Preview deployments for pull requests
- Rollback capabilities

## Netlify

Alternative deployment platform with similar features.

### Deploy Steps

1. **Build Settings**
   \`\`\`
   Build command: npm run build
   Publish directory: out
   \`\`\`

2. **Next.js Configuration**
   Update `next.config.mjs`:
   \`\`\`javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true,
     },
   }
   
   export default nextConfig
   \`\`\`

3. **Deploy**
   - Connect GitHub repository
   - Configure build settings
   - Deploy automatically

## Docker Deployment

For containerized deployments.

### Dockerfile

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

### Docker Compose

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  booking-form:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - booking-form
    restart: unless-stopped
\`\`\`

### Build and Run

\`\`\`bash
# Build the image
docker build -t booking-form .

# Run the container
docker run -p 3000:3000 booking-form

# Or use docker-compose
docker-compose up -d
\`\`\`

## AWS Deployment

### AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository

2. **Build Settings**
   \`\`\`yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   \`\`\`

3. **Environment Variables**
   - Add environment variables in Amplify console
   - Configure domain and SSL

### AWS EC2

1. **Launch EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - Configure security groups (ports 22, 80, 443)

2. **Install Dependencies**
   \`\`\`bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   \`\`\`

3. **Deploy Application**
   \`\`\`bash
   # Clone repository
   git clone https://github.com/your-username/booking-form.git
   cd booking-form
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "booking-form" -- start
   pm2 startup
   pm2 save
   \`\`\`

4. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/booking-form
   server {
       listen 80;
       server_name your-domain.com;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

   \`\`\`bash
   # Enable site
   sudo ln -s /etc/nginx/sites-available/booking-form /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   \`\`\`

## Static Export

For static hosting platforms (GitHub Pages, S3, etc.).

### Configuration

Update `next.config.mjs`:

\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
}

export default nextConfig
\`\`\`

### Build and Export

\`\`\`bash
# Build and export
npm run build

# The 'out' directory contains the static files
# Upload the contents to your static hosting provider
\`\`\`

### GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select source branch (usually `gh-pages`)

2. **GitHub Actions Workflow**
   \`\`\`yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout
         uses: actions/checkout@v3
       
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18'
           cache: 'npm'
       
       - name: Install dependencies
         run: npm ci
       
       - name: Build
         run: npm run build
       
       - name: Deploy
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./out
   \`\`\`

## Environment Configuration

### Production Environment Variables

\`\`\`bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NODE_ENV=production
\`\`\`

### Security Headers

Add security headers in `next.config.mjs`:

\`\`\`javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ]
  },
}
\`\`\`

## Performance Optimization

### Build Optimization

\`\`\`javascript
// next.config.mjs
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  swcMinify: true,
}
\`\`\`

### Bundle Analysis

\`\`\`bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
\`\`\`

## Monitoring and Analytics

### Error Tracking

\`\`\`bash
# Install Sentry
npm install @sentry/nextjs
\`\`\`

\`\`\`javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
\`\`\`

### Analytics

\`\`\`javascript
// lib/analytics.js
export const trackEvent = (eventName, properties) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
}
\`\`\`

## Troubleshooting

### Common Issues

1. **Build Failures**
   \`\`\`bash
   # Clear cache and rebuild
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   \`\`\`

2. **Environment Variables Not Working**
   - Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
   - Restart development server after adding variables

3. **Static Export Issues**
   - Remove dynamic routes or implement `generateStaticParams`
   - Ensure all images use `unoptimized: true`

4. **Performance Issues**
   - Enable compression in your web server
   - Optimize images and assets
   - Use CDN for static assets

### Health Checks

\`\`\`javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  })
}
\`\`\`

## Rollback Strategy

### Vercel
- Use the Vercel dashboard to rollback to previous deployments
- Each deployment has a unique URL for testing

### Docker
\`\`\`bash
# Tag images with versions
docker build -t booking-form:v1.0.0 .

# Rollback to previous version
docker stop booking-form
docker run -d --name booking-form booking-form:v0.9.0
\`\`\`

### PM2
\`\`\`bash
# Save current process list
pm2 save

# Rollback code and restart
git checkout previous-commit
npm install
npm run build
pm2 restart booking-form
\`\`\`

This deployment guide covers the most common deployment scenarios. Choose the platform that best fits your infrastructure and requirements.
