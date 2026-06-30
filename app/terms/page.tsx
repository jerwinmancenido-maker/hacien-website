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
        text: "refers to HACIEN Information Technology Solutions, with registered office at Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio, Pasig City, Philippines 1605.",
      },
      {
        label: "Website",
        text: "refers to haciensolutions.com, its subdomains, and related electronic portal services.",
      },
      {
        label: "User or Visitor",
        text: "refers to any individual, business entity, or government/institutional representative accessing this website.",
      },
      {
        label: "RFQ Gateway",
        text: "refers to the online Request-For-Quotation, Bill of Quantities upload, and requirement submission tools hosted on the Website.",
      },
    ],
  },
  {
    title: "2. Website Purpose and Limitations",
    paragraphs: [
      "The HACIEN website serves solely as a professional technology showcase, business inquiry portal, customer support directory, and Request-For-Quotation intake channel. It does not operate as an online checkout, public marketplace, or payment portal. No direct commercial purchases or financial transactions can be finalized directly on this Website.",
    ],
  },
  {
    title: "3. Technology, Specifications, and Product Information",
    bullets: [
      {
        label: "Informational Purpose",
        text: "Technology categories, example items, specifications, diagrams, and product descriptions are published on this Website for reference and requirement identification purposes only.",
      },
      {
        label: "Availability and Pricing",
        text: "These listings do not guarantee stock, manufacturer models, pricing, warranty coverage, delivery dates, or supplier commitments. Product specifications and availability are subject to rapid change due to IT lifecycle changes and vendor allocations.",
      },
    ],
  },
  {
    title: "4. RFQ Gateway Submissions and Inquiry Review",
    bullets: [
      {
        label: "No Contract Created",
        text: "Submitting a request, BOQ, file, specification sheet, existing supplier quote, or message through the RFQ Gateway starts HACIEN's review process only. It does not create a purchase order, sales contract, payment obligation, or official commercial quotation.",
      },
      {
        label: "Verification and Security",
        text: "HACIEN reserves the right to reject, filter, or ignore submissions that contain incomplete contact information, invalid email domains, or look-alike credentials.",
      },
    ],
  },
  {
    title: "5. Formal Quotations and Commitments",
    paragraphs: [
      "Binding commercial commitments are made only through a formal, numbered quotation, proforma invoice, sales contract, or official written business communication issued directly by authorized HACIEN representatives via @haciensolutions.com.",
    ],
  },
  {
    title: "6. Quotation Validity, Equivalents, and Price Fluctuations",
    bullets: [
      {
        label: "Validity",
        text: "Unless a HACIEN quotation states otherwise, quotations are generally valid for fifteen calendar days from the date of issue.",
      },
      {
        label: "Price Movements",
        text: "Prices, availability, delivery dates, and equivalent items are subject to change because of supplier inventory status, foreign exchange movement, product lifecycle transitions, seller discretion, or other commercial constraints.",
      },
      {
        label: "Equivalents",
        text: "Equivalent items may be proposed by HACIEN and will be processed upon approval by the customer.",
      },
    ],
  },
  {
    title: "7. Warranty Basis and Service Coordination",
    bullets: [
      {
        label: "Pass-Through Warranty",
        text: "Unless a quotation states a separate, local service warranty provided by HACIEN, all product warranties follow the terms of the applicable supplier, distributor, or manufacturer.",
      },
      {
        label: "Claims Handling",
        text: "Customer warranty claims are normally handled directly with the brand, supplier, or authorized warranty channel. HACIEN will make reasonable efforts to assist the customer with warranty coordination when possible.",
      },
    ],
  },
  {
    title: "8. Warranty Exclusions and Verification",
    bullets: [
      {
        label: "Exclusions",
        text: "Consumables, software licenses, installation labor, physical damage, misuse, unauthorized repair, and other exclusions depend on the applicable supplier, distributor, manufacturer, license, or service terms.",
      },
      {
        label: "Customer Verification",
        text: "If warranty coverage is not explicitly stated in the quotation or supporting supplier documents, the customer is responsible for verifying coverage details before order acceptance.",
      },
    ],
  },
  {
    title: "9. Returns, Replacements, and Refunds",
    paragraphs: [
      "Return, replacement, and refund handling follows applicable Philippine government guidelines, such as the Consumer Act of the Philippines, supplier or manufacturer terms, and the formal quotation or written agreement for the transaction.",
      "Missing, damaged, incorrect, or defective items must be reported to HACIEN in writing within twenty-four to forty-eight hours of delivery to initiate review and proper investigation.",
    ],
  },
  {
    title: "10. Payment Terms, Invoices, and Credit",
    bullets: [
      {
        label: "Terms",
        text: "Payment due dates and partial payment requirements depend on the customer terms, quotation, invoice, purchase order, or written agreement.",
      },
      {
        label: "Methods",
        text: "Accepted payment methods include cash, bank transfer, or cheque, subject to clearing and confirmation in formal business communication.",
      },
    ],
  },
  {
    title: "11. Late Payment Charges",
    paragraphs: [
      "Overdue balances may be subject to a late payment charge of three percent per month when stated in the quotation, invoice, contract, purchase order acceptance, or written agreement. HACIEN reserves the right to suspend additional procurement, licensing, or delivery work for accounts with outstanding overdue balances.",
    ],
  },
  {
    title: "12. Tax Treatment and BIR Form 2307",
    bullets: [
      {
        label: "VAT",
        text: "Prices, VAT treatment, and other tax-related billing depend on the customer status, HACIEN tax status, applicable law, and the formal quotation or invoice.",
      },
      {
        label: "Withholding Taxes",
        text: "Corporate customers deducting Creditable Withholding Tax must provide HACIEN with a completed and signed BIR Form 2307 at the time of payment. Failure to provide Form 2307 will require the customer to settle the gross invoiced amount in full.",
      },
    ],
  },
  {
    title: "13. Delivery, Logistics, and Site Access",
    bullets: [
      {
        label: "Charges",
        text: "Delivery charges are normally paid by the customer unless the quotation states that HACIEN will handle delivery. HACIEN may coordinate delivery through internal logistics or third-party carriers.",
      },
      {
        label: "Risk and Acceptance",
        text: "Items are generally considered received or accepted when delivered to and received by the customer or authorized representative.",
      },
      {
        label: "Access Coordination",
        text: "If the customer is unavailable to receive items, the customer must advise HACIEN or the assigned account manager in advance regarding the authorized receiver. Gate passes, receiving schedules, site access requirements, and special delivery instructions must be processed by the customer before delivery.",
      },
    ],
  },
  {
    title: "14. Government and Institutional Procurement",
    paragraphs: [
      "Government procurement content is informational and support-oriented. HACIEN may help with specification review, equivalent matching, quotation preparation, and documentation organization. However, buyer-side compliance decisions remain with the buyer's authorized procurement office, BAC, or responsible authority under the Government Procurement Reform Act, Republic Act No. 9184.",
    ],
  },
  {
    title: "15. Verification and Corporate Documents",
    paragraphs: [
      "Company verification documents, such as BIR Form 2303, DTI/SEC registrations, and Mayor's Permits, may be made available upon request to qualified customers, suppliers, partners, and procurement entities. Public pages should not be interpreted as a complete legal, tax, finance, accreditation, or permitting file.",
    ],
  },
  {
    title: "16. Intellectual Property",
    paragraphs: [
      "All website designs, text, code, graphics, quotation structures, templates, and corporate assets are the property of HACIEN or its licensors. No content may be copied, distributed, reused, or shared outside a transaction without HACIEN's prior written approval.",
    ],
  },
  {
    title: "17. Data Privacy and Operational Sharing",
    bullets: [
      {
        label: "Privacy",
        text: "HACIEN complies with the Data Privacy Act of 2012, Republic Act No. 10173. Any personal information collected through contact forms or the RFQ Gateway will be processed solely for legitimate business purposes.",
      },
      {
        label: "Operational Sharing",
        text: "HACIEN may share transaction details with suppliers, manufacturers, distributors, logistics providers, software vendors, and warranty channels when needed for quotation preparation, deal registration, procurement, fulfillment, delivery, warranty coordination, support, or lawful business operations.",
      },
    ],
  },
  {
    title: "18. Acceptable Use and Security",
    bullets: [
      {
        label: "Prohibitions",
        text: "Visitors must not submit false information, abusive requests, malicious files, spam, unauthorized credentials, or content unrelated to legitimate business inquiry, support, or quotation review.",
      },
      {
        label: "Cybercrime Laws",
        text: "Unauthorized access, scraping, security penetration testing, or system disruption attempts are prohibited and may be prosecuted under the Cybercrime Prevention Act of 2012, Republic Act No. 10175.",
      },
    ],
  },
  {
    title: "19. Liability Limitation and Excluded Losses",
    bullets: [
      {
        label: "Liability Cap",
        text: "HACIEN's total liability for a transaction is limited to the amount paid by the customer for the affected transaction.",
      },
      {
        label: "Excluded Losses",
        text: "HACIEN is not liable for indirect, incidental, special, consequential, or punitive losses, including lost profits, downtime, data loss, business interruption, lost opportunity, or loss caused by third-party products, services, logistics, supplier decisions, customer delay, or customer-provided information.",
      },
    ],
  },
  {
    title: "20. Changes and Policy Updates",
    paragraphs: [
      "HACIEN may update website content, public terms, RFQ paths, technology categories, and inquiry processes as operations mature, provided public claims remain truthful and supported.",
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
            <p>
              Use of this website indicates that the visitor understands that public content supports
              business review and does not replace formal written documents.
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
