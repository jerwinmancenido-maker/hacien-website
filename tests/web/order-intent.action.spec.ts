import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/erp/ecommerce-client", () => ({
  createOrderIntent: vi.fn(),
}));

import { submitOrderIntent } from "@/app/actions/order-intent";
import { createOrderIntent } from "@/lib/erp/ecommerce-client";

const mockedCreateOrderIntent = vi.mocked(createOrderIntent);

function makeFormData(values: Record<string, string | undefined>) {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined) formData.append(key, value);
  });

  return formData;
}

describe("submitOrderIntent", () => {
  beforeEach(() => {
    mockedCreateOrderIntent.mockReset();
  });

  it("forwards optional anti-spam payload when present", async () => {
    mockedCreateOrderIntent.mockResolvedValue({
      success: true,
      message: "Order intent submitted.",
    });

    const antiSpamVerification = {
      status: "PASSED",
      score: 0.92,
      passed: true,
    };

    await submitOrderIntent(
      makeFormData({
        customerEmail: "buyer@example.com",
        organizationName: "ACME Inc",
        productId: "prod-manual-1",
        publicationId: "pub-123",
        name: "Manual Checkout SKU",
        quantity: "1",
        sourceUrl: "/product/manual-1",
        turnstileToken: "cf-token-abc",
        antiSpamVerification: JSON.stringify(antiSpamVerification),
      }),
    );

    expect(mockedCreateOrderIntent).toHaveBeenCalledTimes(1);

    const [{ turnstileToken, antiSpamVerification: submittedAntiSpam }] =
      mockedCreateOrderIntent.mock.calls[0] as Array<Record<string, unknown>>;

    expect(turnstileToken).toBe("cf-token-abc");
    expect(submittedAntiSpam).toEqual(antiSpamVerification);
  });

  it("does not require anti-spam fields when absent", async () => {
    mockedCreateOrderIntent.mockResolvedValue({
      success: true,
      message: "Order intent submitted.",
    });

    await submitOrderIntent(
      makeFormData({
        customerEmail: "buyer@example.com",
        organizationName: "ACME Inc",
        productId: "prod-manual-1",
        publicationId: "pub-123",
        name: "Manual Checkout SKU",
        quantity: "1",
      }),
    );

    expect(mockedCreateOrderIntent).toHaveBeenCalledTimes(1);

    const [{ turnstileToken, antiSpamVerification }] =
      mockedCreateOrderIntent.mock.calls[0] as Array<Record<string, unknown>>;

    expect(turnstileToken).toBeUndefined();
    expect(antiSpamVerification).toBeUndefined();
  });

  it("fails when anti-spam metadata JSON is invalid", async () => {
    const result = await submitOrderIntent(
      makeFormData({
        customerEmail: "buyer@example.com",
        organizationName: "ACME Inc",
        productId: "prod-manual-1",
        publicationId: "pub-123",
        name: "Manual Checkout SKU",
        quantity: "1",
        antiSpamVerification: "{not-valid-json",
      }),
    );

    expect(result).toEqual({
      success: false,
      message: "Anti-spam metadata format is invalid.",
    });
    expect(mockedCreateOrderIntent).not.toHaveBeenCalled();
  });
});
