# Card Components - Implementation Guide

This document provides a comprehensive overview of all card components used throughout the Virtue Enclosure Systems website.

---

## Overview

All card components share a **consistent design language** with:

- ✅ `rounded-2xl` - Generous rounded corners
- ✅ `border border-neutral-200` - Subtle border
- ✅ `shadow-soft` - Soft shadow for depth
- ✅ `hover:-translate-y-1` - Lift effect on hover
- ✅ `hover:shadow-soft-lg` - Enhanced shadow on hover
- ✅ `hover:border-neutral-300` - Border darkens on hover
- ✅ Smooth transitions for all interactive states

---

## 1. ServiceCard

**File:** `components/cards/service-card.tsx`

### Purpose

Displays service offerings on the services index page with clickable links to detail pages.

### Features

- ✅ Hero image with hover scale effect
- ✅ Icon display (optional emoji/SVG)
- ✅ Service title with hover color change
- ✅ Summary text (line-clamped to 3 lines)
- ✅ "Learn More" link with animated arrow

### Props

```typescript
interface ServiceCardProps {
  service: {
    slug: string; // URL slug
    title: string; // Service name
    summary: string; // Brief description
    description?: string; // Fallback text
    icon?: string; // Emoji or icon
    heroImage?: string; // Image path
  };
  className?: string; // Additional styles
}
```

### Usage

```tsx
import ServiceCard from "@/components/cards/service-card";

<ServiceCard
  service={{
    slug: "design-drafting",
    title: "Design & Drafting",
    summary: "Expert CAD design and technical drafting services...",
    icon: "✏️",
    heroImage: "/images/services/design.jpg",
  }}
/>;
```

### Visual Structure

```
┌─────────────────────────┐
│                         │
│   [Hero Image 4:3]      │ ← Scales 105% on hover
│                         │
├─────────────────────────┤
│  📐 Icon                │
│                         │
│  Service Title          │ ← Changes to brand color on hover
│                         │
│  Summary text limited   │
│  to three lines with    │
│  ellipsis overflow...   │
│                         │
│  Learn More →           │ ← Arrow slides right on hover
└─────────────────────────┘
```

### Hover Effects

- Card lifts up 4px (`-translate-y-1`)
- Shadow increases from `shadow-soft` to `shadow-soft-lg`
- Border color darkens
- Image scales to 105%
- Title changes to brand color
- Arrow icon slides right 4px

---

## 2. ProjectCard

**File:** `components/cards/project-card.tsx`

### Purpose

Displays project case studies with category tags and client information.

### Features

- ✅ Hero image with hover scale effect
- ✅ Category badge overlay on image
- ✅ Client and location metadata
- ✅ Project title with hover color change
- ✅ Summary text (line-clamped to 3 lines)
- ✅ "View Project" link with animated arrow

### Props

```typescript
interface ProjectCardProps {
  project: {
    slug: string; // URL slug
    title: string; // Project name
    summary: string; // Brief description
    category: string; // Project type (MSB, MDB, etc.)
    client?: string; // Client name
    location?: string; // Project location
    heroImage: string; // Image path
    completedDate?: string; // Completion date
  };
  className?: string; // Additional styles
}
```

### Usage

```tsx
import ProjectCard from "@/components/cards/project-card";

<ProjectCard
  project={{
    slug: "warehouse-msb",
    title: "2500A MSB for Warehouse",
    summary: "Complete power distribution for 50,000m² facility",
    category: "Main Switchboard",
    client: "Industrial Logistics",
    location: "Melbourne, VIC",
    heroImage: "/images/projects/warehouse.jpg",
  }}
/>;
```

### Visual Structure

```
┌─────────────────────────┐
│ [Badge]                 │
│                         │
│   [Hero Image 4:3]      │ ← Scales 105% on hover
│                         │
├─────────────────────────┤
│  Client • Location      │
│                         │
│  Project Title          │ ← Changes to brand color on hover
│  Can span two lines     │
│                         │
│  Summary text limited   │
│  to three lines with    │
│  ellipsis overflow...   │
│                         │
│  View Project →         │ ← Arrow slides right on hover
└─────────────────────────┘
```

