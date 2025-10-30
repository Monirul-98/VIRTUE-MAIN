# Virtue Enclosure Systems Website

> A modern, high-performance marketing website for Australia's leading switchboard manufacturer

[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38bdf8)](https://tailwindcss.com/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-90+-brightgreen)](https://developers.google.com/web/tools/lighthouse)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Architecture](#-architecture)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Deployment](#-deployment)
- [SEO & Performance](#-seo--performance)
- [Contributing](#-contributing)

---

## ✨ Features

### Pages

- 🏠 **Homepage** - Hero carousel, services, stats, testimonials
- ℹ️ **About** - Company history, values, team
- ⚙️ **Services** - 6 detailed service pages (Design, Fabrication, Powder Coating, Assembly, Testing, Delivery)
- 🏗️ **Projects** - 6 case studies with technical specifications
- 📝 **Blog** - MDX-powered blog system with 3 articles
- 📧 **Contact** - Form with file upload (DWG/DXF support)

### Technical Features

- ⚡ **Static Site Generation** - Pre-rendered at build time for maximum performance
- 📱 **Fully Responsive** - Mobile-first design with breakpoints for all devices
- ♿ **WCAG AA Accessible** - Semantic HTML, ARIA labels, keyboard navigation
- 🎨 **Smooth Animations** - Framer Motion with GPU-accelerated transitions
- 🖼️ **Image Optimization** - Next/Image with automatic WebP conversion
- 🔍 **SEO Optimized** - Metadata, structured data, sitemap, robots.txt
- 📊 **Lighthouse 90+** - Optimized for Performance, Accessibility, Best Practices, SEO
- 📝 **Type-Safe** - Full TypeScript coverage with strict mode
- 🎯 **Component Library** - Reusable UI components with consistent design system

---

## 🛠️ Tech Stack

### Core

- **[Next.js 14+](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library with Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Libraries

- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Embla Carousel](https://www.embla-carousel.com/)** - Touch-friendly carousel
- **[React Hook Form](https://react-hook-form.com/)** - Form validation
- **[Zod](https://zod.dev/)** - Schema validation
- **[MDX](https://mdxjs.com/)** - Markdown with JSX for blog posts
- **[React CountUp](https://www.npmjs.com/package/react-countup)** - Animated counters

### Developer Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[next-sitemap](https://github.com/iamvishnusankar/next-sitemap)** - Automatic sitemap generation

---

## 📁 Project Structure

```
ves-site/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Main website routes
│   │   ├── about/                # About page
│   │   ├── blog/                 # Blog index + [slug] pages
│   │   ├── contact/              # Contact page with form
│   │   ├── projects/             # Projects index + [slug] pages
│   │   ├── services/             # Services index + [slug] pages
│   │   ├── layout.tsx            # Site layout (header/footer)
│   │   └── page.tsx              # Homepage
│   ├── api/                      # API routes
│   │   └── contact/route.ts      # Contact form handler
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/
│   ├── cards/                    # Card components
│   │   ├── blog-card.tsx
│   │   ├── project-card.tsx
│   │   ├── service-card.tsx
│   │   └── testimonial-card.tsx
│   ├── core/                     # Core components
│   │   ├── embla-carousel.tsx    # Reusable carousel
│   │   ├── hero-carousel.tsx     # Homepage hero
│   │   ├── navbar.tsx            # Site header
│   │   ├── footer.tsx            # Site footer
│   │   ├── reveal.tsx            # Scroll animations
│   │   └── ...                   # Other core components
│   └── ui/                       # UI primitives
│       ├── button.tsx
│       ├── badge.tsx
│       ├── typography.tsx
│       └── ...
│
├── content/                      # Content files
│   ├── posts/                    # MDX blog posts
│   ├── services.json             # Services data
│   ├── projects.json             # Projects data
│   ├── testimonials.json         # Testimonials data
│   └── logos.json                # Client logos
│
├── lib/                          # Utilities
│   ├── seo.ts                    # SEO metadata & structured data
│   ├── blog.ts                   # Blog utilities (MDX)
│   ├── animations.ts             # Framer Motion variants
│   └── utils.ts                  # General utilities
│
├── public/                       # Static assets
│   ├── images/                   # Images (services, projects, blog)
│   ├── robots.txt                # Search engine directives
│   ├── site.webmanifest          # PWA manifest
│   └── ...                       # Favicons, OG images
│
├── .eslintrc.json                # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── next-sitemap.config.js        # Sitemap configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies & scripts
```

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run dev -- --turbo   # Start dev server with Turbopack (faster)

# Production Build
npm run build            # Build for production (also generates sitemap)
npm run start            # Preview production build locally

# Code Quality
npm run lint             # Run ESLint
npm run lint -- --fix    # Auto-fix ESLint errors
npm run format           # Format code with Prettier

# Sitemap
npm run postbuild        # Generate sitemap (runs automatically after build)
```

---

## 🏗️ Architecture

### Design Principles

1. **Feature-Based Organization**
   - Components grouped by domain (cards, core, ui)
   - Content separated from code (JSON/MDX)
   - Co-located styles and logic

2. **Type Safety**
   - Full TypeScript coverage
   - Strict mode enabled
   - Type-safe API routes
   - Validated forms with Zod

3. **Performance First**
   - Static Site Generation (SSG) by default
   - Image optimization with Next/Image
   - Font optimization with next/font
   - Code splitting per route
   - GPU-accelerated animations

4. **Accessibility**
   - Semantic HTML5 landmarks
   - ARIA labels on interactive elements
   - Keyboard navigation support
   - WCAG AA color contrast
   - Screen reader friendly

5. **SEO Optimized**
   - Centralized SEO system (`lib/seo.ts`)
   - Per-page metadata
   - Structured data (JSON-LD)
   - OpenGraph & Twitter cards
   - Automatic sitemap generation

### Key Patterns

**Component Structure:**

```typescript
// Feature-based components with typed props
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      {/* Component JSX */}
    </Link>
  );
}
```

**SEO Pattern:**

```typescript
// Per-page metadata using centralized SEO utility
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Page Title",
  description: "Page description",
  keywords: ["keyword1", "keyword2"],
  url: "/page-url",
});
```

**Animation Pattern:**

```typescript
// Reusable animation components with viewport triggers
import { FadeY } from "@/components/core/reveal";

<FadeY delay={0.2}>
  <Heading level={2}>Animated Heading</Heading>
</FadeY>
```

---

## 💻 Development

### Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm 9+** (comes with Node.js)

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ves-site
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)

   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Follow existing code patterns
   - Use TypeScript types
   - Add comments for complex logic
   - Keep components small and focused

3. **Format and lint**

   ```bash
   npm run format     # Format with Prettier
   npm run lint       # Check for errors
   npm run lint -- --fix  # Auto-fix errors
   ```

4. **Test locally**

   ```bash
   npm run build      # Build to check for errors
   npm run start      # Test production build
   ```

5. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

### Adding New Content

**New Service:**

1. Add service to `content/services.json`
2. Create service page in `app/(site)/services/[slug]/page.tsx` (or edit the dynamic route)
3. Add images to `public/images/services/`

**New Project:**

1. Add project to `content/projects.json`
2. Ensure dynamic route handles it: `app/(site)/projects/[slug]/page.tsx`
3. Add images to `public/images/projects/`

**New Blog Post:**

1. Create MDX file in `content/posts/your-post-slug.mdx`
2. Add frontmatter (title, date, excerpt, coverImage, author, tags)
3. Add cover image to `public/images/blog/`

### Code Style Guidelines

- **Components:** PascalCase (e.g., `ServiceCard.tsx`)
- **Functions:** camelCase (e.g., `generateSEO`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **CSS Classes:** Tailwind utilities (no custom CSS unless necessary)
- **Imports:** Organized automatically by ESLint

---

## 🏭 Building for Production

### Build Process

```bash
# 1. Build the application
npm run build

# This will:
# - Compile TypeScript
# - Generate static pages
# - Optimize images
# - Bundle JavaScript
# - Generate sitemap.xml (via postbuild script)

# 2. Test production build locally
npm run start

# 3. Verify everything works
# - Test all pages
# - Check forms
# - Verify images load
# - Test mobile responsiveness
```

### Build Output

```
.next/
├── static/              # Static assets with cache headers
├── server/              # Server-side code
└── cache/               # Build cache for faster rebuilds

public/
├── sitemap.xml          # Generated sitemap
└── robots.txt           # Search engine directives
```

### Production Checklist

- [ ] All environment variables configured
- [ ] Images optimized (< 500KB each)
- [ ] Favicons generated and placed
- [ ] OG images created (1200×630px)
- [ ] Build completes without errors
- [ ] Lighthouse scores 90+ on all pages
- [ ] Forms tested and working
- [ ] Contact email configured
- [ ] Google Analytics added (if needed)
- [ ] Google Search Console verified

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub/GitLab**

   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com/)
   - Import your repository
   - Vercel auto-detects Next.js

3. **Configure Environment Variables**
   - Add your `.env.local` variables in Vercel dashboard
   - Set `NEXT_PUBLIC_SITE_URL` to your production domain

4. **Deploy**
   - Vercel deploys automatically on push
   - Preview deployments for pull requests

### Other Platforms

**Netlify:**

```bash
# Build command
npm run build

# Publish directory
.next

# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"
```

**Self-Hosted (Docker):**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Post-Deployment

1. **Verify deployment**
   - Test all pages load
   - Check forms work
   - Verify images display
   - Test mobile view

2. **Submit sitemap to Google Search Console**
   - URL: `https://yourdomain.com/sitemap.xml`

3. **Monitor performance**
   - Set up Google Analytics
   - Monitor Core Web Vitals
   - Check Lighthouse scores

---

## 📊 SEO & Performance

### SEO Features

- **Metadata:** Unique titles and descriptions per page
- **Structured Data:** JSON-LD schemas (Organization, LocalBusiness, Service, Article)
- **OpenGraph:** Social media preview cards
- **Sitemap:** Auto-generated XML sitemap
- **Robots.txt:** Search engine directives
- **Canonical URLs:** Prevent duplicate content
- **Mobile-Friendly:** Responsive design

### Performance Optimizations

- **Static Generation:** All pages pre-rendered
- **Image Optimization:** Next/Image with WebP
- **Font Optimization:** next/font with display swap
- **Code Splitting:** Automatic per-route
- **Lazy Loading:** Images and components
- **CSS Optimization:** Tailwind purges unused CSS
- **Animations:** GPU-accelerated (transform/opacity only)

### Lighthouse Targets

| Metric         | Target | Current |
| -------------- | ------ | ------- |
| Performance    | 90+    | ✅      |
| Accessibility  | 95+    | ✅      |
| Best Practices | 90+    | ✅      |
| SEO            | 95+    | ✅      |

**Run Lighthouse:**

```bash
# Install globally
npm install -g @lhci/cli

# Run audit
lighthouse http://localhost:3000 --view
```

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 🤝 Contributing

### Setting Up Linting on Commit (Optional)

If you want automatic linting before commits:

```bash
# Install Husky and lint-staged
npm install --save-dev husky lint-staged

# Initialize Husky
npx husky-init
npm install

# Configure lint-staged in package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md,mdx}": [
      "prettier --write"
    ]
  }
}

# Create pre-commit hook
echo "npx lint-staged" > .husky/pre-commit
```

### Pull Request Process

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Run linting and formatting
5. Build and test locally
6. Commit with clear message
7. Push to your fork
8. Open a Pull Request

### Commit Message Format

```
type(scope): description

[optional body]
[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(blog): add MDX support for blog posts
fix(contact): resolve form validation error
docs(readme): update installation instructions
```

---

## 📄 Documentation

Comprehensive documentation is available in the project:

- **`SEO_IMPLEMENTATION_GUIDE.md`** - Complete SEO documentation
- **`SEO_CHECKLIST.md`** - Pre-launch checklist
- **`LIGHTHOUSE_OPTIMIZATION_SUMMARY.md`** - Performance details
- **`QUICK_START_SEO.md`** - Quick SEO reference
- **`IMAGE_PLACEHOLDERS_GUIDE.md`** - Image requirements
- **`VES_CONTENT_SUMMARY.md`** - Content tracking
- **`ANIMATIONS_GUIDE.md`** - Animation system
- **`MDX_BLOG_GUIDE.md`** - Blog system
- **`CONTACT_PAGE_GUIDE.md`** - Contact form

---

## 📝 License

Private - Virtue Enclosure Systems © 2024

---

## 🆘 Support

For questions or issues:

1. Check the documentation in `/docs` folder
2. Review existing issues on GitHub
3. Contact the development team

---

## 🙏 Acknowledgments

Built with:

- [Next.js](https://nextjs.org/) by Vercel
- [Tailwind CSS](https://tailwindcss.com/) by Tailwind Labs
- [Framer Motion](https://www.framer.com/motion/) by Framer
- [Embla Carousel](https://www.embla-carousel.com/) by David Jerleke

---

**Made with ❤️ for Virtue Enclosure Systems**
