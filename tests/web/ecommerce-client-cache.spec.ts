import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

describe("erp ecommerce-client cache mode", () => {
  const originalFetch = globalThis.fetch;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn(async () =>
      Response.json({
        items: [],
        item: {
          id: "p1",
          publicationId: "pub1",
          slug: "erp-only-widget",
          sku: "SKU-1",
          name: "ERP Only Widget",
          description: null,
          category: "ERP Only Category",
          isAvailable: true,
          purchaseMode: "rfq",
          checkoutEnabled: false,
          manualPaymentEnabled: false,
          sandboxPaymentEnabled: false,
          currency: "PHP",
          price: null,
          image: null,
          specs: null,
        },
        success: true,
        message: "ok",
      }),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    process.env.HACIEN_ECOMMERCE_API_URL = "http://127.0.0.1:4199/api/v1";
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.resetModules();
  });

  it("listErpCatalog and getErpCatalogProduct use next.revalidate 300", async () => {
    const { listErpCatalog, getErpCatalogProduct } = await import(
      "@/lib/erp/ecommerce-client"
    );

    await listErpCatalog();
    await getErpCatalogProduct("erp-only-widget");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    for (const [, init] of fetchMock.mock.calls) {
      expect(init).toMatchObject({ next: { revalidate: 300 } });
      expect(init.cache).toBeUndefined();
    }
  });

  it("signup and order-intent POSTs stay on cache no-store", async () => {
    const { requestCustomerSignup, createOrderIntent } = await import(
      "@/lib/erp/ecommerce-client"
    );

    await requestCustomerSignup({
      contactName: "Test Buyer",
      email: "buyer@example.com",
      organizationName: "Example Org",
    });
    await createOrderIntent({
      customerEmail: "buyer@example.com",
      organizationName: "Example Org",
      paymentMode: "manual",
      items: [
        {
          productId: "p1",
          publicationId: "pub1",
          name: "ERP Only Widget",
          quantity: 1,
        },
      ],
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    for (const [, init] of fetchMock.mock.calls) {
      expect(init.method).toBe("POST");
      expect(init.cache).toBe("no-store");
      expect(init.next).toBeUndefined();
    }
  });
});