### Category Badge

- Positioned absolutely in top-left of image
- Brand background color
- Small size (`size="sm"`)
- Provides quick visual categorization

### Hover Effects

- Card lifts up 4px (`-translate-y-1`)
- Shadow increases
- Border darkens
- Image scales to 105%
- Title changes to brand color
- Arrow icon slides right 4px

---

## 3. TestimonialCard

**File:** `components/cards/testimonial-card.tsx`

### Purpose

Displays client testimonials with quotes, ratings, and attribution.

### Features

- ✅ Large quote icon (decorative)
- ✅ Testimonial quote text
- ✅ Optional 5-star rating display
- ✅ Author name (bold)
- ✅ Role/position at company
- ✅ Company name with brand color
- ✅ Bordered top section for author info

### Props

```typescript
interface TestimonialCardProps {
  testimonial: {
    id?: string; // Unique identifier
    quote?: string; // Testimonial text
    content?: string; // Alias for quote
    author: string; // Person's name
    position?: string; // Job title
    role?: string; // Alias for position
    company: string; // Company name
    rating?: number; // Star rating (1-5)
  };
  className?: string; // Additional styles
}
```

### Usage

```tsx
import TestimonialCard from "@/components/cards/testimonial-card";

<TestimonialCard
  testimonial={{
    quote: "VES delivered exactly what we needed, on time and within budget.",
    author: "David Chen",
    role: "Facilities Manager",
    company: "Industrial Logistics Group",
    rating: 5,
  }}
/>;
```

### Visual Structure

```
┌─────────────────────────┐
│  „ (large quote icon)   │
│                         │
│  "Client testimonial    │
│  quote displayed in     │
│  comfortable reading    │
│  size with good line    │
│  height."               │
│                         │
│  ★★★★★                  │ (if rating provided)
│                         │
│  ─────────────────────  │ (border-top)
│                         │
│  Author Name            │ (bold)
│  Position at Company    │ (company in brand color)
└─────────────────────────┘
```

### Design Choices

- **Quote Icon**: Large, light brand color (20% opacity) for visual interest
- **Quote Text**: Large size (text-lg) for readability
- **Rating**: Gold stars with gray unfilled stars
- **Author Section**: Separated with top border for clear attribution
- **Company**: Brand color to highlight client

### Hover Effects

- Card lifts up 4px (`-translate-y-1`)
- Shadow increases
- Border darkens
- No image scale (text-only card)

---

## 4. BlogCard

**File:** `components/cards/blog-card.tsx`

### Purpose

Displays blog post previews with cover images, categories, and metadata.

### Features

- ✅ Cover image (16:9 aspect) with hover scale
- ✅ Category badge overlay on image
- ✅ Formatted publication date
- ✅ Calculated or manual read time
- ✅ Post title (line-clamped to 2 lines)
- ✅ Excerpt (line-clamped to 3 lines)
- ✅ Author byline
- ✅ "Read More" link with animated arrow

### Props

```typescript
interface BlogCardProps {
  post: {
    slug: string; // URL slug
    title: string; // Post title
    excerpt: string; // Brief summary
    date: string; // ISO date string
    cover: string; // Cover image path
    category?: string; // Post category
    author?: string; // Author name
    readTime?: string; // Manual read time
    content?: string; // For auto-calculating read time
  };
  className?: string; // Additional styles
}
```

### Usage

```tsx
import BlogCard from "@/components/cards/blog-card";

<BlogCard
  post={{
    slug: "understanding-msb-vs-mdb",
    title: "Understanding MSB vs MDB: What's the Difference?",
    excerpt:
      "Learn the key differences between Main Switchboards and Main Distribution Boards...",
    date: "2024-10-15",
    cover: "/images/blog/msb-vs-mdb.jpg",
    category: "Technical",
    author: "John Smith",
    readTime: "5 min read",
  }}
/>;
```

