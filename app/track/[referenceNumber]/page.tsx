import { cookies } from "next/headers";
import { SectionHeading } from "@/components/SectionHeading";
import { TrackReferenceLookup } from "@/components/TrackReferenceLookup";
import { toPublicTrackResult } from "@/lib/security/public-track-result";
import {
  TRACK_LOOKUP_GENERIC_MESSAGE,
  TRACK_LOOKUP_GRANT_COOKIE,
  hasValidTrackLookupGrant,
} from "@/lib/security/track-lookup-guard";
import { parseTrackReference } from "@/lib/security/track-reference";

type TrackingPageProps = {
  params: Promise<{ referenceNumber: string }>;
};

type GatewayTracking = {
  referenceNumber?: string;
  status?: string;
  receivedAt?: string;
  message?: string;
  history?: unknown;
};

type TimelineTracking = {
  events?: Array<{
    id?: string;
    title?: string;
    description?: string;
    reason?: string;
    nextAction?: string;
    occurredAt?: string;
    at?: string;
  }>;
};

function getGatewayUrl() {
  let url = (
    process.env.HACIEN_GATEWAY_API_URL ||
    process.env.HACIEN_API_PUBLIC_URL ||
    "http://localhost:4101/api/v1"
  ).replace(/\/+$/, "");

  if (!url.endsWith("/api/v1")) {
    url = `${url}/api/v1`;
  }
  return url;
}

async function getTracking(referenceNumber: string) {
  const gatewayUrl = getGatewayUrl();
  const signal = AbortSignal.timeout(3000);

  try {
    const [gatewayResponse, timelineResponse] = await Promise.all([
      fetch(
        `${gatewayUrl}/gateway/submissions/${encodeURIComponent(referenceNumber)}/tracking`,
        { cache: "no-store", signal },
      ),
      fetch(
        `${gatewayUrl}/timeline/public/references/${encodeURIComponent(referenceNumber)}`,
        { cache: "no-store", signal },
      ),
    ]);

    if (!gatewayResponse.ok) return null;

    const gateway = (await gatewayResponse.json()) as GatewayTracking;
    const timeline = timelineResponse.ok
      ? ((await timelineResponse.json()) as TimelineTracking)
      : { events: [] };

    return { gateway, timeline };
  } catch {
    // Do not log reference numbers or client identifiers.
    console.error("Unable to load public tracking reference");
    return null;
  }
}

function formatDisplayDate(iso: string | null) {
  if (!iso) return null;
  const value = new Date(iso);
  if (Number.isNaN(value.getTime())) return null;
  return value.toLocaleString();
}

export default async function TrackReferencePage({ params }: TrackingPageProps) {
  const { referenceNumber: rawReference } = await params;
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";
  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY || "";
  const parsed = parseTrackReference(rawReference);
  const cookieStore = await cookies();
  const grantCookie = cookieStore.get(TRACK_LOOKUP_GRANT_COOKIE)?.value;
  const unlocked = parsed
    ? hasValidTrackLookupGrant(grantCookie, parsed.referenceNumber, turnstileSecretKey)
    : false;

  if (!parsed || !unlocked) {
    return (
      <main>
        <section className="mx-auto max-w-4xl px-6 py-12">
          <SectionHeading
            eyebrow="Request Tracking"
            as="h1"
            title="Track a HACIEN request"
            description="Complete the security check to view customer-safe status and dates for this reference. No account is required."
          />
          <TrackReferenceLookup
            initialReference={parsed?.referenceNumber || ""}
            turnstileSiteKey={turnstileSiteKey}
            errorMessage={!parsed && rawReference?.trim() ? TRACK_LOOKUP_GENERIC_MESSAGE : undefined}
          />
        </section>
      </main>
    );
  }

  const tracking = await getTracking(parsed.referenceNumber);
  const publicResult = tracking ? toPublicTrackResult(tracking) : null;

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <SectionHeading
          eyebrow="Request Tracking"
          as="h1"
          title="Track a HACIEN request"
          description="Public tracking shows only customer-safe status and dates for the reference number provided."
        />
        <TrackReferenceLookup
          initialReference={parsed.referenceNumber}
          turnstileSiteKey={turnstileSiteKey}
        />

        {!publicResult ? (
          <div className="surface mt-6 rounded-lg p-6">
            <h2 className="text-xl font-bold text-slate-950">Reference not found</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{TRACK_LOOKUP_GENERIC_MESSAGE}</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6">
            <div className="surface rounded-lg p-6">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">
                {publicResult.status}
              </div>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">Request status</h2>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                {publicResult.receivedAt ? (
                  <p>Received: {formatDisplayDate(publicResult.receivedAt)}</p>
                ) : (
                  <p>Received date is not available.</p>
                )}
                {publicResult.eventDates.length > 0 ? (
                  <div>
                    <p className="font-semibold text-slate-800">Event dates</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {publicResult.eventDates.map((iso) => (
                        <li key={iso}>{formatDisplayDate(iso)}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
