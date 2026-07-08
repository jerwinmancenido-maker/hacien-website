import type { MetadataRoute } from "next";
import { categories, products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { insights } from "@/data/insights";

const baseUrl = "https://haciensolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/about/company-profile",
    "/solutions",
    "/technology",
    "/platform",
    "/products",
    "/industries",
    "/quote",
    "/access",
    "/customer-workspace",
    "/contact",
    "/support",
    "/track",
    "/faq",
    "/help",
    "/search",
    "/trust-center",
    "/insights",
    "/privacy",
    "/terms",
    "/legal",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...solutions.map((solution) => ({
      url: `${baseUrl}/solutions/${solution.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...categories.map((category) => ({
      url: `${baseUrl}/products/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.categorySlug}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...insights.map((insight) => ({
      url: `${baseUrl}/insights/${insight.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
