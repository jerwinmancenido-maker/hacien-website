import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { companyContact } from "@/data/companyContact";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for HACIEN Information Technology Solutions website inquiries and RFQ submissions.",
};

const sections = [
  {
    title: "Information HACIEN collects",
    body: "HACIEN collects information voluntarily submitted through public forms, including name, company or agency, email address, phone number, location, requirement details, uploaded file metadata, RFQ context, and support or contact messages.",
  },
  {
    title: "How information is used",
    body: "Submitted information is used to review inquiries, prepare RFQ follow-up, clarify requirements, coordinate quotation context, respond to support requests, and maintain continuity of business communication.",
  },
  {
    title: "Files and attachments",
    body: "Customers may upload BOQs, specifications, spreadsheets, images, PDFs, or other supported files through designated RFQ paths. Uploaded files and related metadata may be stored in HACIEN's website, API, ERP, email, or operational systems as needed to review and continue the request. Sensitive documents should only be submitted when relevant to the request and through an appropriate business channel.",
  },
  {
    title: "Security and anti-spam controls",
    body: "Public forms may use anti-spam, rate-limiting, honeypot, and verification controls to protect HACIEN and legitimate customers from automated abuse.",
  },
  {
    title: "Sharing and disclosure",
    body: "HACIEN does not sell submitted inquiry information. Information may be shared only as needed to respond to a request, coordinate supplier or service context, support quotation preparation, perform supplier deal registration, comply with lawful obligations, or support formal business communication.",
  },
  {
    title: "Retention",
    body: "Inquiry, RFQ, uploaded file, quotation, support, and customer relationship records may be retained as part of HACIEN's business relationship history, quotation preparation, support follow-up, and operational records for as long as reasonably needed, unless a shorter or longer period is required by law, formal agreement, or approved business process.",
  },
  {
    title: "Customer requests",
    body: `Privacy-related questions, correction requests, access concerns, or data handling questions may be sent to ${companyContact.email}. HACIEN may need to verify the requester's identity or relationship to the relevant organization before acting on a request.`,
  },
];

export default function PrivacyPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Privacy"
          as="h1"
          title="Privacy Policy"
          description="This policy explains how HACIEN handles information submitted through the public website, RFQ Gateway, contact forms, support forms, and related inquiry paths."
        />
        <div className="surface mt-10 rounded-lg p-6 text-sm leading-7 text-slate-700">
          <div className="mb-6 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:grid-cols-3">
            {[
              ["Document Version", "1.0"],
              ["Effective Date", "July 1, 2026"],
              ["Last Updated", "July 1, 2026"],
            ].map(([label, value]) => (
              <div key={label} className="rounded border border-slate-200 bg-white p-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#1457d9]">
                  {label}
                </div>
                <div className="mt-1 font-semibold text-slate-950">{value}</div>
              </div>
            ))}
          </div>
          <p>
            HACIEN INFORMATION TECHNOLOGY SOLUTIONS respects the privacy of customers, suppliers,
            partners, and visitors who communicate through this website. The site is used for inquiry,
            quotation, support, and business communication. It does not process online payments.
          </p>
          <p className="mt-4">
            The official public contact for privacy and inquiry-related communication is{" "}
            <a className="font-semibold text-[#1457d9]" href={`mailto:${companyContact.email}`}>
              {companyContact.email}
            </a>
            .
          </p>
          <div className="mt-8 grid gap-6">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-bold text-slate-950">{section.title}</h2>
                <p className="mt-2">{section.body}</p>
              </section>
            ))}
          </div>
          <p className="mt-8 rounded border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-600">
            This public policy is intended for website and inquiry use. Specific customer, supplier,
            finance, legal, or procurement documents may contain additional privacy or confidentiality terms.
          </p>
        </div>
      </div>
    </section>
  );
}