### Visual Structure

```
┌─────────────────────────┐
│ [Badge]                 │
│                         │
│   [Cover Image 16:9]    │ ← Scales 105% on hover
│                         │
├─────────────────────────┤
│  Oct 15, 2024 • 5 min   │
│                         │
│  Post Title Can Span    │ ← Changes to brand color on hover
│  Two Lines Maximum      │
│                         │
│  Excerpt text limited   │
│  to three lines with    │
│  ellipsis overflow...   │
│                         │
│  By Author  Read More → │ ← Arrow slides right on hover
└─────────────────────────┘
```

### Date Formatting

- Australian locale (`en-AU`)
- Format: "Month Day, Year" (e.g., "October 15, 2024")
- Uses `toLocaleDateString()` for consistency

### Read Time Calculation

- Auto-calculated if `content` is provided
- Assumes 200 words per minute reading speed
- Falls back to "5 min read" if no data
- Can be manually overridden via `readTime` prop

### Hover Effects

- Card lifts up 4px (`-translate-y-1`)
- Shadow increases
- Border darkens
- Cover image scales to 105%
- Title changes to brand color
- Arrow icon slides right 4px

---

## Shared Design Tokens

### Border Radius

```css
rounded-2xl = 16px
```

Generous rounding for modern, friendly appearance.

### Shadows

```css
/* Default shadow */
shadow-soft = 0 4px 20px rgba(0, 0, 0, 0.08)

/* Hover shadow */
shadow-soft-lg = 0 8px 30px rgba(0, 0, 0, 0.12)
```

Soft shadows that don't overpower the design.

### Borders

```css
/* Default border */
border border-neutral-200

/* Hover border */
hover:border-neutral-300
```

Subtle borders that enhance without dominating.

### Hover Transform

```css
hover: -translate-y-1 = translateY(-4px);
```

Creates a "lifting" effect suggesting interactivity.

### Transitions

```css
transition-all
```

Smooth animations for all property changes (300ms default).

### Image Hover Scale

```css
group-hover:scale-105 = transform: scale(1.05)
duration-500 = 500ms transition
```

Subtle zoom effect on images for visual interest.

---

## Responsive Behavior

All cards are designed to work in responsive grid layouts:

### Mobile (< 768px)

```tsx
<div className="grid grid-cols-1 gap-8">{/* Full-width cards */}</div>
```

### Tablet (768px - 1024px)

```tsx
<div className="grid md:grid-cols-2 gap-8">{/* Two columns */}</div>
```

### Desktop (> 1024px)

```tsx
<div className="grid lg:grid-cols-3 gap-8">{/* Three columns */}</div>
```

---

## Accessibility

### Keyboard Navigation

- All cards are keyboard accessible via native `<Link>` or `<div>` elements
- Focus indicators visible (browser default)
- Tab order follows visual order

### Screen Readers

- Semantic HTML (links, headings, blockquotes)
- Image alt text (from title or description)
- Proper heading hierarchy (h3 for card titles)

### Color Contrast

- Text meets WCAG AA standards
- Brand color used sparingly for accents
- Sufficient contrast on all backgrounds

---

## Performance

### Image Optimization

- All images use Next.js `Image` component
- Lazy loading enabled by default
- Automatic responsive sizing
- WebP/AVIF format support

### Animation Performance

- CSS transforms (GPU-accelerated)
- No layout thrashing
- Efficient transition properties
- 60fps hover animations

---

## Customization

### Adding a New Card Type

1. **Create the component file:**

   ```bash
   touch components/cards/new-card.tsx
   ```

2. **Follow the pattern:**

   ```tsx
   import { cn } from "@/lib/utils";

   interface NewCardProps {
     data: {...};
     className?: string;
   }

   export default function NewCard({ data, className }: NewCardProps) {
     return (
       <div
         className={cn(
           "group h-full rounded-2xl border border-neutral-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg hover:border-neutral-300",
           className
         )}
       >
         {/* Your content */}
       </div>
     );
   }
   ```

