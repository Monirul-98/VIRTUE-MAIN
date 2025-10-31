# Homepage Implementation Guide

Complete documentation for the Virtue Enclosure Systems homepage structure and components.

## Page Structure

The homepage (`app/(site)/page.tsx`) contains 8 main sections in order:

1. **Hero Carousel** - Full-screen rotating hero with 3 slides
2. **Stat Counters** - 4 key metrics with count-up animation
3. **Services Slider** - Horizontal Embla carousel of service cards
4. **Process Steps** - 3-step process with connecting line
5. **Logo Marquee** - Infinite scrolling partner logos
6. **Testimonials** - Client testimonials carousel
7. **Blog Cards** - Latest 3 blog posts
8. **Big CTA** - Request quote with file upload option

---

## Section Details

### 1. Hero Carousel

**Component:** `HeroCarousel`  
**Features:**

- 3 rotating slides with 7-second autoplay
- Staggered Framer Motion animations
- Left: Content (badge, title, subtitle, description, 2 CTAs)
- Right: Hero image (rounded-3xl, shadow)

**Slides:**

1. "Custom Switchboard Enclosures — Built to Australian Standards"
2. "Fabrication & Powder Coating — End-to-end in one shop"
3. "On-time Site Delivery — Proven lead times across Victoria"

---

### 2. Stat Counters

**Component:** `StatCounter` (4 instances)  
**Background:** Gray (neutral-50)

**Stats:**

```tsx
<StatCounter end={450} suffix="+" label="Projects Delivered" />
<StatCounter end={14} label="Avg Lead Time (days)" />
<StatCounter end={98} suffix="%" label="On-time Delivery" />
<StatCounter end={25} suffix="+" label="Years in Business" />
```

**Features:**

- React CountUp integration
- Triggers on scroll into view (once)
- 2-second count animation
- Grid: 2 cols mobile, 4 cols desktop

**Implementation:**

```tsx
// Uses Framer Motion's useInView
const isInView = useInView(ref, { once: true });

// Renders CountUp when in view
{
  isInView && <CountUp start={0} end={end} duration={2} />;
}
```

---

### 3. Services Slider

**Component:** `ServicesSlider`  
**Data Source:** `/content/services.json`

**Features:**

- Embla carousel with horizontal scroll
- Autoplay (4-second delay)
- Shows all 6 services
- Service cards with icon, title, description

**Services:**

1. MSB Manufacturing
2. MDB Manufacturing
3. Custom Enclosures
4. Metal Fabrication
5. Powder Coating
6. Assembly & Testing

**Heading:**

```tsx
<FadeY className="text-center mb-16">
  <Heading level={2}>Our Services</Heading>
  <Text>Comprehensive switchboard and enclosure solutions...</Text>
</FadeY>
```

---

### 4. Process Steps

**Component:** `ProcessSteps`  
**Background:** Gray (neutral-50)

**3 Steps:**

1. **Scope & Drawings** - Review requirements and technical drawings
2. **Fabrication** - Precision manufacturing in-house
3. **QA & Delivery** - Testing and on-time delivery

**Features:**

- Horizontal connecting line (desktop only)
- Numbered circles (01, 02, 03) with brand color background
- Staggered reveal animation
- Mobile: Vertical with down arrows
- Desktop: Horizontal with connecting line

**Visual Structure:**

```
[01] ————— [02] ————— [03]
Step 1      Step 2      Step 3
```

**CSS for Connecting Line:**

```tsx
<div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-brand via-brand to-brand hidden md:block -z-10">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/50 to-transparent"></div>
</div>
```

---

### 5. Logo Marquee

**Component:** `LogoMarquee`  
**Data Source:** `/content/logos.json`

**Features:**

- Infinite horizontal scroll
- Triple logos for seamless loop
- Grayscale by default, color on hover
- Gradient fade on edges

**Logos:**

- Siemens
- Schneider Electric
- ABB
- Eaton
- Legrand
- Clipsal
- Hager
- NHP

**Animation:**

```css
.animate-marquee {
  animation: marquee 30s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

**Heading:**

```tsx
<FadeY className="text-center mb-12">
  <Heading level={2}>Trusted By Industry Leaders</Heading>
  <Text>We partner with the world's leading...</Text>
