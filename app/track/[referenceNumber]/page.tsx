import Link from "next/link";
import { ClarificationReplyForm } from "@/components/ClarificationReplyForm";
import { SectionHeading } from "@/components/SectionHeading";

type TrackingPageProps = {
  params: Promise<{ referenceNumber: string }>;
};

type GatewayTracking = {
  referenceNumber: string;
  submissionType: string;
  status: string;
  receivedAt: string;
  message: string;
  history?: Array<{
    type: string;
    actor: string;
    body: string;
    at: string;
  }>;
};

type TimelineTracking = {
  events?: Array<{
    id: string;
    title: string;
    description: string;
    reason: string;
    nextAction: string;
    occurredAt: string;
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
  const [gatewayResponse, timelineResponse] = await Promise.all([
    fetch(
      `${gatewayUrl}/gateway/submissions/${encodeURIComponent(referenceNumber)}/tracking`,
      { cache: "no-store" },
    ),
    fetch(
      `${gatewayUrl}/timeline/public/references/${encodeURIComponent(referenceNumber)}`,
      { cache: "no-store" },
    ),
  ]);

  if (!gatewayResponse.ok) return null;

  const gateway = (await gatewayResponse.json()) as GatewayTracking;
  const timeline = timelineResponse.ok
    ? ((await timelineResponse.json()) as TimelineTracking)
    : { events: [] };

  return { gateway, timeline };
}

export default async function TrackReferencePage({ params }: TrackingPageProps) {
  const { referenceNumber } = await params;
  const tracking = await getTracking(referenceNumber);

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <SectionHeading
          eyebrow="Request Tracking"
          as="h1"
          title="Track a HACIEN request"
          description="Public tracking shows only customer-safe progress for the reference number provided. No account is required."
        />

        {!tracking ? (
          <div className="surface mt-8 rounded-lg p-6">
            <h2 className="text-xl font-bold text-slate-950">Reference not found</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              HACIEN could not find a public request for this reference. Check the number and try again.
            </p>
            <Link
              href="/support"
              className="mt-5 inline-flex rounded bg-[#071426] px-5 py-3 text-sm font-bold text-white"
            >
              Contact support
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6">
            <div className="surface rounded-lg p-6">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                {tracking.gateway.status}
              </div>
              <h2 className="mt-3 text-2xl font-bold text-slate-950">
                {tracking.gateway.referenceNumber}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {tracking.gateway.message}
              </p>
              <div className="mt-4 text-sm text-slate-500">
                Received: {new Date(tracking.gateway.receivedAt).toLocaleString()}
              </div>
              {tracking.gateway.status === "NEEDS_CLARIFICATION" ? (
                <ClarificationReplyForm referenceNumber={tracking.gateway.referenceNumber} />
              ) : null}
            </div>

            <div className="surface rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-950">Timeline</h3>
              <div className="mt-5 grid gap-4">
                {(tracking.timeline.events || []).length > 0 ? (
                  tracking.timeline.events?.map((event) => (
                    <div key={event.id} className="rounded border border-slate-200 bg-white p-4">
                      <div className="text-sm font-bold text-slate-950">{event.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {event.description}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {event.nextAction}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-slate-600">
                    HACIEN has received the request. Additional public milestones will appear here when they become available.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
