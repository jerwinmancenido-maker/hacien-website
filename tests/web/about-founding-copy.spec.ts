import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const seo = readFileSync("lib/cms/seo.ts", "utf8");
const content = readFileSync("lib/cms/content.ts", "utf8");
const band = readFileSync("components/EnterpriseImagery.tsx", "utf8");

describe("about founding copy (owner decision: no date, no registration details)", () => {
  it("contains no founding-year or registration-detail copy", () => {
    for (const source of [seo, content, band]) {
      expect(source).not.toContain("Started in 2026");
      expect(source).not.toContain("Founded in 2026");
      expect(source).not.toContain("DTI registered June 2026");
      expect(source).not.toContain("BIR-registered and PhilGEPS-registered");
    }
  });

  it("uses the approved neutral About wording", () => {
    expect(content).toContain('title: "About HACIEN."');
    // REQ-WEB-RESTYLE-001: mock v5 approves the heading-period removal on the
    // home page only — the band renders "About HACIEN" (no trailing period).
    expect(band).toContain("About HACIEN");
    expect(band).not.toContain("About HACIEN.");
  });
});