</FadeY>
```

---

### 6. Testimonials

**Component:** `Testimonials`  
**Data Source:** `/content/testimonials.json`  
**Background:** Gray (neutral-50)

**Features:**

- Embla carousel
- Autoplay (6-second delay)
- 5 client testimonials
- Star ratings, author, position, company

**Testimonials Include:**

1. Michael Chen - Industrial Manufacturing Co.
2. Sarah Williams - Tech Infrastructure Inc.
3. David Thompson - Commercial Property Group
4. Dr. Jennifer Martinez - Metropolitan Health Services
5. Robert Anderson - Mining Operations Ltd.

**Heading:**

```tsx
<FadeY className="text-center mb-16">
  <Heading level={2}>What Our Clients Say</Heading>
  <Text>Don't just take our word for it...</Text>
</FadeY>
```

---

### 7. Blog Cards

**Component:** `BlogCards`  
**Data Source:** `/content/posts/*.json`

**Features:**

- Shows latest 3 blog posts
- Grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Staggered FadeY animations (150ms delay each)
- "View All Articles" button

**Blog Posts:**

1. Welcome to Virtue Enclosure Systems
2. Custom Switchboard Solutions
3. Powder Coating Excellence
4. Quality Testing Standards

**Implementation:**

```tsx
const posts = getAllPosts().slice(0, 3);

{
  posts.map((post, index) => (
    <FadeY key={post.slug} delay={index * 0.15}>
      <BlogCard post={post} />
    </FadeY>
  ));
}
```

**Heading:**

```tsx
<FadeY className="text-center mb-16">
  <Heading level={2}>Latest Insights</Heading>
  <Text>Industry news, technical guides...</Text>
</FadeY>
```

---

### 8. Big CTA Section

**Background:** Dark (neutral-900)  
**Spacing:** xl (extra large vertical padding)

**Features:**

- Centered content, max-width 4xl
- Main heading: "Request a Quote"
- Supporting text about file upload (DWG/DXF)
- Two CTA buttons:
  1. Primary: "Request a Quote"
  2. White: "Upload Drawings (DWG/DXF)"
- Contact info grid (3 columns):
  - Phone: +1 (555) 123-4567
  - Email: info@virtueenclosures.com
  - Response Time: Within 24 Hours

**Staggered Animation:**

```tsx
<FadeY>Heading</FadeY>
<FadeY delay={0.2}>Description</FadeY>
<FadeY delay={0.4}>Buttons</FadeY>
<FadeY delay={0.6}>Contact Info</FadeY>
```

**Full Implementation:**

```tsx
<Section spacing="xl" background="dark">
  <Container>
    <div className="max-w-4xl mx-auto text-center">
      <FadeY>
        <Heading level={2} className="mb-6 text-white">
          Request a Quote
        </Heading>
      </FadeY>

      <FadeY delay={0.2}>
        <Text size="body-lg" className="mb-12 text-neutral-300">
          Upload your technical drawings (DWG/DXF) and we'll provide a detailed
          quote within 24 hours.
        </Text>
      </FadeY>

      <FadeY delay={0.4}>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" size="xl">
            Request a Quote
          </Button>
          <Button variant="white" size="xl">
            Upload Drawings
          </Button>
        </div>
      </FadeY>

      <FadeY delay={0.6}>
        <div className="grid md:grid-cols-3 gap-8 pt-12 border-t">
          {/* Contact info */}
        </div>
      </FadeY>
    </div>
  </Container>
</Section>
```

---

## Animation System

### FadeY Wrapper

All section headings and content are wrapped in `<FadeY>`:

```tsx
<FadeY>
  <Heading level={2}>Section Title</Heading>
</FadeY>

<FadeY delay={0.2}>
  <Text>Section description</Text>
</FadeY>
```

**Default Behavior:**

- Initial: `opacity: 0, y: 24px`
- Animate: `opacity: 1, y: 0`
- Duration: `0.6s`
- Viewport: `{ once: true, margin: "-100px" }`

### Staggered Delays

Common delay patterns:

```tsx
// Section headers
delay={0}      // First element

// Multiple items in sequence
delay={0.15}   // Second item
delay={0.3}    // Third item
delay={0.45}   // Fourth item

