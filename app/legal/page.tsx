import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { companyContact } from "@/data/companyContact";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Legal information for HACIEN Information Technology Solutions, including governing law, notices, quotation acceptance, liability, customer responsibilities, intellectual property, and website use.",
};

const legalSections = [
  {
    title: "Legal entity",
    body: `${companyContact.legalName} operates this website and related public inquiry channels. Proprietor, tax, registration, and supporting company documents may be provided through formal business communication when appropriate for qualified customers, suppliers, partners, and procurement entities.`,
  },
  {
    title: "Governing law and venue",
    body: "Website use, inquiries, quotations, invoices, support communication, and business transactions with HACIEN are governed by the laws of the Republic of the Philippines. Unless a formal signed agreement states otherwise, disputes are subject to the proper courts of Pasig City, Philippines.",
  },
  {
    title: "Legal notices",
    body: `Formal legal notices should be sent by registered mail to HACIEN's registered office address. ${companyContact.email} is the official public business contact email for inquiry and coordination, but registered mail remains the required channel for formal legal notices unless HACIEN confirms another written notice process.`,
  },
  {
    title: "Quotation acceptance",
    body: "A signed quotation, purchase order, email confirmation, or other written approval may be treated as customer acceptance, subject to the quotation, supporting documents, and written business communication for the transaction.",
  },
  {
    title: "Quotation revision or cancellation",
    body: "HACIEN may cancel, revise, or revalidate a quotation before fulfillment when supplier stock, pricing, foreign exchange, product availability, errors, seller discretion, or other commercial constraints materially affect the transaction.",
  },
  {
    title: "Liability limitation",
    body: "To the maximum extent permitted by applicable law and unless a formal signed agreement states otherwise, HACIEN's liability for a transaction is limited to the amount paid by the customer for the affected transaction.",
  },
  {
    title: "Excluded losses",
    body: "HACIEN is not liable for indirect, incidental, special, consequential, or punitive losses, including lost profits, downtime, data loss, business interruption, lost opportunity, or loss caused by third-party products, services, logistics, supplier decisions, customer delay, or customer-provided information.",
  },
  {
    title: "Vendor and third-party terms",
    body: "Supplier, manufacturer, distributor, logistics provider, software vendor, cloud provider, license, subscription, warranty-provider, and other third-party terms may apply. Customers are responsible for reviewing applicable third-party terms before acceptance or use.",
  },
  {
    title: "Customer responsibilities",
    body: "Customers are responsible for reviewing and approving specifications before ordering, providing accurate delivery and site access information, confirming authorized receivers, arranging required gate passes or access requirements, and protecting backups, data, credentials, licenses, and systems before service or installation work.",
  },
  {
    title: "Intellectual property and documents",
    body: "HACIEN's website content, brand, designs, documents, quotation materials, specifications, templates, and related business materials remain HACIEN property unless a written agreement states otherwise. HACIEN quotations, specifications, and private business documents are confidential and may not be copied, reused, distributed, or shared outside the transaction without HACIEN's written approval.",
  },
  {
    title: "Operational sharing",
    body: "HACIEN may share necessary transaction details with suppliers, manufacturers, distributors, logistics providers, software vendors, warranty channels, and service providers when needed for quotation preparation, deal registration, procurement, fulfillment, delivery, warranty coordination, support, or lawful business operations.",
  },
  {
    title: "Website misuse",
    body: "Misuse of HACIEN public systems is prohibited. This includes scraping, spam, malicious uploads, impersonation, false RFQs, fraudulent submissions, abusive behavior, unauthorized access attempts, and content unrelated to legitimate business inquiry. HACIEN may block, reject, investigate, or preserve abusive or fraudulent submissions.",
  },
  {
    title: "Legal status of public information",
    body: "This Legal page provides general business terms for website, inquiry, quotation, and public communication use. It is not legal advice. Formal signed contracts, accepted quotations, invoices, purchase orders, and written agreements control when they conflict with general website content.",
  },
];

export default function LegalPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Legal"
          as="h1"
          title="Legal Information"
          description="These legal terms explain how HACIEN handles public website use, legal notices, quotations, transaction responsibility, intellectual property, and formal business document boundaries."
        />
        <div className="surface mt-10 rounded-lg p-6 text-sm leading-7 text-slate-700">
          <p>
            {companyContact.legalName} publishes legal information so customers, suppliers, partners,
            and procurement entities understand the boundaries of website content, business communication,
            quotation acceptance, and formal transaction documents.
          </p>

          <div className="mt-6 rounded border border-slate-200 bg-slate-50 p-4">
            <div className="font-bold text-slate-950">Registered office for formal notices</div>
            <address className="mt-2 not-italic">
              {companyContact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-4 font-bold text-slate-950">Public business contact</div>
            <a className="font-semibold text-[#1457d9]" href={`mailto:${companyContact.email}`}>
              {companyContact.email}
            </a>
          </div>

          <div className="mt-8 grid gap-6">
            {legalSections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-bold text-slate-950">{section.title}</h2>
                <p className="mt-2">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded border border-slate-200 bg-white p-4 text-xs leading-6 text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Related policies: review HACIEN&apos;s Terms of Use and Privacy Policy for website, RFQ,
              and data handling details.
            </p>
            <div className="flex gap-3 font-bold text-[#1457d9]">
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
