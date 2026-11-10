import { spawn, type ChildProcess } from "node:child_process";
import { createServer } from "node:net";
import path from "node:path";

import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-real-ip": "203.0.113.8" }),
}));

import { isContactInquiryType } from "@/app/actions/contact-inquiry";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { legalPages } from "@/app/policies/_lib/content";
import { LEGAL_PUBLISH_DATE, legalMetadata, legalPagePlainText } from "@/app/policies/_lib/document";
import { birBadgeAlt, birBadgeLabel, birRmcCaption } from "@/components/Footer";
import { cmsDocumentRecords } from "@/lib/cms/documents";
import { renderDocumentTitle } from "@/lib/seo/document-title";

const analyticsBlockPhrases = [
  "PENDING ANALYTICS",
  "GA4",
  "_ga",
  "gaoptout",
  'click "Accept"',
];

function renderedTitle(page: (typeof legalPages)[number]) {
  const title = legalMetadata(page).title;
  if (typeof title === "string") return renderDocumentTitle(title);
  if (title && typeof title === "object" && "absolute" in title && title.absolute) return title.absolute;
  throw new Error(`Missing title for ${page.path}`);
}

function freePort() {
  return new Promise<number>((resolve, reject) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Could not reserve a port"));
        return;
      }
      const { port } = address;
      server.close(() => resolve(port));
    });
    server.on("error", reject);
  });
}

