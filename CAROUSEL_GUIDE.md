# Carousel Components Documentation

Complete guide to the Embla carousel system for Virtue Enclosure Systems website.

## Components Overview

### 1. `EmblaCarousel` - Generic Wrapper

Reusable carousel component with full control over navigation and autoplay.

### 2. `HeroCarousel` - Hero Section

Specialized hero carousel with staggered Framer Motion animations.

---

## Generic Embla Carousel

**Location:** `components/core/embla-carousel.tsx`

### Features

✅ Loop support  
✅ Alignment options (start, center, end)  
✅ Autoplay with configurable delay  
✅ Navigation arrows  
✅ Dot indicators  
✅ onSelect callback  
✅ Fully typed with TypeScript

### Props

```tsx
interface EmblaCarouselProps {
  children: React.ReactNode[]; // Slides (required)
  loop?: boolean; // Loop slides (default: true)
  align?: "start" | "center" | "end"; // Slide alignment (default: "center")
  autoplay?:
    | boolean
    | {
        // Autoplay configuration
        delay?: number; // Delay between slides in ms (default: 5000)
        stopOnInteraction?: boolean; // Stop on user interaction (default: true)
      };
  showDots?: boolean; // Show dot indicators (default: true)
  showArrows?: boolean; // Show prev/next arrows (default: true)
  className?: string; // Additional CSS classes
  onSelect?: (index: number) => void; // Callback when slide changes
}
```

### Basic Usage

```tsx
import EmblaCarousel from "@/components/core/embla-carousel";

export function SimpleCarousel() {
  return (
    <EmblaCarousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </EmblaCarousel>
  );
}
```

### With Autoplay

```tsx
<EmblaCarousel autoplay>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</EmblaCarousel>

// Custom autoplay settings
<EmblaCarousel
  autoplay={{ delay: 8000, stopOnInteraction: false }}
>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</EmblaCarousel>
```

### Without Loop

```tsx
<EmblaCarousel loop={false}>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</EmblaCarousel>
```

### With Callback

```tsx
function MyCarousel() {
  const handleSlideChange = (index: number) => {
    console.log("Current slide:", index);
    // Trigger animations, load data, etc.
  };

  return (
    <EmblaCarousel onSelect={handleSlideChange}>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </EmblaCarousel>
  );
}
```

### Hide Navigation

```tsx
// No arrows
<EmblaCarousel showArrows={false}>
  ...
</EmblaCarousel>

// No dots
<EmblaCarousel showDots={false}>
  ...
</EmblaCarousel>

// Clean (no navigation)
<EmblaCarousel showArrows={false} showDots={false}>
  ...
</EmblaCarousel>
```

### Alignment Options

```tsx
// Align slides to start
<EmblaCarousel align="start">
  ...
</EmblaCarousel>

// Center alignment (default)
<EmblaCarousel align="center">
  ...
</EmblaCarousel>

// Align slides to end
<EmblaCarousel align="end">
  ...
</EmblaCarousel>
```

---

## Hero Carousel

**Location:** `components/core/hero-carousel.tsx`

### Features

