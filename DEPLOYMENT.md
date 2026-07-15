# Deployment Instructions

## Deploying the Groq Proxy Function to Supabase

### 1. Set the Groq API Key as a Supabase Secret

Before deploying the function, you need to set your Groq API key as a secret in Supabase:

```bash
supabase secrets set GROQ_API_KEY=your_groq_api_key_here
```

### 2. Deploy the Function

Deploy the groq-proxy function to Supabase:

```bash
supabase functions deploy groq-proxy
```

### 3. Local Development

For local development, you can run the function locally:

```bash
# Set the API key in your environment
export GROQ_API_KEY=your_groq_api_key_here

# Run the function locally
supabase functions serve --no-verify-jwt
```

### 4. Environment Variables

Make sure your frontend `.env` file contains the correct proxy URL:

```env
VITE_GROQ_PROXY_URL=https://your-supabase-project.supabase.co/functions/v1/groq-proxy
```

For production, update this to your deployed Supabase function URL.

### 5. Database Migration

To deploy the articles table, run the migration:

```bash
supabase migration up
```

This will create the articles table with the proper schema and RLS policies.

### 6. Seeding Data

To seed the articles table with initial data:

```bash
supabase db seed
```

Or run the specific seed file:

```bash
psql -h your-supabase-db-host -d your-database-name -U your-username -f supabase/seed_articles_data.sql
```

### 7. Testing

To test the integration:

1. Start the Supabase functions server locally:
   ```bash
   supabase functions serve --no-verify-jwt
   ```

2. Start the frontend:
   ```bash
   bun run dev
   ```

3. Navigate to the AI Consultation page and send a question like "Apa itu fotosintesis?"

4. Check the Network tab in browser dev tools to verify the request is being made to the proxy.

5. Navigate to the Articles page to verify articles are displayed correctly.

### 8. Deploying to Vercel

For deploying to Vercel, follow the detailed guide in `VERCEL_DEPLOYMENT_GUIDE.md`.

Key steps include:
1. Setting up environment variables in Vercel project settings
2. Configuring the `vercel.json` file (already included in the project)
3. Running deployment using Vercel CLI or Git integration

### Security Notes

- Never commit your GROQ_API_KEY to version control
- The API key is stored securely as a Supabase secret
- The frontend only communicates with the proxy, never directly with Groq API
- The articles table uses RLS to only allow public read access to published articles