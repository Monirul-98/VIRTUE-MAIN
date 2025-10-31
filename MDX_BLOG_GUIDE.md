# MDX Blog Implementation Guide

This document outlines the complete MDX blog system implementation for the Virtue Enclosure Systems website.

---

## Overview

The blog system uses **MDX (Markdown + JSX)** to enable rich content authoring with React components, frontmatter for metadata, and automatic parsing and rendering.

### Key Features

- ✅ MDX support with frontmatter metadata
- ✅ Automatic post loading from `/content/posts/`
- ✅ Static site generation for all blog posts
- ✅ Beautiful typography with Tailwind Typography
- ✅ Syntax highlighting for code blocks
- ✅ SEO optimization with dynamic metadata
- ✅ Responsive design with animations

---

## 1. Configuration

### Next.js Configuration (`next.config.mjs`)

MDX support is configured using `@next/mdx` with several rehype plugins for enhanced functionality:

```javascript
import createMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm], // GitHub Flavored Markdown
    rehypePlugins: [
      rehypeSlug, // Add IDs to headings
      [rehypeAutolinkHeadings, { behavior: "wrap" }], // Link headings
      [rehypePrettyCode, { theme: "github-dark", keepBackground: false }], // Code highlighting
    ],
  },
});
```

**Plugins:**

- `remarkGfm`: GitHub Flavored Markdown (tables, task lists, strikethrough)
- `rehypeSlug`: Automatically adds IDs to headings for linking
- `rehypeAutolinkHeadings`: Makes headings clickable
- `rehypePrettyCode`: Beautiful syntax highlighting with Shiki

### Tailwind Configuration (`tailwind.config.ts`)

Typography plugin enabled for prose styling:

```typescript
plugins: [require("@tailwindcss/typography")],
```

---

## 2. Content Structure

### MDX Files Location

All blog posts are stored in `/content/posts/` as `.mdx` files.

### Frontmatter Schema

Each MDX file must include frontmatter at the top:

```mdx
---
title: "Your Post Title"
date: "2024-10-15"
excerpt: "A brief summary of your post (150-200 characters)"
cover: "/images/blog/your-cover-image.jpg"
author: "Author Name"
category: "Category Name"
readTime: "5 min read"
---

# Your content starts here...
```

**Required Fields:**

- `title`: Post title (used in cards, detail page, SEO)
- `date`: Publication date in YYYY-MM-DD format
- `excerpt`: Short summary (shown in cards and meta description)
- `cover`: Path to cover image (relative to `/public/`)

**Optional Fields:**

- `author`: Author name
- `category`: Category for filtering and display
- `readTime`: Manual read time (auto-calculated if not provided)

### Example MDX Post

````mdx
---
title: "Understanding MSB vs MDB"
date: "2024-10-15"
excerpt: "Learn the key differences between Main Switchboards and Main Distribution Boards."
cover: "/images/blog/msb-vs-mdb.jpg"
author: "John Smith"
category: "Technical"
readTime: "5 min read"
---

## Introduction

Your markdown content here with full MDX support...

### Subheading

- Bullet points
- More bullets

**Bold text** and _italic text_

```javascript
// Code blocks with syntax highlighting
const example = "Hello World";
```
````

| Column 1 | Column 2 |
| -------- | -------- |
| Data 1   | Data 2   |

[Links work too](/contact)

````

---

## 3. Blog Utilities (`/lib/blog.ts`)

Utility functions for loading and managing blog posts.

### Key Functions

#### `getAllPosts()`
Returns all blog posts sorted by date (newest first).

