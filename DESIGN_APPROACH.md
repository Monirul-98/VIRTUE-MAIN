# Design Approach - VES Website

## 🎨 Design Inspiration: "Kontrix-Style" UX

This document clarifies the design approach for the Virtue Enclosure Systems website, inspired by the Kontrix Webflow template's **UX patterns and animation philosophy** while maintaining our own implementation and design system.

---

## ⚠️ Important: What "Like Kontrix" Means

**✅ What We Take:**
- UX patterns and layout rhythms
- Animation philosophy and timing
- Section sequencing logic
- Interactive micro-interactions
- Visual hierarchy principles

**❌ What We DON'T Copy:**
- HTML structure or CSS code
- Webflow-specific implementations
- Their exact color schemes
- Their specific content
- Their component library

**✨ Our Approach:**
Recreate the **feeling and flow** using our own:
- Next.js App Router components
- Tailwind CSS utility classes
- Framer Motion animations
- Custom design tokens
- Feature-based architecture

---

## 🏗️ Hero Section - "Kontrix-Style" Implementation

### Design Pattern

**Full-Bleed Visual Carousel:**
- Large, impactful hero images
- Slide content with staggered entrance animations
- Clean typography hierarchy
- Dual CTA buttons (primary + secondary)
- Navigation controls (arrows + dots)
- Smooth slide transitions

### Our Implementation

