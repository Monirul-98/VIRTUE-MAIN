/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://virtueenclosures.com.au",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/admin/*", "/_next/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
    additionalSitemaps: ["https://virtueenclosures.com.au/sitemap.xml"],
  },
  transform: async (config, path) => {
    // Custom priority based on page importance
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path.startsWith("/services") || path.startsWith("/projects")) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path.startsWith("/blog")) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path === "/about" || path === "/contact") {
      priority = 0.85;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
