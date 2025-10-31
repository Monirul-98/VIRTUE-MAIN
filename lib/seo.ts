import { type Metadata } from "next";

/**
 * VES Site Configuration
 */
export const siteConfig = {
  name: "Virtue Enclosure Systems",
  shortName: "VES",
  description:
    "Leading manufacturer of custom switchboards, MSB, MDB, and electrical enclosures. Complete in-house solutions from design to delivery across Victoria.",
  url: "https://virtueenclosures.com.au",
  ogImage: "/og-image.jpg",
  logo: "/logo.png",
  keywords: [
    "switchboard manufacturer",
    "MSB",
    "MDB",
    "main switchboard",
    "motor distribution board",
    "electrical enclosures",
    "custom fabrication",
    "powder coating",
    "Victoria",
    "Australia",
    "AS/NZS compliant",
    "NATA testing",
  ],
  contact: {
    phone: "+61 3 9794 5555",
    email: "info@virtueenclosures.com.au",
    address: {
      street: "123 Industrial Drive",
      city: "Dandenong",
      state: "VIC",
      postcode: "3175",
      country: "Australia",
    },
  },
};

/**
 * Default metadata for the entire site
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Switchboard Manufacturing Excellence`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Switchboard Manufacturing`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

/**
 * SEO Props Interface
 */
interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/**
 * Generate SEO metadata for individual pages
 * Merges with default metadata
 */
export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  url = "",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: SEOProps): Metadata {
  const ogImage = image || siteConfig.ogImage;
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const allKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_AU",
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Generate JSON-LD structured data
 */
export function generateStructuredData(
  type: string,
  data: Record<string, any>
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
}

/**
 * Organization structured data (for homepage)
 */
export const organizationStructuredData = generateStructuredData(
  "Organization",
  {
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.postcode,
      addressCountry: siteConfig.contact.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "sales",
      email: siteConfig.contact.email,
      areaServed: "AU",
      availableLanguage: "English",
    },
    sameAs: [
      // Add social media URLs here when available
      // "https://www.facebook.com/virtueenclosures",
      // "https://www.linkedin.com/company/virtue-enclosure-systems",
    ],
  }
);

/**
 * Local Business structured data
 */
export const localBusinessStructuredData = generateStructuredData(
  "LocalBusiness",
  {
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.postcode,
      addressCountry: siteConfig.contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      // Add actual coordinates when available
      latitude: -37.9871,
      longitude: 145.1734,
    },
    url: siteConfig.url,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
  }
);

/**
 * Service structured data generator
 */
export function generateServiceStructuredData(service: {
  name: string;
  description: string;
  url: string;
}) {
  return generateStructuredData("Service", {
    "@id": `${siteConfig.url}${service.url}`,
    serviceType: service.name,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "State",
      name: "Victoria",
    },
    description: service.description,
  });
}

/**
 * Product structured data generator
 */
export function generateProductStructuredData(product: {
  name: string;
  description: string;
  image?: string;
  category: string;
}) {
  return generateStructuredData("Product", {
    name: product.name,
    description: product.description,
    image: product.image ? `${siteConfig.url}${product.image}` : undefined,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    category: product.category,
  });
}

/**
 * Article/Blog Post structured data generator
 */
export function generateArticleStructuredData(article: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  return generateStructuredData("Article", {
    headline: article.title,
    description: article.description,
    image: article.image ? `${siteConfig.url}${article.image}` : undefined,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
    url: `${siteConfig.url}${article.url}`,
  });
}

/**
 * Breadcrumb structured data generator
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  return generateStructuredData("BreadcrumbList", {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  });
}
