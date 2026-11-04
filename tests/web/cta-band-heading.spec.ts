import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const band = readFileSync("components/CTABand.tsx", "utf8");

describe("CTA band heading (clipped heading fix)", () => {
  it("gives the Archivo Black heading relaxed line-height so tall glyphs are not clipped", () => {
    expect(band).toContain("leading-snug");
    expect(band).toContain(
      '<h2 className="font-display text-2xl leading-snug tracking-tight sm:text-3xl">',
    );
  });

  it("keeps the banner structure unchanged", () => {
    expect(band).toContain("overflow-hidden");
    expect(band).toContain("Request a Quote");
  });
});
