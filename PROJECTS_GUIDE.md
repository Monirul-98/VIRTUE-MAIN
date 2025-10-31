# Projects Section Implementation Guide

This document outlines the structure, components, and implementation details for the Projects section of the Virtue Enclosure Systems website.

---

## 1. Content Structure (`/content/projects.json`)

The projects data is stored in a JSON file, providing a flexible and easily manageable content source.

**File Path:** `content/projects.json`

**Structure:** An array of project objects. Each project object has the following properties:

- `slug`: `string` - Unique identifier for the project (used in URLs).
- `title`: `string` - The main title of the project.
- `summary`: `string` - A brief description used in project cards and hero sections.
- `category`: `string` - Project type (e.g., "Main Switchboard", "Motor Distribution Board", "Custom Enclosures").
- `client`: `string` (optional) - Client name (can be anonymized for confidentiality).
- `location`: `string` (optional) - Project location.
- `completedDate`: `string` (optional) - Completion date in YYYY-MM format.
- `heroImage`: `string` - Path to the main image for the project (e.g., `/images/projects/msb-warehouse-hero.jpg`).
- `overview`: `string` - Detailed project overview paragraph.
- `challenge`: `string` (optional) - Description of the project challenges.
- `solution`: `string` (optional) - Description of how challenges were solved.
- `specs`: `Array<Object>` - Array of technical specification objects, each with:
  - `label`: `string` - Specification name.
  - `value`: `string` - Specification value.
- `features`: `Array<string>` (optional) - Array of key feature bullet points.
- `gallery`: `Array<string>` - Array of image paths for the project gallery.
- `testimonial`: `Object` (optional) - Client testimonial with:
  - `quote`: `string` - The testimonial quote.
  - `author`: `string` - Person's name.
  - `position`: `string` - Person's position/title.

**Example `projects.json` entry:**

```json
{
  "slug": "msb-warehouse-logistics",
  "title": "MSB for Warehouse & Logistics Center",
  "summary": "2500A Main Switchboard, Form 3b, IP54 - Complete power distribution for 50,000m² facility",
  "category": "Main Switchboard",
  "client": "Industrial Logistics Group",
  "location": "Melbourne, VIC",
  "completedDate": "2024-03",
  "heroImage": "/images/projects/msb-warehouse-hero.jpg",
  "overview": "Design and manufacture of a 2500A Form 3b Main Switchboard for a new warehouse and logistics center...",
  "challenge": "The facility required 24/7 uptime during installation...",
  "solution": "We designed a modular MSB system that could be installed and commissioned in sections...",
  "specs": [
    { "label": "Current Rating", "value": "2500A" },
    { "label": "Form Type", "value": "Form 3b (segregated)" },
    { "label": "IP Rating", "value": "IP54" }
  ],
  "features": [
    "Form 3b segregated construction for safety",
    "Dual incoming feeds with automatic changeover"
  ],
  "gallery": [
    "/images/projects/msb-warehouse-1.jpg",
    "/images/projects/msb-warehouse-2.jpg"
  ],
  "testimonial": {
    "quote": "VES delivered exactly what we needed, on time and within budget.",
    "author": "David Chen",
    "position": "Facilities Manager"
  }
}
```

---

## 2. Projects Index Page (`/app/(site)/projects/page.tsx`)

This page displays an overview of all projects in a grid format, along with stats and category filters.

**File Path:** `app/(site)/projects/page.tsx`

**Key Components Used:**

- `<Section>`: For consistent layout and spacing.
- `<Container>`: To constrain content width.
- `<Heading>`, `<Text>`: For typography.
- `<FadeY>`: For scroll-triggered reveal animations on all content blocks.
- `<Badge>`: For category indicators.
- `<ProjectCard>`: Reusable component to display individual project summaries.
- `<Button>`: For CTA links.

**Structure:**

