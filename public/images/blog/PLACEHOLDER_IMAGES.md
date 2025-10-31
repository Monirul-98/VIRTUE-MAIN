# Placeholder Images for Blog Posts

This directory (`/public/images/blog/`) is for placeholder images used across the Blog section of the Virtue Enclosure Systems website.

## Cover Images for Blog Posts

These images are used as the main visual for each blog post card on the `/blog` page and as the hero image on individual blog post pages (`/blog/[slug]`).

- **Recommended Dimensions:** `1600px` width x `900px` height (16:9 aspect ratio)
- **File Size:** Keep under `250KB` for web optimization.
- **Format:** JPG or WebP preferred.

**Required Images:**

### Current Blog Posts

- `msb-vs-mdb.jpg` - For "Understanding MSB vs MDB" article
  - Suggested content: Switchboard comparison, electrical panel, or technical diagram
- `powder-coating.jpg` - For "Benefits of Powder Coating" article
  - Suggested content: Powder coating process, coated enclosure, or before/after comparison
- `custom-enclosure.jpg` - For "Custom Enclosure Design Guide" article
  - Suggested content: CAD design, custom fabrication, or finished custom enclosure

### Default/Fallback Image

- `default-cover.jpg` - Fallback image for posts without specified cover
  - Suggested content: VES facility, workshop, or branded imagery

---

## Image Content Suggestions

For authentic blog post imagery:

**Cover Images should showcase:**

- High-quality, professional photography
- Relevant to article topic
- Good contrast for overlaid text (category badge)
- Clean, well-lit composition
- On-brand color palette

**Technical Content:**

- Equipment in use (switchboards, enclosures)
- Manufacturing processes (fabrication, assembly)
- Testing and quality control
- Installation work
- Finished products in real environments

**Avoid:**

- Stock photos that look generic
- Low-resolution images
- Cluttered or busy compositions
- Images with heavy text overlay (conflicts with UI)

---

## Image Optimization

Before adding images:

1. **Resize** to recommended dimensions
2. **Compress** using tools like TinyPNG or ImageOptim
3. **Format** as JPG for photos, WebP for best compression
4. **Test** on different screen sizes

---

**Note:** Using `next/image` component will automatically optimize these images for different screen sizes, lazy load them, and serve them in modern formats like WebP when supported by the browser.
