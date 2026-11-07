import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanTitleName,
  emailDomain,
  extractCompanyName,
  isFreeMailDomain,
} from "@/lib/ai/company-lookup";

// The action resolves hosts before fetching; give it a public IP so
// the found-path test never touches the real network's DNS.
vi.mock("node:dns/promises", () => ({
  lookup: vi.fn(async () => [{ address: "93.184.216.34", family: 4 }]),
}));

import { lookupCompanyFromEmail } from "@/app/actions/company-lookup";

describe("emailDomain", () => {
  it("extracts a normalized domain and rejects malformed addresses", () => {
    expect(emailDomain("Ana@AcmeCorp.ph")).toBe("acmecorp.ph");
    expect(emailDomain(" ana@sub.acme.com ")).toBe("sub.acme.com");
    expect(emailDomain("not-an-email")).toBeNull();
    expect(emailDomain("ana@")).toBeNull();
    expect(emailDomain("ana@nodot")).toBeNull();
    expect(emailDomain("a b@c.com")).toBeNull();
  });
});

describe("isFreeMailDomain", () => {
  it("flags personal providers, including regional Yahoo", () => {
    expect(isFreeMailDomain("gmail.com")).toBe(true);
    expect(isFreeMailDomain("yahoo.com.ph")).toBe(true);
    expect(isFreeMailDomain("outlook.com")).toBe(true);
    expect(isFreeMailDomain("acmecorp.ph")).toBe(false);
  });
});

describe("cleanTitleName", () => {
  it("drops taglines and generic first segments", () => {
    expect(cleanTitleName("Acme Corporation | Industrial Supply")).toBe("Acme Corporation");
    expect(cleanTitleName("Home - Acme Corporation")).toBe("Acme Corporation");
    expect(cleanTitleName("Acme Corporation — Build Better")).toBe("Acme Corporation");
    expect(cleanTitleName("Welcome")).toBe("Welcome");
  });
});

describe("extractCompanyName", () => {
  it("prefers og:site_name over the title", () => {
    const html = `<html><head>
      <meta property="og:site_name" content="Acme Corporation">
      <title>Some Tagline First</title></head></html>`;
    expect(extractCompanyName(html, "acme.example")).toBe("Acme Corporation");
  });

  it("reads an organization name from structured data", () => {
    const html = `<html><head><title>Home</title>
      <script type="application/ld+json">{"@type":"Organization","name":"Beta Trading Co."}</script>
      </head></html>`;
    expect(extractCompanyName(html, "beta.example")).toBe("Beta Trading Co.");
  });

  it("falls back to the cleaned title and decodes entities", () => {
    const html = `<html><head><title>Reyes &amp; Santos Trading | Home</title></head></html>`;
    expect(extractCompanyName(html, "rst.example")).toBe("Reyes & Santos Trading");
  });

  it("returns null when the only candidate restates the domain or nothing exists", () => {
    expect(extractCompanyName(`<title>acme.example</title>`, "acme.example")).toBeNull();
    expect(extractCompanyName(`<html><head></head></html>`, "acme.example")).toBeNull();
  });
});

describe("lookupCompanyFromEmail action", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("refuses personal mail before any network call", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    await expect(lookupCompanyFromEmail("ana@gmail.com")).resolves.toEqual({
      found: false,
      reason: "free-mail",
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects a malformed address", async () => {
    await expect(lookupCompanyFromEmail("not-an-email")).resolves.toEqual({
      found: false,
      reason: "bad-email",
    });
  });

  it("returns the company name published on the domain's homepage", async () => {
    const html = `<html><head><meta property="og:site_name" content="Acme Corporation"><title>x</title></head></html>`;
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } }),
      ),
    );
    await expect(lookupCompanyFromEmail("ana@acme-lookup-test.example")).resolves.toEqual({
      found: true,
      companyName: "Acme Corporation",
      domain: "acme-lookup-test.example",
    });
  });
});
