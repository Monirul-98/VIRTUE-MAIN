# Framer Motion Animations Guide

This document outlines all Framer Motion animations used throughout the Virtue Enclosure Systems website.

---

## Overview

The website uses Framer Motion for smooth, performant animations throughout. All animations follow consistent timing curves and patterns for a cohesive user experience.

---

## 1. FadeY Component (Section Animations)

**File:** `components/core/reveal.tsx`

### Usage

The `FadeY` component is used for section headings, paragraphs, and images with a vertical fade effect.

**Animation Behavior:**

```
opacity: 0 → 1
translateY: 24px → 0
duration: 0.6s
easing: cubic-bezier(0.25, 0.4, 0.25, 1)
```

**Implementation:**

```tsx
import { FadeY } from "@/components/core/reveal";

// Basic usage
<FadeY>
  <Heading level={2}>Section Heading</Heading>
</FadeY>

// With delay
<FadeY delay={0.2}>
  <Text>Paragraph content</Text>
</FadeY>

// With custom duration
<FadeY duration={0.8}>
  <img src="/image.jpg" alt="Description" />
</FadeY>

// Using asChild to animate the child element directly
<FadeY asChild>
  <button>Animated Button</button>
</FadeY>
```

**Props:**

```typescript
interface FadeYProps {
  children: React.ReactNode;
  delay?: number; // Default: 0
  duration?: number; // Default: 0.6
  className?: string; // Additional CSS classes
  asChild?: boolean; // Use Slot for direct child animation
}
```

**Features:**

- ✅ Triggers when element enters viewport
- ✅ Uses `whileInView` with `-100px` margin
- ✅ Animates only once (`once: true`)
- ✅ Smooth cubic-bezier easing
- ✅ Viewport-aware (starts before fully visible)

**Viewport Configuration:**

```typescript
viewport={{ once: true, margin: "-100px" }}
```

This means animation starts when element is 100px before entering viewport.

---

## 2. Carousel Stagger Animations

**File:** `components/core/hero-carousel.tsx`

### Usage

When a carousel slide becomes active, child elements stagger in with delays.

**Animation Behavior:**

```
Stagger delay: 0.15s between each child
Initial delay: 0.1s before first child
Each child: opacity 0→1, y 24px→0 in 0.6s
```

**Implementation:**

```tsx
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

<AnimatePresence mode="wait">
  {currentSlide === index && (
    <motion.div
      key={`slide-${id}`}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Child 1 - Animates first */}
      <motion.div variants={staggerItem}>
        <Badge>Eyebrow Text</Badge>
      </motion.div>

      {/* Child 2 - Animates 0.15s after Child 1 */}
      <motion.div variants={staggerItem}>
        <Heading>Main Title</Heading>
      </motion.div>

      {/* Child 3 - Animates 0.15s after Child 2 */}
      <motion.div variants={staggerItem}>
        <Text>Description text</Text>
      </motion.div>

      {/* Child 4 - Animates 0.15s after Child 3 */}
      <motion.div variants={staggerItem}>
        <Button>Call to Action</Button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>;
```

**Custom Stagger Delays:**

```tsx
import { createStaggerVariants } from "@/lib/animations";

// Create custom stagger with 0.1s delay
const customStagger = createStaggerVariants(0.1, 0.05);

<motion.div variants={customStagger}>
  {/* Children will stagger with 0.1s delay */}
</motion.div>;
```

**Available Options:**

- `staggerChildren: 0.05` - Very fast stagger
- `staggerChildren: 0.1` - Fast stagger
- `staggerChildren: 0.15` - Default (balanced)
- `staggerChildren: 0.2` - Slow stagger

---

## 3. Counter Animations (Trigger When Visible)

**File:** `components/core/stat-counter.tsx`

### Usage

Numbers count up when they enter the viewport using `react-countup` with Framer Motion's `useInView`.

**Animation Behavior:**

```
Triggers: When element enters viewport
Duration: 2 seconds (default)
Once: true (doesn't repeat)
Start: 0
End: Specified number
```

**Implementation:**

```tsx
import StatCounter from "@/components/core/stat-counter";

<StatCounter
  end={500}
  suffix="+"
  label="Projects Completed"
  duration={2}
/>

<StatCounter
  end={98}
  suffix="%"
  label="Client Satisfaction"
/>

<StatCounter
  end={25}
  prefix="$"
  suffix="M"
  label="Revenue Generated"
/>
```

**Props:**

```typescript
interface StatCounterProps {
  end: number; // Final number
  suffix?: string; // Text after number (e.g., "+", "%")
  prefix?: string; // Text before number (e.g., "$")
  label: string; // Description below number
  duration?: number; // Animation duration (default: 2)
}
```

