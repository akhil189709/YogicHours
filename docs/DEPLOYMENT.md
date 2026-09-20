# Deployment Guide - Yogic Hours

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Type checking passed (`npm run type-check`)
- [ ] Linting passed (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] API endpoints tested
- [ ] Security vulnerabilities checked
- [ ] Performance optimized

---

## Deployment Platforms

### Option 1: Vercel (Recommended for Next.js)

**Benefits:**

- Optimized for Next.js
- Zero-config deployment
- Automatic HTTPS
- CDN integration
- Edge functions support
- Easy environment management

#### Steps:

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the project folder

3. **Configure Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add all variables from `.env.example`

   ```
   NEXT_PUBLIC_API_BASE_URL
   JWT_SECRET
   DATABASE_URL
   RAZORPAY_KEY_ID
   RAZORPAY_KEY_SECRET
   SMTP_HOST
   SMTP_USER
   # ... other variables
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - View live site

5. **Custom Domain** (Optional)
   - Domain settings → Add domain
   - Update DNS records

### Option 2: AWS Amplify

**Steps:**

1. Install AWS Amplify CLI

   ```bash
   npm install -g @aws-amplify/cli
   ```

2. Initialize Amplify

   ```bash
   amplify init
   ```

3. Add hosting

   ```bash
   amplify add hosting
   ```

4. Deploy
   ```bash
   amplify publish
   ```

### Option 3: Self-Hosted (AWS EC2, DigitalOcean, etc.)

#### On DigitalOcean:

1. Create Droplet (Ubuntu 22.04)
2. Install Node.js & npm

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Install PostgreSQL/MongoDB

   ```bash
   sudo apt-get install postgresql postgresql-contrib
   ```

4. Clone repository

   ```bash
   git clone <repo-url>
   cd yogic-hours
   ```

5. Install dependencies

   ```bash
   npm ci --production
   ```

6. Build application

   ```bash
   npm run build
   ```

7. Configure environment variables

   ```bash
   nano .env.production
   ```

8. Start with PM2

   ```bash
   npm install -g pm2
   pm2 start npm --name "yogic-hours" -- start
   pm2 save
   ```

9. Configure Nginx

   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

10. Enable SSL (Let's Encrypt)
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d yourdomain.com
    ```

---

## Database Migration

### MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Sign up and log in

2. **Create Cluster**
   - Click "Create a Database"
   - Choose shared cluster (free tier)
   - Select region
   - Create

3. **Get Connection String**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy connection string
   - Add to `.env.production`:
     ```
     DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
     ```

4. **Create Admin User**
   - In Atlas: Database Access → Add New User
   - Set username and password
   - Add to connection string

### PostgreSQL

1. **Using AWS RDS**
   - Create RDS instance
   - Set Master username and password
   - Configure security groups
   - Get endpoint URL

2. **Add to Environment**

   ```
   DATABASE_URL=postgresql://user:password@host:port/dbname
   ```

3. **Run Migrations**
   ```bash
   npm run migrate:prod
   ```

---

## Performance Optimization for Production

### 1. Build Optimization

```bash
npm run build
```

Check build output for:

- Unused dependencies
- Large modules
- Slow build time

### 2. Image Optimization

- Use Next.js Image component
- Provide multiple sizes with `srcSet`
- Use WebP format
- Lazy load below-fold images

### 3. CSS Optimization

- Tailwind CSS is already optimized
- Minified in production
- Unused styles removed

### 4. Database Optimization

```javascript
// Create indexes
db.bookings.createIndex({ userId: 1, createdAt: -1 });
db.users.createIndex({ email: 1 });
db.blog_posts.createIndex({ slug: 1 });
```

### 5. API Caching

```typescript
// Cache static content
res.setHeader('Cache-Control', 'public, max-age=3600');

// Cache user-specific content
res.setHeader('Cache-Control', 'private, max-age=600');
```

---

## Environment Variables for Production

Create `.env.production`:

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# JWT
JWT_SECRET=your_very_secure_random_string
JWT_EXPIRY=7d

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_prod_key
RAZORPAY_KEY_SECRET=your_prod_secret

# Email Service
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_key
SMTP_FROM_EMAIL=noreply@yogichours.com

# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_ga_id
```

---

## SSL/TLS Certificate

### With Vercel

- Automatically provided
- Auto-renewal enabled

### With Nginx & Let's Encrypt

```bash
sudo certbot --nginx -d yourdomain.com
# Auto-renewal: sudo systemctl status certbot.timer
```

---

## Monitoring & Logging

### Application Monitoring

- Sentry for error tracking
- LogRocket for session replay
- New Relic for performance

### Setup Sentry

```bash
npm install @sentry/nextjs
```

```typescript
// next.config.js
import { withSentryConfig } from '@sentry/nextjs';

export default withSentryConfig(nextConfig, {
  org: 'your-org',
  project: 'your-project',
  authToken: process.env.SENTRY_AUTH_TOKEN,
});
```

### Database Monitoring

- MongoDB Atlas monitoring
- PostgreSQL slow query logs
- Set up alerts for performance issues

---

## Security Hardening

### 1. CORS Configuration

```typescript
// next.config.js
headers: async () => {
  return [
    {
      source: '/api/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: process.env.ALLOWED_ORIGINS || '*',
        },
      ],
    },
  ];
};
```

### 2. Rate Limiting

```bash
npm install express-rate-limit
```

### 3. Input Validation

- Use Zod for all inputs
- Sanitize HTML
- Validate file uploads

### 4. Security Headers

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}
```

### 5. Dependencies

```bash
npm audit
npm audit fix
```

---

## Backup Strategy

### Database Backups

**MongoDB Atlas:**

- Automatic backups every 6 hours
- Retention: 35 days
- Enable point-in-time recovery

**PostgreSQL:**

```bash
# Daily backups
pg_dump yourdatabase > backup_$(date +%Y%m%d).sql
```

### Code Repository

- GitHub for version control
- Multiple branches (main, develop, staging)
- Regular commits with meaningful messages

---

## Continuous Integration/Deployment

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Post-Deployment

### 1. Smoke Testing

- Test critical user flows
- Check payment integration
- Verify email notifications
- Test booking system

### 2. Performance Testing

```bash
npm run build
npm start
# Use Lighthouse or WebPageTest
```

### 3. Security Testing

- Run security scan
- Check SSL certificate
- Verify CORS headers
- Test authentication

### 4. Monitor Logs

- Check application logs
- Monitor error rates
- Track API response times
- Review user feedback

### 5. Set Up Alerts

- Email errors
- Uptime monitoring
- Performance degradation
- Database issues

---

## Rollback Procedure

### With Vercel

- Go to Deployments
- Click on previous deployment
- Click "Redeploy"

### With Git

```bash
git log --oneline
git revert <commit-hash>
git push origin main
```

---

## Scaling Strategy

### When to Scale

- 1000+ active users → Add caching
- 10000+ users → Database read replicas
- 100000+ users → Microservices architecture

### Horizontal Scaling

- Load balancing across servers
- Database sharding
- Message queues for async tasks
- CDN for static assets

### Vertical Scaling

- Upgrade server specs
- Increase database memory
- Optimize queries
- Add caching layers

---

## Cost Optimization

### Vercel

- Free tier: Unlimited deployments
- Pro tier: $20/month
- Enterprise: Custom pricing

### Database

- MongoDB Atlas free tier: 512MB
- Upgrade as needed

### Email Service

- SendGrid: Free 100 emails/day
- Paid plans: $20/month

### Total Monthly Cost (Estimated)

- Vercel Pro: $20
- MongoDB Atlas: $57
- Email Service: $20
- Domain: $12
- **Total: ~$109/month**

---

## Maintenance

### Regular Updates

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update major versions
npm upgrade package-name@latest
```

### Database Maintenance

- Clean up old records
- Rebuild indexes
- Vacuum PostgreSQL
- Monitor disk usage

### Security Patches

- Apply npm security updates
- Update dependencies regularly
- Monitor for CVEs
- Test updates in staging

---

## Support & Troubleshooting

### Common Issues

**502 Bad Gateway**

- Check application logs
- Verify database connection
- Restart server

**Slow API Response**

- Check database queries
- Enable query caching
- Add database indexes
- Review application logs

**Payment Gateway Errors**

- Verify API keys
- Check webhook configuration
- Test in sandbox mode

---

**Last Updated**: 2024
**Project**: Yogic Hours - Heal In Every Hour
