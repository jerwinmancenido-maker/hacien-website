/** Company lookup from a work email — pure helpers.
 *
 * When a visitor gives a company email during a quote request, the
 * chat can offer the company it finds at that email's domain and ask
 * "is this your company?" instead of making them type it. These
 * helpers are the testable core: domain extraction, personal-mail
 * detection, and company-name extraction from a homepage's HTML.
 * The network fetch lives in app/actions/company-lookup.ts.
 */

/** Personal / free mailbox providers — no company can be inferred. */
const FREE_MAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "aol.com",
  "gmx.com",
  "gmx.net",
  "mail.com",
  "yandex.com",
  "zoho.com",
  "qq.com",
  "163.com",
  "126.com",
]);

export function emailDomain(email: string): string | null {
  const match = /^[^\s@]+@([^\s@]+)$/.exec(email.trim().toLowerCase());
  if (!match) return null;
  const domain = match[1].replace(/\.$/, "");
  return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(domain) ? domain : null;
}

export function isFreeMailDomain(domain: string): boolean {
  if (FREE_MAIL_DOMAINS.has(domain)) return true;
  // Regional Yahoo addresses (yahoo.com.ph, yahoo.co.jp, …).
  return domain.startsWith("yahoo.");
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

const GENERIC_TITLE_WORDS = new Set([
  "home",
  "welcome",
  "homepage",
  "home page",
  "official website",
  "website",
  "index",
]);

/** Clean a page <title> into a candidate company name: drop the
 *  tagline after a separator, skip generic first segments. */
export function cleanTitleName(title: string): string | null {
  const parts = title
    .split(/\s*[|·•»«::]|\s+[–—]\s+|\s+-\s+/)
    .map((part) => decodeEntities(part))
    .filter(Boolean);
  for (const part of parts) {
    if (!GENERIC_TITLE_WORDS.has(part.toLowerCase())) return part;
  }
  return parts[0] ?? null;
}

/** Extract the likeliest company name from homepage HTML, in source
 *  order of trust: og:site_name, structured-data organization name,
 *  then the cleaned <title>. Returns null when nothing usable. */
export function extractCompanyName(html: string, domain: string): string | null {
  const candidates: Array<string | null> = [];

  const og = /<meta[^>]+property=["']og:site_name["'][^>]*>/i.exec(html)?.[0];
  if (og) candidates.push(/content=["']([^"']+)["']/i.exec(og)?.[1] ?? null);

  const ldJson = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const block of html.matchAll(ldJson)) {
    try {
      const parsed: unknown = JSON.parse(block[1]);
      const entries = Array.isArray(parsed) ? parsed : [parsed];
      for (const entry of entries) {
        if (entry && typeof entry === "object" && "name" in entry) {
          const name = (entry as { name?: unknown }).name;
          if (typeof name === "string") candidates.push(name);
        }
      }
    } catch {
      // Malformed structured data — ignore it.
    }
  }

  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1];
  if (title) candidates.push(cleanTitleName(title));

  for (const raw of candidates) {
    if (!raw) continue;
    const name = decodeEntities(raw);
    if (name.length < 2 || name.length > 80) continue;
    if (/^https?:\/\//i.test(name)) continue;
    // A "name" that is just the domain restated carries no new signal.
    if (name.toLowerCase().replace(/^www\./, "") === domain) continue;
    return name;
  }
  return null;
}
