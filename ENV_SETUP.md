# Environment Variables Setup

## Quick Start

Create a `.env.local` file in the root directory for local development:

```bash
cp .env.example .env.local
```

Then fill in your actual values. **Never commit `.env.local` to version control!**

---

## Environment Variables Reference

### Site Configuration

```env
# Site URL (used for SEO, sitemap generation, structured data)
NEXT_PUBLIC_SITE_URL=https://virtueenclosures.com.au
```

**Usage in code:**

```typescript
// Automatically used by lib/seo.ts
import { siteConfig } from "@/lib/seo";
console.log(siteConfig.url); // Uses NEXT_PUBLIC_SITE_URL if set
```

---

### Contact Form / Email Service

#### Option 1: Resend (Recommended)

```env
EMAIL_FROM=info@virtueenclosures.com.au
EMAIL_TO=info@virtueenclosures.com.au
RESEND_API_KEY=re_xxxxxxxxxxxx
```

**Setup:**

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get your API key
4. Update `app/api/contact/route.ts`

**Example implementation:**

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: process.env.EMAIL_FROM!,
  to: process.env.EMAIL_TO!,
  subject: "Contact Form Submission",
  html: emailHtml,
});
```

#### Option 2: SendGrid

```env
EMAIL_FROM=info@virtueenclosures.com.au
EMAIL_TO=info@virtueenclosures.com.au
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
```

---

### Analytics (Optional)

#### Google Analytics 4

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Usage:**

```typescript
// app/layout.tsx
import Script from 'next/script';

{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <Script
    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
    strategy="afterInteractive"
  />
)}
```

#### Google Tag Manager

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

### CMS Integration (Future)

#### Contentful

```env
CONTENTFUL_SPACE_ID=xxxxxxxxxxxx
CONTENTFUL_ACCESS_TOKEN=xxxxxxxxxxxx
CONTENTFUL_PREVIEW_ACCESS_TOKEN=xxxxxxxxxxxx
CONTENTFUL_ENVIRONMENT=production
```

#### Sanity

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxxxxxxxxxxx
```

---

### Database (Future)

```env
# PostgreSQL connection string
DATABASE_URL=postgresql://user:password@localhost:5432/ves_db

# Or separate variables
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ves_db
DB_USER=admin
DB_PASSWORD=securepassword
```

---

### File Storage (Future)

#### AWS S3

```env
AWS_ACCESS_KEY_ID=xxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxx
AWS_REGION=ap-southeast-2
AWS_S3_BUCKET=ves-uploads
```

#### Cloudinary

```env
CLOUDINARY_CLOUD_NAME=xxxxxxxxxxxx
CLOUDINARY_API_KEY=xxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxx
NEXT_PUBLIC_CLOUDINARY_URL=cloudinary://...
```

---

### Authentication (Future)

#### NextAuth.js

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=xxxxxxxxxxxx
```

Generate secret:

```bash
openssl rand -base64 32
```

---

### Development Variables

```env
# Node environment (automatically set by Next.js)
NODE_ENV=development

# API URL for local testing
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Enable debug logging
DEBUG=true
```

---

## Environment Variable Prefixes

### `NEXT_PUBLIC_` Prefix

Variables with this prefix are **exposed to the browser**:

```env
NEXT_PUBLIC_SITE_URL=https://example.com
```

**Usage:**

```typescript
// Available in client components
console.log(process.env.NEXT_PUBLIC_SITE_URL);
```

**Security:** Never put secrets in `NEXT_PUBLIC_` variables!

### No Prefix

Variables without prefix are **server-side only**:

```env
DATABASE_URL=postgresql://...
API_SECRET=secret123
```

**Usage:**

```typescript
// Only available in:
// - Server Components
// - API Routes
// - getServerSideProps
// - getStaticProps

export async function POST(request: Request) {
  const secret = process.env.API_SECRET; // ✅ Works
}
```

---

## File Structure

```
ves-site/
├── .env                    # Default values (committed, no secrets)
├── .env.local              # Local overrides (gitignored, your secrets)
├── .env.development        # Development defaults (optional)
├── .env.production         # Production defaults (optional)
└── .env.example            # Template (committed, no secrets)
```

### Load Order

Next.js loads env files in this order (later overrides earlier):

1. `.env`
2. `.env.local`
3. `.env.development` or `.env.production`
4. `.env.development.local` or `.env.production.local`

---

## Validation (Optional)

Create `lib/env.ts` for type-safe environment variables:

```typescript
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("https://virtueenclosures.com.au"),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  EMAIL_TO: z.string().email().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_TO: process.env.EMAIL_TO,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
});

// Usage:
// import { env } from '@/lib/env';
// console.log(env.NEXT_PUBLIC_SITE_URL); // Type-safe!
```

---

## Deployment

### Vercel

Add environment variables in the Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add each variable for Production, Preview, and Development
3. Redeploy to apply changes

### Netlify

Add in `netlify.toml`:

```toml
[build.environment]
  NEXT_PUBLIC_SITE_URL = "https://virtueenclosures.com.au"
```

Or in Netlify UI: Site settings → Build & deploy → Environment

### Docker

Pass environment variables:

```bash
docker run \
  -e NEXT_PUBLIC_SITE_URL=https://example.com \
  -e RESEND_API_KEY=re_xxx \
  your-image
```

Or use `.env` file:

```bash
docker run --env-file .env.production your-image
```

---

## Security Best Practices

### ✅ DO

- Use `.env.local` for local development secrets
- Add `.env*.local` to `.gitignore`
- Use environment variables for all secrets
- Rotate API keys regularly
- Use different keys for dev/staging/prod
- Validate environment variables on startup

### ❌ DON'T

- Commit `.env.local` or any file with secrets
- Put secrets in `NEXT_PUBLIC_` variables
- Hardcode API keys in code
- Share `.env.local` via Slack/email
- Use production keys in development
- Leave default/example values in production

---

## Troubleshooting

### Variables not loading?

1. **Restart dev server** after changing `.env.local`

   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Check file name** - Must be exactly `.env.local`

3. **Check location** - Must be in project root (same level as `package.json`)

4. **Check syntax** - No spaces around `=`

   ```env
   # ✅ Correct
   API_KEY=abc123

   # ❌ Wrong
   API_KEY = abc123
   ```

### Variables undefined in browser?

- **Server-side only:** Remove from client component or add `NEXT_PUBLIC_` prefix
- **Check spelling:** Variable names are case-sensitive

### Build fails with missing variables?

Add required variables to deployment platform's environment settings.

---

## Example .env.local

```env
# Virtue Enclosure Systems - Local Development
# Copy this to .env.local and fill in your values

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (Resend)
EMAIL_FROM=dev@virtueenclosures.com.au
EMAIL_TO=your-email@example.com
RESEND_API_KEY=re_your_test_key_here

# Analytics (optional)
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Development
NODE_ENV=development
DEBUG=true
```

---

## Resources

- [Next.js Environment Variables Docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Environment Variable Best Practices](https://12factor.net/config)

---

**Remember: Never commit secrets to version control!**