```typescript:54:169:ves-site/components/core/hero-carousel.tsx
  return (
    <section 
      className="relative bg-neutral-900 text-white overflow-hidden"
      aria-label="Hero carousel"
    >
      <EmblaCarousel
        loop
        align="center"
        autoplay={{ delay: 7000, stopOnInteraction: false }}
        onSelect={setCurrentSlide}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)] py-16">
              {/* Left Content */}
              <Container className="lg:pl-12">
                <AnimatePresence mode="wait">
                  {currentSlide === index && (
                    <motion.div
                      key={`slide-${slide.id}`}
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="max-w-2xl"
                    >
                      {/* Eyebrow */}
                      <motion.div variants={staggerItem}>
                        <Badge
                          variant="brand-light"
                          size="md"
                          className="mb-6"
                        >
                          {slide.eyebrow}
                        </Badge>
                      </motion.div>

                      {/* Heading */}
                      <motion.div variants={staggerItem}>
                        <Heading
                          level={1}
                          className="mb-2 text-white text-balance"
                        >
                          {slide.title}
                        </Heading>
                      </motion.div>

                      <motion.div variants={staggerItem}>
                        <p className="text-2xl md:text-3xl font-semibold text-brand mb-6">
                          {slide.subtitle}
                        </p>
                      </motion.div>

                      {/* Description */}
                      <motion.div variants={staggerItem}>
                        <Text
                          size="body-lg"
                          className="mb-8 text-neutral-300 max-w-xl"
                        >
                          {slide.description}
                        </Text>
                      </motion.div>

                      {/* CTAs */}
                      <motion.div
                        variants={staggerItem}
                        className="flex flex-wrap gap-4"
                      >
                        <Link href={slide.cta1.href}>
                          <Button variant="primary" size="lg">
                            {slide.cta1.text}
                          </Button>
                        </Link>
                        <Link href={slide.cta2.href}>
                          <Button variant="white" size="lg">
                            {slide.cta2.text}
                          </Button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Container>

              {/* Right Image */}
              <div className="hidden lg:block relative px-12">
                <AnimatePresence mode="wait">
                  {currentSlide === index && (
                    <motion.div
                      key={`image-${slide.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                      className="relative aspect-[4/3] w-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent rounded-3xl z-10 pointer-events-none" />
                      <Image
                        src={slide.image}
                        alt={`${slide.title} - ${slide.description}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover rounded-3xl shadow-soft-lg"
                        priority={index === 0}
                      />
                      {/* Decorative border */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-brand/20 z-20 pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Gradient overlay for mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900 lg:hidden pointer-events-none" />
          </div>
        ))}
      </EmblaCarousel>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
    </section>
  );
```

**Key Features:**
- ✅ Full-viewport hero with min-height
- ✅ Staggered content animations (0.15s delays)
- ✅ Dual CTAs (primary + secondary)
- ✅ Navigation arrows + dots
- ✅ Smooth slide transitions (AnimatePresence)
- ✅ Large, impactful imagery
- ✅ Clean typography hierarchy (eyebrow → headline → subtitle → description)

---

## 📐 Section Order & Rhythm

### "Kontrix-Style" Page Flow

```
1. Hero Carousel     → Full-bleed, impactful entry
2. Stats/Counters    → Build credibility immediately
3. Services Slider   → Showcase offerings with interactions
4. Process Steps     → Explain methodology
5. Logo Marquee      → Social proof (clients/partners)
6. Testimonials      → Trust building
7. Blog/Insights     → Thought leadership
8. CTA Section       → Strong conversion focus
9. Footer            → Comprehensive navigation
```

### Our Implementation

```typescript:14:164:ves-site/app/(site)/page.tsx
export default function HomePage() {
  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Section */}
      <Section spacing="lg" background="gray">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCounter end={450} suffix="+" label="Projects Delivered" />
            <StatCounter end={14} label="Avg Lead Time (days)" />
            <StatCounter end={98} suffix="%" label="On-time Delivery" />
            <StatCounter end={25} suffix="+" label="Years in Business" />
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section spacing="lg">
        <Container>
          <FadeY className="text-center mb-16">
            <Heading level={2} className="mb-4">
              Our Services
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto">
              Comprehensive switchboard and enclosure solutions from design to delivery
            </Text>
          </FadeY>
          <ServicesSlider />
        </Container>
      </Section>

      {/* Process Steps */}
      <Section spacing="lg" background="gray">
        <Container>
          <ProcessSteps />
        </Container>
      </Section>

      {/* Logo Marquee */}
      <Section spacing="lg">
        <Container>
          <FadeY className="text-center mb-12">
            <Heading level={2} className="mb-4">
              Trusted By Industry Leaders
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto">
              We partner with the world's leading electrical component manufacturers
            </Text>
          </FadeY>
          <LogoMarquee />
        </Container>
      </Section>

      {/* Testimonials */}
      <Section spacing="lg" background="gray">
        <Container>
          <FadeY className="text-center mb-16">
            <Heading level={2} className="mb-4">
              What Our Clients Say
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </Text>
          </FadeY>
          <Testimonials />
        </Container>
      </Section>

      {/* Blog Section */}
      <Section spacing="lg">
        <Container>
          <FadeY className="text-center mb-16">
            <Heading level={2} className="mb-4">
              Latest Insights
            </Heading>
            <Text size="body-lg" className="max-w-2xl mx-auto">
              Industry news, technical guides, and company updates
            </Text>
          </FadeY>
          <BlogCards />
        </Container>
      </Section>

      {/* Big CTA Section */}
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
                Upload your technical drawings (DWG/DXF) and we'll provide a detailed quote within 24 hours. 
                Or contact us to discuss your project requirements.
              </Text>
            </FadeY>

            <FadeY delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a href="/contact">
                  <Button variant="primary" size="xl">
                    Request a Quote
                  </Button>
                </a>
                <a href="/contact">
                  <Button variant="white" size="xl">
                    Upload Drawings (DWG/DXF)
                  </Button>
                </a>
              </div>
            </FadeY>

            <FadeY delay={0.6}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-neutral-800">
                <div>
                  <div className="text-4xl mb-3">📞</div>
                  <Text className="text-neutral-400 text-sm mb-1">Call Us</Text>
                  <a 
                    href="tel:+61397945555" 
                    className="text-white hover:text-brand transition-colors font-semibold"
                  >
                    +61 3 9794 5555
                  </a>
                </div>
                <div>
                  <div className="text-4xl mb-3">✉️</div>
                  <Text className="text-neutral-400 text-sm mb-1">Email Us</Text>
                  <a 
                    href="mailto:info@virtueenclosures.com.au" 
                    className="text-white hover:text-brand transition-colors font-semibold"
                  >
                    info@virtueenclosures.com.au
                  </a>
                </div>
                <div>
                  <div className="text-4xl mb-3">⏱️</div>
                  <Text className="text-neutral-400 text-sm mb-1">Response Time</Text>
                  <p className="text-white font-semibold">Within 24 Hours</p>
                </div>
              </div>
            </FadeY>
          </div>
        </Container>
      </Section>
    </>
  );
}
```

**Rhythm Pattern:**
- ✅ Dark hero → Light stats → White services → Gray process
- ✅ Alternating backgrounds for visual rhythm
- ✅ Generous spacing between sections
- ✅ Clear visual hierarchy
- ✅ Strong CTA before footer

---

## 🎭 Motion Design Palette

### Animation Philosophy

**Principle:** Subtle, purposeful, performant

**Three Categories:**

#### 1. Scroll-Triggered Reveals

**Pattern:** Elements fade in and translate up as they enter viewport

```typescript:17:40:ves-site/components/core/reveal.tsx
export function FadeY({
  children,
  delay = 0,
  duration = 0.6,
  className,
  asChild = false,
}: RevealProps) {
  const fadeYVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  const MotionComponent = asChild ? motion(Slot) : motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeYVariants}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
```

**Timing:**
- Duration: 0.6s
- Easing: Custom cubic-bezier [0.25, 0.4, 0.25, 1]
- Distance: 24px translate Y
- Trigger: -100px before viewport

#### 2. Hover Micro-Interactions

**Card Hover:**
```typescript
// Card lifts and shows shadow
<div className="transition-all duration-300 hover:translate-y-[-4px] hover:shadow-soft-lg">
```

**Button Hover:**
```typescript
// Button lifts slightly
<button className="transition-all duration-200 hover:translate-y-[-2px] hover:shadow-soft">
```

**Image Hover:**
```typescript
// Image scales subtly
<div className="overflow-hidden">
  <Image className="transition-transform duration-500 hover:scale-105" />
</div>
```

**Logo Marquee:**
```typescript
// Logos desaturate, pause on hover
<div className="group">
  <div className="animate-marquee group-hover:[animation-play-state:paused]">
    <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
```

#### 3. Carousel Transitions

**Slide Content Stagger:**
```typescript:11:14:ves-site/lib/animations.ts
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};
```

**Timing:**
- Stagger delay: 0.15s between children
- Initial delay: 0.1s before first child
- Each item: 0.6s duration

**What We DON'T Use:**
- ❌ Heavy parallax scrolling
- ❌ Excessive motion
- ❌ Disorienting 3D transforms
- ❌ Auto-playing videos
- ❌ Distracting particles/effects

---

## 🎨 Visual Tone

### "Clean Industrial" Aesthetic

**Design Principles:**

1. **Generous White Space**
   ```typescript
   // Large padding and margins
   <Section spacing="lg">  // py-16 md:py-24
   <Container>            // max-w-7xl mx-auto px-6
   ```

2. **Bold Typography**
   ```typescript
   // Large, confident headings
   <Heading level={1}>    // text-5xl md:text-7xl font-bold
   <Heading level={2}>    // text-4xl md:text-5xl font-bold
   ```

3. **Industrial Colors**
   ```css
   /* Neutral base with brand accent */
   --neutral-900: #171717;  /* Dark backgrounds */
   --neutral-50: #fafafa;   /* Light backgrounds */
   --brand: #e85d27;        /* Industrial orange */
   ```

4. **Clean Layout Grid**
   ```typescript
   // Consistent grid patterns
   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
   ```

5. **Minimal Decorations**
   - Subtle shadows (shadow-soft)
   - Rounded corners (rounded-2xl = 16px)
   - Border accents (border-neutral-200)
   - No heavy textures or patterns

### Our Design System

```typescript:1:47:ves-site/tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 4px 16px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
```

---

## 📏 Spacing & Rhythm

### Vertical Rhythm

**Section Spacing:**
```typescript
// Section component with consistent vertical rhythm
spacing="sm"   // py-8  md:py-12
spacing="md"   // py-12 md:py-16
spacing="lg"   // py-16 md:py-24
spacing="xl"   // py-20 md:py-32
```

**Container Width:**
```typescript
// Max-width constraints
<Container>              // max-w-7xl (1280px)
<Container narrow>       // max-w-4xl (896px)
```

**Element Spacing:**
```typescript
// Consistent gaps
gap-4   // 16px - tight elements
gap-6   // 24px - related elements
gap-8   // 32px - section elements
gap-12  // 48px - major sections
gap-16  // 64px - section headers
```

### Horizontal Rhythm

**Grid Systems:**
```typescript
// 2-column split
grid-cols-1 md:grid-cols-2

// 3-column cards
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// 4-column stats
grid-cols-2 md:grid-cols-4
```

---

## 🎯 Interactive Elements

### Micro-Interactions

**Buttons:**
```typescript
// Lift on hover, smooth transitions
className="transition-all duration-200 hover:translate-y-[-2px] hover:shadow-soft"
```

**Cards:**
```typescript
// Subtle lift, shadow increase
className="transition-all duration-300 hover:translate-y-[-4px] hover:shadow-soft-lg"
```

**Images:**
```typescript
// Zoom on hover (contained overflow)
<div className="overflow-hidden rounded-2xl">
  <Image className="transition-transform duration-500 hover:scale-105" />
</div>
```

**Links:**
```typescript
// Color shift, no underline by default
className="text-neutral-600 hover:text-brand transition-colors duration-200"
```

**Carousel Controls:**
```typescript
// Scale up on hover
className="transition-all hover:scale-110"
```

---

## ✅ Implementation Checklist

### Hero Section
- [x] Full-bleed visual carousel
- [x] Staggered content animations
- [x] Eyebrow + Headline + Subtitle + Description hierarchy
- [x] Dual CTAs (primary + secondary)
- [x] Navigation arrows + dots
- [x] Smooth slide transitions (0.6s)
- [x] Mobile responsive

### Section Order
- [x] Hero → Stats → Services → Process → Logos → Testimonials → Blog → CTA → Footer
- [x] Alternating backgrounds (white/gray/dark)
- [x] Generous section spacing (py-16 md:py-24)
- [x] Consistent container widths

### Motion Design
- [x] Scroll reveals (FadeY component)
- [x] Hover micro-interactions (cards, buttons, images)
- [x] Carousel stagger animations (0.15s delays)
- [x] Logo marquee infinite scroll + pause
- [x] Smooth, purposeful timing (0.6s standard)
- [x] No heavy parallax or excessive motion

### Visual Design
- [x] Clean industrial aesthetic
- [x] Generous white space
- [x] Bold typography (5xl-7xl headings)
- [x] Neutral color base + brand accent
- [x] Minimal decorations (subtle shadows, rounded corners)
- [x] Consistent grid systems

---

## 🚫 What We Avoid

**Unlike some Webflow templates, we DON'T:**

- ❌ Copy HTML/CSS structure
- ❌ Use Webflow-specific classes
- ❌ Implement heavy parallax effects
- ❌ Add unnecessary animations
- ❌ Use excessive decorative elements
- ❌ Create layout-heavy components
- ❌ Ignore accessibility
- ❌ Sacrifice performance for effects

**Instead, we:**

- ✅ Build with Next.js best practices
- ✅ Use semantic HTML
- ✅ Implement with Tailwind utilities
- ✅ Prioritize accessibility
- ✅ Optimize for performance
- ✅ Keep animations purposeful
- ✅ Maintain clean code structure

---

## 📐 Design Token Reference

### Colors
```css
/* Brand */
--brand: #e85d27;

/* Neutrals */
--neutral-50: #fafafa;
--neutral-100: #f5f5f5;
--neutral-200: #e5e5e5;
--neutral-600: #525252;
--neutral-900: #171717;
```

### Typography Scale
```css
/* Headings */
text-7xl: 72px / 1.1
text-6xl: 60px / 1.1
text-5xl: 48px / 1.1
text-4xl: 36px / 1.2
text-3xl: 30px / 1.3
text-2xl: 24px / 1.3

/* Body */
text-xl: 20px / 1.5
text-lg: 18px / 1.6
text-base: 16px / 1.6
text-sm: 14px / 1.5
```

### Spacing Scale
```css
4:  16px
6:  24px
8:  32px
12: 48px
16: 64px
24: 96px
32: 128px
```

### Animation Timing
```css
/* Durations */
duration-200: 200ms  /* Quick hover */
duration-300: 300ms  /* Card hover */
duration-500: 500ms  /* Image zoom */
duration-600: 600ms  /* Standard reveal */

/* Easing */
ease: cubic-bezier(0.25, 0.4, 0.25, 1)  /* Custom smooth */
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)  /* Tailwind default */
```

---

## 🎓 Summary

**Design Philosophy:**
"Kontrix-inspired UX with our own implementation"

**Key Principles:**
1. **Hero-first** - Strong, visual entry point
2. **Rhythm** - Predictable section flow
3. **Subtle motion** - Purposeful, not distracting
4. **Clean industrial** - Professional, spacious, bold
5. **Custom implementation** - Built with our tools, our way

**Result:**
A modern, professional website that **feels** like high-quality Webflow templates but is **built** with Next.js best practices, Tailwind CSS, and production-ready code.

---

**This is the VES design approach: Inspired by great UX, implemented our way.** ✨