**Features:**

- ✅ Uses Framer Motion's `useInView` hook
- ✅ Only triggers once when visible
- ✅ Smooth counting animation
- ✅ Customizable duration
- ✅ Supports prefixes and suffixes

**Internal Implementation:**

```tsx
const ref = useRef(null);
const isInView = useInView(ref, { once: true });

return (
  <div ref={ref}>
    {isInView && <CountUp start={0} end={end} duration={duration} />}
  </div>
);
```

---

## 4. Logo Marquee (Infinite Scroll with Pause on Hover)

**File:** `components/core/logo-marquee.tsx`

### Usage

Infinite horizontal scrolling logo animation that pauses when user hovers.

**Animation Behavior:**

```
Animation: keyframes translateX loop
Direction: Left to right (continuous)
Speed: 30 seconds for full cycle
Pause: On hover (animation-play-state: paused)
```

**Implementation:**

```tsx
import LogoMarquee from "@/components/core/logo-marquee";

<LogoMarquee />;
```

**CSS Keyframes:**

```css
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

**Tailwind Config:**

```typescript
// tailwind.config.ts
animation: {
  'marquee': 'marquee 30s linear infinite',
}
```

**HTML Structure:**

```tsx
<div className="group">
  {" "}
  {/* Parent with group class */}
  <div
    className="
    animate-marquee 
    group-hover:[animation-play-state:paused]
  "
  >
    {/* Logo items */}
  </div>
</div>
```

**Features:**

- ✅ Seamless infinite loop (logos tripled)
- ✅ Pauses on hover (smooth, no jump)
- ✅ Gradient fade on edges
- ✅ Individual logo hover effects (grayscale → color)
- ✅ Performant (CSS animations, GPU-accelerated)

**Hover States:**

- **Container hover**: Pauses entire animation
- **Individual logo hover**: Removes grayscale, increases opacity

---

## 5. FAQ Accordion (Height Animation)

**File:** `components/core/faq.tsx`

### Usage

Smooth accordion animation using Framer Motion's `AnimatePresence` for height transitions.

**Animation Behavior:**

```
initial: { height: 0, opacity: 0 }
animate: { height: "auto", opacity: 1 }
exit: { height: 0, opacity: 0 }
duration: 0.3s
easing: cubic-bezier(0.04, 0.62, 0.23, 0.98)
```

**Implementation:**

```tsx
import { motion, AnimatePresence } from "framer-motion";

const [openIndex, setOpenIndex] = useState<number | null>(null);

<AnimatePresence initial={false}>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      }}
      className="overflow-hidden"
    >
      <div className="p-6">{/* Content */}</div>
    </motion.div>
  )}
</AnimatePresence>;
```

**Key Attributes:**

- `initial={false}`: Prevents animation on mount
- `height: "auto"`: Automatically calculates content height
- `overflow-hidden`: Required for height animation
- `ease: [0.04, 0.62, 0.23, 0.98]`: Smooth easing curve

**Features:**

- ✅ Smooth expand/collapse
- ✅ No layout shift
- ✅ Handles dynamic content height
- ✅ Opacity fade during transition
- ✅ Works with multiple accordions

**Icon Rotation:**

```tsx
<svg className={cn("transition-transform", isOpen && "rotate-180")}>
  {/* Chevron down icon */}
</svg>
```

---

## 6. Button Micro-Interactions

**Files:** Various button components

### Hover Effects

**Lift + Shadow Animation:**

```tsx
<motion.button
  whileHover={{
    y: -2,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
  }}
  transition={{ duration: 0.2 }}
>
  Button Text
</motion.button>
```

**Or using Tailwind classes:**

```tsx
<button
  className="
  transition-all 
  duration-300
  hover:-translate-y-1 
  hover:shadow-soft-lg
"
>
  Button Text
</button>
```

### Tap Effects

**Scale Down on Click:**

```tsx
<motion.button whileTap={{ scale: 0.95 }} transition={{ duration: 0.1 }}>
  Submit
