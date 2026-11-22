import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/erp/ecommerce-client", () => ({
  getErpCatalogProduct: vi.fn(),
  listErpCatalog: vi.fn(),
}));

import { generateMetadata as generateCategoryMeta } from "@/app/products/[category]/page";
import { generateMetadata as generateProductMeta } from "@/app/products/[category]/[product]/page";
import { getErpCatalogProduct } from "@/lib/erp/ecommerce-client";

const NOT_FOUND = { digest: "NEXT_HTTP_ERROR_FALLBACK;404" };

describe("product/category generateMetadata 404 status", () => {
  beforeEach(() => {
    vi.mocked(getErpCatalogProduct).mockReset();
    vi.mocked(getErpCatalogProduct).mockRejectedValue(
      new Error("ERP ecommerce request failed: 404"),
    );
  });

  afterEach(() => {
    vi.mocked(getErpCatalogProduct).mockReset();
  });

  it("calls notFound from category metadata when the category is missing", async () => {
    await expect(
      generateCategoryMeta({
        params: Promise.resolve({ category: "no-such-category-cto-smoke" }),
      }),
    ).rejects.toMatchObject(NOT_FOUND);
  });

  it("returns normal metadata for an existing category", async () => {
    const meta = await generateCategoryMeta({
      params: Promise.resolve({ category: "computers-laptops" }),
    });

    expect(meta.title).toBe("Computers and Laptops for Philippine Offices");
    expect(meta.description).toMatch(/business desktops/i);
  });

  it("calls notFound from product metadata when the product is missing", async () => {
    await expect(
      generateProductMeta({
        params: Promise.resolve({
          category: "computers-laptops",
          product: "this-item-does-not-exist-cto-smoke",
        }),
      }),
    ).rejects.toMatchObject(NOT_FOUND);
  });

  it("calls notFound from product metadata when the category is missing", async () => {
    await expect(
      generateProductMeta({
        params: Promise.resolve({
          category: "no-such-category-cto-smoke",
          product: "business-laptop-16gb",
        }),
      }),
    ).rejects.toMatchObject(NOT_FOUND);
  });

  it("returns normal metadata for an existing category/product", async () => {
    const meta = await generateProductMeta({
      params: Promise.resolve({
        category: "computers-laptops",
        product: "business-laptop-16gb",
      }),
    });

    expect(meta.title).toBe("Business Laptop Class");
    expect(meta.description).toMatch(/Business notebook/);
  });

  it("does not turn a transient ERP fetch failure into notFound for a known local product", async () => {
    vi.mocked(getErpCatalogProduct).mockRejectedValue(new Error("ERP down"));

    const meta = await generateProductMeta({
      params: Promise.resolve({
        category: "computers-laptops",
        product: "business-laptop-16gb",
      }),
    });

    expect(meta.title).toBe("Business Laptop Class");
    expect(getErpCatalogProduct).toHaveBeenCalled();
  });
});
