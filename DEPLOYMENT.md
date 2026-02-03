# MentorNet AI - Deployment Guide

This guide covers deploying the MentorNet AI frontend to various hosting platforms.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Backend API endpoints updated
- [ ] Production build tested locally
- [ ] No console errors or warnings
- [ ] Images optimized
- [ ] Security headers configured
- [ ] CORS properly set up
- [ ] Database migrations complete

## Building for Production

```bash
# Install dependencies
npm install

# Run production build
npm run build

# Test build locally (optional)
npm install -g serve
serve -s build
```

The `build` folder now contains optimized production files.

## Deployment Options

### 1. Vercel (Recommended - Easiest)

**Advantages:**
- Free tier available
- Automatic deployments from GitHub
- Built-in HTTPS
- Fast CDN
- Zero-config

**Steps:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - REACT_APP_API_URL=https://your-backend.com/api
6. Click "Deploy"

**Environment Variables in Vercel:**
Settings → Environment Variables → Add:
```
REACT_APP_API_URL=https://your-api.com
REACT_APP_JWT_STORAGE_KEY=token
```

### 2. Netlify

**Advantages:**
- Free tier with good limits
- GitHub integration
- Automatic HTTPS
- Form handling (bonus)

**Steps:**
1. Create `netlify.toml` in root:
```toml
[build]
  command = "npm run build"
  publish = "build"

[dev]
  command = "npm start"
  port = 3000

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Push to GitHub
3. Go to [netlify.com](https://netlify.com)
4. Click "New site from Git"
5. Select your repository
6. Set build command: `npm run build`
7. Set publish directory: `build`
8. Add environment variables
9. Deploy

### 3. AWS Amplify

**Advantages:**
- Scalable infrastructure
- AWS ecosystem integration
- Custom domain support

**Steps:**
1. Install AWS CLI and configure
2. Install Amplify CLI:
```bash
npm install -g @aws-amplify/cli
amplify configure
```

3. Initialize Amplify:
```bash
amplify init
```

4. Add hosting:
```bash
amplify add hosting
# Choose "Hosting with Amplify Console"
# Choose manual deployment
```

5. Publish:
```bash
amplify publish
```

### 4. GitHub Pages

**Note:** Only works if API is on same domain with CORS enabled

**Steps:**
1. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/repo-name"
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

### 5. Traditional Server (Apache, Nginx)

**Setup:**
1. Build the project:
```bash
npm run build
```

2. Copy contents of `build` folder to server

3. Configure web server:

**Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/mentornet-ai/build;
    
    location / {
        try_files $uri /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache:**
```apache
<Directory /var/www/mentornet-ai/build>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</Directory>
```

4. Set up HTTPS with Let's Encrypt:
```bash
sudo certbot --nginx -d yourdomain.com
```

### 6. Docker Deployment

**Create Dockerfile:**
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Create nginx.conf:**
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

**Build and run:**
```bash
docker build -t mentornet-ai .
docker run -p 80:80 mentornet-ai
```

### 7. Heroku (Less recommended for frontend-only)

**Steps:**
1. Create `Procfile`:
```
web: npm start
```

2. Add buildpack:
```bash
heroku buildpacks:add heroku/nodejs
```

3. Deploy:
```bash
git push heroku main
```

## Environment Configuration

### Production Environment Variables

Create `.env.production`:
```
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_JWT_STORAGE_KEY=auth_token
REACT_APP_ENABLE_ANALYTICS=true
```

### Accessing Environment Variables

```javascript
// In code
const API_URL = process.env.REACT_APP_API_URL;
```

## Post-Deployment

### 1. Verify Deployment
- [ ] Check if site loads
- [ ] Test login functionality
- [ ] Verify API calls work
- [ ] Check console for errors
- [ ] Test responsive design

### 2. Security Headers

Add to your server/CDN:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### 3. Performance Optimization

- Enable gzip compression on server
- Set cache headers for static files
- Use CDN for assets
- Monitor Core Web Vitals
- Set up monitoring/analytics

### 4. SSL/HTTPS

Ensure HTTPS is enabled:
- Use Let's Encrypt (free)
- Configure automatic renewal
- Update API URLs to HTTPS

### 5. Monitoring & Logging

Set up error tracking:
```bash
# Install Sentry for error tracking
npm install @sentry/react @sentry/tracing

# Or use LogRocket
npm install logrocket
```

**Add to index.js:**
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

## Troubleshooting Deployment Issues

### Issue: Blank page after deployment
**Solution:** Check browser console for errors. Verify public path in package.json.

### Issue: API calls returning 404
**Solution:** Verify REACT_APP_API_URL environment variable is set correctly.

### Issue: Styles not loading
**Solution:** Check build folder has CSS files. Verify public path configuration.

### Issue: Route not working
**Solution:** Configure server to route all requests to index.html.

### Issue: 401 Unauthorized
**Solution:** Check JWT token handling. Verify CORS headers on backend.

## Performance Metrics

After deployment, monitor:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

Use Google PageSpeed Insights to check.

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Rollback Procedure

If deployment goes wrong:
1. **Vercel**: Use "Deployments" tab to redeploy previous version
2. **Netlify**: Use "Deploys" tab, click on previous deployment
3. **Traditional**: Keep previous build folder, restore from backup
4. **Docker**: Tag images with versions, switch to previous tag

## Database Backups (Backend)

While frontend doesn't store data, ensure backend has:
- Daily automated backups
- Point-in-time recovery capability
- Backup testing procedure
- Disaster recovery plan

## Security Checklist

- [ ] Remove console logs in production
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set security headers
- [ ] Disable debug mode
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Set proper cache headers
- [ ] Test XSS protection
- [ ] Check CSRF tokens

## Final Deployment Checklist

- [ ] Build tested locally
- [ ] Environment variables configured
- [ ] API endpoints verified
- [ ] SSL/HTTPS enabled
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Domain pointing to deployment
- [ ] DNS configured
- [ ] CDN (if using)
- [ ] Database backups verified

---

**Deployment Status**: Ready for production
**Recommended Platform**: Vercel (easiest) or Traditional VPS (most control)
**Support**: Check platform-specific documentation for issues