// CTA sections
delay={0.2}    // Description after heading
delay={0.4}    // Buttons after description
delay={0.6}    // Additional info
```

---

## Responsive Design

### Breakpoints

```tsx
// Mobile first
grid - cols - 1; // Default (mobile)
md: grid - cols - 2; // Tablet (768px+)
lg: grid - cols - 3; // Desktop (1024px+)
```

### Section Spacing

```tsx
spacing = "lg"; // Default sections (16-24-32 vertical padding)
spacing = "xl"; // CTA section (24-32-48 vertical padding)
```

### Background Alternation

```
Hero           - Dark
Stats          - Gray
Services       - White
Process        - Gray
Logo Marquee   - White
Testimonials   - Gray
Blog           - White
CTA            - Dark
```

---

## Data Sources

### Content Files

1. **Services:** `/content/services.json` - 6 services
2. **Testimonials:** `/content/testimonials.json` - 5 testimonials
3. **Logos:** `/content/logos.json` - 8 partner logos
4. **Blog Posts:** `/content/posts/*.json` - 4 posts

### Adding New Content

**New Service:**

```json
{
  "slug": "service-slug",
  "title": "Service Title",
  "description": "Short description",
  "icon": "🔧",
  "longDescription": "Detailed description",
  "features": ["Feature 1", "Feature 2"]
}
```

**New Testimonial:**

```json
{
  "id": "6",
  "content": "Testimonial text...",
  "author": "Name",
  "position": "Title",
  "company": "Company Name",
  "rating": 5
}
```

**New Blog Post:**
Create `/content/posts/new-post.json`:

```json
{
  "slug": "new-post",
  "title": "Post Title",
  "excerpt": "Brief description",
  "date": "2024-01-15",
  "author": "Author Name",
  "category": "Category",
  "featured": true,
  "image": "/images/blog/image.jpg",
  "content": "Full post content..."
}
```

---

## Component Dependencies

```
Homepage
├── HeroCarousel
│   ├── EmblaCarousel
│   ├── FadeY animations
│   └── staggerContainer/staggerItem
├── StatCounter
│   └── react-countup + Framer Motion useInView
├── ServicesSlider
│   ├── EmblaCarousel
│   └── ServiceCard
├── ProcessSteps
│   ├── FadeY
│   └── Stagger animations
├── LogoMarquee
│   └── CSS marquee animation
├── Testimonials
│   ├── EmblaCarousel
│   └── TestimonialCard
├── BlogCards
│   ├── FadeY (per card)
│   └── BlogCard
└── CTA Section
    └── Multiple FadeY wrappers
```

---

## Performance Optimizations

### Lazy Loading

- All images should use Next.js `<Image>` component
- Blog posts: Only load 3 latest
- Services: Load all 6 (small dataset)

### Animation Performance

- Uses `viewport={{ once: true }}` - animations only trigger once
- GPU-accelerated properties (opacity, transform)
- Stagger delays keep total animation time reasonable

### Carousel Performance

- Embla uses native scroll performance
- Autoplay pauses when tab not visible
- Images should be optimized (< 500KB each)

---

## SEO Considerations

### Meta Data

```tsx
export const metadata = {
  title: "Virtue Enclosure Systems | Switchboard Manufacturing Excellence",
  description:
    "Leading manufacturer of custom switchboards, MSB, MDB, and electrical enclosures...",
};
```

### Heading Hierarchy

```
H1: Hero carousel titles (3 instances)
H2: Section headings (8 instances)
H3: Service/blog/testimonial card titles
H4+: As needed in content
```

### Semantic HTML

- `<Section>` renders `<section>`
- Proper heading levels
- Alt text on all images
- Accessible navigation

---

## Testing Checklist

### Functionality

- [ ] Hero carousel auto-rotates every 7 seconds
- [ ] Stat counters trigger on scroll
- [ ] Services slider navigation works
- [ ] Process steps display correctly
- [ ] Logo marquee scrolls continuously
- [ ] Testimonials carousel works
- [ ] Blog cards load 3 latest posts
- [ ] CTA buttons link correctly

### Responsive

- [ ] Mobile menu works
- [ ] All sections stack properly on mobile
- [ ] Touch scrolling works on carousels
- [ ] Images display correctly all sizes
- [ ] Text remains readable on small screens

### Performance

- [ ] Page load < 3 seconds
- [ ] Animations smooth (60fps)
- [ ] No layout shift (CLS)
- [ ] Images optimized
- [ ] No console errors

### Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Sufficient color contrast
- [ ] Focus states visible
- [ ] ARIA labels present

---

## Next Steps

1. **Add Real Content:**
   - Replace placeholder images
   - Update contact information
   - Add actual client testimonials
   - Write real blog posts

2. **Optimize Images:**
   - Convert to WebP format
   - Implement Next.js Image component
   - Add loading="lazy" where appropriate

3. **Test Performance:**
   - Run Lighthouse audit
   - Test on slow 3G connection
   - Check Core Web Vitals

4. **Analytics Setup:**
   - Add Google Analytics
   - Track carousel interactions
   - Monitor CTA click rates
   - A/B test hero slides

---

Ready to launch! 🚀