1. **Hero Section:**
   - `spacing="xl"`, `background="dark"`
   - `Heading` (level 1) for "Our Projects"
   - `Text` for a brief introduction
   - All content wrapped in `<FadeY>` with staggered delays.

2. **Stats Section:**
   - `spacing="lg"`, `background="gray"`
   - Grid of 4 statistics (Projects Completed, Client Satisfaction, On-Time Delivery, Years Experience)
   - Each stat wrapped in `<FadeY>` with staggered delays.

3. **Projects Grid Section:**
   - `spacing="lg"`
   - Centered `Heading` (level 2) and `Text` for "Featured Projects".
   - Category filter badges (visual only, not functional yet).
   - A `div` with `grid gap-8 md:grid-cols-2 lg:grid-cols-3` to display `ProjectCard` components.
   - Each `ProjectCard` is wrapped in `<FadeY>` with `delay={index * 0.1}` for staggered animation.

4. **CTA Section:**
   - `spacing="xl"`, `background="dark"`
   - Centered content with `Heading`, `Text`, and two `Button` components ("Request a Quote", "Our Services").
   - All content wrapped in `<FadeY>` with staggered delays.

**Metadata:**

- `title`: "Our Projects | Virtue Enclosure Systems"
- `description`: "Explore our portfolio of switchboard and enclosure projects across commercial, industrial, and institutional sectors throughout Victoria."

---

## 3. Project Detail Page (`/app/(site)/projects/[slug]/page.tsx`)

This dynamic page renders detailed information for a specific project, fetched from `projects.json` based on the URL slug.

**File Path:** `app/(site)/projects/[slug]/page.tsx`

**Key Features:**

- **Dynamic Routing:** Uses Next.js App Router's `[slug]` convention.
- **`generateStaticParams()`:** Pre-renders all project detail pages at build time for performance.
- **`generateMetadata()`:** Dynamically sets page title and description based on the project data for SEO.
- **`notFound()`:** Handles cases where a project slug does not exist.

**Key Components Used:**

- `<Section>`: For consistent layout and spacing, with alternating backgrounds.
- `<Container>`: To constrain content width.
- `<Heading>`, `<Text>`: For typography.
- `<Badge>`: For category and status indicators.
- `<FadeY>`: For scroll-triggered reveal animations on all content blocks.
- `next/image`: For optimized image display.
- `<Button>`: For CTA links.

**Structure:**

1. **Hero Section:**
   - `spacing="xl"`, `background="dark"`
   - A `grid md:grid-cols-2` layout.
   - **Left side:**
     - Category badge + completion date
     - `Heading` (level 1) for project title
     - Client & location metadata
     - `Text` for project summary
     - `Button` for "Start Your Project"
     - All wrapped in `<FadeY>` with staggered delays.
   - **Right side:** `heroImage` displayed with `next/image`, rounded-3xl, and `shadow-soft-lg`. Wrapped in `<FadeY>`.

2. **Overview Section:**
   - `spacing="lg"`
   - Centered `Heading` (level 2) for "Project Overview"
   - `Text` for detailed project overview
   - All wrapped in `<FadeY>`.

3. **Challenge & Solution Section** (if available):
   - `spacing="lg"`, `background="gray"`
   - A `grid md:grid-cols-2` layout.
   - Left: "The Challenge" heading and text.
   - Right: "Our Solution" heading and text.
   - Both wrapped in `<FadeY>` with staggered delays.

4. **Specifications Section:**
   - `spacing="lg"`
   - Centered `Heading` (level 2) for "Technical Specifications"
   - A `grid md:grid-cols-2 lg:grid-cols-4` of spec cards.
   - Each spec card displays `label` and `value`, wrapped in `<FadeY asChild>` with staggered delays.

5. **Key Features Section** (if available):
   - `spacing="lg"`, `background="gray"`
   - Centered `Heading` (level 2) for "Key Features"
   - A `grid md:grid-cols-2` of feature bullet points with checkmark icons.
   - Each feature wrapped in `<FadeY asChild>` with staggered delays.