</motion.button>
```

### Combined Effects

**Hover + Tap:**

```tsx
<motion.button
  whileHover={{
    y: -2,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Interactive Button
</motion.button>
```

---

## 7. Card Hover Transformations

**Files:** All card components in `components/cards/`

### Card Lift Effect

```tsx
<Link
  className="
  group 
  transition-all 
  hover:-translate-y-1 
  hover:shadow-soft-lg
"
>
  {/* Card content */}
</Link>
```

### Image Scale on Hover

```tsx
<div className="overflow-hidden">
  <img
    className="
    transition-transform 
    duration-500
    group-hover:scale-105
  "
  />
</div>
```

### Complete Card Animation

```tsx
<Link
  className="
  group 
  block 
  rounded-2xl 
  border 
  shadow-soft
  transition-all 
  duration-300
  hover:-translate-y-1 
  hover:shadow-soft-lg
  hover:border-neutral-300
"
>
  <div className="relative overflow-hidden">
    <Image
      className="
        transition-transform 
        duration-500 
        group-hover:scale-105
      "
    />
  </div>
  <div className="p-6">
    <h3
      className="
      transition-colors 
      group-hover:text-brand
    "
    >
      Title
    </h3>
  </div>
</Link>
```

---

## Animation Library Reference

**File:** `lib/animations.ts`

### Available Variants

**1. fadeIn**

```typescript
hidden: {
  opacity: 0;
}
visible: {
  opacity: 1;
}
```

**2. slideUp**

```typescript
hidden: { opacity: 0, y: 24 }
visible: { opacity: 1, y: 0 }
```

**3. slideDown**

```typescript
hidden: { opacity: 0, y: -20 }
visible: { opacity: 1, y: 0 }
```

**4. slideLeft**

```typescript
hidden: { opacity: 0, x: -20 }
visible: { opacity: 1, x: 0 }
```

**5. slideRight**

```typescript
hidden: { opacity: 0, x: 20 }
visible: { opacity: 1, x: 0 }
```

**6. scale**

```typescript
hidden: { opacity: 0, scale: 0.8 }
visible: { opacity: 1, scale: 1 }
```

**7. staggerContainer**

```typescript
hidden: { opacity: 1 }
visible: {
  opacity: 1,
  staggerChildren: 0.15,
  delayChildren: 0.1
}
```

**8. staggerItem**

```typescript
hidden: { opacity: 0, y: 24 }
visible: {
  opacity: 1,
  y: 0,
  duration: 0.6
}
```

### Transition Presets

```typescript
// Default smooth transition
defaultTransition: {
  duration: 0.6,
  ease: [0.25, 0.4, 0.25, 1]
}

// Quick transition (buttons, hovers)
quickTransition: {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1]
}

// Smooth transition (large movements)
smoothTransition: {
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96]
}

// Spring transition (bouncy effects)
springTransition: {
  type: "spring",
  stiffness: 100,
  damping: 15
}

// Carousel transition
carouselTransition: {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1]
}
```

---

## Best Practices

### 1. Performance

- ✅ Use CSS transforms (translate, scale, rotate) over position changes
- ✅ Avoid animating `width`, `height`, `top`, `left`
- ✅ Use `will-change` sparingly
- ✅ Batch animations where possible

### 2. Timing

- ✅ Quick interactions: 0.2-0.3s
- ✅ Standard reveals: 0.4-0.6s
- ✅ Large movements: 0.6-0.8s
- ✅ Stagger delays: 0.05-0.15s

### 3. Easing

- ✅ Use ease-out for entrances
- ✅ Use ease-in for exits
- ✅ Use ease-in-out for continuous motion
- ✅ Custom cubic-bezier for brand feel

### 4. Accessibility

- ✅ Respect `prefers-reduced-motion`
- ✅ Keep animations subtle (don't distract)
- ✅ Ensure keyboard navigation works
- ✅ Don't hide content with animations

### 5. Testing

- ✅ Test on slower devices
- ✅ Check animation smoothness
- ✅ Verify animations don't block interaction
- ✅ Test with reduced motion enabled

---

## Common Patterns

### Page Section Reveal

```tsx
<Section>
  <FadeY>
    <Heading>Section Title</Heading>
  </FadeY>
  <FadeY delay={0.2}>
    <Text>Description</Text>
  </FadeY>
  <FadeY delay={0.4}>
    <Button>Call to Action</Button>
  </FadeY>
</Section>
```

### Grid Items Stagger

```tsx
<div className="grid md:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <FadeY key={item.id} delay={index * 0.1}>
      <Card {...item} />
    </FadeY>
  ))}
</div>
```

### Modal/Dialog Enter

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Modal content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## Summary

All animations across the Virtue Enclosure Systems website follow these principles:

✅ **Consistent Timing**: 0.6s for reveals, 0.3s for interactions  
✅ **Smooth Easing**: Custom cubic-bezier curves  
✅ **Performance**: GPU-accelerated transforms  
✅ **Accessibility**: Respects user preferences  
✅ **Viewport Aware**: Triggers before fully visible  
✅ **Stagger Effects**: 0.05-0.15s delays  
✅ **Pause on Hover**: For carousels/marquees  
✅ **Height Animations**: Using auto with Framer Motion

All components are **production-ready** and optimized for performance! 🚀
