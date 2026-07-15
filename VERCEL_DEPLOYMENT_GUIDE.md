# 🚀 VERCEL DEPLOYMENT GUIDE FOR TERDIG ACADEMY

Complete guide to deploy TerDig Academy to Vercel with perfect configuration.

## 📋 PREREQUISITES

1. **Vercel Account**: Create an account at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install with `npm install -g vercel`
3. **Node.js**: Version 16 or higher
4. **Git**: For version control

## 🔧 ENVIRONMENT VARIABLES

Set these environment variables in your Vercel project settings:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_PROXY_URL=https://your-supabase-project.supabase.co/functions/v1/groq-proxy
```

## 🛠️ DEPLOYMENT STEPS

### Method 1: Using Vercel CLI (Recommended)

1. **Login to Vercel CLI**:
   ```bash
   vercel login
   ```

2. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

3. **Deploy to Vercel**:
   ```bash
   # First time deployment (follow prompts to link to existing project or create new)
   vercel
   
   # For subsequent deployments to production
   vercel --prod
   ```

### Method 2: Using Git Integration

1. **Push your code to GitHub/GitLab/Bitbucket**
2. **Import project to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Set Environment Variables**:
   - In Vercel Dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add all required environment variables

## ⚙️ VERCEL CONFIGURATION

The project includes a `vercel.json` file with the following configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=()"
        }
      ]
    }
  ]
}
```

## 🧪 POST-DEPLOYMENT CHECKLIST

1. **Verify Environment Variables**:
   - Check that all environment variables are correctly set
   - Ensure Supabase integration is working
   - Verify Groq proxy URL is accessible

2. **Test All Pages**:
   - Home page
   - Program page
   - Video education page
   - Educational games page
   - Articles page (newly added)
   - Testimonials page
   - Gallery page
   - AI consultation page
   - Free consultation page

3. **Test All Features**:
   - Navigation between pages
   - Form submissions
   - Supabase data fetching
   - AI consultation functionality
   - Article listing and detail views

4. **Check Responsiveness**:
   - Test on mobile, tablet, and desktop
   - Verify all components are responsive

5. **Performance Check**:
   - Run Lighthouse audit
   - Check loading times
   - Optimize images if needed

## 🛡️ SECURITY CONFIGURATION

The deployment includes security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera and microphone

## 🔧 TROUBLESHOOTING

### Common Issues

1. **Environment Variables Not Set**:
   - Solution: Double-check all environment variables in Vercel project settings

2. **Build Failures**:
   - Solution: Check build logs in Vercel dashboard
   - Run `npm run build` locally to test

3. **Routing Issues**:
   - Solution: Verify `vercel.json` rewrites configuration

4. **Supabase Integration Problems**:
   - Solution: Check Supabase URL and anon key
   - Verify RLS policies on Supabase tables

### Checking Deployment Status

```bash
# List all deployments
vercel list

# Check deployment logs
vercel logs [deployment-url]
```

## 🔄 AUTOMATED DEPLOYMENTS

To enable automated deployments:
1. Connect your Git repository to Vercel
2. Configure to deploy on every push to `main` branch
3. Set up preview deployments for pull requests

## 📞 SUPPORT

For deployment issues, contact the development team or check:
- Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Project documentation in `DEPLOYMENT.md`
- Environment setup in `.env.example`