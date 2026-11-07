"use server";

/**
 * Company lookup server action.
 *
 * Given a visitor's work email, find the company name published on
 * the homepage of the email's domain so the chat can ask "is this
 * your company?" instead of making them type it. Only the company's
 * own public homepage is read; only a name string comes back.
 *
 * Safety: personal-mail domains are refused up front; every host is
 * DNS-resolved and rejected if it points at a private, loopback or
 * link-local address; redirects are followed manually (max 3, https
 * only, same site); the read is time- and size-capped; a per-IP
 * rate limit keeps the action from being used as a general fetcher.
 */

import { lookup } from "node:dns/promises";
import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { emailDomain, extractCompanyName, isFreeMailDomain } from "@/lib/ai/company-lookup";
import { getClientIp } from "@/lib/security/client-ip";
import { redis } from "@/lib/redis/upstash";

export type CompanyLookupResult =
  | { found: true; companyName: string; domain: string }
  | { found: false; reason: "bad-email" | "free-mail" | "not-found" | "rate-limited" };

const LOOKUP_IP_MAX = 10;
const LOOKUP_WINDOW_MS = 10 * 60_000;
const FETCH_TIMEOUT_MS = 6_000;
const MAX_HTML_BYTES = 256 * 1024;
const CACHE_TTL_MS = 60 * 60_000;

const rateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(LOOKUP_IP_MAX, "10 m"),
      analytics: true,
      prefix: "@upstash/ratelimit/company-lookup-ip",
    })
  : null;

const ipMemoryMap = new Map<string, { count: number; resetAt: number }>();

async function ipAllowed(ip: string): Promise<boolean> {
  if (rateLimiter) {
    try {
      const result = await rateLimiter.limit(ip);
      return result.success;
    } catch (err) {
      console.warn("Company lookup: Upstash rate limit failed, falling back to memory.", err);
    }
  }
  const now = Date.now();
  const entry = ipMemoryMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipMemoryMap.set(ip, { count: 1, resetAt: now + LOOKUP_WINDOW_MS });
    return true;
  }
  if (entry.count >= LOOKUP_IP_MAX) return false;
  entry.count++;
  return true;
}

const cache = new Map<string, { result: CompanyLookupResult; at: number }>();

function isPrivateAddress(address: string): boolean {
  if (address.includes(":")) {
    const lower = address.toLowerCase();
    return (
      lower === "::1" ||
      lower === "::" ||
      lower.startsWith("fe8") ||
      lower.startsWith("fe9") ||
      lower.startsWith("fea") ||
      lower.startsWith("feb") ||
      lower.startsWith("fc") ||
      lower.startsWith("fd")
    );
  }
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) return true;
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 169 && b === 254) ||
    a >= 224
  );
}

async function hostIsPublic(host: string): Promise<boolean> {
  try {
    const addresses = await lookup(host, { all: true, verbatim: true });
    return addresses.length > 0 && addresses.every(({ address }) => !isPrivateAddress(address));
  } catch {
    return false;
  }
}

/** Fetch a homepage's HTML with SSRF guards: https only, the host
 *  must resolve publicly, redirects are followed manually (max 3,
 *  staying on the same site), and the body read is size-capped. */
async function fetchHomepageHtml(host: string): Promise<string | null> {
  let current = host;
  for (let hop = 0; hop <= 3; hop++) {
    if (!(await hostIsPublic(current))) return null;
    let response: Response;
    try {
      response = await fetch(`https://${current}/`, {
        redirect: "manual",
        headers: { "user-agent": "Mozilla/5.0 (compatible; HACIEN-website/1.0)" },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
    } catch {
      return null;
    }
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) return null;
      let next: URL;
      try {
        next = new URL(location, `https://${current}/`);
      } catch {
        return null;
      }
      if (next.protocol !== "https:") return null;
      const nextHost = next.hostname.toLowerCase();
      const sameSite =
        nextHost === current || nextHost === `www.${current}` || current === `www.${nextHost}`;
      if (!sameSite) return null;
      current = nextHost;
      continue;
    }
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;
    try {
      const reader = response.body?.getReader();
      if (!reader) return null;
      const chunks: Uint8Array[] = [];
      let total = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          total += value.byteLength;
          if (total >= MAX_HTML_BYTES) {
            await reader.cancel().catch(() => undefined);
            break;
          }
        }
      }
      return new TextDecoder("utf8", { fatal: false }).decode(Buffer.concat(chunks));
    } catch {
      return null;
    }
  }
  return null;
}

export async function lookupCompanyFromEmail(email: string): Promise<CompanyLookupResult> {
  const domain = typeof email === "string" ? emailDomain(email) : null;
  if (!domain) return { found: false, reason: "bad-email" };
  if (isFreeMailDomain(domain)) return { found: false, reason: "free-mail" };

  const cached = cache.get(domain);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.result;

  let ip = "unknown";
  try {
    ip = getClientIp(await headers());
  } catch {
    // Outside a request context (tests) — the guard keys on "unknown".
  }
  if (!(await ipAllowed(ip))) return { found: false, reason: "rate-limited" };

  let result: CompanyLookupResult = { found: false, reason: "not-found" };
  for (const host of domain.startsWith("www.") ? [domain] : [domain, `www.${domain}`]) {
    const html = await fetchHomepageHtml(host);
    if (!html) continue;
    const companyName = extractCompanyName(html, domain);
    if (companyName) {
      result = { found: true, companyName, domain };
      break;
    }
  }
  cache.set(domain, { result, at: Date.now() });
  return result;
}