describe("legal page content", () => {
  it("uses the shared publish date, with the AI-chat update carrying its own date", () => {
    expect(LEGAL_PUBLISH_DATE).toBe("November 2, 2026");
    expect(legalPages.map((page) => page.path)).toEqual([
      "/policies",
      "/privacy",
      "/terms",
      "/terms-of-sale",
      "/warranty",
      "/legal",
      "/policies/history",
    ]);

    for (const page of legalPages) {
      expect(page.versionLine).not.toContain("November 1, 2026");
      expect(legalPagePlainText(page)).not.toContain("November 1, 2026");
      if (page.path === "/policies") {
        // The policies hub is an index, not a document: it carries no
        // version line date and no Effective meta of its own.
        expect(page.versionLine).not.toContain("Version");
        expect(page.meta.find((item) => item.label === "Effective")).toBeUndefined();
      } else if (page.path === "/privacy") {
        // Privacy v2.7 carries its own effective date — the order
        // texts, retention and rights release date (November 10, 2026);
        // its version line names v2.6's November 9, 2026 in the
        // Replaces part.
        expect(page.versionLine).toContain("November 10, 2026");
        expect(page.meta.find((item) => item.label === "Effective")?.value).toBe(
          "November 10, 2026",
        );
      } else if (page.path === "/terms") {
        // Terms v2.1 carries its own effective date; the other
        // documents keep the shared date.
        expect(page.versionLine).toContain("November 8, 2026");
        expect(page.meta.find((item) => item.label === "Effective")?.value).toBe(
          "November 8, 2026",
        );
      } else {
        expect(page.versionLine).toContain(LEGAL_PUBLISH_DATE);
        expect(page.meta.find((item) => item.label === "Effective")?.value).toBe(LEGAL_PUBLISH_DATE);
      }
      const reviewed = page.meta.find((item) => item.label === "Last reviewed");
      if (reviewed) expect(reviewed.value).toBe(LEGAL_PUBLISH_DATE);
    }

    const privacy = legalPages.find((page) => page.path === "/privacy");
    const terms = legalPages.find((page) => page.path === "/terms");
    const termsOfSale = legalPages.find((page) => page.path === "/terms-of-sale");
    const warranty = legalPages.find((page) => page.path === "/warranty");
    const legal = legalPages.find((page) => page.path === "/legal");
    const policies = legalPages.find((page) => page.path === "/policies");
    const history = legalPages.find((page) => page.path === "/policies/history");
    const privacyText = privacy ? legalPagePlainText(privacy) : "";
    const historyText = history ? legalPagePlainText(history) : "";
    const termsOfSaleText = termsOfSale ? legalPagePlainText(termsOfSale) : "";
    const warrantyText = warranty ? legalPagePlainText(warranty) : "";
    expect(privacyText).toContain("Version 2.7");
    expect(privacyText).toContain("Replaces version 2.6 (effective November 9, 2026)");
    expect(privacyText).not.toContain("Version 2.2");
    expect(privacyText).not.toContain("Not for the website");
    expect(privacyText).not.toContain("we don't send promo newsletters");
    expect(termsOfSaleText).toContain("Version 1.2");
    expect(termsOfSaleText).toContain("Replaces version 1.1");
    expect(warrantyText).toContain("Version 1.1");
    expect(warrantyText).toContain("Replaces version 1.0 (effective November 2, 2026)");
    expect(terms && legalPagePlainText(terms)).toContain(
      "Replaces version 2.0 (effective November 2, 2026)",
    );
    expect(legal && legalPagePlainText(legal)).toContain("Replaces version 1.0 (effective June 30, 2026)");
    expect(policies && legalPagePlainText(policies)).toContain(
      "[Terms of Sale](/terms-of-sale) Quotations, orders, delivery, payment, cancellations and returns v1.2",
    );
    expect(policies && legalPagePlainText(policies)).toContain(
      "[Warranty and Returns](/warranty) Manufacturer or supplier warranty, and how to make a claim v1.1",
    );
    expect(policies && legalPagePlainText(policies)).toContain(
      "[Privacy Policy](/privacy) What personal data we keep, why, and your rights v2.7",
    );
    expect(historyText).toContain("[Terms of Sale](/terms-of-sale) v1.2");
    expect(historyText).toContain("Terms of Sale v1.1 November 2, 2026");
    expect(historyText).toContain("[Warranty and Returns](/warranty) v1.1");
    expect(historyText).toContain("[Privacy Policy](/privacy) v2.7");
    expect(historyText).toContain("Privacy Policy v2.6 November 9, 2026");
    expect(historyText).toContain("Privacy Policy v2.4 November 8, 2026");
    expect(historyText).toContain("Privacy Policy v2.3 November 2, 2026");
    expect(historyText).toContain("Website Terms of Use v2.0 November 2, 2026");
    expect(historyText).toContain("Privacy Policy: Changes from v2.6");
    expect(historyText).toContain("Privacy Policy: Changes from v2.5");
    expect(historyText).toContain("Privacy Policy: Changes from v2.4");
    expect(historyText).toContain("Privacy Policy: Changes from v2.3");
    expect(historyText).toContain("Website Terms of Use: Changes from v2.0");
    expect(historyText).toContain("Terms of Sale v1.0 November 2, 2026");
    expect(historyText).toContain("Warranty and Returns v1.0 November 2, 2026");
    expect(historyText).toContain("Privacy Policy v2.2 November 2, 2026");
    expect(historyText).toContain("Privacy Policy v2.1 November 2, 2026");
    expect(historyText).toContain("Privacy Policy v2.0 November 2, 2026");
    expect(historyText).toContain("Terms of Sale: changes from v1.0");
    expect(historyText).toContain("Warranty and Returns: changes from v1.0");
    expect(historyText).toContain("Privacy Policy: Changes from v2.2");
    expect(historyText).toContain("Privacy Policy: Changes from v2.1");
    expect(historyText).toContain(
      "Added Google Analytics, used only if you click Accept in our cookie notice; data kept 2 months; no advertising features; Google LLC added as a service provider.",
    );
    expect(historyText).toContain("Changes from v2.0");
    expect(historyText).toContain(
      'Added order-status texts: we text order updates from sender name "HACIEN" to the mobile number on an order. No promotional texts.',
    );
    expect(historyText).toContain(
      "Added the right to withdraw marketing email consent. Unsubscribing never stops order texts and emails.",
    );
    expect(historyText).not.toContain("Not for the website");
    expect(historyText).toContain(LEGAL_PUBLISH_DATE);
    expect(historyText).toContain("July 1, 2026");
    expect(historyText).toContain("June 30, 2026");
  });

  it("omits the analytics block and keeps the default privacy section 9", () => {
    const combined = legalPages.map((page) => legalPagePlainText(page)).join("\n");
    for (const phrase of analyticsBlockPhrases) {
      expect(combined).not.toContain(phrase);
    }
    const privacy = legalPages.find((page) => page.path === "/privacy");
    const privacyText = privacy ? legalPagePlainText(privacy) : "";
    expect(privacyText).toContain("We use Google Analytics cookies only if you click Accept");
    expect(privacyText).not.toContain("does not use Google Analytics");
    expect(privacyText).toContain("up to 10 MB");
    expect(privacyText).toContain("Hostinger, Singapore");
    expect(privacyText).toContain("Hostinger, Jakarta, Indonesia");
    expect(privacyText).not.toContain("Southeast Asia");
    expect(combined).not.toContain("erp.haciensolutions.com");

    // Exact-text checks for Privacy v2.3 per brief section B (B1-B6)
    // B1: In short bullet
    expect(privacyText).toContain(
      "With your consent, we use Google Analytics to see how visitors use our website. It stays off unless you click Accept in our cookie notice.",
    );
    // B2: Section 3 table row
    expect(privacyText).toContain("Website use (only if you accept)");
    expect(privacyText).toContain(
      "Pages viewed, device and browser type, approximate location (city or country), and how you reached our site, through Google Analytics",
    );
    expect(privacyText).toContain("Website visitors who click Accept");
    // B3: Section 4 table row
    expect(privacyText).toContain("Understand how visitors use our website so we can improve it");
    expect(privacyText).toContain("Website use data (Google Analytics)");
    expect(privacyText).toContain(
      "Your consent (Sec. 12(a)), given by clicking Accept in our cookie notice. You can withdraw it at any time (section 9).",
    );
    // B4: Section 8 table row
    expect(privacyText).toContain("Google LLC (Google Analytics)");
    expect(privacyText).toContain("Website visit statistics, only if you accept");
    expect(privacyText).toContain("Google's servers, which may be outside the Philippines");
    // B5: Section 9 bullets
    expect(privacyText).toContain(
      "**Cookies:** we do not use advertising cookies. We use Google Analytics cookies only if you click Accept in our cookie notice. Until then, and if you click Decline, Google Analytics stays off.",
    );
    expect(privacyText).toContain(
      "**Google Analytics:** it shows us pages viewed, device and browser type, approximate location (city or country), and how visitors reached our site. Google Analytics 4 does not log or store IP addresses. We keep this data for 2 months. Advertising features and Google signals are turned off. To withdraw consent, click **Cookie settings** in the footer and choose Decline, or clear your browser's cookies for our site.",
    );
    // B6: Section 10 table row
    expect(privacyText).toContain("Google Analytics data (only if you accept)");
    expect(privacyText).toContain("2 months");
    expect(privacyText).toContain("Website statistics");

    // History Earlier versions row check
    const history = legalPages.find((page) => page.path === "/policies/history");
    const historyText = history ? legalPagePlainText(history) : "";
    expect(historyText).toContain("Privacy Policy v2.2 November 2, 2026");
  });

  it("shows the BIR registration serial only when BIR_RSN is set", () => {
    const previous = process.env.BIR_RSN;
    try {
      delete process.env.BIR_RSN;
      expect(birBadgeLabel()).toBe("BIR Registered");
      expect(birBadgeLabel("")).toBe("BIR Registered");
      expect(birBadgeLabel("   ")).toBe("BIR Registered");
      expect(birBadgeAlt()).toBe("BIR Registration Seal Badge");
      expect(birBadgeAlt("")).toBe("BIR Registration Seal Badge");
      expect(birRmcCaption).toBe("per BIR RMC No. 38-2026");
      process.env.BIR_RSN = "FAKE-RSN-000000";
      expect(birBadgeLabel()).toBe("BIR Registered · RSN FAKE-RSN-000000");
      expect(birBadgeLabel("FAKE-RSN-000000")).not.toBe("BIR Registered");
      expect(birBadgeAlt()).toBe("BIR Registration Seal Badge, RSN FAKE-RSN-000000");
      expect(birBadgeAlt("FAKE-RSN-000000")).toContain("RSN FAKE-RSN-000000");
    } finally {
      if (previous === undefined) delete process.env.BIR_RSN;
      else process.env.BIR_RSN = previous;
    }
  });

  it("accepts Privacy request and rejects an unknown inquiry type", async () => {
    expect(isContactInquiryType("Privacy request")).toBe(true);

    const accepted = await sendInquiryEmail({
      type: "Contact Inquiry",
      website: "",
      formStartedAt: String(Date.now() - 10_000),
      inquiryType: "Privacy request",
      name: "Example Person",
      email: "privacy-request@example.com",
      message: "Please send a copy of my data.",
    });
    expect(accepted.error).not.toBe("Please choose a valid inquiry type.");

    const rejected = await sendInquiryEmail({
      type: "Contact Inquiry",
      website: "",
      formStartedAt: String(Date.now() - 10_000),
      inquiryType: "Not a listed type",
      name: "Example Person",
      email: "other-request@example.com",
      message: "Hello.",
    });
    expect(rejected.success).toBe(false);
    expect(rejected.error).toBe("Please choose a valid inquiry type.");
  });

  it("conforms to the Legal update brief (Terms of Sale v1.2, Warranty v1.1, Privacy v2.2, CMS record)", () => {
    const tos = legalPages.find((page) => page.path === "/terms-of-sale");
    const warranty = legalPages.find((page) => page.path === "/warranty");
    const privacy = legalPages.find((page) => page.path === "/privacy");
    const policies = legalPages.find((page) => page.path === "/policies");
    const history = legalPages.find((page) => page.path === "/policies/history");

    expect(tos).toBeDefined();
    expect(warranty).toBeDefined();
    expect(privacy).toBeDefined();
    expect(policies).toBeDefined();
    expect(history).toBeDefined();

    const tosText = tos ? legalPagePlainText(tos) : "";
    const warrantyText = warranty ? legalPagePlainText(warranty) : "";
    const privacyText = privacy ? legalPagePlainText(privacy) : "";
    const historyText = history ? legalPagePlainText(history) : "";

    // Terms of Sale v1.2
    expect(tos?.versionLine).toBe(
      "Version 1.2 · Effective November 2, 2026 · Replaces version 1.1",
    );
    expect(tos?.meta.find((item) => item.label === "Version")?.value).toBe("1.2");
    expect(tos?.meta.find((item) => item.label === "Replaces")?.value).toBe("1.1");
    expect(tosText).toContain(
      "**Office pick-up:** pick-ups at our Suntree Tower office are by prior appointment (Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays).",
    );
    expect(tosText).toContain("**Who may receive and delivery contact number:**");
    expect(tosText).toContain(
      "**Naming a receiver:** You may name another person—such as your staff, warehouse personnel, or a building or site guard—to receive and sign for the delivery on your behalf. Their signature on our Delivery Receipt counts as delivery to you. If your PO does not name a specific receiver, anyone present at your delivery address may receive and sign for the order.",
    );
    expect(tosText).toContain(
      "**Permission to share their details:** If you give us another person's name and mobile number, you confirm that you have their permission to share those details with HACIEN for the order.",
    );
    expect(tosText).toContain(
      "**Order-status texts only (no ads, no links):** We text that mobile number only for order status updates (**order confirmed**, **delivered**, and **payment received**). Our texts never contain ads, promotions, or clickable links.",
    );
    expect(tosText).toContain(
      "**Your responsibility:** You are responsible if the mobile number you give us is wrong, out of date, or shared without that person's permission, and for any missed delivery note or claim that results from it.",
    );
    expect(tosText).not.toContain(
      "anyone at the delivery address may receive and sign for the delivery, unless your PO names specific receivers",
    );
    expect(tosText).toContain("A quotation is valid for **15 days** unless the quotation states otherwise.");
    expect(tosText).toContain(
      "A quotation is valid for **15 days** from its date, unless the quotation states otherwise.",
    );
    expect(tosText).not.toContain("unless it states a different period");
    expect(tosText).not.toContain("unless it says otherwise");

    // Warranty and Returns v1.1
    expect(warranty?.versionLine).toBe(
      "Version 1.1 · Effective November 2, 2026 · Replaces version 1.0 (effective November 2, 2026)",
    );
    expect(warranty?.meta.find((item) => item.label === "Version")?.value).toBe("1.1");
    expect(warranty?.meta.find((item) => item.label === "Replaces")?.value).toBe("1.0 (November 2, 2026)");
    expect(warrantyText).toContain(
      "Drop-offs at our Suntree Tower office are by prior appointment (Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays).",
    );

    // Privacy Policy v2.7
    expect(privacy?.versionLine).toBe(
      "Version 2.7 · Effective November 10, 2026 · Replaces version 2.6 (effective November 9, 2026)",
    );
    expect(privacy?.meta.find((item) => item.label === "Version")?.value).toBe("2.7");
    expect(privacy?.meta.find((item) => item.label === "Replaces")?.value).toBe(
      "2.6 (November 9, 2026)",
    );
    expect(privacyText).toContain(
      "**Chat in your browser tab:** while you use the chat, a copy of the conversation (your messages, your work email, your answers and your agreement record) is saved in your own browser tab so the chat is not lost if you reload or open another page on our site. This copy stays on your device and is not kept on our servers. It is deleted when you close the tab or tap Start over.",
    );

    // AI chat update (lawyer-approved text, 2026-11-07; the v2.5
    // agreement rows are lawyer-approved text, 2026-11-08)
    expect(privacyText).toContain("AI chat details");
    expect(privacyText).toContain(
      "Your work email address, chat messages, and the date, time, and policy version of your Terms of Use and Privacy Policy agreement before starting the chat",
    );
    expect(privacyText).toContain("Run the website AI chat and follow up on your inquiry");
    expect(privacyText).toContain(
      "Ticking the box before starting the chat records your agreement to our Terms of Use and confirms that you were shown this Privacy Policy (Sec. 16(a))",
    );
    expect(privacyText).toContain("Anthropic (Anthropic PBC)");
    expect(privacyText).toContain("To generate replies in the website chat");
    expect(privacyText).toContain(
      "Anthropic PBC, United States (and its cloud infrastructure providers)",
    );
    expect(privacyText).toContain("are **not** used to train AI models");
    expect(privacyText).toContain("**No decisions by AI:**");
    expect(privacyText).toContain("Chat conversations");
    expect(privacyText).toContain("up to 30 days for safety and abuse monitoring");
    expect(privacyText).toContain(
      "Our website chat is assisted by AI (see section 9). A real person from HACIEN reviews every request that is submitted.",
    );
    const terms = legalPages.find((page) => page.path === "/terms");
    const termsText = terms ? legalPagePlainText(terms) : "";
    expect(terms?.versionLine).toBe(
      "Version 2.1 · Effective November 8, 2026 · Replaces version 2.0 (effective November 2, 2026)",
    );
    expect(termsText).toContain("5. The AI chat assistant");
    expect(termsText).toContain("the assistant has no authority to bind HACIEN");
    expect(termsText).toContain(
      "not send government IDs, tax papers, card numbers or passwords through the chat",
    );
    expect(termsText).toContain("Flood or abuse the chat with automated tools");
    expect(termsText).toContain("6. Your responsibilities");
    expect(termsText).toContain("13. Changes");
    expect(privacyText).toContain("Receiver and pick-up checks");
    expect(privacyText).toContain(
      "Name of the receiver named on your PO or order, and their signature on our Delivery Receipt. For high-value deliveries or pick-ups, we look at a company or valid ID to confirm who is receiving. We do not photograph, copy, upload or keep the ID.",
    );
    expect(privacyText).toContain(
      "Some tax details of individuals may be **sensitive personal information** under the law. We protect them with the extra limits in sections 6 and 11.",
    );
    expect(privacyText).toContain(
      "Accredit customers, check credit, confirm who receives a delivery or pick-up",
    );
    expect(privacyText).toContain(
      "DTI/SEC papers, Mayor's Permit, PhilGEPS details, receiver's name and signature, and a sight-check of a company or valid ID for high-value deliveries or pick-ups (not copied or kept)",
    );
    expect(privacyText).toContain(
      "Steps before a contract and our legitimate interest (RA 10173 Sec. 12(b), 12(f)), and protecting lawful rights and claims (Sec. 13(f))",
    );
    expect(privacyText).not.toContain("For sensitive personal information: your explicit consent");
    expect(privacyText).toContain(
      "**TINs, tax papers and other uploaded documents can be seen only by the Proprietor and authorized HACIEN staff.**",
    );
    expect(privacyText).toContain(
      "BIR Form 2303, DTI/SEC papers, permits At least 5 years, and up to 10 years Invoicing and tax compliance (same BIR tax rules as the row above)",
    );
    expect(privacyText).toContain(
      "Our website and email are hosted by Hostinger in Singapore, and our staff app by Hostinger in Indonesia.",
    );
    expect(privacyText).toContain("Hostinger, Singapore");
    expect(privacyText).toContain("Hostinger, Jakarta, Indonesia");
    expect(privacyText).not.toContain(
      "Valid government IDs of a customer's authorized purchasing or receiving staff",
    );
    expect(privacyText).not.toContain("Southeast Asia");

    // History page changelog entries
    expect(historyText).toContain("Privacy Policy: Changes from v2.6");
    expect(historyText).toContain(
      'Version 2.7 · Effective November 10, 2026 — Order texts now come from sender ID "Hacien ITS" and cover Order confirmed, Delivered and Payment received (no ads, no links), with an opt-out for anyone texted in error; marketing email described as opt-in when offered; tax record keeping restated as 5 years under the EOPT Act and up to 10 years for tax and contract claims; unconverted inquiries now kept 2 years and warranty records for the warranty period plus 2 years; clearer rights section (profiling, heirs, response times).',
    );
    expect(historyText).toContain("Privacy Policy: Changes from v2.5");
    expect(historyText).toContain(
      "Version 2.6 (November 9, 2026): Added that an in-progress chat is saved in the visitor's own browser tab until the tab is closed or Start over is tapped.",
    );
    expect(historyText).toContain("Privacy Policy: Changes from v2.4");
    expect(historyText).toContain("Privacy Policy: Changes from v2.2");
    expect(historyText).toContain(
      "Added Google Analytics, used only if you click Accept in our cookie notice; data kept 2 months; no advertising features; Google LLC added as a service provider.",
    );
    expect(historyText).toContain(
      "Terms of Sale v1.1: Section 6 now explains naming a receiver, sharing their mobile number, order-status texts only (no ads, no links), and your responsibility for the number; quotation validity now reads 15 days unless the quotation states otherwise; added office pick-up by prior appointment.",
    );
    expect(historyText).toContain(
      "Terms of Sale v1.2: Payment terms are as stated in your quotation. Unless your quotation states approved credit terms, payment is due before ordering and delivery. The 50% down / 50% on delivery default is removed; software and special orders remain 100% upfront; credit terms apply only when stated in your quotation.",
    );
    expect(historyText).toContain(
      "Warranty and Returns v1.1: warranty drop-offs at our Suntree Tower office are by prior appointment (Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays).",
    );
    expect(historyText).toContain(
      "We no longer collect or keep copies of receiving staff's government IDs. For high-value deliveries or pick-ups we only look at a company or valid ID (no photo, upload or storage).",
    );
    expect(historyText).toContain(
      "Named where our hosting is: website and email in Singapore, staff app in Jakarta, Indonesia.",
    );

    // CMS documents record conformance
    const cmsLegal = cmsDocumentRecords.legal;
    const cmsPrivacy = cmsDocumentRecords.privacy;
    const cmsTerms = cmsDocumentRecords.terms;
    const cmsCombined = JSON.stringify({ cmsLegal, cmsPrivacy, cmsTerms });

    expect(cmsCombined).toContain(
      "Quotations are valid for 15 days unless the quotation states otherwise. Cost estimates and commercial proposals are valid only for the period and conditions stated in the specific written document. The website does not set default pricing, availability, warranty, delivery, payment, or tax terms.",
    );
    expect(cmsCombined).toContain("A quotation is valid for 15 days unless the quotation states otherwise.");
    expect(cmsCombined).toContain(
      "Sharing client names and configurations for deal registration and discount activation, such as registering Microsoft Azure, AWS, or Cisco quotes.",
    );
    expect(cmsCombined).toContain(
      "Some data may be processed on cloud infrastructure hosted outside the Philippines, such as Hostinger (Singapore and Indonesia), Google (Gmail, Google Drive), and Apple iCloud, matching section 8 of our Privacy Policy. HACIEN seeks to use cloud providers that maintain strict data privacy compliance standards.",
    );
    expect(cmsCombined).not.toContain("Fortinet");
    expect(cmsCombined).not.toContain("Microsoft 365");
    expect(cmsCombined).not.toContain("The website does not set default quotation validity");
    expect(cmsCombined).not.toContain("The website does not set a default validity period");

    // No TIN pattern added anywhere in legal pages
    for (const page of legalPages) {
      expect(legalPagePlainText(page)).not.toMatch(/\d{3}-\d{3}-\d{3}/);
    }
  });
});

