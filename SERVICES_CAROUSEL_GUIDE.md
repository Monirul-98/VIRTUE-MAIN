# Services Carousel Implementation Guide

## Overview
A sophisticated services carousel component inspired by Kontrix design, featuring Embla Carousel with Framer Motion animations. This component showcases services with staggered text animations and overlay effects.

## Architecture

### Files Structure
```
components/
  core/
    embla-base.tsx           # Generic Embla carousel wrapper
    services-carousel.tsx    # Services-specific carousel with animations
lib/
  animations.ts             # Animation variants and utilities
content/
  services.json            # Services data
```

## Components

### 1. EmblaBase (`components/core/embla-base.tsx`)
Generic carousel wrapper with full accessibility support.

**Features:**
- Arrows positioned inside or outside the frame
- Navigation dots below carousel
- Keyboard navigation (Arrow Left/Right)
- Mouse/touch drag support
- Full ARIA accessibility
- Responsive slide sizing

**Props:**
```typescript
interface EmblaBaseProps {
  children: React.ReactNode[];
  loop?: boolean;                    // Default: true
  align?: "start" | "center" | "end"; // Default: "center"
  showDots?: boolean;                // Default: true
  showArrows?: boolean;              // Default: true
  arrowsPosition?: "inside" | "outside"; // Default: "outside"
  className?: string;
  slideClassName?: string;
  onSelect?: (index: number) => void;
  "aria-label"?: string;
}
```

**Example Usage:**
```tsx
<EmblaBase
  loop={true}
  arrowsPosition="outside"
  onSelect={(index) => console.log('Active slide:', index)}
>
  <div>Slide 1</div>
  <div>Slide 2</div>
</EmblaBase>
```

### 2. ServicesCarousel (`components/core/services-carousel.tsx`)
Main services carousel with Kontrix-style animations.

**Features:**
- Staggered text animations (0.08s delay)
- Image overlay fade-in effect
- Responsive image sizing (390×451 aspect ratio)
- Reduced motion support
- Auto-triggers animation when slide is active and in view
- Hover effects (lift card, scale image)

**Animation Details:**
- **Text Animation:** `fadeUp100` - Slides up from below (100% Y translation) with fade
- **Stagger:** `kontrixStagger` - 0.08s delay between children
- **Overlay:** `overlayIn` - Fades in with 30% Y translation to 60% opacity

**Responsive Sizing:**
- Mobile: max-w-[360px]
- Tablet: max-w-[360px]
- Desktop: max-w-[390px]
- Aspect ratio: 390/451
- Slide heights: 600px (mobile) → 650px (tablet) → 700px (desktop)

## Animation Variants

### New Variants in `lib/animations.ts`

#### 1. `fadeUp100` - Kontrix Text Animation
```typescript
{
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}
```

#### 2. `overlayIn` - Image Overlay Effect
```typescript
{
  hidden: { opacity: 0, y: "30%" },
  visible: { opacity: 0.6, y: 0, transition: { duration: 0.8 } }
}
```

#### 3. `kontrixStagger` - Stagger Container
```typescript
{
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
}
```

### Utilities

#### `prefersReducedMotion()` - Check User Preference
```typescript
const reducedMotion = prefersReducedMotion();
// Returns true if user prefers reduced motion
```

#### `withReducedMotion(variants)` - Conditional Animation
```typescript
const motionVariants = withReducedMotion(fadeUp100);
// Returns static variants if reduced motion preferred
```

## Accessibility Features

### ARIA Attributes
- **Carousel region:** `role="region"`, `aria-roledescription="carousel"`
- **Slides:** `aria-roledescription="slide"`, `aria-label="X of Y"`
- **Navigation buttons:** Descriptive `aria-label` attributes
- **Current slide:** `aria-current="true"` on active dot

### Keyboard Navigation
- **Arrow Left:** Previous slide
- **Arrow Right:** Next slide
- **Tab:** Focus navigation buttons
- **Enter/Space:** Activate focused button

### Screen Readers
All interactive elements have proper labels and descriptions for screen reader users.

## Reduced Motion Support

The carousel respects the `prefers-reduced-motion` media query:

**When reduced motion is preferred:**
- Text animations disabled (no Y translation)
- Overlay animations disabled
- Instant opacity transitions
- Carousel still functional with instant transitions

**Implementation:**
```tsx
const reducedMotion = prefersReducedMotion();

<motion.div
  variants={reducedMotion ? undefined : fadeUp100}
  // ...
/>
```

## Styling

### Card Styling
- **Border radius:** `rounded-3xl` (24px)
- **Border:** `border-neutral-200`
- **Shadow:** `shadow-soft` base, `shadow-lg` on hover
- **Hover effect:** `-translate-y-1` (lift up 4px)
- **Transition:** All transitions are smooth with proper easing

