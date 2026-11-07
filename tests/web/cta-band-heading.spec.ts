import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const band = readFileSync("components/CTABand.tsx", "utf8");

// The band was restyled with the site (chat visual language, 2026-11-07):
// light blue-tint card, plain bold Inter heading. Archivo Black is gone, so
// the old clipped-glyph risk is gone with it — the relaxed line-height stays
// as a guard for tall glyphs at large sizes.
describe("CTA band (site restyle: light card, chat language)", () => {
  it("uses a plain bold heading, not Archivo Black, with relaxed line-height", () => {
    expect(band).toContain("leading-snug");
    expect(band).not.toContain("font-display");
    expect(band).toContain(
      '<h2 className="text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">',
    );
  });

  it("renders as a light rounded card with the same actions", () => {
    expect(band).toContain("bg-blue-tint");
    expect(band).toContain("rounded-3xl");
    expect(band).toContain("rounded-full");
    expect(band).toContain('href="/quote"');
    expect(band).toContain("Request a Quote");
    expect(band).toContain('href="/contact"');
    expect(band).toContain("Contact");
  });
});