describe("legal routes", () => {
  let child: ChildProcess | undefined;
  let baseUrl = "";
  let serverLog = "";

  beforeAll(async () => {
    const port = await freePort();
    baseUrl = `http://127.0.0.1:${port}`;
    const env = { ...process.env };
    delete env.BIR_RSN;
    child = spawn(process.execPath, [path.join(process.cwd(), "node_modules/next/dist/bin/next"), "dev", "--port", String(port)], {
      cwd: process.cwd(),
      env,
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    child.stdout?.on("data", (chunk: Buffer) => {
      serverLog += chunk.toString();
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      serverLog += chunk.toString();
    });

    const started = Date.now();
    while (Date.now() - started < 90_000) {
      if (child.exitCode != null) {
        throw new Error(`next dev exited ${child.exitCode}\n${serverLog.slice(-4000)}`);
      }
      try {
        const response = await fetch(`${baseUrl}/policies`, { redirect: "manual" });
        if (response.status === 200) return;
      } catch {
        // Server is still booting.
      }
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    throw new Error(`next dev did not become ready\n${serverLog.slice(-4000)}`);
  }, 120_000);

  afterAll(() => {
    if (!child?.pid) return;
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
      child.kill("SIGTERM");
    }
  });

  it("returns 200 and the page title for every legal route", async () => {
    for (const page of legalPages) {
      const response = await fetch(`${baseUrl}${page.path}`, { redirect: "manual" });
      const html = await response.text();
      expect(response.status, page.path).toBe(200);
      expect(html).toContain(`<title>${renderedTitle(page)}</title>`);
      // The Privacy Policy carries its own effective date (the
      // AI-chat updates), like the content tests above encode; every
      // other document shows the shared publish date.
      if (page.path !== "/policies" && page.path !== "/privacy") expect(html).toContain(LEGAL_PUBLISH_DATE);
      expect(html).not.toContain("cinematic-aurora");
      for (const phrase of analyticsBlockPhrases) {
        expect(html, page.path).not.toContain(phrase);
      }
      expect(html, page.path).not.toContain("googletagmanager.com");
      expect(html, page.path).not.toContain("We'd like to use Google Analytics cookies");
    }

    const policies = await fetch(`${baseUrl}/policies`, { redirect: "manual" });
    const policiesHtml = await policies.text();
    expect(policies.status).toBe(200);
    expect(policies.headers.get("location")).toBeNull();
    expect(policiesHtml).toContain("v1.1");
    expect(policiesHtml).toContain("v2.7");

    const privacy = await fetch(`${baseUrl}/privacy`, { redirect: "manual" });
    const privacyHtml = await privacy.text();
    expect(privacy.status).toBe(200);
    expect(privacyHtml).toContain("Version 2.7");
    expect(privacyHtml).toContain("Replaces version 2.6 (effective November 9, 2026)");
    expect(privacyHtml).not.toContain("Southeast Asia");
    expect(privacyHtml).not.toContain("Valid government IDs of a customer's authorized purchasing or receiving staff");
    expect(privacyHtml).not.toContain("Not for the website");
    expect(privacyHtml).not.toContain("for the Policy history page");
    expect(privacyHtml).not.toMatch(/\d{3}-\d{3}-\d{3}/);

    const history = await fetch(`${baseUrl}/policies/history`, { redirect: "manual" });
    const historyHtml = await history.text();
    expect(history.status).toBe(200);
    expect(historyHtml).toContain("v1.0");
    expect(historyHtml).toContain("v1.1");
    expect(historyHtml).toContain("v2.0");
    expect(historyHtml).toContain("v2.1");
    expect(historyHtml).toContain("v2.2");
    expect(historyHtml).toContain("v2.3");
    expect(historyHtml).toContain("v2.4");
    expect(historyHtml).toContain("v2.5");
    expect(historyHtml).toContain("v2.6");
    expect(historyHtml).toContain("v2.7");
    expect(historyHtml).toContain("Terms of Sale: changes from v1.0");
    expect(historyHtml).toContain("Terms of Sale: changes from v1.1");
    expect(historyHtml).toContain("Warranty and Returns: changes from v1.0");
    expect(historyHtml).toContain("Privacy Policy: Changes from v2.6");
    expect(historyHtml).toContain("Privacy Policy: Changes from v2.5");
    expect(historyHtml).toContain("Privacy Policy: Changes from v2.4");
    expect(historyHtml).toContain("Privacy Policy: Changes from v2.2");
    expect(historyHtml).toContain("Privacy Policy: Changes from v2.1");
    expect(historyHtml).toContain("Changes from v2.0");
    expect(historyHtml).not.toContain("Not for the website");
    expect(historyHtml).toContain(LEGAL_PUBLISH_DATE);
    expect(historyHtml).toContain(">BIR Registered<");
    expect(historyHtml).not.toContain("RSN");

    const termsOfSale = await fetch(`${baseUrl}/terms-of-sale`, { redirect: "manual" });
    const termsOfSaleHtml = await termsOfSale.text();
    expect(termsOfSale.status).toBe(200);
    expect(termsOfSaleHtml).toContain("Version 1.2");
    expect(termsOfSaleHtml).toContain("Replaces version 1.1");
    expect(termsOfSaleHtml).toContain("Who may receive and delivery contact number:");
    expect(termsOfSaleHtml).toContain("person—such as your staff, warehouse personnel, or a building or site guard—to receive");
    expect(termsOfSaleHtml).not.toContain("anyone at the delivery address may receive and sign for the delivery, unless your PO names specific receivers");
    expect(termsOfSaleHtml).not.toContain("unless it states a different period");
    expect(termsOfSaleHtml).not.toContain("unless it says otherwise");

    const contact = await fetch(`${baseUrl}/contact`, { redirect: "manual" });
    const contactHtml = await contact.text();
    expect(contact.status).toBe(200);
    // Step B: the contact page no longer serves a form — it shows the
    // chat invitation in the initial HTML, and the guided chat (with its
    // inquiry types) lives in the floating panel.
    expect(contactHtml).toContain("Ask us in the chat");
    expect(contactHtml).not.toContain("Please include:");
    expect(isContactInquiryType("Privacy request")).toBe(true);

    const compliance = await fetch(`${baseUrl}/compliance`, { redirect: "manual" });
    const complianceHtml = await compliance.text();
    expect(compliance.status).toBe(200);
    expect(complianceHtml).toContain(`<title>${renderDocumentTitle("Government Compliance")}</title>`);
    expect(complianceHtml).toContain("See Business and Legal Information");
    expect(complianceHtml).toContain('href="/legal"');
    expect(complianceHtml).toContain(">BIR Registered<");
    expect(complianceHtml).toContain(birRmcCaption);
    expect(complianceHtml).not.toContain("RSN");
    expect(complianceHtml).not.toMatch(/\d{3}-\d{3}-\d{3}/);

    const footer = complianceHtml.slice(complianceHtml.lastIndexOf("<footer"));
    expect(footer).toMatch(
      /<a[^>]*href="\/compliance"[^>]*>\s*<img[^>]*alt="BIR Registration Seal Badge"[^>]*>/,
    );
    expect(footer).not.toContain("RSN");
    expect(footer).not.toMatch(/\d{3}-\d{3}-\d{3}/);
    expect(historyHtml).not.toMatch(/\d{3}-\d{3}-\d{3}/);
  }, 120_000);
});