### Image Styling
- **Border radius:** `rounded-2xl` (16px)
- **Object fit:** `cover` (fills container, maintains aspect ratio)
- **Hover effect:** `scale-105` (5% zoom on card hover)
- **Transition:** `duration-700` (smooth 700ms scale)

### Navigation Buttons (Arrows)
- **Position:** Outside carousel frame (`-left-16`, `-right-16`)
- **Background:** White with shadow
- **Size:** `p-3` (48×48px)
- **Hover:** `scale-110` (10% larger)
- **Disabled state:** 50% opacity, cursor not-allowed

### Navigation Dots
- **Position:** Below carousel, `mt-8`
- **Active:** `w-8 bg-brand` (pill shape)
- **Inactive:** `w-2 bg-neutral-300` (circle)
- **Hover:** `bg-neutral-400` (darker)

## Content Data Structure

Services are defined in `content/services.json`:

```json
{
  "services": [
    {
      "slug": "design-drafting",
      "title": "Design & Drafting",
      "summary": "Professional CAD engineering...",
      "heroImage": "/images/services/design-drafting.jpg",
      // ... other fields
    }
  ]
}
```

**Required fields for carousel:**
- `slug` - URL slug for linking
- `title` - Main heading
- `summary` - Description paragraph
- `heroImage` - Image path

## Usage in Pages

### Home Page Implementation
```tsx
import ServicesCarousel from "@/components/core/services-carousel";

<Section spacing="lg">
  <Container>
    <FadeY className="text-center mb-16">
      <Heading level={2} className="mb-4">
        Our Services
      </Heading>
      <Text size="body-lg" className="max-w-2xl mx-auto">
        Comprehensive switchboard and enclosure solutions
      </Text>
    </FadeY>
  </Container>
  <ServicesCarousel />
</Section>
```

**Note:** The carousel extends beyond the container for proper arrow positioning.

## Browser Support

- **Modern browsers:** Full support (Chrome, Firefox, Safari, Edge)
- **Touch devices:** Full drag/swipe support
- **Keyboard navigation:** Full support
- **Screen readers:** Full ARIA support
- **Reduced motion:** Respects user preferences

## Performance

### Optimizations
- **Images:** Next.js Image component with optimized loading
- **Animations:** Hardware-accelerated CSS transforms
- **In-view detection:** Only animates when slide is visible
- **Active slide tracking:** Only active slide triggers animations

### Best Practices
- Use WebP images for better compression
- Provide proper image `sizes` attribute
- Lazy load images (Next.js handles this)
- Minimize animation complexity for better performance

## Customization

### Adjust Stagger Timing
```tsx
// In lib/animations.ts
export const kontrixStagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1, // Change from 0.08
      delayChildren: 0.3,   // Change from 0.2
    },
  },
};
```

### Change Slide Heights
```tsx
// In services-carousel.tsx
<div className="h-[700px] md:h-[750px] lg:h-[800px]">
```

### Adjust Image Aspect Ratio
```tsx
// In services-carousel.tsx
<div className="aspect-[16/9]"> // Change from aspect-[390/451]
```

### Change Arrow Position
```tsx
<EmblaBase
  arrowsPosition="inside" // or "outside"
  // ...
/>
```

## Troubleshooting

### Animations Not Playing
- Check `prefersReducedMotion()` - user may have reduced motion enabled
- Verify slide `isActive` prop is updating correctly
- Check `isInView` is triggering (adjust `amount` threshold)

### Carousel Not Scrolling
- Ensure slides have proper `flex-[0_0_100%]` styling
- Check `overflow-hidden` is on viewport container
- Verify Embla is initialized (`emblaApi` not null)

### Images Not Loading
- Verify image paths in `services.json`
- Check Next.js image optimization config
- Ensure images exist in `public/images/services/`

### Arrows Positioned Wrong
- Check `arrowsPosition` prop
- Verify parent container has proper padding/margin
- Adjust `-left-16` / `-right-16` values if needed

## Future Enhancements

Potential improvements:
- [ ] Autoplay with pause on hover
- [ ] Progress bar indicator
- [ ] Vertical carousel option
- [ ] Thumbnail navigation
- [ ] Lazy load slides for performance
- [ ] Swipe gesture indicators

## Related Components

- **EmblaCarousel** - Legacy carousel (can be deprecated)
- **HeroCarousel** - Hero section carousel
- **Testimonials** - Similar carousel pattern
- **LogoMarquee** - Auto-scrolling carousel

---

**Last Updated:** October 30, 2025
**Version:** 1.0.0

