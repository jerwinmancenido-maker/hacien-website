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
        text: "Refers to HACIEN Information Technology Solutions, a legally registered sole proprietorship/business entity operating under the laws of the Republic of the Philippines, with registered office address at Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio, Pasig City, Metro Manila, Philippines 1605.",
      },
      {
        label: "Website",
        text: "Refers to the public portal haciensolutions.com, including all its subdomains, page layouts, underlying source code, media assets, forms, and digital directories.",
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
        text: "Refers to a formally numbered, dated, and signed commercial proposal issued by an authorized representative of HACIEN through the @haciensolutions.com domain.",
      },
    ],
  },
  {
    title: "2. Website Purpose and Limitations",
    paragraphs: [
      "The HACIEN website serves solely as a professional enterprise technology showcase, business inquiry portal, support ticket routing channel, and Request-For-Quotation intake path. The Website does not support instant online checkouts, public e-commerce transactions, or direct payment gateway integrations. No binding commercial purchase, credit agreement, or delivery obligation can be created or finalized directly on this Website. All transactions require subsequent offline validation, formal document exchange, and bilateral agreement.",
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
      "HACIEN is bound only by commercial commitments issued through formal, numbered written documents, such as official quotations, proforma invoices, sales invoices, or master services agreements. These documents must be signed or approved by authorized HACIEN personnel and sent via official corporate communication paths, specifically using email addresses ending in @haciensolutions.com. Verbal communications, website content, and automated form acknowledgments do not constitute binding commitments.",
    ],
  },
  {
    title: "6. Quotation Validity, Equivalents, and Price Fluctuations",
    bullets: [
      {
        label: "Default Validity",
        text: "Unless a HACIEN quotation explicitly indicates a different period, all quotations are valid for fifteen calendar days from the date of issuance.",
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
        label: "Pass-Through Warranty",
        text: "Unless the Customer purchases a separate local support or maintenance package directly from HACIEN, all product warranties are provided strictly by the original equipment manufacturer, software vendor, or principal distributor.",
      },
      {
        label: "Liaison Support",
        text: "HACIEN will act as a reasonable commercial liaison to help the Customer coordinate warranty claims, check return merchandise authorization eligibility, and locate authorized service centers. HACIEN does not assume primary warranty liability for third-party hardware failures.",
      },
    ],
  },
  {
    title: "8. Warranty Exclusions and Verification",
    bullets: [
      {
        label: "Standard Exclusions",
        text: "Warranties do not cover consumable parts, batteries, software errors, configuration losses, on-site labor fees, or damages caused by power surges, physical drops, water intrusion, natural disasters, unauthorized alterations, or improper technical environments.",
      },
      {
        label: "Verification Duty",
        text: "The Customer must verify the specific warranty parameters, terms, and service centers for all products prior to accepting HACIEN's commercial quotation.",
      },
    ],
  },
  {
    title: "9. Returns, Replacements, and Refunds",
    bullets: [
      {
        label: "Compliance Framework",
        text: "Returns and replacements are governed by the Consumer Act of the Philippines, Republic Act No. 7394, the specific return policies of the vendor/manufacturer, and the final terms of the transaction.",
      },
      {
        label: "Inspection and Reporting",
        text: "The Customer must inspect all shipments immediately upon delivery. Any missing, damaged, incorrect, or defective items must be reported to HACIEN in writing within twenty-four to forty-eight hours of receipt to qualify for return or replacement reviews.",
      },
      {
        label: "Custom Orders",
        text: "Activated software licenses, cloud subscriptions, and custom-built or special-order hardware systems are non-cancelable and non-refundable once the procurement process begins.",
      },
    ],
  },
  {
    title: "10. Payment Terms, Invoices, and Credit",
    bullets: [
      {
        label: "Contractual Payment Terms",
        text: "Payment terms, down payments, progress billing milestones, and due dates are governed strictly by the formal quotation, proforma invoice, or contract.",
      },
      {
        label: "Verification",
        text: "Payment is considered finalized only when check deposits clear HACIEN's bank account, typically three to five banking days for local checks, or when bank transfers are confirmed as cleared by HACIEN's finance department.",
      },
    ],
  },
  {
    title: "11. Late Payment Charges",
    bullets: [
      {
        label: "Interest Accrual",
        text: "Overdue accounts are subject to a late payment interest charge of three percent per month, calculated daily on the outstanding balance, from the day following the payment due date until the balance is paid in full.",
      },
      {
        label: "Work Suspension",
        text: "HACIEN reserves the right to suspend deliveries, pause technical support, deactivate cloud subscriptions, and halt ongoing procurement actions for any Customer account with an outstanding overdue balance.",
      },
    ],
  },
  {
    title: "12. Tax Treatment and BIR Form 2307",
    bullets: [
      {
        label: "VAT Invoicing",
        text: "All transaction prices are subject to the standard twelve percent Value Added Tax in the Philippines, unless the Customer provides valid tax exemption or zero-rated certificates, such as PEZA or BOI certifications, at the time of quotation.",
      },
      {
        label: "Creditable Withholding Tax",
        text: "B2B corporate customers deducting Creditable Withholding Tax must submit a completed and signed BIR Form 2307 stating the correct withholding tax rate of 1% or 2% before or at the time of check release or bank transfer. If Form 2307 is not submitted, the Customer must pay the gross invoiced amount in full.",
      },
    ],
  },
  {
    title: "13. Delivery, Logistics, and Site Access",
    bullets: [
      {
        label: "Logistics Costs",
        text: "Delivery fees are billed to the Customer unless the formal quotation specifies that HACIEN will handle transport costs.",
      },
      {
        label: "Delivery Authorization",
        text: "The Customer is responsible for coordinating loading dock access, receiving schedules, local permits, and building gate passes before delivery.",
      },
      {
        label: "Authorized Receivers",
        text: "The Customer must notify HACIEN in writing if a specific authorized representative is assigned to receive the delivery. Delivery signatures by security guards, receptionist desks, or building representatives at the Customer's address constitute valid proof of delivery.",
      },
    ],
  },
  {
    title: "14. Government and Institutional Procurement",
    bullets: [
      {
        label: "Procurement Reform Act Compliance",
        text: "HACIEN supports PhilGEPS-registered buyers and government entities under the Government Procurement Reform Act, Republic Act No. 9184.",
      },
      {
        label: "Specification Decisions",
        text: "While HACIEN assists with market research, technical spec comparisons, and document organization, the final responsibility for bid compliance, specifications verification, and award decisions remains solely with the procuring agency's Bids and Awards Committee or head of the procuring entity.",
      },
    ],
  },
  {
    title: "15. Verification and Corporate Documents",
    paragraphs: [
      "Company verification documents, including DTI/SEC registrations, BIR Form 2303, Mayor's Permits, and PhilGEPS registration certificates, are available upon request only to qualified prospective buyers, procurement entities, and suppliers. The Website's public pages do not serve as a public repository for corporate compliance audits, financial reports, or licensing directories.",
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
        text: "To complete quotes, register deals with IT manufacturers, provision cloud licenses, and arrange shipping, HACIEN may share transaction details such as contact name, company name, address, and equipment list with authorized distributors, logistics partners, and hardware manufacturers.",
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
            {terms.map((term) => (
              <section key={term.title} className="rounded-lg border border-slate-200 bg-white p-5">
                <h2 className="text-lg font-bold text-slate-950">{term.title}</h2>
                {term.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3">
                    {paragraph}
                  </p>
                ))}
                {term.bullets ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    {term.bullets.map((bullet) => (
                      <li key={`${bullet.label ?? ""}${bullet.text}`}>
                        {bullet.label ? <strong className="text-slate-950">{bullet.label}: </strong> : null}
                        {bullet.text}
                      </li>
                    ))}
                  </ul>
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
