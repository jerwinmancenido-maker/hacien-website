import { describe, expect, it } from "vitest";

import type { ErpCatalogProduct } from "@/lib/erp/ecommerce-types";
import { erpCatalogProductToWebsiteProduct } from "@/lib/erp/catalog-products";

function catalogProduct(image: string | null): ErpCatalogProduct {
  return {
    id: "erp-1",
    publicationId: "pub-1",
    slug: "sample-laptop",
    sku: "SKU-1",
    name: "Sample Laptop",
    description: "A published laptop.",
    category: "Computers & Laptops",
    isAvailable: true,
    purchaseMode: "rfq",
    checkoutEnabled: false,
    manualPaymentEnabled: false,
    sandboxPaymentEnabled: false,
    currency: "PHP",
    price: null,
    image,
    specs: null,
  };
}

describe("ERP product photos", () => {
  it("keeps a same-origin photo", () => {
    expect(erpCatalogProductToWebsiteProduct(catalogProduct("/photos/laptop.jpg")).image).toBe("/photos/laptop.jpg");
  });

  it("drops remote and empty photos that the image policy cannot show", () => {
    expect(erpCatalogProductToWebsiteProduct(catalogProduct("https://cdn.example/laptop.jpg")).image).toBeUndefined();
    expect(erpCatalogProductToWebsiteProduct(catalogProduct("http://cdn.example/laptop.jpg")).image).toBeUndefined();
    expect(erpCatalogProductToWebsiteProduct(catalogProduct("//cdn.example/laptop.jpg")).image).toBeUndefined();
    expect(erpCatalogProductToWebsiteProduct(catalogProduct(null)).image).toBeUndefined();
    expect(erpCatalogProductToWebsiteProduct(catalogProduct("  ")).image).toBeUndefined();
  });
});
