import type { MetadataRoute } from "next";
import { categories, products } from "@/data/products";
import { solutions } from "@/data/solutions";

const baseUrl = "https://haciensolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/solutions",
    "/products",
    "/quote",
    "/government-procurement",
    "/contact",
    "/erp-platform",
    "/privacy",
    "/terms",
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
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
