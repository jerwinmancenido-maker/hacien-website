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
    // Add to my request in ProductDetail
    const productDetail = readFileSync(path.join(ROOT, "components/ProductDetail.tsx"), "utf8");
    expect(productDetail).toMatch(/Add to my request[\s\S]*?cursor-pointer|<button[^>]*cursor-pointer[^>]*>[\s\S]*?Add to my request/);

    // Search button in SearchPage
    const searchPage = readFileSync(path.join(ROOT, "app/search/page.tsx"), "utf8");
    expect(searchPage).toMatch(/<button[^>]*cursor-pointer[^>]*>[\s\S]*?Search/);

    // Track request button in TrackReferenceLookup
    const trackLookup = readFileSync(path.join(ROOT, "components/TrackReferenceLookup.tsx"), "utf8");
    expect(trackLookup).toMatch(/<button[^>]*cursor-pointer[^>]*>[\s\S]*?Track request/);

    // Chat invitation button (the full forms are gone — Step B)
    const chatInvitation = readFileSync(path.join(ROOT, "components/ChatInvitation.tsx"), "utf8");
    expect(chatInvitation).toMatch(/<button[\s\S]*?cursor-pointer[\s\S]*?\{buttonLabel\}/);
    const quotePage = readFileSync(path.join(ROOT, "app/quote/page.tsx"), "utf8");
    expect(quotePage).toContain('buttonLabel="Start a quotation request"');
  });
});
