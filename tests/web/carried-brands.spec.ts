import { spawn, type ChildProcess } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:net";
import path from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  brandCategories,
  brandPhrases,
  brandsLine,
  brandsSummaryLine,
  carriedBrands,
  featuredBrandNames,
} from "@/data/companyContact";
import { classifyUserTurn } from "@/lib/ai/scope";
import { categories, products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { getAboutContent, getHomepageContent, getPublishedCmsContent } from "@/lib/cms/content";
import { getCmsSeoRecords } from "@/lib/cms/seo";
import { buildPageTitleInventory } from "@/lib/seo/page-title-inventory";

/** Unlisted brands kept only when the sentence is a client's own specification. None in this pass. */
const clientSpecBrandAllowances: readonly string[] = [];

const removedBrands = ["HPE", "Fortinet", "Synology"] as const;

function brandPattern(brand: string) {
  return new RegExp(`\\b${brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
}

function withoutAllowances(text: string) {
  return clientSpecBrandAllowances.reduce((current, sample) => current.split(sample).join(""), text);
}

function walkSource(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      files.push(...walkSource(full));
    } else if (/\.(ts|tsx|js|jsx|mjs|css|json|svg|md)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

describe("carried brands", () => {
  it("renders the brands line as the 72 unique brands plus the two phrases", () => {
    expect(carriedBrands).toHaveLength(72);
    expect(brandsLine.split(", ")).toEqual([...carriedBrands, ...brandPhrases]);

    const homepage = getHomepageContent();
    expect(homepage.rfqReadiness.title).toBe("Brands");
    expect(homepage.rfqReadiness.description).toBe(brandsLine);
  });

  it("keeps the structured list at 77 tiles, 72 unique, in the six mocked categories", () => {
    expect(brandCategories.map((category) => category.brands.length)).toEqual([12, 15, 12, 16, 10, 12]);
    const tiles = brandCategories.flatMap((category) => category.brands.map((brand) => brand.name));
    expect(tiles).toHaveLength(77);
    expect(new Set(tiles).size).toBe(72);
    expect(new Set(tiles)).toEqual(new Set(carriedBrands));
    // Cisco Meraki and HPE Aruba Networking count as brands of their own.
    expect(carriedBrands).toContain("Cisco Meraki");
    expect(carriedBrands).toContain("HPE Aruba Networking");
    expect(carriedBrands).toContain("Zebra");
    expect(featuredBrandNames).toHaveLength(24);
    for (const name of featuredBrandNames) {
      expect(carriedBrands).toContain(name);
    }
  });

  it("uses the short summary line, not the 72-name list, in prose contexts", () => {
    expect(brandsSummaryLine).toBe("more than 70 leading brands");

    const aboutBrand = getAboutContent().hero.highlights.find((item) => item.label === "Brands");
    expect(aboutBrand?.text).toBe(brandsSummaryLine);
    expect(getAboutContent().workingStandard.description).toBe(
      `${brandsSummaryLine} (excluding products requiring special regulatory licenses such as FDA or DOH-LTO)`,
    );

    const aboutPage = readFileSync(path.join(process.cwd(), "app/about/page.tsx"), "utf8");
    const contactPage = readFileSync(path.join(process.cwd(), "app/contact/page.tsx"), "utf8");
    expect(aboutPage).toContain('{ title: "Brands", text: brandsSummaryLine }');
    expect(contactPage).toContain('{ label: "Brands", text: brandsSummaryLine }');
  });

  it("classifies brand questions in scope without substring false positives", () => {
    expect(classifyUserTurn("Do you sell Hikvision?")).toBe("in-scope");
    expect(classifyUserTurn("Do you carry Fortinet?")).toBe("in-scope");
    expect(classifyUserTurn("HPE Aruba Networking")).toBe("in-scope");
    expect(classifyUserTurn("Canon")).toBe("in-scope");
    // Ordinary words that merely contain a brand name must not flip scope.
    expect(classifyUserTurn("Pineapple is my favourite fruit")).toBe("clarify");
    expect(classifyUserTurn("That wording is not canonical")).toBe("clarify");
  });

  it("does not say exclusive distributor, partner, or dealer", () => {
    const roots = ["app", "components", "data", "lib"].map((dir) => path.join(process.cwd(), dir));
    const hits: string[] = [];
    const pattern = /exclusive\s+(distributor|partner|dealer)/i;

    for (const root of roots) {
      for (const file of walkSource(root)) {
        const source = readFileSync(file, "utf8");
        if (pattern.test(source)) hits.push(path.relative(process.cwd(), file));
      }
    }

    const published = JSON.stringify({
      cms: getPublishedCmsContent(),
      seo: getCmsSeoRecords(),
      titles: buildPageTitleInventory(),
    });
    expect(pattern.test(published)).toBe(false);
    expect(hits).toEqual([]);
  });

  it("keeps HPE, Fortinet, and Synology out of the catalog", () => {
    const catalog = withoutAllowances(JSON.stringify({ categories, products, solutions }));

    for (const brand of removedBrands) {
      expect(brandPattern(brand).test(catalog), brand).toBe(false);
    }

    expect(/microsoft\s*365/i.test(catalog)).toBe(false);
  });

});

const retiredProductRedirects = [
  {
    from: "/products/servers-storage/hpe-proliant-class-rack-server-options",
    also: "/product/hpe-proliant-class-rack-server-options",
    to: "/products/servers-storage/dell-lenovo-rack-server-options",
  },
  {
    from: "/products/servers-storage/synology-class-nas-backup-appliance",
    also: "/product/synology-class-nas-backup-appliance",
    to: "/products/servers-storage/nas-backup-appliance",
  },
  {
    from: "/products/network-equipment/fortinet-class-firewall-options",
    also: "/product/fortinet-class-firewall-options",
    to: "/products/network-equipment/cisco-firewall-options",
  },
  {
    from: "/products/printers-peripherals/epson-ecotank-class-mfp-options",
    also: "/product/epson-ecotank-class-mfp-options",
    to: "/products/printers-peripherals/epson-brother-canon-mfp-options",
  },
  {
    from: "/products/power-ups/apc-smart-ups-class-power-protection",
    also: "/product/apc-smart-ups-class-power-protection",
    to: "/products/power-ups/apc-cyberpower-eaton-power-protection",
  },
  {
    from: "/products/computers-laptops/business-laptop-i5-16gb",
    also: "/product/business-laptop-i5-16gb",
    to: "/products/computers-laptops/business-laptop-16gb",
  },
] as const;

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

describe("retired product redirects", () => {
  let child: ChildProcess | undefined;
  let baseUrl = "";
  let serverLog = "";

  beforeAll(async () => {
    const port = await freePort();
    baseUrl = `http://127.0.0.1:${port}`;
    child = spawn(process.execPath, [path.join(process.cwd(), "node_modules/next/dist/bin/next"), "dev", "--port", String(port)], {
      cwd: process.cwd(),
      env: process.env,
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
        const response = await fetch(`${baseUrl}${retiredProductRedirects[0].from}`, { redirect: "manual" });
        if (response.status === 308) return;
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

  it("returns 308 and the current product location for each old slug", async () => {
    for (const redirect of retiredProductRedirects) {
      for (const source of [redirect.from, redirect.also]) {
        const response = await fetch(`${baseUrl}${source}`, { redirect: "manual" });
        const location = response.headers.get("location") ?? "";
        expect(response.status, source).toBe(308);
        expect(location === redirect.to || location.endsWith(redirect.to), `${source} -> ${location}`).toBe(true);
      }
    }
  });
});