```typescript
const posts = getAllPosts();
````

#### `getPostBySlug(slug: string)`

Returns a specific post by its slug.

```typescript
const post = getPostBySlug("understanding-msb-vs-mdb");
```

#### `getAllCategories()`

Returns array of unique categories from all posts.

```typescript
const categories = getAllCategories();
```

#### `calculateReadTime(content: string)`

Calculates reading time based on word count (200 words/minute).

```typescript
const readTime = calculateReadTime(post.content);
```

### How It Works

1. Reads all `.mdx` and `.md` files from `/content/posts/`
2. Uses `gray-matter` to parse frontmatter from content
3. Returns structured data with both metadata and content
4. Handles missing files gracefully (returns empty array/undefined)

---

## 4. Blog Index Page (`/app/(site)/blog/page.tsx`)

Displays all blog posts in a responsive grid.

### Structure

1. **Hero Section**: Title and description
2. **Category Filter**: Visual badges (can be made functional)
3. **Blog Grid**: 3-column responsive grid of BlogCards
4. **Empty State**: Shown when no posts available

### Features

- Dynamic post loading from MDX files
- Category badge filtering (visual)
- Staggered reveal animations
- Responsive grid layout (1-2-3 columns)
- SEO optimized metadata

---

## 5. Blog Post Detail Page (`/app/(site)/blog/[slug]/page.tsx`)

Displays individual blog posts with full MDX rendering.

### Structure

1. **Hero Section**: Breadcrumb, category, meta, title, excerpt, author
2. **Cover Image**: Large hero image
3. **Article Content**: MDX rendered with custom components
4. **CTA Section**: Call-to-action for contact/more articles

### MDX Component Customization

Custom React components for MDX elements provide consistent styling:

```typescript
const mdxComponents = {
  h1: (props) => <Heading level={1} className="mb-6 mt-8" {...props} />,
  h2: (props) => <Heading level={2} className="mb-4 mt-8" {...props} />,
  p: (props) => <Text className="mb-4" {...props} />,
  a: (props) => <a className="text-brand underline" {...props} />,
  // ... more components
};
```

**Styled Elements:**

- Headings (h1-h3) with proper spacing
- Paragraphs with readable line height
- Lists (ul/ol) with proper margins
- Links with brand color
- Code blocks with syntax highlighting
- Tables with borders and styling
- Blockquotes with left border
- Strong/bold text emphasis

### Features

- `MDXRemote` for server-side MDX rendering
- Custom component mapping for styling
- Syntax highlighting with `rehype-pretty-code`
- Dynamic metadata generation for SEO
- OpenGraph tags for social sharing
- Breadcrumb navigation
- Author display with avatar
- Responsive typography

---

## 6. Blog Card Component (`/components/cards/blog-card.tsx`)

Reusable card component for displaying post previews.

### Features

- Cover image with hover scale effect
- Category badge overlay
- Date formatting (Australian locale)
- Auto-calculated read time
- Title with line-clamp (2 lines max)
- Excerpt with line-clamp (3 lines max)
- Author byline
- "Read More" link with arrow animation

### Props

```typescript
interface BlogCardProps {
  post: BlogPost;
  className?: string;
}
```

---

## 7. Typography & Styling

### Tailwind Typography Plugin

The `@tailwindcss/typography` plugin provides the `prose` class for beautiful default typography:

```html
<article className="prose prose-neutral prose-lg max-w-none">
  <!-- MDX content -->
