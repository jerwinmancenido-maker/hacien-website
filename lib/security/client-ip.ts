type HeaderReader = {
  get(name: string): string | null;
};

/**
 * Resolve client IP for rate limiting.
 * Prefer Cloudflare / reverse-proxy identity headers; if only
 * x-forwarded-for is present, use the rightmost hop (leftmost is spoofable).
 * Never log the value.
 */
export function getClientIp(headerStore: HeaderReader): string {
  const cfConnectingIp = headerStore.get("cf-connecting-ip")?.trim();
  if (cfConnectingIp) return cfConnectingIp;

  const realIp = headerStore.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwardedFor = headerStore.get("x-forwarded-for");
  if (forwardedFor) {
    const hops = forwardedFor.split(",").map((part) => part.trim()).filter(Boolean);
    const rightmost = hops[hops.length - 1];
    if (rightmost) return rightmost;
  }

  return "unknown";
}
