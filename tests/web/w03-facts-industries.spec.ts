import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { companyContact, founderLine, replyTime } from "@/data/companyContact";
import { getIndustriesContent } from "@/lib/cms/content";

function walkSource(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      files.push(...walkSource(full));
    } else if (/\.(ts|tsx|js|jsx|mjs|json|md)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

describe("W03: Facts and Industries Conformance", () => {
  it("renders exactly 5 sectors on /industries with no stats or case studies", () => {
    const industries = getIndustriesContent();
    const cards = industries.supportedIndustries.cards;

    expect(cards).toHaveLength(5);
    expect(cards.map((c) => c.title)).toEqual([
      "Government",
      "Corporate & Commercial",
      "Schools, Universities & Technical Training",
      "Contractors, Facilities & Industrial Maintenance",
      "Healthcare",
    ]);

    // Jerwin's verbatim phrases are present
    expect(cards[0].text).toContain("under PhilGEPS Registration");
    expect(cards[0].text).toContain("complete BIR Sales Invoices");
    expect(cards[1].text).toContain("enterprise networking");
    expect(cards[2].text).toContain("computer laboratories");
    expect(cards[3].text).toContain("engineering, construction, and facility teams");
    expect(cards[4].text).toBe(
      "Reliable endpoint, network, storage, power, security, and support materials for operational environments.",
    );

    // No stat counters, case studies, or client names
    const fullContent = JSON.stringify(industries);
    expect(fullContent).not.toMatch(/\bcase stud(y|ies)\b/i);
    expect(fullContent).not.toMatch(/\b\d+%\b/);
    expect(fullContent).not.toMatch(/\b\d+\+\s*(clients|customers|projects)\b/i);
  });

  it("features info@haciensolutions.com on /contact, footer, and forms", () => {
    expect(companyContact.email).toBe("info@haciensolutions.com");

    const contactPage = readFileSync(path.join(process.cwd(), "app/contact/page.tsx"), "utf8");
    expect(contactPage).toContain("companyContact.email");

    const footer = readFileSync(path.join(process.cwd(), "components/Footer.tsx"), "utf8");
    expect(footer).toContain("companyContact.email");

    const contactForm = readFileSync(path.join(process.cwd(), "components/ContactForm.tsx"), "utf8");
    expect(contactForm).toContain("info@haciensolutions.com");
  });

  it("never shows accounting@ anywhere in the codebase", () => {
    const roots = ["app", "components", "data", "lib", "public"].map((dir) =>
      path.join(process.cwd(), dir),
    );
    for (const root of roots) {
      for (const file of walkSource(root)) {
        const text = readFileSync(file, "utf8");
        expect(text).not.toContain("accounting@");
      }
    }
  });

  it("has no personal gmail or icloud addresses in public source", () => {
    const roots = ["app", "components", "data", "lib"].map((dir) => path.join(process.cwd(), dir));
    for (const root of roots) {
      for (const file of walkSource(root)) {
        const text = readFileSync(file, "utf8");
        expect(text).not.toMatch(/@[a-zA-Z0-9.-]*gmail\.com/i);
        expect(text).not.toMatch(/@[a-zA-Z0-9.-]*icloud\.com/i);
      }
    }
  });

  it("has no href='#' links in the codebase", () => {
    const roots = ["app", "components", "data", "lib"].map((dir) => path.join(process.cwd(), dir));
    for (const root of roots) {
      for (const file of walkSource(root)) {
        const text = readFileSync(file, "utf8");
        expect(text).not.toContain('href="#"');
        expect(text).not.toContain("href='#'");
      }
    }
  });

  it("shows the reply-time string on forms", () => {
    expect(replyTime).toBe(
      "Within 1 business day (Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays).",
    );

    const contactForm = readFileSync(path.join(process.cwd(), "components/ContactForm.tsx"), "utf8");
    expect(contactForm).toContain("{replyTime}");

    const quoteForm = readFileSync(
      path.join(process.cwd(), "components/QuoteRequestForm.tsx"),
      "utf8",
    );
    expect(quoteForm).toContain("{replyTime}");

    const quoteCart = readFileSync(path.join(process.cwd(), "components/QuoteCart.tsx"), "utf8");
    expect(quoteCart).toContain("{replyTime}");
  });

  it("shows no digit runs that look like TIN or permit numbers on /compliance, /about, /company-profile", () => {
    const targetPages = [
      "app/compliance/page.tsx",
      "app/about/page.tsx",
      "app/about/company-profile/page.tsx",
    ];

    // TIN format pattern: 3-4 groups of digits, e.g. 123-456-789 or 9+ consecutive digits
    const tinOrPermitPattern = /\b\d{3}[-\s]\d{3}[-\s]\d{3}\b|\b\d{9,12}\b/;

    for (const relPath of targetPages) {
      const source = readFileSync(path.join(process.cwd(), relPath), "utf8");
      expect(tinOrPermitPattern.test(source)).toBe(false);
    }
  });

  it("uses approved founding copy with BIR-registered and PhilGEPS-registered", () => {
    expect(founderLine).toContain("BIR-registered and PhilGEPS-registered");
    expect(founderLine).not.toContain("compliant");
  });

  it("preserves privacy@ and leaves the 4 legal pages untouched", () => {
    const legalPages = [
      "app/legal/page.tsx",
      "app/privacy/page.tsx",
      "app/terms-of-sale/page.tsx",
      "app/warranty/page.tsx",
    ];

    for (const pagePath of legalPages) {
      const source = readFileSync(path.join(process.cwd(), pagePath), "utf8");
      expect(source).toBeDefined();
    }

    const policyContent = readFileSync(path.join(process.cwd(), "app/policies/_lib/content.ts"), "utf8");
    expect(policyContent).toContain("privacy@haciensolutions.com");
    expect(policyContent).toContain("sales@haciensolutions.com");
  });
});
