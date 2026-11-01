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
import { renderDocumentTitle } from "@/lib/seo/document-title";

const analyticsBlockPhrases = [
  "PENDING ANALYTICS",
  "Google Analytics 4",
  "GA4",
  "_ga",
  "Cookie settings",
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
  it("uses one publish date on every legal page, the hub, and history", () => {
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
      expect(page.versionLine).toContain(LEGAL_PUBLISH_DATE);
      expect(page.versionLine).not.toContain("November 1, 2026");
      expect(page.meta.find((item) => item.label === "Effective")?.value).toBe(LEGAL_PUBLISH_DATE);
      const reviewed = page.meta.find((item) => item.label === "Last reviewed");
      if (reviewed) expect(reviewed.value).toBe(LEGAL_PUBLISH_DATE);
      expect(legalPagePlainText(page)).not.toContain("November 1, 2026");
    }

    const privacy = legalPages.find((page) => page.path === "/privacy");
    const terms = legalPages.find((page) => page.path === "/terms");
    const legal = legalPages.find((page) => page.path === "/legal");
    const history = legalPages.find((page) => page.path === "/policies/history");
    expect(privacy && legalPagePlainText(privacy)).toContain("Replaces version 1.0 (effective July 1, 2026)");
    expect(terms && legalPagePlainText(terms)).toContain("Replaces version 1.0 (effective July 1, 2026)");
    expect(legal && legalPagePlainText(legal)).toContain("Replaces version 1.0 (effective June 30, 2026)");
    expect(history && legalPagePlainText(history)).toContain("v1.0");
    expect(history && legalPagePlainText(history)).toContain(LEGAL_PUBLISH_DATE);
    expect(history && legalPagePlainText(history)).toContain("July 1, 2026");
    expect(history && legalPagePlainText(history)).toContain("June 30, 2026");
  });

  it("omits the analytics block and keeps the default privacy section 9", () => {
    const combined = legalPages.map((page) => legalPagePlainText(page)).join("\n");
    for (const phrase of analyticsBlockPhrases) {
      expect(combined).not.toContain(phrase);
    }
    const privacy = legalPages.find((page) => page.path === "/privacy");
    const privacyText = privacy ? legalPagePlainText(privacy) : "";
    expect(privacyText).toContain("does not use Google Analytics");
    expect(privacyText).toContain("up to 10 MB");
    expect(privacyText).toContain("Hostinger, Southeast Asia");
    expect(combined).not.toContain("erp.haciensolutions.com");
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
      expect(html).toContain(LEGAL_PUBLISH_DATE);
      expect(html).not.toContain("cinematic-aurora");
      for (const phrase of analyticsBlockPhrases) {
        expect(html, page.path).not.toContain(phrase);
      }
    }

    const policies = await fetch(`${baseUrl}/policies`, { redirect: "manual" });
    expect(policies.status).toBe(200);
    expect(policies.headers.get("location")).toBeNull();

    const history = await fetch(`${baseUrl}/policies/history`, { redirect: "manual" });
    const historyHtml = await history.text();
    expect(history.status).toBe(200);
    expect(historyHtml).toContain("v1.0");
    expect(historyHtml).toContain(LEGAL_PUBLISH_DATE);
    expect(historyHtml).toContain(">BIR Registered<");
    expect(historyHtml).not.toContain("RSN");

    const contact = await fetch(`${baseUrl}/contact`, { redirect: "manual" });
    const contactHtml = await contact.text();
    expect(contact.status).toBe(200);
    expect(contactHtml).toContain("Privacy request");

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
