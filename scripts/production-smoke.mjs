#!/usr/bin/env node

const baseArg = process.argv.find((arg) => arg.startsWith("--base="));
const BASE_URL = normalizeBaseUrl(
  baseArg?.replace("--base=", "") ||
    process.env.BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://haciensolutions.com",
);

const REQUIRED_ROUTES = [
  "/",
  "/about",
  "/solutions",
  "/products",
  "/industries",
  "/insights",
  "/quote",
  "/contact",
  "/support",
  "/search",
  "/trust-center",
  "/privacy",
  "/terms",
];

const TURNSTILE_ROUTES = ["/quote", "/contact", "/support", "/government-procurement"];
const REQUIRED_SECURITY_HEADERS = [
  "content-security-policy",
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
];

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, "");
}

function routeUrl(path) {
  return `${BASE_URL}${path}`;
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkRoute(path) {
  const res = await fetchWithTimeout(routeUrl(path), { redirect: "manual" });
  const ok = res.status >= 200 && res.status < 400;
  console.log(`${ok ? "PASS" : "FAIL"} ${res.status} ${path}`);
  return ok;
}

async function checkSecurityHeaders() {
  const res = await fetchWithTimeout(routeUrl("/"), { redirect: "manual" });
  const missing = REQUIRED_SECURITY_HEADERS.filter((header) => !res.headers.get(header));

  if (missing.length > 0) {
    console.log(`FAIL security headers missing: ${missing.join(", ")}`);
    return false;
  }

  console.log("PASS security headers present");
  return true;
}

async function checkSitemapAndRobots() {
  const sitemap = await fetchWithTimeout(routeUrl("/sitemap.xml"));
  const robots = await fetchWithTimeout(routeUrl("/robots.txt"));

  const sitemapText = sitemap.ok ? await sitemap.text() : "";
  const sitemapHasHome = sitemapText.includes(`${BASE_URL}/`) || sitemapText.includes("<loc>");

  const sitemapOk = sitemap.ok && sitemapHasHome;
  const robotsOk = robots.ok;

  console.log(`${sitemapOk ? "PASS" : "FAIL"} ${sitemap.status} /sitemap.xml`);
  console.log(`${robotsOk ? "PASS" : "FAIL"} ${robots.status} /robots.txt`);

  return sitemapOk && robotsOk;
}

async function checkNotFound() {
  const path = `/__hacien-smoke-missing-${Date.now()}`;
  const res = await fetchWithTimeout(routeUrl(path), { redirect: "manual" });
  const ok = res.status === 404;
  console.log(`${ok ? "PASS" : "FAIL"} ${res.status} 404 recovery`);
  return ok;
}

async function checkTurnstileMarkers() {
  const results = [];

  for (const path of TURNSTILE_ROUTES) {
    const res = await fetchWithTimeout(routeUrl(path));
    const html = await res.text();
    const hasTurnstile =
      html.includes("challenges.cloudflare.com/turnstile") ||
      html.includes("cf-turnstile-response") ||
      html.includes("Security verification is not configured");

    const ok = res.ok && hasTurnstile;
    console.log(`${ok ? "PASS" : "FAIL"} ${res.status} Turnstile marker ${path}`);
    results.push(ok);
  }

  return results;
}

async function main() {
  console.log(`HACIEN production smoke test: ${BASE_URL}`);

  const checks = [];

  for (const route of REQUIRED_ROUTES) {
    checks.push(await checkRoute(route));
  }

  checks.push(await checkSecurityHeaders());
  checks.push(await checkSitemapAndRobots());
  checks.push(await checkNotFound());
  checks.push(...(await checkTurnstileMarkers()));

  const failed = checks.filter((ok) => !ok).length;
  console.log(`Result: ${checks.length - failed} passed, ${failed} failed`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error("FAIL smoke test crashed", {
    name: error instanceof Error ? error.name : "UnknownError",
    message: error instanceof Error ? error.message : "Unknown error",
  });
  process.exit(1);
});