3. **Use consistent patterns:**
   - Same border radius, border, shadow
   - Same hover transform and shadow
   - Similar content structure
   - Proper TypeScript types

### Modifying Existing Cards

**To change hover effect intensity:**

```tsx
// Increase lift
hover:-translate-y-2  // Instead of -translate-y-1

// Increase shadow
hover:shadow-2xl      // Instead of shadow-soft-lg
```

**To change image aspect ratio:**

```tsx
// ServiceCard, ProjectCard (currently 4:3)
aspect-[4/3]   → aspect-square
aspect-[4/3]   → aspect-[16/9]

// BlogCard (currently 16:9)
aspect-[16/9]  → aspect-[4/3]
```

**To change text line clamping:**

```tsx
line-clamp-3   → line-clamp-2
line-clamp-2   → line-clamp-4
```

---

## Common Issues & Solutions

### Issue: Card heights uneven in grid

**Solution:** Ensure parent has `h-full` class

```tsx
<div className="grid gap-8 md:grid-cols-3">
  <ServiceCard className="h-full" {...} />  {/* ✓ Correct */}
</div>
```

### Issue: Images don't load

**Solution:** Check image paths are correct and public

```tsx
heroImage: "/images/services/design.jpg"; // ✓ Correct
heroImage: "images/services/design.jpg"; // ✗ Missing leading slash
```

### Issue: Hover effects feel slow

**Solution:** Adjust transition duration

```tsx
className = "... transition-all duration-200"; // Faster (200ms)
className = "... transition-all duration-500"; // Slower (500ms)
```

### Issue: Text overflow without ellipsis

**Solution:** Ensure line-clamp is applied

```tsx
<p className="line-clamp-3">...</p>  // ✓ Correct
<p className="truncate">...</p>      // ✗ Only works for single line
```

---

## Testing Checklist

**Visual Testing:**

- [ ] Cards render correctly on mobile (< 768px)
- [ ] Cards render correctly on tablet (768-1024px)
- [ ] Cards render correctly on desktop (> 1024px)
- [ ] All images load and display properly
- [ ] Text doesn't overflow containers
- [ ] Borders and shadows visible

**Interaction Testing:**

- [ ] Hover effects work smoothly
- [ ] Cards lift up on hover
- [ ] Shadows increase on hover
- [ ] Images scale on hover
- [ ] Arrow icons animate on hover
- [ ] Links navigate correctly

**Accessibility Testing:**

- [ ] Keyboard navigation works (Tab through cards)
- [ ] Focus indicators visible
- [ ] Screen reader announces content correctly
- [ ] Color contrast meets WCAG AA
- [ ] Alt text present on all images

---

## Related Files

- `/components/cards/service-card.tsx` - Service offerings
- `/components/cards/project-card.tsx` - Project case studies
- `/components/cards/testimonial-card.tsx` - Client testimonials
- `/components/cards/blog-card.tsx` - Blog post previews
- `/components/ui/badge.tsx` - Category/tag badges
- `/lib/utils.ts` - `cn()` utility for className merging

---

## Summary

All card components follow a **consistent design system** with:

✅ **Visual Consistency:**

- Rounded corners (2xl)
- Subtle borders
- Soft shadows
- White backgrounds

✅ **Interactive Feedback:**

- Lift on hover (-translate-y-1)
- Enhanced shadows
- Darkened borders
- Image scaling
- Animated arrows

✅ **Performance:**

- Next.js Image optimization
- CSS transforms (GPU-accelerated)
- Lazy loading
- Efficient animations

✅ **Accessibility:**

- Semantic HTML
- Keyboard navigation
- Screen reader support
- WCAG AA contrast

All cards are **production-ready** and work seamlessly across all pages! 🎉
