import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for HACIEN Information Technology Solutions website inquiries and RFQ submissions.",
};

export default function PrivacyPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Privacy"
          as="h1"
          title="Privacy Policy"
          description="This website collects only the information voluntarily submitted through inquiry and RFQ forms. Online payment is not processed on this site."
        />
        <div className="surface mt-10 grid gap-6 rounded-lg p-6 text-sm leading-7 text-slate-700">
          <p>
            HACIEN INFORMATION TECHNOLOGY SOLUTIONS uses inquiry details to respond to quote requests,
            supplier partnership messages, procurement support inquiries, and IT project discussions.
          </p>
          <p>
            Information may include name, company or agency, email address, phone number, delivery location,
            product requirements, and notes supplied by the sender.
          </p>
          <p>
            HACIEN does not publish private documents, identification records, lease files, or financial
            information on this website. Do not send sensitive documents through public forms unless requested
            through an appropriate business channel.
          </p>
          <p>
            For privacy-related requests, contact{" "}
            <a className="font-semibold text-[#1457d9]" href="mailto:sales@haciensolutions.com">
              sales@haciensolutions.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
