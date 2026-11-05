import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import faqData from "@/config/faq-data.json";

const ROOT = process.cwd();

function read(rel: string) {
  return readFileSync(path.join(ROOT, rel), "utf8");
}

// Live-site fixes, 2026-11-05 (owner: "fix all").
// Source-test pattern: assertions are on the source that ships.

describe("Live-site fixes", () => {
  it("Technology Cloud and Software cards do not reuse the hero image", () => {
    const page = read("app/technology/page.tsx");
    // Hero uses "silicon"; the priority-grid mapping must give Cloud and
    // Software different keys. "silicon", "cloud" and "knowledge" all alias
    // to /images/workspace.jpg in lib/cms/media.ts, so reusing any of them
    // repeats the hero photo on the same page.
    const mapping = page.match(/const technologyImages[\s\S]*?};/)?.[0] ?? "";
    expect(mapping).toContain('Cloud: "commandCenter"');
    expect(mapping).toContain('Software: "office"');
    expect(mapping).not.toContain('Cloud: "cloud"');
    expect(mapping).not.toContain('Software: "silicon"');
  });

  it("FAQ states when payment is due, in the owner-approved neutral wording", () => {
    const payments = faqData.sections.find((s) => s.title === "Payments and documents");
    const item = payments?.items.find((i) => i.question === "When is payment due?");
    expect(item?.answer).toBe(
      "Payment terms, including any deposit, are stated in your quotation and confirmed before ordering.",
    );
  });

  it("Lenis smooth scrolling is removed (native scrolling on every device)", () => {
    const provider = read("components/motion/LenisProvider.tsx");
    // The file's comment still names Lenis (why it was removed); what must
    // be gone is any live use of it.
    expect(provider).not.toMatch(/new Lenis\(/);
    expect(provider).not.toMatch(/from "lenis"/);
    expect(provider).not.toMatch(/requestAnimationFrame/);
    expect(provider).toContain("return children;");
  });
});
