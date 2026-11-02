import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

describe("G17: Hand pointer on all buttons", () => {
  it("defines cursor: pointer for all buttons in app/globals.css", () => {
    const css = readFileSync(path.join(ROOT, "app/globals.css"), "utf8");
    expect(css).toMatch(/button[\s\S]*?cursor:\s*pointer/);
    expect(css).toMatch(/\[role="button"\][\s\S]*?cursor:\s*pointer/);
  });

  it("applies cursor pointer on key interactive action buttons", () => {
    // Add to RFQ in ProductDetail
    const productDetail = readFileSync(path.join(ROOT, "components/ProductDetail.tsx"), "utf8");
    expect(productDetail).toMatch(/Add to RFQ[\s\S]*?cursor-pointer|<button[^>]*cursor-pointer[^>]*>[\s\S]*?Add to RFQ/);

    // Add requirement to RFQ in RequirementBuilder
    const reqBuilder = readFileSync(path.join(ROOT, "components/RequirementBuilder.tsx"), "utf8");
    expect(reqBuilder).toMatch(/<button[^>]*cursor-pointer[^>]*>[\s\S]*?Add requirement to RFQ/);

    // Search button in SearchPage
    const searchPage = readFileSync(path.join(ROOT, "app/search/page.tsx"), "utf8");
    expect(searchPage).toMatch(/<button[^>]*cursor-pointer[^>]*>[\s\S]*?Search/);

    // Track request button in TrackReferenceLookup
    const trackLookup = readFileSync(path.join(ROOT, "components/TrackReferenceLookup.tsx"), "utf8");
    expect(trackLookup).toMatch(/<button[^>]*cursor-pointer[^>]*>[\s\S]*?Track request/);

    // Form send button in QuoteCart
    const quoteCart = readFileSync(path.join(ROOT, "components/QuoteCart.tsx"), "utf8");
    expect(quoteCart).toMatch(/<button[^>]*cursor-pointer[^>]*>[\s\S]*?Request a Quote/);

    // Form send button in ContactForm
    const contactForm = readFileSync(path.join(ROOT, "components/ContactForm.tsx"), "utf8");
    expect(contactForm).toMatch(/<button[^>]*cursor-pointer[^>]*>[\s\S]*?Send Inquiry/);
  });
});