✅ Full-screen hero slides  
✅ Staggered Framer Motion animations  
✅ Left content, right image layout  
✅ Eyebrow badge, heading, subtitle, description  
✅ Two CTA buttons per slide  
✅ 7-second autoplay (doesn't stop on interaction)  
✅ Image animations on slide change  
✅ Responsive design

### Slide Structure

Each slide contains:

1. **Eyebrow** - Small badge above the title
2. **Title** - Large H1 heading
3. **Subtitle** - Emphasized subheading (brand color)
4. **Description** - Supporting paragraph
5. **CTA 1** - Primary action button
6. **CTA 2** - Secondary action button
7. **Image** - Right-side hero image (rounded-3xl with shadow)

### Current Slides

#### Slide 1: Custom Switchboard Enclosures

```
Eyebrow: "Australian Standard Compliance"
Title: "Custom Switchboard Enclosures"
Subtitle: "Built to Australian Standards"
Description: "Precision-engineered MSB and MDB solutions..."
CTA 1: "View Services" → /services
CTA 2: "Request a Quote" → /contact
Image: /images/hero-switchboard.jpg
```

#### Slide 2: Fabrication & Powder Coating

```
Eyebrow: "Complete In-House Solutions"
Title: "Fabrication & Powder Coating"
Subtitle: "End-to-end in one shop"
Description: "From initial fabrication to final powder coating..."
CTA 1: "Our Process" → /services
CTA 2: "Get Started" → /contact
Image: /images/hero-fabrication.jpg
```

#### Slide 3: On-time Site Delivery

```
Eyebrow: "Victoria-Wide Delivery"
Title: "On-time Site Delivery"
Subtitle: "Proven lead times across Victoria"
Description: "Reliable scheduling and delivery you can count on..."
CTA 1: "View Projects" → /projects
CTA 2: "Contact Us" → /contact
Image: /images/hero-delivery.jpg
```

### Usage

```tsx
import HeroCarousel from "@/components/core/hero-carousel";

export default function HomePage() {
  return (
    <div>
      <HeroCarousel />
      {/* Rest of page content */}
    </div>
  );
}
```

### Customizing Slides

Edit the `slides` array in `hero-carousel.tsx`:

```tsx
const slides = [
  {
    id: 1,
    eyebrow: "Your Eyebrow Text",
    title: "Your Main Heading",
    subtitle: "Your Subtitle",
    description: "Your supporting paragraph text goes here...",
    cta1: { text: "Button Text", href: "/link" },
    cta2: { text: "Button Text", href: "/link" },
    image: "/images/your-image.jpg",
  },
  // Add more slides...
];
```

### Animation Details

**Content Animation:**

- Uses staggered Framer Motion variants
- Each element (badge, title, subtitle, description, CTAs) animates in sequence
- 150ms stagger delay between elements
- Smooth ease curve for professional feel

**Image Animation:**

- Fades in with scale effect (0.95 → 1.0)
- 600ms duration
- Syncs with content animation

**Timing:**

```
Badge:       0ms
Title:       150ms
Subtitle:    300ms
Description: 450ms
CTAs:        600ms
Image:       0ms (simultaneous with badge)
```

### Responsive Behavior

**Desktop (lg+):**

- 2-column grid layout
- Content left, image right
- Full-height hero section

**Mobile/Tablet:**

- Single column
- Image hidden on mobile
- Gradient overlay for depth
- Content centered

---

## Styling Guide

### Navigation Arrows

```css
/* Current styling */
- White background with 90% opacity
- Soft shadow
- Hover: Scale 110%, full opacity
- Positioned on left/right edges
- Z-index 10 (above content)
```

### Dot Indicators

```css
/* Active dot */
- Width: 32px (w-8)
- Background: White
- Rounded full

/* Inactive dots */
- Width: 8px (w-2)
- Background: White 50% opacity
- Hover: White 75% opacity
- Smooth transition
```

### Hero Image Styling

```tsx
className="w-full h-full object-cover rounded-3xl shadow-soft-lg"

// Additional effects:
- Gradient overlay (brand/20 opacity)
- Decorative border (brand/20 opacity)
- Aspect ratio: 4/3
```

---

## Autoplay Configuration

### Hero Carousel Settings

```tsx
autoplay={{
  delay: 7000,              // 7 seconds per slide
  stopOnInteraction: false  // Continues even after user interaction
}}
```

### Why 7 seconds?

- Enough time to read all content
- Not too fast to be distracting
- Not too slow to lose engagement
- Industry standard for hero carousels

### Why `stopOnInteraction: false`?

- Ensures continuous carousel rotation
- Users can still manually navigate
- Prevents carousel from "stopping" unexpectedly
- Better for engagement metrics

---

## Image Requirements

### Hero Carousel Images

**Recommended Specifications:**

- **Aspect Ratio:** 4:3 (e.g., 1600×1200px)
- **File Format:** JPG or WebP
- **File Size:** < 500KB (optimized)
- **Resolution:** 1600px wide minimum
- **Subject:** Clear focal point, suitable for cropping

**Image Locations:**

```
/public/images/hero-switchboard.jpg
/public/images/hero-fabrication.jpg
/public/images/hero-delivery.jpg
```

**Placeholder Note:**
Currently using placeholder paths. Replace with actual images before launch.

---

## Accessibility Features

### Keyboard Navigation

- Arrows are keyboard accessible
- Dots can be tabbed and activated with Enter/Space
- Proper ARIA labels on all interactive elements

### Screen Readers

```tsx
aria-label="Previous slide"
aria-label="Next slide"
aria-label="Go to slide X"
```

### Focus Management

- Visible focus rings on all interactive elements
- Focus stays on navigation controls after click
- No focus traps

---

## Performance Optimization

### Lazy Loading Images

Consider adding Next.js Image component:

```tsx
import Image from "next/image";

<Image
  src={slide.image}
  alt={slide.title}
  width={1600}
  height={1200}
  className="w-full h-full object-cover rounded-3xl shadow-soft-lg"
  priority={index === 0} // Priority load first slide
/>;
```

### Reduce Animation Jank

- Uses GPU-accelerated properties (opacity, transform)
- AnimatePresence prevents layout shift
- Will-change handled automatically by Framer Motion

### Autoplay Considerations

- Pauses when tab is not visible (browser default)
- Can be disabled for accessibility if needed
- 7-second delay balances performance and UX

---

## Customization Examples

### Product Carousel

```tsx
import EmblaCarousel from "@/components/core/embla-carousel";

function ProductCarousel({ products }) {
  return (
    <EmblaCarousel
      loop
      autoplay={{ delay: 4000 }}
      className="max-w-4xl mx-auto"
    >
      {products.map((product) => (
        <div key={product.id} className="p-8">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      ))}
    </EmblaCarousel>
  );
}
```

### Testimonial Carousel

```tsx
<EmblaCarousel
  align="center"
  autoplay={{ delay: 6000, stopOnInteraction: true }}
  showArrows={false}
>
  {testimonials.map((testimonial) => (
    <div key={testimonial.id} className="text-center p-12">
      <p className="text-xl italic mb-4">"{testimonial.quote}"</p>
      <p className="font-semibold">{testimonial.author}</p>
      <p className="text-sm text-neutral-500">{testimonial.company}</p>
    </div>
  ))}
</EmblaCarousel>
```

### Logo Marquee (Infinite Loop)

```tsx
<EmblaCarousel
  loop
  align="start"
  autoplay={{ delay: 0 }} // Continuous scroll
  showDots={false}
  showArrows={false}
>
  {logos.map((logo) => (
    <div key={logo.id} className="flex-shrink-0 px-8">
      <img src={logo.src} alt={logo.name} className="h-12" />
    </div>
  ))}
</EmblaCarousel>
```

---

## Troubleshooting

### Carousel Not Sliding

**Check:**

1. Do you have multiple children?
2. Is embla-carousel-react installed?
3. Are there any console errors?

### Autoplay Not Working

**Check:**

1. Is autoplay prop set correctly?
2. Is the browser tab visible?
3. Check browser autoplay policies

### Animation Jank

**Solutions:**

1. Reduce number of animated elements
2. Use `will-change` sparingly
3. Optimize images (< 500KB)
4. Check for layout shifts

### Images Not Loading

**Check:**

1. Image paths are correct (relative to /public)
2. Images exist in /public/images
3. File extensions match (case-sensitive)

---

## Browser Support

✅ Chrome/Edge 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Fallback:**
All carousels work without JavaScript (show first slide).

---

## Next Steps

1. **Add Real Images:** Replace placeholder paths with actual project photos
2. **Optimize Images:** Compress and convert to WebP format
3. **A/B Test:** Try different slide copy and CTAs
4. **Analytics:** Track carousel interaction rates
5. **Accessibility Audit:** Test with screen readers

---

Ready to create beautiful, performant carousels! 🎠✨
