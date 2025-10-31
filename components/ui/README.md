# UI Components Documentation

This directory contains the foundational UI components for the Virtue Enclosure Systems website. All components are built with Tailwind CSS, TypeScript, and class-variance-authority for variant management.

## Color System

### Brand Colors (Amber/Orange)

- **Primary Brand**: `bg-brand` / `text-brand` - `#f59e0b` (Amber 500)
- **Light Variant**: `bg-brand-light` / `text-brand-light` - `#fef3c7` (Amber 100)
- **Dark Variant**: `bg-brand-dark` / `text-brand-dark` - `#d97706` (Amber 600)
- **Full Scale**: `brand-50` through `brand-900`

### Neutral Colors

- Full scale from `neutral-50` (lightest) to `neutral-950` (darkest)
- Default text: `neutral-600`
- Headings: `neutral-900`

## Components

### Typography

#### Heading Component

```tsx
import { Heading } from "@/components/ui/typography";

// Usage
<Heading level={1}>Main Title</Heading>
<Heading level={2} className="text-brand">Section Title</Heading>
<Heading level={3}>Subsection</Heading>
```

**Props:**

- `level`: 1-6 (required)
- `as`: Override the HTML tag (e.g., render an h1 styled as h2)
- `className`: Additional Tailwind classes

**Typography Scale:**

- H1: 3.5rem (desktop) / 2.5rem (mobile)
- H2: 2.5rem (desktop) / 2rem (mobile)
- H3: 1.875rem (desktop) / 1.5rem (mobile)

#### Text Component

```tsx
import { Text } from "@/components/ui/typography";

// Usage
<Text>Default body text</Text>
<Text size="body-lg">Large body text</Text>
<Text size="small" muted>Muted small text</Text>
```

**Props:**

- `size`: "body-lg" | "body" | "small" | "tiny"
- `muted`: Boolean - uses lighter gray color
- `as`: "p" | "span" | "div"

#### Lead Component

```tsx
import { Lead } from "@/components/ui/typography";

<Lead>This is an introductory paragraph with larger text.</Lead>;
```

#### Label Component

```tsx
import { Label } from "@/components/ui/typography";

<Label htmlFor="email" required>
  Email Address
</Label>;
```

---

### Container

```tsx
import { Container } from "@/components/ui/container";

// Default (max-w-7xl)
<Container>
  <h1>Content goes here</h1>
</Container>

// Narrow (max-w-5xl)
<Container size="narrow">
  <article>Blog post content</article>
</Container>

// Wide (max-w-[90rem])
<Container size="wide">
  <div>Extra wide content</div>
</Container>

// Full width
<Container size="full">
  <div>No max-width constraint</div>
</Container>
```

**Default Padding:**

- Mobile: `px-6`
- Tablet: `px-8` (sm)
- Desktop: `px-12` (lg)

---

### Button

```tsx
import { Button } from "@/components/ui/button";

// Primary (filled with brand color)
<Button variant="primary">Get Started</Button>

// Outline
<Button variant="outline">Learn More</Button>

// Ghost
<Button variant="ghost">Cancel</Button>

// Secondary (dark background)
<Button variant="secondary">Contact Us</Button>

// White (for dark backgrounds)
<Button variant="white">Download</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium (Default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Loading state
<Button loading>Processing...</Button>

// Disabled
<Button disabled>Disabled</Button>
```

**Button Features:**

- Rounded full by default
- Built-in focus ring with brand color
- Loading spinner animation
- All buttons have hover and active states

---

### Badge

```tsx
import { Badge } from "@/components/ui/badge";

// Variants
<Badge variant="default">Default</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="brand-light">Brand Light</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="outline-brand">Brand Outline</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium (Default)</Badge>
<Badge size="lg">Large</Badge>
```

---

### Section

