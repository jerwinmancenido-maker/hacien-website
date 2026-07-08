import { redirect } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { TrackReferenceLookup } from "@/components/TrackReferenceLookup";

type TrackLookupPageProps = {
  searchParams: Promise<{ referenceNumber?: string }>;
};

export default async function TrackLookupPage({ searchParams }: TrackLookupPageProps) {
  const { referenceNumber } = await searchParams;
  const cleanReference = referenceNumber?.trim();

  if (cleanReference) {
    redirect(`/track/${encodeURIComponent(cleanReference)}`);
  }

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <SectionHeading
          eyebrow="Request Tracking"
          as="h1"
          title="Enter a HACIEN request reference"
          description="Use the reference number from your RFQ confirmation or support message to view customer-safe progress."
        />
        <TrackReferenceLookup />
      </section>
    </main>
  );
}
