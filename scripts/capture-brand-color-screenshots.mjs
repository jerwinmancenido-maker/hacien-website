#!/usr/bin/env node
/**
 * Capture before/after screenshots for brand-colors-05 brief.
 * Usage: node scripts/capture-brand-color-screenshots.mjs <before|after> [baseUrl]
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const phase = process.argv[2];
if (phase !== "before" && phase !== "after") {
  console.error("Usage: node scripts/capture-brand-color-screenshots.mjs <before|after> [baseUrl]");
  process.exit(1);
}

const baseUrl = process.argv[3] || "http://127.0.0.1:3010";
const outDir = join("docs/screenshots/brand-colors-05", phase);
mkdirSync(outDir, { recursive: true });

const widths = [1440, 390];
const routes = [
  { path: "/", name: "home" },
  { path: "/products", name: "products" },
  { path: "/about", name: "about" },
  { path: "/about/company-profile", name: "about-company-profile" },
  { path: "/portal", name: "portal" },
  { path: "/search", name: "search" },
  { path: "/insights", name: "insights" },
  { path: "/industries", name: "industries" },
  { path: "/solutions", name: "solutions" },
  { path: "/quote", name: "quote" },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const page = await context.newPage();

for (const width of widths) {
  await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
  for (const route of routes) {
    const url = `${baseUrl}${route.path}`;
    const file = join(outDir, `${route.name}-${width}.png`);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(400);
      await page.screenshot({ path: file, fullPage: false });
      console.log(`OK ${phase} ${route.name}@${width} -> ${file}`);
    } catch (error) {
      console.error(`FAIL ${phase} ${route.name}@${width}:`, error.message || error);
      process.exitCode = 1;
    }
  }
}

await browser.close();
if (process.exitCode) process.exit(process.exitCode);
