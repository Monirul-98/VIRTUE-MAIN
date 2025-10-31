# Services Carousel Architecture

## Component Hierarchy

```
ServicesCarousel (services-carousel.tsx)
│
├─ EmblaBase (embla-base.tsx)
│  │
│  ├─ Embla Viewport (overflow-hidden)
│  │  └─ Embla Container (flex)
│  │     └─ Slides (flex-items)
│  │        └─ ServiceSlide (individual slide)
│  │           │
│  │           ├─ Link Wrapper (links to /services/[slug])
│  │           │  └─ Card Container (rounded-3xl, hover effects)
│  │           │     │
│  │           │     ├─ Content Section (z-10, flex-col)
│  │           │     │  │
│  │           │     │  ├─ Text Container (kontrixStagger)
│  │           │     │  │  ├─ Small Heading (fadeUp100) - "Service"
│  │           │     │  │  ├─ Main Title (fadeUp100) - e.g. "Design & Drafting"
│  │           │     │  │  ├─ Description (fadeUp100) - summary text
│  │           │     │  │  └─ Learn More Link (fadeUp100) - with arrow icon
│  │           │     │  │
│  │           │     │  └─ Image Section
│  │           │     │     └─ Image Container (aspect-[390/451])
│  │           │     │        ├─ Next Image (object-cover, scale on hover)
│  │           │     │        └─ Overlay (overlayIn animation, gradient)
│  │
│  ├─ Navigation Arrows (outside frame)
│  │  ├─ Previous Button (-left-16, aria-label, keyboard accessible)
│  │  └─ Next Button (-right-16, aria-label, keyboard accessible)
│  │
│  └─ Navigation Dots (below carousel)
│     └─ Dot Buttons (aria-current for active, click to navigate)
```

## Data Flow

```
content/services.json
       │
       ↓
ServicesCarousel (maps over services)
       │
       ↓
ServiceSlide (receives: title, summary, image, slug, isActive)
       │
       ├─ useInView → checks if slide is visible
       ├─ isActive → checks if slide is currently selected
       └─ shouldAnimate → triggers when both in view AND active
              │
              ↓
       Framer Motion (applies animations)
              │
              ├─ kontrixStagger → stagger container
              │     └─ fadeUp100 → children (heading, title, desc, link)
              │
              └─ overlayIn → image overlay
```

## Animation Flow

```
Slide becomes active (user navigates to it)
       │
       ↓
Slide enters viewport (useInView triggers)
       │
       ↓
shouldAnimate = true
       │
       ↓
┌──────────────────────────────────────┐
│  KONTRIX STAGGER (0.08s delay)       │
│                                       │
│  t=0.0s   → "Service" label         │
│  t=0.08s  → "Design & Drafting"     │
│  t=0.16s  → Description paragraph    │
│  t=0.24s  → "Learn More" link       │
│                                       │
│  (each with fadeUp100 animation)     │
└──────────────────────────────────────┘
       │
       └─ Simultaneously:
          Image Overlay (overlayIn, 0.8s)
```

## Animation Variants in Detail

### fadeUp100 (Text Elements)
```typescript
{
  hidden: {
    opacity: 0,
    y: "100%"  // Below container (hidden by overflow)
  },
  visible: {
    opacity: 1,
    y: 0,      // Slides up to normal position
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1]  // Custom cubic-bezier
    }
  }
}
```

### overlayIn (Image Overlay)
```typescript
{
  hidden: {
    opacity: 0,
    y: "30%"   // Slightly below
  },
  visible: {
    opacity: 0.6,  // Semi-transparent gradient
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]  // Slightly different easing
    }
  }
}
```

### kontrixStagger (Container)
```typescript
{
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,  // 80ms between each child
      delayChildren: 0.2      // Wait 200ms before starting
    }
  }
}
```

## Responsive Breakpoints

```
Mobile (< 768px)
├─ Slide width: 100%
├─ Image max-width: 360px
├─ Slide height: 600px
└─ Padding: 8 (32px)

Tablet (768px - 1024px)
├─ Slide width: 85%
├─ Image max-width: 360px
├─ Slide height: 650px
└─ Padding: 10 (40px)

Desktop (> 1024px)
├─ Slide width: 75%
├─ Image max-width: 390px
├─ Slide height: 700px
└─ Padding: 12 (48px)
```

## State Management

```typescript
// In ServicesCarousel
const [activeIndex, setActiveIndex] = useState(0);
       │
       ↓
EmblaBase (onSelect prop)
       │
       ↓
emblaApi.on("select", handleSelect)
       │
       ↓
setActiveIndex(emblaApi.selectedScrollSnap())
       │
       ↓
ServiceSlide receives isActive={index === activeIndex}
       │
       ↓
Triggers animation when isActive && isInView
```

## Accessibility Features Map

