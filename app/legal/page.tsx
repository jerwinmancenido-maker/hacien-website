import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { companyContact } from "@/data/companyContact";

export const metadata: Metadata = {
  title: "Legal Information, Terms of Use, and General Business Conditions",
  description:
    "Legal information, terms of use, and general business conditions for HACIEN Information Technology Solutions.",
};

type LegalSection = {
  title: string;
  items: Array<{
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

const legalSections: LegalSection[] = [
  {
    title: "1. Legal Entity and Registered Office for Formal Notices",
    items: [
      {
        heading: "1.1 Corporate Identity",
        paragraphs: [
          "HACIEN Information Technology Solutions is a legally registered business entity operating under the laws of the Republic of the Philippines. HACIEN operates this website, its subdomains, and related electronic communication systems.",
          "Proprietor documents, tax registration certificates such as BIR Form 2303, business permits, and supporting corporate credentials will be disclosed only through formal, non-public business communications to qualified customers, partners, suppliers, and procurement entities upon satisfactory verification of identity and business intent.",
        ],
      },
      {
        heading: "1.2 Registered Office",
        paragraphs: [
          "The official registered office of HACIEN for the receipt of all formal and legal notices is Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio, City of Pasig, Metro Manila, Philippines 1605.",
        ],
      },
      {
        heading: "1.3 Legal Notice Requirements",
        paragraphs: [
          "Formal legal notices, demands, or complaints must be sent via registered mail or reputable national courier service to the registered office address listed above.",
          `While HACIEN maintains ${companyContact.email} as its primary public contact for operational, commercial, and administrative coordination, electronic mail does not constitute valid service of process or formal legal notice unless HACIEN explicitly acknowledges receipt and confirms in a signed writing that electronic service is accepted for that specific instance.`,
        ],
      },
    ],
  },
  {
    title: "2. Legal Status of Public Information and Precedence",
    items: [
      {
        heading: "2.1 Informational Purpose",
        paragraphs: [
          "The content published on HACIEN's website, blog posts, marketing materials, and social media channels is provided for general informational purposes only. It does not constitute binding legal, technical, financial, or professional advice.",
        ],
      },
      {
        heading: "2.2 Order of Precedence",
        paragraphs: [
          "These Terms serve as the baseline framework for HACIEN's business relationships. In the event of a conflict between these Terms and any specific, executed agreement, the following order of precedence shall apply:",
        ],
        bullets: [
          "A formal, bilaterally signed contract, such as a Master Services Agreement or Service Level Agreement, executed by authorized representatives of both HACIEN and the Customer.",
          "An accepted HACIEN quotation, purchase order, or invoice, inclusive of any specific annexes or custom transaction terms attached thereto.",
          "These online Terms.",
          "General marketing copy, website descriptions, and public brochures.",
        ],
      },
    ],
  },
  {
    title: "3. Website Use, System Integrity, and Prohibited Misuse",
    items: [
      {
        heading: "3.1 Permitted Use",
        paragraphs: [
          "Users are granted a limited, revocable, non-exclusive, and non-transferable license to access the HACIEN website solely for legitimate business inquiries, product research, requesting quotations, and communicating with HACIEN's sales and support teams.",
        ],
      },
      {
        heading: "3.2 Prohibited Activities",
        paragraphs: [
          "Any unauthorized use or disruption of HACIEN's website, servers, networks, or databases is strictly prohibited. Prohibited activities include, but are not limited to:",
        ],
        bullets: [
          "Data scraping and extraction, including use of automated systems, spiders, robots, scrapers, or scripts to harvest data, product listings, pricing, specifications, or contact information from the website.",
          "System abuse, including spam, chain letters, unsolicited bulk communications, flooding, mail-bombing, or attempts to crash HACIEN's communications infrastructure.",
          "Malicious software, including viruses, trojan horses, worms, logic bombs, keyloggers, or other destructive or technologically harmful material.",
          "Fraudulent transactions, including false RFQs, fraudulent purchase orders, impersonation, or misrepresentation of affiliation with a business or government agency.",
          "Security penetration, including probing, scanning, vulnerability testing, or breaching security or authentication measures without express written authorization.",
        ],
      },
      {
        heading: "3.3 Cybercrime Prevention Act Compliance",
        paragraphs: [
          "HACIEN actively monitors its public systems. Violations of system security or unauthorized access may constitute criminal offenses under the Cybercrime Prevention Act of 2012, Republic Act No. 10175, and other applicable Philippine laws.",
          "HACIEN reserves the right to report suspected unlawful conduct to law enforcement authorities and will cooperate fully by disclosing system logs and user identities when legally required or appropriate.",
        ],
      },
    ],
  },
  {
    title: "4. Quotation Acceptance, Revision, and Cancellation",
    items: [
      {
        heading: "4.1 Quotation Issuance and Validity",
        paragraphs: [
          "Quotations, cost estimates, and commercial proposals issued by HACIEN are valid only for the period specified on the face of the document, typically fifteen calendar days from the date of issue. If no validity period is explicitly stated, the quotation shall default to a validity period of seven calendar days.",
        ],
      },
      {
        heading: "4.2 Acceptance Mechanisms",
        paragraphs: [
          "A quotation issued by HACIEN is not a binding contract until accepted. Customer acceptance of a HACIEN quotation must be made in writing and may be demonstrated by:",
        ],
        bullets: [
          "Returning a signed copy of the quotation.",
          "Issuing a formal purchase order referencing the HACIEN quotation number.",
          "Sending an email confirmation from an authorized organizational domain.",
          "Fulfilling payment terms, such as a downpayment, indicated in the quotation.",
        ],
      },
      {
        heading: "4.3 Quotation Revision, Price Adjustments, and Cancellation",
        paragraphs: [
          "HACIEN reserves the right to cancel, revise, or revalidate any quotation, even after client acceptance, prior to the actual fulfillment or delivery of goods and services under circumstances including supplier stock constraints, product discontinuation, foreign exchange volatility, manufacturer price changes, clerical or technical errors, credit risk, or failure to clear initial security or deposit requirements.",
          "In such cases, HACIEN will notify the Customer of the commercial changes and provide an updated proposal. If the Customer declines the revised pricing, HACIEN's sole liability will be to refund any advance payments made by the Customer for that specific unfulfilled order.",
        ],
      },
    ],
  },
  {
    title: "5. Customer Responsibilities and Pre-Fulfillment Obligations",
    items: [
      {
        heading: "5.1 Site Preparation and Technical Readiness",
        paragraphs: [
          "The Customer is solely responsible for reviewing and confirming that the technical specifications of hardware, software licenses, and configurations detailed in the quotation meet their operational requirements and infrastructure capabilities prior to order acceptance.",
          "The Customer must prepare the delivery site in accordance with the environmental specifications required by the equipment manufacturer, including power outlets, voltage regulators, cooling, cabling, and racking space where applicable.",
        ],
      },
      {
        heading: "5.2 Access, Clearance, and Logistics",
        paragraphs: [
          "The Customer must secure all required building clearances, gate passes, work permits, security badges, and local government permits necessary for HACIEN's delivery personnel or engineers to access the site.",
          "The Customer must provide accurate, complete, and safe delivery addresses, on-site contact persons, and telephone numbers.",
          "The Customer must designate an authorized representative on-site to inspect and sign for delivery of goods or completion of services. Signatures by designated guards, receptionists, or administrative staff in the Customer's office suite will be deemed valid proof of delivery.",
        ],
      },
      {
        heading: "5.3 Data Protection, Backups, and Security",
        paragraphs: [
          "Prior to HACIEN performing diagnostic, maintenance, installation, or configuration work on the Customer's servers, workstations, databases, cloud instances, or network equipment, the Customer must perform complete, verifiable, and secure off-site data backups. HACIEN accepts zero responsibility for data corruption, deletion, or loss.",
          "The Customer must safeguard all administrative credentials, API tokens, software licenses, and access profiles. Temporary credentials provided to HACIEN for setup must be revoked or changed by the Customer immediately upon completion of the service.",
        ],
      },
    ],
  },
  {
    title: "6. Vendor and Third-Party Terms and Conditions",
    items: [
      {
        heading: "6.1 Flow-Through of Third-Party Terms",
        paragraphs: [
          "HACIEN distributes, integrates, and provisions third-party products, including computer hardware, software licenses, SaaS subscriptions, cloud resources, and network appliances. All such products are subject to the respective manufacturer's, developer's, or service provider's standard agreements.",
        ],
        bullets: [
          "End User License Agreements.",
          "Cloud service terms and acceptable use policies.",
          "Hardware warranty policies and Return Merchandise Authorization procedures.",
        ],
      },
      {
        heading: "6.2 Customer Review Duty",
        paragraphs: [
          "The Customer is responsible for reviewing and complying with all third-party license agreements, subscription agreements, and software boundaries. By accepting HACIEN's quotation or using the delivered products, the Customer agrees to abide by those third-party terms.",
        ],
      },
      {
        heading: "6.3 Disclaimer of Vendor Performance",
        paragraphs: [
          "HACIEN is an independent system integrator and value-added reseller. HACIEN does not own the intellectual property of third-party software or manufacture third-party hardware. HACIEN is not responsible for service outages, software bugs, security vulnerabilities, or policy changes implemented by third-party vendors.",
        ],
      },
    ],
  },
  {
    title: "7. Limitation of Liability and Excluded Losses",
    items: [
      {
        heading: "7.1 Direct Damages Cap",
        paragraphs: [
          "To the maximum extent permitted by applicable law in the Republic of the Philippines, and unless otherwise agreed in a separate, formal, written contract signed by authorized representatives of both parties, HACIEN's total cumulative liability for any and all claims, disputes, losses, damages, or actions arising out of or in connection with any transaction, quotation, website use, or service provision shall be strictly limited to the actual amount paid by the Customer to HACIEN for the specific transaction or affected service giving rise to the claim.",
        ],
      },
      {
        heading: "7.2 Exclusion of Indirect and Consequential Damages",
        paragraphs: [
          "Under no circumstances shall HACIEN, its proprietor, employees, partners, sub-contractors, or suppliers be liable to the Customer or any third party for indirect, incidental, special, exemplary, punitive, or consequential damages, regardless of legal theory and even if HACIEN has been advised of the possibility of such damages.",
        ],
        bullets: [
          "Loss of actual or anticipated profits, revenues, or business opportunities.",
          "Loss, theft, corruption, deletion, or leakage of data, databases, or system configurations.",
          "Business interruption, network downtime, or system unavailability.",
          "Loss of goodwill, reputation, or anticipated savings.",
          "Damage, delay, or failure caused by third-party logistics carriers, port clearance delays, customs inspections, or supplier allocation limits.",
          "Delays caused by force majeure events, natural disasters, typhoons, floods, earthquakes, labor strikes, civil unrest, or governmental restrictions.",
        ],
      },
    ],
  },
  {
    title: "8. Intellectual Property and Confidentiality",
    items: [
      {
        heading: "8.1 Proprietary Material",
        paragraphs: [
          "All content published on HACIEN's website, including logos, graphics, designs, codebase, text, product descriptions, layouts, and templates, as well as HACIEN's business documentation, customized system architectures, quotation layouts, and training materials, are the sole intellectual property of HACIEN or its licensors. No portion of these materials may be copied, reproduced, reverse-engineered, or distributed without HACIEN's prior written consent.",
        ],
      },
      {
        heading: "8.2 Confidentiality of Commercial Documents",
        paragraphs: [
          "Quotations, pricing structures, technical implementation proposals, network designs, and custom scopes of work provided by HACIEN to a Customer or prospective client are strictly confidential. These documents are shared solely for evaluation and execution of the specific transaction.",
        ],
        bullets: [
          "Customers may not share HACIEN's quotations or proprietary technical proposals with competitors of HACIEN.",
          "Customers may not use HACIEN's designs, system architectures, or technical specifications to procure services from third parties without HACIEN's participation.",
          "Customers may not disclose HACIEN's pricing structures publicly or to third parties without prior written authorization.",
        ],
      },
    ],
  },
  {
    title: "9. Privacy, Data Protection, and Operational Sharing",
    items: [
      {
        heading: "9.1 Data Privacy Act Compliance",
        paragraphs: [
          "HACIEN is committed to protecting personal data in accordance with the Data Privacy Act of 2012, Republic Act No. 10173, and its Implementing Rules and Regulations. Personal information collected through contact forms, registration sheets, or commercial inquiries will be processed solely for legitimate business purposes, contract fulfillment, and customer relations management.",
        ],
      },
      {
        heading: "9.2 Operational Information Sharing",
        paragraphs: [
          "To prepare accurate quotes, register deals with manufacturers, procure licenses, arrange shipping, and coordinate warranties, HACIEN must share specific operational and contact details with third parties. The Customer authorizes HACIEN to share transaction-related data with:",
        ],
        bullets: [
          "Hardware manufacturers and software developers for deal registration, licensing, and discount eligibility.",
          "Authorized local and international distributors.",
          "Third-party logistics, shipping, and customs clearance providers.",
          "Warranty centers and vendor support channels.",
          "Legal, accounting, auditing, and regulatory authorities when required by Philippine law.",
        ],
      },
    ],
  },
  {
    title: "10. Governing Law, Dispute Resolution, and Venue",
    items: [
      {
        heading: "10.1 Governing Law",
        paragraphs: [
          "These Terms, along with all website use, commercial inquiries, quotations, invoices, and business transactions between HACIEN and its customers, shall be governed by, interpreted, and enforced in accordance with the laws of the Republic of the Philippines.",
        ],
      },
      {
        heading: "10.2 Amicable Settlement",
        paragraphs: [
          "In the event of any dispute, controversy, or claim arising out of or relating to these Terms or a business transaction, the parties shall first attempt in good faith to resolve the dispute amicably through executive-level negotiation or mediation within thirty calendar days from written notice of the dispute.",
        ],
      },
      {
        heading: "10.3 Venue for Litigation",
        paragraphs: [
          "If the dispute cannot be resolved amicably within the thirty-day negotiation period, any legal action, suit, or proceeding arising out of or relating to these Terms, transactions, or HACIEN's services shall be filed exclusively in the proper courts of Pasig City, Metro Manila, Philippines, to the exclusion of all other courts and venues.",
        ],
      },
    ],
  },
  {
    title: "11. General Provisions",
    items: [
      {
        heading: "11.1 Severability",
        paragraphs: [
          "If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect, and the invalid provision shall be deemed modified to the minimum extent necessary to make it valid and enforceable while preserving the original intent of the parties.",
        ],
      },
      {
        heading: "11.2 Non-Waiver",
        paragraphs: [
          "The failure of HACIEN to enforce any right or provision in these Terms shall not prevent HACIEN from enforcing such right or provision in the future, nor shall it be construed as a waiver of any prior or subsequent breach.",
        ],
      },
      {
        heading: "11.3 Amendments and Updates",
        paragraphs: [
          "HACIEN reserves the right to modify, amend, or update these Terms at any time without prior individual notice. All changes become effective immediately upon publication on this website. The Customer's continued business engagement or website use following the posting of updates constitutes acceptance of the amended Terms.",
        ],
      },
    ],
  },
];

export default function LegalPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Legal"
          as="h1"
          title="Legal Information, Terms of Use, and General Business Conditions"
          description="These Terms define the legal boundaries, rights, and obligations governing HACIEN's website, public communication channels, commercial inquiries, quotations, invoices, and formal business transactions."
        />

        <div className="surface mt-10 rounded-lg p-6 text-sm leading-7 text-slate-700 sm:p-8">
          <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Document Version", "1.0"],
                  ["Effective Date", "June 30, 2026"],
                  ["Last Updated", "June 30, 2026"],
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
                By accessing this website, submitting inquiries, requesting quotations, or engaging in
                business communications with HACIEN, the User, Customer, or Counterparty agrees to be
                bound by these Terms. If you do not agree to these Terms, you must immediately cease
                all use of HACIEN&apos;s website and public systems.
              </p>
            </div>
            <div>
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
          </div>

          <div className="mt-8 grid gap-8">
            {legalSections.map((section) => (
              <section key={section.title} className="rounded-lg border border-slate-200 bg-white p-5">
                <h2 className="text-xl font-bold tracking-tight text-slate-950">{section.title}</h2>
                <div className="mt-5 grid gap-3">
                  {section.items.map((item) => (
                    <div key={item.heading} className="rounded-lg border border-slate-100 bg-slate-50/70 p-4">
                      <h3 className="font-bold text-slate-950">{item.heading}</h3>
                      {item.paragraphs?.map((paragraph) => (
                        <p key={paragraph} className="mt-2">
                          {paragraph}
                        </p>
                      ))}
                      {item.bullets ? (
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                          {item.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-600 sm:flex-row sm:items-center sm:justify-between">
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
