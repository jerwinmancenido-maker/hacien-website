import { describe, expect, it } from "vitest";

import nextConfig from "@/next.config";

describe("www redirect (F15)", () => {
  it("configures host redirect from www.haciensolutions.com to https://haciensolutions.com", async () => {
    expect(nextConfig.redirects).toBeDefined();
    const redirects = await nextConfig.redirects!();
    expect(redirects).toContainEqual({
      source: "/:path*",
      has: [{ type: "host", value: "www.haciensolutions.com" }],
      destination: "https://haciensolutions.com/:path*",
      permanent: true,
    });
  });
});