```tsx
import { Section } from "@/components/ui/section";

// Default spacing and background
<Section>
  <Container>
    <h2>Section Content</h2>
  </Container>
</Section>

// Different spacing
<Section spacing="sm">Small Padding</Section>
<Section spacing="default">Default Padding</Section>
<Section spacing="lg">Large Padding</Section>
<Section spacing="xl">Extra Large Padding</Section>
<Section spacing="none">No Padding</Section>

// Different backgrounds
<Section background="default">White Background</Section>
<Section background="gray">Light Gray Background</Section>
<Section background="brand">Brand Light Background</Section>
<Section background="dark">Dark Background</Section>
```

**Spacing Scale:**

- `sm`: 12-16 (mobile-desktop)
- `default`: 16-24-32 (mobile-tablet-desktop)
- `lg`: 20-28-40
- `xl`: 24-32-48

---

## Design Tokens

### Border Radius

- `rounded-2xl`: 1rem (for cards)
- `rounded-3xl`: 1.5rem
- `rounded-full`: Full circle (for buttons)

### Shadows

- `shadow-soft`: Subtle shadow `0 4px 20px rgba(0, 0, 0, 0.08)`
- `shadow-soft-lg`: Larger soft shadow `0 8px 30px rgba(0, 0, 0, 0.12)`

### Spacing

Custom spacing values:

- `18`: 4.5rem
- `22`: 5.5rem
- `26`: 6.5rem
- `30`: 7.5rem

---

## Animations

All animations are defined in `tailwind.config.ts` and `globals.css`:

- `animate-fade-in`: Fade in effect
- `animate-slide-up`: Slide up with fade
- `animate-slide-in-left`: Slide from left
- `animate-slide-in-right`: Slide from right
- `animate-marquee`: Infinite scroll for logo marquee
- `animate-marquee-scroll`: Alternative marquee with pause on hover

---

## Usage Examples

### Hero Section

```tsx
<Section spacing="xl">
  <Container>
    <Heading level={1} className="mb-6">
      Welcome to Virtue Enclosure Systems
    </Heading>
    <Lead className="mb-8">
      Leading manufacturer of custom switchboards and electrical enclosures
    </Lead>
    <div className="flex gap-4">
      <Button variant="primary" size="lg">
        Get Started
      </Button>
      <Button variant="outline" size="lg">
        Learn More
      </Button>
    </div>
  </Container>
</Section>
```

### Feature Card

```tsx
<div className="bg-white rounded-2xl shadow-soft p-8">
  <Badge variant="brand-light" className="mb-4">
    New
  </Badge>
  <Heading level={3} className="mb-4">
    Custom Fabrication
  </Heading>
  <Text className="mb-6">
    Expert fabrication services for all your switchboard needs.
  </Text>
  <Button variant="ghost">Learn More →</Button>
</div>
```

### Dark Section

```tsx
<Section background="dark" spacing="lg">
  <Container>
    <Heading level={2} className="text-white mb-6">
      Ready to Get Started?
    </Heading>
    <Text className="text-neutral-300 mb-8">
      Contact us today for a free consultation.
    </Text>
    <Button variant="white" size="lg">
      Contact Us
    </Button>
  </Container>
</Section>
```

---

## Best Practices

1. **Consistent Spacing**: Use the Section component for consistent vertical rhythm
2. **Container Usage**: Always wrap content in Container for proper max-width and padding
3. **Typography Hierarchy**: Use proper heading levels (don't skip levels)
4. **Color Contrast**: Ensure text has sufficient contrast on backgrounds
5. **Responsive Design**: All components are mobile-first and responsive
6. **Accessibility**: Components include proper ARIA attributes and keyboard support

---

## Utility Classes

### Custom Classes (defined in globals.css)

```css
/* Container helper */
.container-custom {
  @apply max-w-7xl mx-auto px-6 sm:px-8 lg:px-12;
}

/* Text balance for headings */
.text-balance {
  text-wrap: balance;
}
```

### Usage

```tsx
<h1 className="text-balance">This heading will have balanced text wrapping</h1>
```
