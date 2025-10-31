# Services Section Implementation Guide

Complete documentation for the services pages and content structure.

## Overview

The services section consists of:

1. **Services JSON** - Detailed content for 6 services
2. **Services Index Page** - Grid of service cards
3. **Service Detail Pages** - Dynamic pages for each service

---

## Content Structure (`/content/services.json`)

### 6 Services

1. **Design & Drafting** (`design-drafting`)
   - CAD engineering and technical drawings
   - DWG/DXF preparation
   - AS/NZS compliance verification

2. **Fabrication** (`fabrication`)
   - CNC laser cutting, bending, welding
   - Precision sheet metal forming
   - Custom enclosure manufacturing

3. **Powder Coating** (`powder-coat`)
   - Professional coating in RAL colors
   - Corrosion-resistant finishes
   - Environmentally friendly process

4. **Assembly & Wiring** (`assembly-wiring`)
   - Licensed electricians
   - Switchboard population and wiring
   - AS/NZS 3000 compliance

5. **IP Rating & NATA Testing** (`testing`)
   - Comprehensive electrical testing
   - IP rating verification
   - NATA-accredited reports

6. **Delivery & Commissioning** (`delivery`)
   - Victoria-wide delivery
   - On-site commissioning support
   - 98% on-time delivery record

---

## Service Object Structure

Each service contains:

```json
{
  "slug": "service-slug",
  "title": "Service Title",
  "summary": "Brief description for cards",
  "icon": "📐",
  "heroImage": "/images/services/hero.jpg",
  "overview": "Detailed description paragraph",
  "features": ["Feature 1", "Feature 2", ...],
  "process": ["Step 1", "Step 2", ...],
  "gallery": ["/images/1.jpg", ...],
  "benefits": ["Benefit 1", ...],
  "certifications": ["ISO 9001", ...],
  "deliverables": ["Item 1", ...],

  // Service-specific fields
  "equipment": [...],
  "materials": [...],
  "capabilities": [...],
  "testTypes": [...],
  "ipRatings": [...],
  "serviceArea": [...],
  "deliveryOptions": [...],
  "commissioningServices": [...]
}
```

---

## Services Index Page

**Location:** `/app/(site)/services/page.tsx`

**Sections:**

### 1. Hero Section

- Dark background
- Page title: "Our Services"
- Subtitle: End-to-end manufacturing solutions

### 2. Services Grid

- 3-column grid (responsive: 1 mobile, 2 tablet, 3 desktop)
- ServiceCard components
- FadeY reveal animations (staggered 100ms)

### 3. Process Overview

- 4-step process visualization
- Numbered circles with brand color
- Staggered animations

### 4. CTA Section

- Light brand background
- Two CTAs: "Request a Quote" + "View Our Work"

**Features:**

- All headings wrapped in FadeY
- Alternating section backgrounds
- Responsive grid layouts
- SEO-optimized metadata

---

## Service Card Component

**Location:** `/components/cards/service-card.tsx`

**Features:**

- Hero image (4:3 aspect ratio)
- Icon (emoji)
- Title
- Summary (3-line clamp)
- "Learn More" link with arrow
- Hover effects:
  - Image zoom (scale 105%)
  - Shadow elevation
  - Title color change to brand

**Props:**

```tsx
{
  service: {
    slug: string;
    title: string;
    summary: string;
    description?: string;
    icon?: string;
    heroImage?: string;
  };
  className?: string;
}
```

---

## Service Detail Page

**Location:** `/app/(site)/services/[slug]/page.tsx`

**Dynamic Route:** Generates static pages for all 6 services

**Sections:**

### 1. Hero Section

- Full-width hero image with overlay
- Large icon
- Title and summary
- Gradient overlay for text readability

### 2. Overview & Features (Main Content)

- **Overview:** Detailed description
- **Key Features:** 2-column grid with checkmarks
- **Our Process:** Numbered steps in boxes
- **Benefits:** Highlighted with left border

### 3. Sidebar (Sticky)

- **Get Started Card:** CTA to contact
- **Quick Info:**
  - Certifications (badges)
  - Standards (list)
  - Deliverables (list)

### 4. Gallery Strip

- 4-column grid (2 mobile, 4 desktop)
- Square images with hover zoom
- Gray background section

### 5. Additional Info

- Service-specific sections (conditional):
  - Equipment & Capabilities
  - Materials
  - Test Types
  - IP Ratings
  - Service Area
  - etc.

### 6. CTA Section

- Dark background
- "Ready to Get Started?"
- Two CTAs: "Request a Quote" + "View All Services"

**Features:**

- All blocks wrapped in FadeY
- Staggered reveal animations
- Responsive sidebar (becomes full-width on mobile)
- Next.js Image optimization
- Static generation for performance

---

## Animation System

### Service Cards

```tsx
<FadeY delay={index * 0.1}>
  <ServiceCard service={service} />
</FadeY>
```

### Detail Page Sections

```tsx
<FadeY>Hero Content</FadeY>
<FadeY delay={0.2}>Overview</FadeY>
<FadeY delay={0.3}>Features</FadeY>
<FadeY delay={0.4}>Process</FadeY>
```

### Gallery Images

```tsx
{gallery.map((image, index) => (
  <FadeY key={index} delay={index * 0.1}>
    <Image... />
  </FadeY>
))}
```

---

## SEO & Metadata

### Index Page

```tsx
export const metadata = {
  title: "Our Services | Virtue Enclosure Systems",
  description: "Comprehensive switchboard manufacturing services...",
};
```

