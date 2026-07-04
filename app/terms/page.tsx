import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { companyContact } from "@/data/companyContact";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for HACIEN Information Technology Solutions website, technology information, RFQ Gateway, and inquiry paths.",
};

type TermSection = {
  title: string;
  paragraphs?: string[];
  bullets?: Array<{
    label?: string;
    text: string;
  }>;
};

const terms: TermSection[] = [
  {
    title: "1. Definitions and Parties",
    bullets: [
      {
        label: "HACIEN",
        text: "Refers to HACIEN Information Technology Solutions, the HACIEN brand and DTI-registered business name used for this public website. Public company identity statements are limited to supported DTI and BIR registration facts and the published BIR registered address / office location.",
      },
      {
        label: "Website",
        text: "Refers to haciensolutions.com and its public pages, media assets, inquiry forms, RFQ intake paths, and informational directories.",
      },
      {
        label: "User or Visitor",
        text: "Refers to any individual, corporate representative, procurement officer, supplier, partner, or institutional agent who accesses, browses, or interacts with the Website.",
      },
      {
        label: "RFQ Gateway",
        text: "Refers to the collection of online forms, upload modules, Bill of Quantities ingest systems, and requirements intake channels hosted on the Website.",
      },
      {
        label: "Official Quotation",
        text: "Refers to a formally reviewed written commercial proposal issued by HACIEN after requirements, supplier inputs, availability, delivery assumptions, payment terms, tax treatment, and other commercial conditions are reviewed for that specific request.",
      },
    ],
  },
  {
    title: "2. Website Purpose and Limitations",
    paragraphs: [
      "The HACIEN website serves solely as a professional enterprise technology showcase, business inquiry path, support routing channel, and Request-For-Quotation intake path. The Website does not support instant online checkouts, public e-commerce transactions, or direct payment gateway integrations. No binding commercial purchase, credit agreement, or delivery obligation can be created or finalized directly on this Website. All transactions require subsequent validation, formal document exchange, and written agreement.",
    ],
  },
  {
    title: "3. Technology, Specifications, and Product Information",
    bullets: [
      {
        label: "Informational Purpose",
        text: "Technology categories, specifications, sheets, diagrams, product descriptions, and brand logos displayed on the Website are provided for general reference only to help visitors describe their technical requirements.",
      },
      {
        label: "Availability and Customization",
        text: "Product listings do not guarantee immediate stock availability, specific local unit pricing, manufacturer lead times, or distributor allocations. Due to the rapid lifecycle of enterprise IT hardware, software-as-a-service tiers, and cloud platforms, HACIEN reserves the right to propose equivalent, updated, or customized configurations during the formal quotation process.",
      },
    ],
  },
  {
    title: "4. RFQ Gateway Submissions and Inquiry Review",
    bullets: [
      {
        label: "No Contract Created",
        text: "The submission of a request, Bill of Quantities, product specification, network diagram, competitor quotation, or text message through the RFQ Gateway serves as an invitation to treat. It does not establish a sales contract, purchase order, credit line, payment obligation, or binding service agreement.",
      },
      {
        label: "Submission Integrity",
        text: "Visitors represent that all uploaded files and contact details are accurate, legitimate, and secure. HACIEN reserves the right to reject, flag, or delete submissions that contain incomplete information, burner email domains, or metadata indicative of malicious uploads.",
      },
    ],
  },
  {
    title: "5. Formal Quotations and Commitments",
    paragraphs: [
      "HACIEN is bound only by commitments stated in formal written documents or written business communication approved for the specific transaction. Website content, public forms, automated acknowledgments, product pages, and general discussions do not create pricing, delivery, warranty, payment, tax, supplier, or service commitments.",
    ],
  },
  {
    title: "6. Quotation Validity, Equivalents, and Price Fluctuations",
    bullets: [
      {
        label: "Default Validity",
        text: "Quotation validity is controlled by the specific written quotation or commercial document. The website does not set a default validity period.",
      },
      {
        label: "Price Volatility",
        text: "Prior to the Customer's formal acceptance and HACIEN's confirmation, unit prices, delivery timelines, and availability remain subject to change due to international supply chain disruptions, vendor price adjustments, or foreign exchange rate movements such as USD/PHP.",
      },
      {
        label: "Equivalents",
        text: "If a requested component, model, or license becomes unavailable or reaches End-of-Life, HACIEN may propose equivalent or superior alternatives. Such equivalent items will only be delivered upon written acceptance by the Customer.",
      },
    ],
  },
  {
    title: "7. Warranty Basis and Service Coordination",
    bullets: [
      {
        label: "Request-Specific Warranty Context",
        text: "Warranty coverage, support scope, replacement handling, and service-center paths are request-specific and must be confirmed through supplier, distributor, manufacturer, vendor, or formal HACIEN quotation evidence before the Customer relies on them.",
      },
      {
        label: "Coordination Boundary",
        text: "HACIEN may help route warranty or service questions when the relevant quotation, product, supplier, and delivery context is available. This website does not create a HACIEN warranty commitment for third-party goods or services.",
      },
    ],
  },
  {
    title: "8. Warranty Exclusions and Verification",
    bullets: [
      {
        label: "Standard Exclusions",
        text: "Any exclusions, service limitations, consumable coverage, on-site labor terms, software support, or damage handling must be checked against the applicable supplier, distributor, manufacturer, vendor, or formal transaction document.",
      },
      {
        label: "Verification Duty",
        text: "Customers should review the specific warranty and support evidence before accepting a quotation or making a procurement decision.",
      },
    ],
  },
  {
    title: "9. Returns, Replacements, and Refunds",
    bullets: [
      {
        label: "Review Basis",
        text: "Returns, replacements, cancellations, and refunds are reviewed against the formal transaction documents and the applicable supplier, distributor, manufacturer, vendor, and legal context.",
      },
      {
        label: "Inspection and Reporting",
        text: "Customers should inspect deliveries promptly and report missing, damaged, incorrect, or defective items in writing with supporting details. Any reporting window must come from the applicable formal document or verified policy.",
      },
      {
        label: "Custom Orders",
        text: "Special-order hardware, activated licenses, subscriptions, and custom configurations may have cancellation limits, but those limits must be stated in the applicable formal document or verified supplier/vendor policy.",
      },
    ],
  },
  {
    title: "10. Payment Terms, Invoices, and Credit",
    bullets: [
      {
        label: "Contractual Payment Terms",
        text: "Payment terms, accepted payment methods, down payments, billing milestones, due dates, receipt handling, and fraud-prevention instructions must come from formal written communication or approved transaction documents for that specific request.",
      },
      {
        label: "Verification",
        text: "The website does not publish bank account details or standing payment instructions. Visitors should not send payment based on website text, public forms, screenshots, or unverified messages.",
      },
    ],
  },
  {
    title: "11. Late Payment Charges",
    bullets: [
      {
        label: "Document-Controlled Terms",
        text: "Late fees, interest, collection steps, service pauses, or work suspension terms apply only when stated in the relevant formal quotation, contract, invoice, or written agreement.",
      },
      {
        label: "No Website-Only Penalty",
        text: "No late-payment penalty or service suspension is created by website text alone.",
      },
    ],
  },
  {
    title: "12. Tax Treatment and BIR Form 2307",
    bullets: [
      {
        label: "Tax Boundary",
        text: "Public BIR registration facts identify HACIEN's registration context only. VAT, withholding tax, BIR Form 2307, receipt, invoice, exemption, and other tax treatment must be confirmed through finance/accounting review and the applicable formal transaction document.",
      },
      {
        label: "No Tax Advice",
        text: "Website content is not tax advice and should not be used to determine a customer's withholding, VAT, exemption, accounting, or remittance obligations.",
      },
    ],
  },
  {
    title: "13. Delivery, Logistics, and Site Access",
    bullets: [
      {
        label: "Logistics Costs",
        text: "Delivery fees, logistics handling, site access, receiving requirements, and handover assumptions are confirmed per request through formal quotation or written communication.",
      },
      {
        label: "Delivery Authorization",
        text: "Customers should share delivery site, receiving schedule, gate pass, building access, and local access requirements during RFQ review so they can be considered before fulfillment.",
      },
      {
        label: "Authorized Receivers",
        text: "Receiver authority, delivery acceptance, and proof-of-delivery rules must be stated in the applicable formal document or agreed written communication.",
      },
    ],
  },
  {
    title: "14. Government and Institutional Procurement",
    bullets: [
      {
        label: "Preparation Support",
        text: "HACIEN may support government and institutional procurement preparation by reviewing buyer-provided specifications, RFQ context, equivalent options, quotation inputs, and documentation requirements.",
      },
      {
        label: "Specification Decisions",
        text: "HACIEN does not claim buyer-side authority, award authority, accreditation, PhilGEPS status, or legal compliance approval through this website. Final procurement, specification, compliance, and award decisions remain with the buyer or procuring entity.",
      },
    ],
  },
  {
    title: "15. Verification and Corporate Documents",
    paragraphs: [
      "Public company verification statements are limited to supported DTI and BIR facts and the published BIR registered address / office location. Additional documents, permits, signatory details, bank/payment information, supplier accreditation materials, or tax interpretations are shared only when verified, approved for release, and relevant to a qualified business request.",
    ],
  },
  {
    title: "16. Intellectual Property",
    paragraphs: [
      "All content, page headers, custom graphics, source code, data layouts, templates, logo designs, and system architectures displayed on this Website are the exclusive intellectual property of HACIEN or its technology licensors. Unauthorized copying, scraping, hosting, distributing, or commercial reuse of this intellectual property without HACIEN's express written approval is strictly prohibited.",
    ],
  },
  {
    title: "17. Data Privacy and Operational Sharing",
    bullets: [
      {
        label: "Privacy Compliance",
        text: "HACIEN processes all personal information in accordance with the Data Privacy Act of 2012, Republic Act No. 10173. Submitting information through the Website constitutes consent to process data for commercial inquiry purposes.",
      },
      {
        label: "Necessary Disclosures",
        text: "When needed to review a request or prepare a quotation, HACIEN may share relevant inquiry details with appropriate suppliers, distributors, vendors, logistics contacts, or service providers. Sharing should be limited to the context needed for the inquiry or transaction.",
      },
    ],
  },
  {
    title: "18. Acceptable Use and Security",
    bullets: [
      {
        label: "Prohibited Use",
        text: "Visitors are prohibited from uploading files containing malware, trying to bypass site authentication, scanning HACIEN networks for vulnerabilities, or using the contact forms for spam or unrelated advertisements.",
      },
      {
        label: "Legal Prosecutions",
        text: "Unauthorized access, security penetration, and system disruption are prohibited and will be prosecuted under the Cybercrime Prevention Act of 2012, Republic Act No. 10175.",
      },
    ],
  },
  {
    title: "19. Liability Limitation and Excluded Losses",
    bullets: [
      {
        label: "Liability Cap",
        text: "To the maximum extent permitted by Philippine law, HACIEN's total liability for any claim arising out of a transaction or website interaction is limited to the actual amount paid by the Customer to HACIEN for that specific transaction.",
      },
      {
        label: "Excluded Losses",
        text: "HACIEN is not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, network downtime, business interruption, data loss, or losses resulting from delivery delays, supplier allocations, or force majeure events.",
      },
    ],
  },
  {
    title: "20. Changes and Policy Updates",
    paragraphs: [
      "HACIEN reserves the right to modify, amend, or update these Terms of Use at any time. Changes become effective immediately upon being published on this page. Visitors are responsible for reviewing these terms periodically.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Terms"
          as="h1"
          title="Terms of Use"
          description="These terms explain how visitors should understand HACIEN's public website, technology information, RFQ Gateway, and inquiry paths."
        />

        <div className="surface mt-10 rounded-lg p-6 text-sm leading-7 text-slate-700 sm:p-8">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="grid gap-3 sm:grid-cols-3">
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
            <p className="mt-4">
              These terms explain how visitors should understand HACIEN&apos;s public website,
              technology information, RFQ Gateway, and inquiry paths. Use of this website indicates
              that the visitor understands that public content supports business review and does not
              replace formal written documents.
            </p>
            <p className="mt-4">
              For formal business communication, contact HACIEN at{" "}
              <a className="font-semibold text-[#1457d9]" href={`mailto:${companyContact.email}`}>
                {companyContact.email}
              </a>
              .
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            {terms.map((term, termIndex) => (
              <section key={term.title} className="rounded-lg border border-slate-200 bg-white p-5">
                <h2 className="text-lg font-bold text-slate-950">{term.title}</h2>
                {term.paragraphs ? (
                  <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50/70 p-4">
                    <h3 className="font-bold text-slate-950">
                      {termIndex + 1}.1 General Provisions
                    </h3>
                    {term.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="mt-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
                {term.bullets ? (
                  <div className="mt-4 grid gap-3">
                    {term.bullets.map((bullet, bulletIndex) => (
                      <div
                        key={`${bullet.label ?? ""}${bullet.text}`}
                        className="rounded-lg border border-slate-100 bg-slate-50/70 p-4"
                      >
                        <h3 className="font-bold text-slate-950">
                          {termIndex + 1}.{term.paragraphs ? bulletIndex + 2 : bulletIndex + 1}{" "}
                          {bullet.label ?? "Clause"}
                        </h3>
                        <p className="mt-2">{bullet.text}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <p className="mt-8 rounded border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-600">
            If a formal quotation, purchase order, invoice, contract, or written agreement conflicts with
            general website content, the formal business document controls for that transaction.
          </p>
        </div>
      </div>
    </section>
  );
}
