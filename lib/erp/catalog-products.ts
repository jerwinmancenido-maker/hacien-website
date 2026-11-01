import type { Product } from "@/data/products";
import { categories } from "@/data/products";
import type { ErpCatalogProduct } from "./ecommerce-types";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function categorySlugForProduct(product: ErpCatalogProduct) {
  const categoryName = product.category || "ERP Catalog";
  const categorySlug = slugify(categoryName);
  return (
    categories.find(
      (category) =>
        category.slug === categorySlug ||
        category.name.toLowerCase() === categoryName.toLowerCase(),
    )?.slug || categorySlug
  );
}

function publicProductImage(image: string | null) {
  const value = image?.trim() ?? "";
  // CSP img-src is 'self'. Remote URLs would render as broken images.
  if (!value.startsWith("/") || value.startsWith("//")) return undefined;
  return value;
}

function specsToRows(product: ErpCatalogProduct) {
  const rows = Object.entries(product.specs || {}).map(([label, value]) => ({
    label,
    value: String(value),
  }));

  return [
    { label: "SKU", value: product.sku || "Provided by ERP" },
    { label: "Category", value: product.category || "ERP published catalog" },
    { label: "Purchase mode", value: product.purchaseMode },
    { label: "Availability", value: product.isAvailable ? "Available for review" : "Unavailable" },
    ...rows,
  ];
}

export function erpCatalogProductToWebsiteProduct(product: ErpCatalogProduct): Product {
  const technicalSpecs = specsToRows(product);
  const specs = technicalSpecs.slice(0, 6).map((row) => `${row.label}: ${row.value}`);

  return {
    id: product.id,
    slug: product.slug,
    categorySlug: categorySlugForProduct(product),
    name: product.name,
    shortDescription:
      product.description ||
      "ERP-published catalog item available for HACIEN review.",
    longDescription:
      product.description ||
      "This ERP-published product can be reviewed through HACIEN before any formal quotation, order intent, payment review, or fulfillment step.",
    specs,
    technicalSpecs,
    procurementNotes:
      "This product is published from HACIEN ERP. Manual payment review and order intent are available only when enabled in the ERP publication settings.",
    unit: "unit",
    availability: "For quotation",
    sku: product.sku,
    erpPublicationId: product.publicationId,
    isErpPublished: true,
    manualPaymentEnabled: product.manualPaymentEnabled,
    sandboxPaymentEnabled: product.sandboxPaymentEnabled,
    purchaseMode: product.purchaseMode,
    priceCents: product.price == null ? undefined : Math.round(product.price * 100),
    currency: product.currency,
    fulfillmentType: "manual",
    inventoryPolicy: product.isAvailable ? "not_tracked" : "rfq_required",
    image: publicProductImage(product.image),
  };
}

export function erpCatalogToWebsiteProducts(products: ErpCatalogProduct[]) {
  return products.map(erpCatalogProductToWebsiteProduct);
}
