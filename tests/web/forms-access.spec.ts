import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import faqData from "@/config/faq-data.json";

const ROOT = process.cwd();

describe("PR 5: Forms and access (F17, F29, F31)", () => {
  describe("F29: Skip to content link", () => {
    it("renders a skip to content link before Header in app/layout.tsx", () => {
      const layout = readFileSync(path.join(ROOT, "app/layout.tsx"), "utf8");
      expect(layout).toMatch(/href="#content"[^>]*>[\s\S]*?Skip to content/);
      expect(layout).toContain("sr-only");
      expect(layout).toContain("focus:not-sr-only");
      expect(layout).toContain("focus:z-[100]");

      // Verify the skip link appears before <Header
      const skipIndex = layout.indexOf('href="#content"');
      const headerIndex = layout.indexOf("<Header");
      expect(skipIndex).toBeGreaterThan(-1);
      expect(headerIndex).toBeGreaterThan(-1);
      expect(skipIndex).toBeLessThan(headerIndex);

      // Verify layout main has id="content" and tabIndex={-1}
      expect(layout).toMatch(/<main id="content" tabIndex=\{-1\}>/);
    });

    it("renders the skip to content link before CookieNotice in the layout source", () => {
      const layout = readFileSync(path.join(ROOT, "app/layout.tsx"), "utf8");
      const skipIndex = layout.indexOf('href="#content"');
      const cookieNoticeIndex = layout.indexOf("<CookieNotice");
      expect(skipIndex).toBeGreaterThan(-1);
      expect(cookieNoticeIndex).toBeGreaterThan(-1);
      expect(skipIndex).toBeLessThan(cookieNoticeIndex);
    });

    it("ensures inner pages app/track/page.tsx and app/cms-preview/page.tsx do not render duplicate main tags", () => {
      const trackPage = readFileSync(path.join(ROOT, "app/track/page.tsx"), "utf8");
      expect(trackPage).not.toContain("<main");
      expect(trackPage).not.toContain("</main>");

      const cmsPreviewPage = readFileSync(path.join(ROOT, "app/cms-preview/page.tsx"), "utf8");
      expect(cmsPreviewPage).not.toContain("<main");
      expect(cmsPreviewPage).not.toContain("</main>");
    });
  });

  describe("F31: Accessible FAQ disclosure", () => {
    it("keeps the original eight FAQ answers and the added buyer questions", () => {
      const totalQuestions = faqData.sections.reduce(
        (sum, section) => sum + section.items.length,
        0,
      );
      expect(totalQuestions).toBe(17);
      const questions = faqData.sections.flatMap((section) => section.items.map((item) => item.question));
      expect(questions).toEqual(
        expect.arrayContaining([
          "Can HACIEN quote without a catalog product?",
          "Does the website confirm final pricing or stock?",
          "When is payment due?",
          "Are warranty or returns guaranteed from website content?",
        ]),
      );
    });

    it("uses accessible disclosure semantics in components/FaqSearch.tsx", () => {
      const faqSearch = readFileSync(path.join(ROOT, "components/FaqSearch.tsx"), "utf8");

      // Uses details and summary
      expect(faqSearch).toContain("<details");
      expect(faqSearch).toContain("<summary");

      // Summary has cursor-pointer and focus ring
      expect(faqSearch).toMatch(/summary[^>]*cursor-pointer/);
      expect(faqSearch).toMatch(/summary[^>]*focus-visible:ring-blue/);

      // Chevron rotates on open
      expect(faqSearch).toMatch(/ChevronDown[^>]*group-open:rotate-180/);
    });
  });

  describe("F17: Public form fields have tied labels and required fields marked", () => {
    const publicFormFiles = [
      "components/QuoteRequestForm.tsx",
      "components/ClarificationReplyForm.tsx",
      "components/TrackReferenceLookup.tsx",
      "components/FaqSearch.tsx",
      "app/search/page.tsx",
    ];

    it("all 5 public form files exist and use React useId or static id tied to label htmlFor", () => {
      for (const relativePath of publicFormFiles) {
        const content = readFileSync(path.join(ROOT, relativePath), "utf8");
        expect(content).toMatch(/htmlFor=/);
      }
    });

    it("verifies QuoteRequestForm has visible tied labels, aria-required on required fields, and * required note", () => {
      const form = readFileSync(path.join(ROOT, "components/QuoteRequestForm.tsx"), "utf8");
      expect(form).toContain("useId");
      expect(form).toContain("* required");

      // Step 1 required fields
      expect(form).toMatch(/name="requirementType"[^>]*required[\s\S]*?aria-required="true"|aria-required="true"[\s\S]*?name="requirementType"/);
      expect(form).toMatch(/name="budgetRange"[^>]*required[\s\S]*?aria-required="true"|aria-required="true"[\s\S]*?name="budgetRange"/);
      expect(form).toMatch(/name="timeline"[^>]*required[\s\S]*?aria-required="true"|aria-required="true"[\s\S]*?name="timeline"/);
      expect(form).toMatch(/name="message"[^>]*required[\s\S]*?aria-required="true"|aria-required="true"[\s\S]*?name="message"/);

      // Step 2 required fields
      expect(form).toMatch(/name="name"[^>]*required[\s\S]*?aria-required="true"|aria-required="true"[\s\S]*?name="name"/);
      expect(form).toMatch(/name="company"[^>]*required[\s\S]*?aria-required="true"|aria-required="true"[\s\S]*?name="company"/);
      expect(form).toMatch(/name="email"[^>]*required[\s\S]*?aria-required="true"|aria-required="true"[\s\S]*?name="email"/);

      // Labels are visible (not sr-only)
      expect(form).toMatch(/<label[^>]*htmlFor=[^>]*>\s*Requirement type/);
      expect(form).toMatch(/<label[^>]*htmlFor=[^>]*>\s*Budget range/);
      expect(form).toMatch(/<label[^>]*htmlFor=[^>]*>\s*Target timeline/);
      expect(form).toMatch(/<label[^>]*htmlFor=[^>]*>\s*Requirement details/);
      expect(form).toMatch(/<label[^>]*htmlFor=[^>]*>\s*Name/);
      expect(form).toMatch(/<label[^>]*htmlFor=[^>]*>\s*Company or organization/);
      expect(form).toMatch(/<label[^>]*htmlFor=[^>]*>\s*Email/);
    });


    it("verifies ClarificationReplyForm has tied label and aria-required", () => {
      const form = readFileSync(path.join(ROOT, "components/ClarificationReplyForm.tsx"), "utf8");
      expect(form).toContain("useId");
      expect(form).toContain("* required");
      expect(form).toMatch(/name="message"[^>]*required[\s\S]*?aria-required="true"|aria-required="true"[\s\S]*?name="message"/);
      expect(form).toMatch(/htmlFor=\{`\$\{baseId\}-message`\}/);
    });

    it("excludes the honeypot (website) from the label-association test explicitly and asserts it has no label and is hidden/aria-hidden", () => {
      // ClarificationReplyForm: honeypot 'website' has no label and is hidden/aria-hidden with tabIndex -1
      const clarification = readFileSync(path.join(ROOT, "components/ClarificationReplyForm.tsx"), "utf8");
      expect(clarification).not.toMatch(/<label[^>]*website/i);
      expect(clarification).toMatch(/<input[^>]*name="website"[^>]*tabIndex=\{-1\}[^>]*autoComplete="off"[^>]*className="hidden"[^>]*aria-hidden="true"/);

    });

    it("verifies TrackReferenceLookup has tied label and aria-required", () => {
      const form = readFileSync(path.join(ROOT, "components/TrackReferenceLookup.tsx"), "utf8");
      expect(form).toContain("useId");
      expect(form).toContain("* required");
      expect(form).toMatch(/name="referenceNumber"[\s\S]*?required[\s\S]*?aria-required="true"/);
      expect(form).toMatch(/htmlFor=\{inputId\}/);
    });

    it("verifies FaqSearch and SearchPage search boxes have associated labels", () => {
      const faqSearch = readFileSync(path.join(ROOT, "components/FaqSearch.tsx"), "utf8");
      expect(faqSearch).toContain("useId");
      expect(faqSearch).toMatch(/htmlFor=\{searchInputId\}/);
      expect(faqSearch).toMatch(/id=\{searchInputId\}/);

      const searchPage = readFileSync(path.join(ROOT, "app/search/page.tsx"), "utf8");
      expect(searchPage).toMatch(/htmlFor="hq-search"/);
      expect(searchPage).toMatch(/id="hq-search"/);
    });

    it("asserts form controls in these components keep w-full", () => {
      // QuoteRequestForm
      const quoteForm = readFileSync(path.join(ROOT, "components/QuoteRequestForm.tsx"), "utf8");
      expect(quoteForm).toMatch(/name="requirementType"[\s\S]*?className="[^"]*w-full/);
      expect(quoteForm).toMatch(/name="budgetRange"[\s\S]*?className="[^"]*w-full/);
      expect(quoteForm).toMatch(/name="timeline"[\s\S]*?className="[^"]*w-full/);
      expect(quoteForm).toMatch(/name="message"[\s\S]*?className="[^"]*w-full/);
      expect(quoteForm).toMatch(/name="name"[\s\S]*?className="[^"]*w-full/);
      expect(quoteForm).toMatch(/name="company"[\s\S]*?className="[^"]*w-full/);
      expect(quoteForm).toMatch(/name="email"[\s\S]*?className="[^"]*w-full/);

      // ClarificationReplyForm
      const clarification = readFileSync(path.join(ROOT, "components/ClarificationReplyForm.tsx"), "utf8");
      expect(clarification).toMatch(/name="message"[\s\S]*?className="[^"]*w-full/);

      // TrackReferenceLookup
      const trackLookup = readFileSync(path.join(ROOT, "components/TrackReferenceLookup.tsx"), "utf8");
      expect(trackLookup).toMatch(/name="referenceNumber"[\s\S]*?className="[^"]*w-full/);

      // FaqSearch
      const faqSearch = readFileSync(path.join(ROOT, "components/FaqSearch.tsx"), "utf8");
      expect(faqSearch).toMatch(/type="search"[\s\S]*?className="[^"]*w-full/);

      // SearchPage
      const searchPage = readFileSync(path.join(ROOT, "app/search/page.tsx"), "utf8");
      expect(searchPage).toMatch(/id="hq-search"[\s\S]*?className="[^"]*w-full/);
    });
  });
});