6. **Gallery Section:**
   - `spacing="lg"`
   - Centered `Heading` (level 2) for "Project Gallery"
   - A `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` of gallery images.
   - Each image wrapped in `<FadeY asChild>` with staggered delays, rounded-2xl, `shadow-soft`, and hover scale effect.

7. **Testimonial Section** (if available):
   - `spacing="lg"`, `background="dark"`
   - Centered layout with quote icon, testimonial quote, author name, and position.
   - All wrapped in `<FadeY>` with staggered delays.

8. **CTA Section:**
   - `spacing="lg"`
   - A `div` with `bg-brand-50 rounded-3xl p-12 text-center`.
   - `Heading` (level 2) for "Have a Similar Project in Mind?"
   - `Text` for a call to action.
   - Two `Button` components ("Request a Quote", "View More Projects") wrapped in `<FadeY>` with staggered delays.

---

## 4. Project Card Component (`/components/cards/project-card.tsx`)

Reusable component for displaying project summaries on the index page.

**File Path:** `components/cards/project-card.tsx`

**Props:**

- `project`: Project object with `slug`, `title`, `summary`, `category`, `client`, `location`, `heroImage`.
- `className`: Optional additional CSS classes.

**Features:**

- Clickable card linking to `/projects/[slug]`
- Hero image with hover scale effect
- Category badge overlay on image
- Client & location metadata
- Title with hover color change
- Summary text (line-clamped to 3 lines)
- "View Project" link with arrow icon and hover animation

---

## 5. Image Placeholders (`/public/images/projects/`)

A dedicated directory for project-related images.

**File Path:** `public/images/projects/PLACEHOLDER_IMAGES.md`

**Guidelines:**

- **Hero Images:** `1200px` x `900px` (4:3 aspect ratio), under `200KB`.
  - 6 hero images (one per project)
- **Gallery Images:** `800px` x `600px` (4:3 aspect ratio), under `150KB`.
  - 4-6 images per project (30 total gallery images across all projects)

---

## 6. General Implementation Notes

- **Framer Motion:** All major content blocks on both `projects/page.tsx` and `projects/[slug]/page.tsx` are wrapped in `<FadeY>` for a consistent scroll-reveal animation effect. Staggered delays are used for lists and grids.
- **Next.js Image Component:** Used for all images to ensure optimization, lazy loading, and responsive sizing.
- **Tailwind CSS:** Utilized for all styling, ensuring a consistent design system.
- **Accessibility:** Semantic HTML, `alt` attributes for images, and proper link/button usage.
- **Error Handling:** `notFound()` is used on the detail page if a project slug is invalid.
- **SEO:** Dynamic metadata generation for each project page.
- **Responsive Design:** Mobile-first approach with responsive grids and layouts.

---

## 7. Content Strategy

**Project Selection Criteria:**

- Showcase diversity (MSBs, MDBs, custom enclosures)
- Highlight technical complexity
- Include testimonials where possible
- Represent various industries
- Balance between recent and landmark projects

**Writing Guidelines:**

- Use concrete numbers and specifications
- Focus on challenges and solutions
- Highlight unique aspects of each project
- Keep technical language professional but accessible
- Include real-world impact and outcomes

---

## 8. Next Steps

1. **Add Placeholder Images:** Populate the `/public/images/projects/` directory with the specified images.
2. **Review Content:** Ensure all project descriptions, specs, and testimonials are accurate and compelling.
3. **Test Navigation:** Verify that all links between the projects index and detail pages work correctly.
4. **Responsive Testing:** Check layout and animations across various screen sizes.
5. **Add Filtering:** Implement category filtering on the projects index page (currently visual only).
6. **Optimize Images:** Ensure all images are properly optimized before deployment.
7. **Legal Review:** Verify client names and project details are approved for public display.
