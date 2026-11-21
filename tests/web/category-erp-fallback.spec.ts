import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/erp/ecommerce-client", () => ({
  listErpCatalog: vi.fn(),
}));

import ProductCategoryPage from "@/app/products/[category]/page";
import { listErpCatalog } from "@/lib/erp/ecommerce-client";

describe("category getErpProducts failure handling", () => {
  const originalPhase = process.env.NEXT_PHASE;

  beforeEach(() => {
    vi.mocked(listErpCatalog).mockReset();
  });

  afterEach(() => {
    if (originalPhase === undefined) {
      delete process.env.NEXT_PHASE;
    } else {
      process.env.NEXT_PHASE = originalPhase;
    }
  });

  it("returns the local fallback path during production build ([] on ERP failure)", async () => {
    process.env.NEXT_PHASE = "phase-production-build";
    vi.mocked(listErpCatalog).mockRejectedValue(new Error("ERP down"));

    const element = await ProductCategoryPage({
      params: Promise.resolve({ category: "computers-laptops" }),
    });

    expect(element).toBeTruthy();
    expect(listErpCatalog).toHaveBeenCalledTimes(1);
  });

  it("rethrows outside the build so ISR can keep the stale page", async () => {
    delete process.env.NEXT_PHASE;
    vi.mocked(listErpCatalog).mockRejectedValue(new Error("ERP down"));

    await expect(
      ProductCategoryPage({
        params: Promise.resolve({ category: "computers-laptops" }),
      }),
    ).rejects.toThrow("ERP down");
  });
});