</article>
```

**Configuration:**

- `prose`: Base typography styles
- `prose-neutral`: Neutral gray color scheme
- `prose-lg`: Larger text for better readability
- `max-w-none`: Remove default max-width constraint

### Custom Styles

Additional custom styles applied via MDX components override default prose styles for brand consistency.

---

## 8. Adding a New Blog Post

### Step-by-Step

1. **Create MDX file** in `/content/posts/`:

   ```
   /content/posts/your-post-slug.mdx
   ```

2. **Add frontmatter**:

   ```mdx
   ---
   title: "Your Post Title"
   date: "2024-10-20"
   excerpt: "Your excerpt here"
   cover: "/images/blog/your-image.jpg"
   author: "Your Name"
   category: "Your Category"
   ---
   ```

3. **Write content** in Markdown/MDX:

   ```mdx
   ## Your First Heading

   Your content here...
   ```

4. **Add cover image** to `/public/images/blog/`:
   - Recommended: 1600x900px, <250KB
   - Format: JPG or WebP

5. **Build/Deploy**:
   The post will automatically be:
   - Loaded by `getAllPosts()`
   - Displayed in the blog grid
   - Available at `/blog/your-post-slug`
   - Pre-rendered at build time

---

## 9. SEO Optimization

### Automatic Features

- **Dynamic Titles**: `{Post Title} | Blog | Virtue Enclosure Systems`
- **Meta Descriptions**: Uses post excerpt
- **OpenGraph Tags**: Title, description, image, type, published time
- **Structured Data**: Article markup with author and date
- **Canonical URLs**: Automatic from Next.js

### Manual Optimization

Add to frontmatter for enhanced SEO:

```mdx
---
title: "Keyword-Rich Title | Target Phrase"
excerpt: "Compelling description with target keywords, 150-160 characters for optimal display in search results."
---
```

---

## 10. Performance Features

### Build-Time Optimization

- **Static Generation**: All posts pre-rendered at build time
- **`generateStaticParams()`**: Creates routes for all posts
- **No Runtime FS Reads**: Content loaded during build

### Runtime Optimization

- **Image Optimization**: `next/image` with lazy loading
- **Code Splitting**: MDX components loaded on-demand
- **Minimal JS**: Static HTML with progressive enhancement

### Loading Performance

- **Cover Images**: Lazy loaded except hero (priority)
- **Animations**: CSS-based with Framer Motion
- **Fonts**: Optimized with `next/font`

---

## 11. Best Practices

### Content

- **Title**: 50-60 characters, descriptive, keyword-rich
- **Excerpt**: 150-200 characters, compelling summary
- **Content**: 800-2000 words for optimal engagement
- **Headings**: Use hierarchy (h2, h3) for structure
- **Images**: Always include alt text
- **Links**: Use descriptive anchor text

### Markdown

- Use proper heading hierarchy (don't skip levels)
- Add blank lines between blocks
- Use code fences with language specifiers
- Table alignment with colons in header row
- Lists with consistent indentation

### Categories

Standardize categories for consistency:

- Technical
- Manufacturing
- Design
- Compliance
- Maintenance
- Materials
- Industry News

---

## 12. Troubleshooting

### Post Not Showing

1. Check file is in `/content/posts/`
2. Verify `.mdx` extension
3. Ensure frontmatter is valid YAML
4. Check date format (YYYY-MM-DD)
5. Rebuild the site

### MDX Parsing Errors

1. Check frontmatter syntax (correct YAML)
2. Verify all frontmatter values are quoted
3. Look for unescaped special characters
4. Check for mismatched brackets/quotes in content

### Image Not Loading

1. Verify image path is correct (relative to `/public/`)
2. Check image exists in specified location
3. Ensure proper file extension (.jpg, .png, .webp)
4. Check for typos in path

### Styling Issues

1. Ensure `prose` class is applied
2. Check MDX component mapping
3. Verify Tailwind Typography plugin is loaded
4. Check for CSS conflicts

---

## 13. Future Enhancements

### Potential Features

- **Category Filtering**: Make category badges functional
- **Search**: Full-text search across posts
- **Tags**: Add tag system for finer categorization
- **Related Posts**: Show related content
- **Comments**: Add comment system (Giscus, Disqus)
- **Newsletter**: Email subscription integration
- **RSS Feed**: Generate RSS/Atom feed
- **Series**: Multi-part article series support
- **Reading Progress**: Progress bar indicator
- **Social Sharing**: Share buttons for each post
- **Estimated Read Time**: Better calculation based on content complexity

---

## 14. File Structure Summary

```
ves-site/
├── content/
│   └── posts/
│       ├── understanding-msb-vs-mdb.mdx
│       ├── benefits-of-powder-coating.mdx
│       └── custom-enclosure-design-guide.mdx
├── app/
│   └── (site)/
│       └── blog/
│           ├── page.tsx (index)
│           └── [slug]/
│               └── page.tsx (detail)
├── components/
│   └── cards/
│       └── blog-card.tsx
├── lib/
│   └── blog.ts
├── public/
│   └── images/
│       └── blog/
│           ├── msb-vs-mdb.jpg
│           ├── powder-coating.jpg
│           ├── custom-enclosure.jpg
│           └── default-cover.jpg
└── next.config.mjs (MDX config)
```

---

## 15. Conclusion

The MDX blog system provides a powerful, flexible, and performant content management solution with:

- Rich content authoring with MDX
- Beautiful typography and styling
- Excellent SEO and performance
- Easy content management (just add .mdx files)
- Full type safety with TypeScript

**Ready to create content!** Just add MDX files to `/content/posts/` and deploy.