### Detail Pages

```tsx
export async function generateMetadata({ params }) {
  const service = servicesData.services.find((s) => s.slug === params.slug);
  return {
    title: `${service.title} | Virtue Enclosure Systems`,
    description: service.summary,
  };
}
```

### Static Generation

```tsx
export async function generateStaticParams() {
  return servicesData.services.map((service) => ({
    slug: service.slug,
  }));
}
```

---

## Image Requirements

### Hero Images (Service Cards)

- **Dimensions:** 1600×1200px
- **Aspect Ratio:** 4:3
- **File Size:** < 500KB
- **Format:** JPG or WebP
- **Quantity:** 6 (one per service)

### Gallery Images

- **Dimensions:** 1200×1200px
- **Aspect Ratio:** 1:1 (square)
- **File Size:** < 300KB each
- **Format:** JPG or WebP
- **Quantity:** 4 per service = 24 total

**Total Images Needed:** 30

---

## Responsive Design

### Breakpoints

**Mobile (< 768px):**

- 1-column grid
- Full-width cards
- Stacked sidebar
- 2-column gallery

**Tablet (768px - 1024px):**

- 2-column service grid
- Sidebar below content
- 3-column gallery

**Desktop (> 1024px):**

- 3-column service grid
- Sticky sidebar
- 4-column gallery

---

## Content Management

### Adding a New Service

1. **Update `services.json`:**

```json
{
  "slug": "new-service",
  "title": "New Service",
  "summary": "Brief description",
  "icon": "🔧",
  "heroImage": "/images/services/new-service.jpg",
  "overview": "Full description...",
  "features": [...],
  "process": [...],
  "gallery": [...],
  "benefits": [...]
}
```

2. **Add images:**
   - Hero image: `/public/images/services/new-service.jpg`
   - Gallery: `/public/images/services/new-1.jpg` through `new-4.jpg`

3. **Deploy:**
   - Next.js will automatically generate the static page
   - No code changes needed!

### Updating Service Content

1. Edit the relevant service object in `services.json`
2. Rebuild the site to regenerate static pages
3. Images remain unchanged unless you update the paths

---

## Performance Optimizations

### Images

- Use Next.js `<Image>` component (automatic optimization)
- Lazy loading for below-the-fold content
- WebP format for smaller file sizes
- Priority loading for hero images

### Static Generation

- All service pages pre-rendered at build time
- Fast page loads
- No runtime data fetching

### Code Splitting

- Components loaded only when needed
- Framer Motion animations code-split
- Optimal bundle sizes

---

## Accessibility

### Semantic HTML

```tsx
<article> for each service
<section> for content blocks
<h1> for page title
<h2> for section headings
<h3> for subsections
```

### Image Alt Text

```tsx
<Image alt={`${service.title} hero`} />
<Image alt={`${service.title} gallery image ${index + 1}`} />
```

### Keyboard Navigation

- All links keyboard accessible
- Focus states visible
- Logical tab order

### Screen Readers

- Proper heading hierarchy
- Descriptive link text ("Learn More" + context)
- ARIA labels where needed

---

## Testing Checklist

### Functionality

- [ ] All 6 service cards display correctly
- [ ] Service card links work
- [ ] Detail pages load for all services
- [ ] Images display correctly
- [ ] Gallery zoom effects work
- [ ] Sidebar stickiness works
- [ ] CTA buttons link correctly

### Content

- [ ] All text displays correctly
- [ ] Features list renders properly
- [ ] Process steps in correct order
- [ ] Benefits highlighted
- [ ] Certifications/standards show
- [ ] Gallery images in correct order

### Responsive

- [ ] Mobile: 1-column grid
- [ ] Tablet: 2-column grid
- [ ] Desktop: 3-column grid
- [ ] Sidebar responsive behavior
- [ ] Images scale correctly
- [ ] Text remains readable

### Performance

- [ ] Page load < 3 seconds
- [ ] Images optimized
- [ ] No layout shift
- [ ] Smooth animations
- [ ] Fast navigation between pages

### SEO

- [ ] Meta titles correct
- [ ] Meta descriptions present
- [ ] Heading hierarchy proper
- [ ] Alt text on all images
- [ ] Canonical URLs set

---

## Quick Reference

### File Locations

```
/content/services.json                      # Service data
/components/cards/service-card.tsx          # Card component
/app/(site)/services/page.tsx               # Index page
/app/(site)/services/[slug]/page.tsx        # Detail pages
/public/images/services/                    # Service images
```

### Key Components Used

```
Container, Section, Heading, Text       # UI components
FadeY                                    # Animation wrapper
Badge                                    # For tags/labels
Button                                   # CTAs
Image (next/image)                      # Optimized images
```

### Navigation Flow

```
Homepage → Services Index → Service Detail → Contact
```

---

## Next Steps

1. **Add Real Images:**
   - Take photos of actual equipment and processes
   - Optimize images before uploading
   - Follow naming convention in PLACEHOLDER_IMAGES.md

2. **Review Content:**
   - Verify technical accuracy
   - Update certifications if needed
   - Add any missing services

3. **Test Thoroughly:**
   - All links work
   - Images display correctly
   - Responsive on all devices
   - Fast page loads

4. **SEO Optimization:**
   - Add structured data
   - Verify meta descriptions
   - Check canonical URLs

---

Ready to showcase your complete services offering! 🛠️✨