```
<div role="region" aria-roledescription="carousel" aria-label="Services carousel">
  │
  ├─ <div role="list">  // Slide container
  │   └─ <div role="listitem" aria-roledescription="slide" aria-label="1 of 6">
  │
  ├─ <button aria-label="Previous slide" onKeyDown={handleKeyDown}>
  │   └─ <svg aria-hidden="true">  // Decorative icon
  │
  ├─ <button aria-label="Next slide" onKeyDown={handleKeyDown}>
  │   └─ <svg aria-hidden="true">
  │
  └─ <div role="group" aria-label="Carousel navigation">
      └─ <button aria-label="Go to slide 1" aria-current="true">  // Active dot
```

## CSS Classes Structure

```
ServiceSlide
└─ .group.block.h-full  (Link wrapper)
   └─ .relative.h-full.overflow-hidden.rounded-3xl.border...  (Card)
      │
      ├─ .relative.z-10.flex.flex-col.justify-between...  (Content)
      │  │
      │  ├─ motion.div (Stagger container)
      │  │  └─ .space-y-4.overflow-hidden
      │  │     ├─ .overflow-hidden → motion.h3 (.text-sm.font-semibold...)
      │  │     ├─ .overflow-hidden → motion.h4 (.text-3xl.font-bold...)
      │  │     ├─ .overflow-hidden → motion.p (.text-base.text-neutral-600...)
      │  │     └─ .overflow-hidden → motion.span (.inline-flex.items-center...)
      │  │
      │  └─ .relative.mt-8  (Image section)
      │     └─ .relative.w-full.max-w-[390px].aspect-[390/451]...
      │        ├─ .relative.h-full.overflow-hidden.rounded-2xl
      │        │  └─ <Image fill className="object-cover..." />
      │        └─ motion.div (.absolute.inset-0.bg-gradient...)  // Overlay
```

## Performance Optimizations

```
1. In-View Detection
   └─ useInView(ref, { once: true, amount: 0.3 })
      └─ Animation triggers only when 30% visible
      └─ once: true → doesn't re-trigger on scroll back

2. Image Optimization
   └─ Next.js <Image> component
      ├─ Automatic WebP conversion
      ├─ Lazy loading by default
      └─ sizes="(max-width: 768px) 360px, 390px"

3. Conditional Animation
   └─ prefersReducedMotion() check
      └─ Disables animations for users who prefer reduced motion
      └─ Falls back to instant transitions

4. Active Slide Detection
   └─ isActive prop prevents unnecessary re-renders
   └─ Only active slide triggers animations

5. Hardware Acceleration
   └─ CSS transforms (translateY, scale)
      └─ GPU-accelerated, smooth 60fps
```

## Event Flow

```
User Action: Click Next Arrow
       │
       ↓
emblaApi.scrollNext()
       │
       ↓
Embla scrolls to next slide
       │
       ↓
"select" event fires
       │
       ↓
handleSelect() called
       │
       ├─ setSelectedIndex(newIndex)
       ├─ updateButtonState()
       └─ onSelect?.(newIndex)  // Callback to parent
              │
              ↓
       ServicesCarousel receives new index
              │
              ↓
       setActiveIndex(newIndex)
              │
              ↓
       New slide receives isActive={true}
              │
              ↓
       shouldAnimate becomes true
              │
              ↓
       Animations trigger on new slide
```

## Integration Points

### Home Page
```typescript
app/(site)/page.tsx
       │
       ↓
<Section spacing="lg">
  <Container>
    {/* Header content */}
  </Container>
  <ServicesCarousel />  // Outside container for arrow positioning
</Section>
```

### Services Data
```typescript
content/services.json
{
  "services": [
    {
      "slug": "design-drafting",      // Used for link href
      "title": "Design & Drafting",   // Main heading
      "summary": "Professional CAD...", // Description
      "heroImage": "/images/services/...", // Image source
      // ... other fields for detail page
    }
  ]
}
```

### Animation Library
```typescript
lib/animations.ts
       │
       ├─ fadeUp100          // Text slide up
       ├─ overlayIn          // Image overlay
       ├─ kontrixStagger     // Stagger container
       ├─ prefersReducedMotion()  // Utility function
       └─ withReducedMotion()     // HOC for variants
```

---

## Quick Reference

**Component Files:**
- `components/core/services-carousel.tsx` - Main carousel
- `components/core/embla-base.tsx` - Generic carousel wrapper
- `lib/animations.ts` - Animation variants

**Data Source:**
- `content/services.json` - Service data

**Usage:**
- `app/(site)/page.tsx` - Home page integration

**Documentation:**
- `SERVICES_CAROUSEL_GUIDE.md` - Detailed guide
- `SERVICES_CAROUSEL_IMPLEMENTATION_SUMMARY.md` - Implementation summary
- `SERVICES_CAROUSEL_ARCHITECTURE.md` - This file

---

**Last Updated:** October 30, 2025

