#!/usr/bin/env node

const baseArg = process.argv.find((arg) => arg.startsWith("--base="));
const BASE_URL = normalizeBaseUrl(
  baseArg?.replace("--base=", "") ||
    process.env.BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://haciensolutions.com",
);
const REQUEST_DELAY_MS = Number(process.env.SMOKE_REQUEST_DELAY_MS || 1500);
const MAX_ATTEMPTS = Number(process.env.SMOKE_MAX_ATTEMPTS || 3);

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

const TURNSTILE_ROUTES = ["/quote", "/contact", "/support"];
const QUOTE_REQUIRED_MARKERS = [
  "Universal RFQ Gateway",
  "Universal Gateway Intake",
  "Start with the requirement. Catalog is optional.",
  "Your RFQ can start without catalog products.",
];
const QUOTE_REJECTED_MARKERS = [
  "RFQ Cart",
  "Quote Checkout",
  "Your RFQ cart is ready",
  "Select Requirements",
];
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

async function fetchRoute(path, options = {}) {
  let lastResponse;
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      lastResponse = await fetchWithTimeout(routeUrl(path), options);
      if (lastResponse.status !== 503 || attempt === MAX_ATTEMPTS) {
        return { response: lastResponse, attempts: attempt };
      }
    } catch (error) {
      lastError = error;
      if (attempt === MAX_ATTEMPTS) {
        throw error;
      }
    }

    await sleep(REQUEST_DELAY_MS * attempt);
  }

  if (lastResponse) {
    return { response: lastResponse, attempts: MAX_ATTEMPTS };
  }

  throw lastError;
}

function attemptSuffix(attempts) {
  return attempts > 1 ? ` after ${attempts} attempts` : "";
}

async function checkRoute(path) {
  const { response: res, attempts } = await fetchRoute(path, { redirect: "manual" });
  const ok = res.status >= 200 && res.status < 400;
  console.log(`${ok ? "PASS" : "FAIL"} ${res.status} ${path}${attemptSuffix(attempts)}`);
  return ok;
}

async function checkSecurityHeaders() {
  const { response: res, attempts } = await fetchRoute("/", { redirect: "manual" });
  const missing = REQUIRED_SECURITY_HEADERS.filter((header) => !res.headers.get(header));

  if (missing.length > 0) {
    console.log(`FAIL security headers missing: ${missing.join(", ")}${attemptSuffix(attempts)}`);
    return false;
  }

  console.log(`PASS security headers present${attemptSuffix(attempts)}`);
  return true;
}

async function checkSitemapAndRobots() {
  const { response: sitemap, attempts: sitemapAttempts } = await fetchRoute("/sitemap.xml");
  const { response: robots, attempts: robotsAttempts } = await fetchRoute("/robots.txt");

  const sitemapText = sitemap.ok ? await sitemap.text() : "";
  const sitemapHasHome = sitemapText.includes(`${BASE_URL}/`) || sitemapText.includes("<loc>");

  const sitemapOk = sitemap.ok && sitemapHasHome;
  const robotsOk = robots.ok;

  console.log(`${sitemapOk ? "PASS" : "FAIL"} ${sitemap.status} /sitemap.xml${attemptSuffix(sitemapAttempts)}`);
  console.log(`${robotsOk ? "PASS" : "FAIL"} ${robots.status} /robots.txt${attemptSuffix(robotsAttempts)}`);

  return sitemapOk && robotsOk;
}

async function checkNotFound() {
  const path = `/__hacien-smoke-missing-${Date.now()}`;
  const { response: res, attempts } = await fetchRoute(path, { redirect: "manual" });
  const ok = res.status === 404;
  console.log(`${ok ? "PASS" : "FAIL"} ${res.status} 404 recovery${attemptSuffix(attempts)}`);
  return ok;
}

async function checkTurnstileMarkers() {
  const results = [];

  for (const path of TURNSTILE_ROUTES) {
    const { response: res, attempts } = await fetchRoute(path);
    const html = await res.text();
    const hasTurnstile =
      html.includes("challenges.cloudflare.com/turnstile") ||
      html.includes("cf-turnstile-response") ||
      html.includes("Security verification is not configured");

    const ok = res.ok && hasTurnstile;
    console.log(`${ok ? "PASS" : "FAIL"} ${res.status} Turnstile marker ${path}${attemptSuffix(attempts)}`);
    results.push(ok);
  }

  return results;
}

async function checkUniversalGatewayIntake() {
  const { response: res, attempts } = await fetchRoute("/quote");
  const html = await res.text();
  const missing = QUOTE_REQUIRED_MARKERS.filter((marker) => !html.includes(marker));
  const stale = QUOTE_REJECTED_MARKERS.filter((marker) => html.includes(marker));
  const ok = res.ok && missing.length === 0 && stale.length === 0;

  if (ok) {
    console.log(`PASS ${res.status} Universal Gateway Intake /quote${attemptSuffix(attempts)}`);
    return true;
  }

  const details = [
    missing.length > 0 ? `missing: ${missing.join(", ")}` : "",
    stale.length > 0 ? `stale: ${stale.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  console.log(`FAIL ${res.status} Universal Gateway Intake /quote${attemptSuffix(attempts)}${details ? ` (${details})` : ""}`);
  return false;
}

async function main() {
  console.log(`HACIEN production smoke test: ${BASE_URL}`);
  console.log(`Request delay: ${REQUEST_DELAY_MS}ms; max attempts: ${MAX_ATTEMPTS}`);

  const checks = [];

  for (const route of REQUIRED_ROUTES) {
    checks.push(await checkRoute(route));
    await sleep(REQUEST_DELAY_MS);
  }

  checks.push(await checkSecurityHeaders());
  await sleep(REQUEST_DELAY_MS);
  checks.push(await checkSitemapAndRobots());
  await sleep(REQUEST_DELAY_MS);
  checks.push(await checkNotFound());
  await sleep(REQUEST_DELAY_MS);
  checks.push(...(await checkTurnstileMarkers()));
  await sleep(REQUEST_DELAY_MS);
  checks.push(await checkUniversalGatewayIntake());

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
