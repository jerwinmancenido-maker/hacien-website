import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { companyContact } from "@/data/companyContact";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for HACIEN Information Technology Solutions website and RFQ Gateway.",
};

const terms = [
  {
    title: "Website purpose",
    body: "The HACIEN website provides company information, technology domain information, inquiry paths, support routing, and request-for-quotation intake. It is not an online checkout, public marketplace, or payment portal.",
  },
  {
    title: "Technology and product information",
    body: "Technology categories, example items, specifications, and descriptions are provided to help customers describe requirements. They do not guarantee stock, final model, price, warranty, delivery date, or supplier availability.",
  },
  {
    title: "RFQ submissions",
    body: "Submitting an RFQ, file, BOQ, specification, existing supplier quote, or message starts HACIEN's review process only. It does not create a purchase order, sales contract, payment obligation, or official quotation.",
  },
  {
    title: "Formal quotations and commitments",
    body: "Commercial commitments are made only through formal quotation, order, invoice, receipt, contract, or written business communication issued through authorized HACIEN channels.",
  },
  {
    title: "Quotation validity and equivalent items",
    body: "Unless a quotation states otherwise, quotations are generally valid for 15 days. Prices, availability, delivery dates, and equivalent items may change because of supplier availability, foreign exchange movement, product lifecycle, seller discretion, or other commercial constraints. Equivalent items may be proposed when accepted by the customer.",
  },
  {
    title: "Warranty basis",
    body: "Unless a quotation states a separate HACIEN service warranty, product warranty follows the applicable supplier, distributor, or manufacturer warranty. Customer warranty claims are normally handled directly with the brand, supplier, or authorized warranty channel, while HACIEN will make reasonable efforts to assist the customer with warranty coordination when possible.",
  },
  {
    title: "Warranty exclusions and verification",
    body: "Consumables, software licenses, installation labor, physical damage, misuse, unauthorized repair, and other exclusions depend on the applicable supplier, distributor, manufacturer, license, or service terms. If warranty coverage is not stated in the quotation or supporting supplier document, the customer should verify coverage before acceptance.",
  },
  {
    title: "Returns and replacements",
    body: "Return, replacement, and refund handling follows applicable Philippine government guidelines, supplier or manufacturer terms, and the formal quotation or written agreement for the transaction. Missing, damaged, incorrect, or defective items should be reported immediately for review and proper investigation.",
  },
  {
    title: "Payment and invoices",
    body: "Payment due dates and partial payment requirements depend on the customer terms, quotation, invoice, purchase order, or written agreement. Accepted payment methods may include cash, bank transfer, or cheque, subject to confirmation in formal business communication.",
  },
  {
    title: "Late payment",
    body: "Overdue balances may be subject to a late payment charge of 3% per month when stated in the quotation, invoice, contract, purchase order acceptance, or written agreement. HACIEN may require account review before continuing additional procurement or delivery work for accounts with outstanding balances.",
  },
  {
    title: "Tax treatment",
    body: "Prices, VAT treatment, withholding, official receipts, sales invoices, and other tax-related treatment depend on the customer status, HACIEN tax status, applicable law, and the formal quotation or invoice issued for the transaction.",
  },
  {
    title: "Delivery and acceptance",
    body: "Delivery charges are normally paid by the customer unless the quotation states that HACIEN will handle delivery. HACIEN may coordinate delivery through third-party logistics or other delivery channels. Items are generally considered received or accepted when delivered to and received by the customer or authorized representative.",
  },
  {
    title: "Receiving requirements",
    body: "If the customer is unavailable to receive items, the customer should advise HACIEN or the assigned account manager in advance regarding the authorized receiver. Gate passes, receiving schedules, site access requirements, and special delivery instructions should be processed before delivery whenever required.",
  },
  {
    title: "Government and institutional procurement",
    body: "Government procurement content is informational and support-oriented. HACIEN may help with specification review, equivalent matching, quotation preparation, and documentation organization, but buyer-side compliance decisions remain with the buyer's authorized procurement office or responsible authority.",
  },
  {
    title: "Verification and company documents",
    body: "Company verification documents may be made available upon request to qualified customers, suppliers, partners, and procurement entities. Public pages should not be interpreted as a complete legal, tax, finance, accreditation, or permitting file.",
  },
  {
    title: "Acceptable use",
    body: "Visitors should not submit false information, abusive requests, malicious files, spam, unauthorized credentials, or content unrelated to legitimate business inquiry, support, or quotation review.",
  },
  {
    title: "Changes",
    body: "HACIEN may update website content, public terms, RFQ paths, technology categories, and inquiry processes as operations mature, provided public claims remain truthful and supported.",
  },
];

export default function TermsPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Terms"
          as="h1"
          title="Terms of Use"
          description="These terms explain how visitors should understand HACIEN's public website, technology information, RFQ Gateway, and inquiry paths."
        />
        <div className="surface mt-10 rounded-lg p-6 text-sm leading-7 text-slate-700">
          <p>
            HACIEN INFORMATION TECHNOLOGY SOLUTIONS operates this website as a professional information,
            inquiry, support, and request-for-quotation channel. Use of this website means the visitor
            understands that public content supports business review and does not replace formal written documents.
          </p>
          <p className="mt-4">
            For formal business communication, contact HACIEN at{" "}
            <a className="font-semibold text-[#1457d9]" href={`mailto:${companyContact.email}`}>
              {companyContact.email}
            </a>
            .
          </p>
          <div className="mt-8 grid gap-6">
            {terms.map((term) => (
              <section key={term.title}>
                <h2 className="text-lg font-bold text-slate-950">{term.title}</h2>
                <p className="mt-2">{term.body}</p>
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
