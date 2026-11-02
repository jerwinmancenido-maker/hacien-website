import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import billingSettings from "@/config/billing-compliance-settings.json";

const ROOT = process.cwd();

describe("Quote validity copy conformance", () => {
  it("/quote content includes 'A quotation is valid for 15 days unless the quotation states otherwise.'", () => {
    // 1. Check billing compliance settings configuration feeding /quote
    expect(billingSettings.quote_validity_badge_label).toBe("Quotation validity");
    expect(billingSettings.quote_validity_disclaimer).toBe(
      "A quotation is valid for 15 days unless the quotation states otherwise.",
    );

    // 2. Check /quote page source mounts QuoteCart
    const quotePageSource = readFileSync(path.join(ROOT, "app/quote/page.tsx"), "utf8");
    expect(quotePageSource).toContain("<QuoteCart");

    // 3. Check QuoteCart renders billingSettings.quote_validity_badge_label and quote_validity_disclaimer
    const quoteCartSource = readFileSync(path.join(ROOT, "components/QuoteCart.tsx"), "utf8");
    expect(quoteCartSource).toContain("billingSettings.quote_validity_badge_label");
    expect(quoteCartSource).toContain("billingSettings.quote_validity_disclaimer");

    // 4. Verify no old 'set by document' or 'does not set a default validity' phrasing remains in billing settings
    expect(billingSettings.quote_validity_badge_label).not.toMatch(/set by document/i);
    expect(billingSettings.quote_validity_disclaimer).not.toMatch(/does not set a default validity/i);
  });
});
