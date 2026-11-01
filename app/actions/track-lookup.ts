"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getClientIp } from "@/lib/security/client-ip";
import {
  TRACK_LOOKUP_GRANT_COOKIE,
  assertTrackLookupAllowed,
  issueTrackLookupGrant,
} from "@/lib/security/track-lookup-guard";
import { parseTrackReference } from "@/lib/security/track-reference";

function trackErrorRedirect(referenceNumber?: string) {
  const params = new URLSearchParams({ error: "1" });
  if (referenceNumber) {
    params.set("referenceNumber", referenceNumber);
  }
  redirect(`/track?${params.toString()}`);
}

export async function submitTrackLookup(formData: FormData) {
  const rawReference = String(formData.get("referenceNumber") || "");
  const parsed = parseTrackReference(rawReference);
  const token = String(formData.get("cf-turnstile-response") || "").trim();

  if (!parsed) {
    trackErrorRedirect(rawReference.trim() || undefined);
    return;
  }

  const referenceNumber = parsed.referenceNumber;
  const headerStore = await headers();
  const ip = getClientIp(headerStore);
  const allowed = await assertTrackLookupAllowed({ token, ip });

  if (!allowed.ok) {
    trackErrorRedirect(referenceNumber);
    return;
  }

  const secret = String(process.env.TURNSTILE_SECRET_KEY || "").trim();
  const grantValue = issueTrackLookupGrant(referenceNumber, secret);
  if (!grantValue) {
    trackErrorRedirect(referenceNumber);
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: TRACK_LOOKUP_GRANT_COOKIE,
    value: grantValue,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/track",
    maxAge: 300,
  });

  redirect(`/track/${encodeURIComponent(referenceNumber)}`);
}
