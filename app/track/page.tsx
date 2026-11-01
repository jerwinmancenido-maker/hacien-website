import { SectionHeading } from "@/components/SectionHeading";
import { TrackReferenceLookup } from "@/components/TrackReferenceLookup";
import { TRACK_LOOKUP_GENERIC_MESSAGE } from "@/lib/security/track-lookup-guard";
import { parseTrackReference } from "@/lib/security/track-reference";

type TrackLookupPageProps = {
  searchParams: Promise<{ referenceNumber?: string; error?: string }>;
};

export default async function TrackLookupPage({ searchParams }: TrackLookupPageProps) {
  const params = await searchParams;
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";
  const parsed = parseTrackReference(params.referenceNumber || "");
  const initialReference = parsed?.referenceNumber || "";
  const showError = params.error === "1";

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <SectionHeading
          eyebrow="Request Tracking"
          as="h1"
          title="Enter a HACIEN request reference"
          description="Use the reference number from your RFQ confirmation or support message to view customer-safe progress."
        />
        <TrackReferenceLookup
          initialReference={initialReference}
          turnstileSiteKey={turnstileSiteKey}
          errorMessage={showError ? TRACK_LOOKUP_GENERIC_MESSAGE : undefined}
        />
      </section>
    </main>
  );
}
