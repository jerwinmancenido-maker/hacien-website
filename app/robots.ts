import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/access",
        "/cms-preview",
        "/customer-workspace",
        "/portal",
        "/login",
        "/signup",
        "/command-center",
        "/api/",
      ],
    },
    sitemap: "https://haciensolutions.com/sitemap.xml",
  };
}
