import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { companyContact } from "@/data/companyContact";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for HACIEN Information Technology Solutions website inquiries and RFQ submissions.",
};

type PrivacySection = {
  title: string;
  paragraphs?: string[];
  bullets?: Array<{
    label?: string;
    text: string;
  }>;
};

const sections: PrivacySection[] = [
  {
    title: "1. Core Privacy Principles",
    paragraphs: [
      "In compliance with the Data Privacy Act of 2012, HACIEN adheres to the following fundamental data privacy principles:",
    ],
    bullets: [
      {
        label: "Transparency",
        text: "We are clear and upfront about the types of information we collect, the purposes for which we process it, and who we share it with.",
      },
      {
        label: "Legitimate Purpose",
        text: "We only collect and process data for specified, legitimate, and declared commercial and operational purposes.",
      },
      {
        label: "Proportionality",
        text: "We limit our data collection to the minimum information necessary to process your inquiries, RFQs, support requests, and transactions.",
      },
    ],
  },
  {
    title: "2. Definitions of Key Terms",
    bullets: [
      {
        label: "Personal Information",
        text: "Any information, whether recorded in a material form or not, from which the identity of an individual is apparent or can be reasonably and directly ascertained by the entity holding the information, or when put together with other information would directly and certainly identify an individual.",
      },
      {
        label: "Sensitive Personal Information",
        text: "Personal information about an individual's race, ethnic origin, marital status, age, color, religious/philosophical/political affiliations, health, education, genetic or sexual life, government-issued identification numbers, or any information specifically established by law to be kept confidential.",
      },
      {
        label: "Data Subject",
        text: "The individual whose personal, sensitive personal, or privileged information is being processed.",
      },
      {
        label: "Processing",
        text: "Any operation or set of operations performed upon personal information, including collection, recording, organization, storage, updating, modification, retrieval, consultation, use, consolidation, blocking, erasure, or destruction.",
      },
      {
        label: "Personal Information Controller",
        text: "Refers to HACIEN, which controls the collection, holding, processing, or use of personal information.",
      },
    ],
  },
  {
    title: "3. Detailed Information HACIEN Collects",
    paragraphs: [
      "We collect several categories of information depending on how you interact with our Website, RFQ Gateway, and communication channels.",
    ],
    bullets: [
      {
        label: "Voluntarily Submitted Identity and Contact Data",
        text: "Full name and salutation, corporate/business/government agency name, official job title or department, business email address and alternative contact emails, landline number, mobile number, fax number, and physical office, billing, and delivery addresses.",
      },
      {
        label: "Commercial and Transactional Inquiry Data",
        text: "Product lists, part numbers, quantity requirements, implementation scopes, BOQ spreadsheets, system designs, infrastructure specifications, budget estimates, purchase timelines, competitor quotes, vendor relationship notes, and support history.",
      },
      {
        label: "Technical and Diagnostic Data",
        text: "Internet Protocol address, city/country-level geographic location, browser type, version, language settings, operating system, referral source, page views, duration of visit, navigation paths, and timestamps of submissions and system interactions.",
      },
    ],
  },
  {
    title: "4. How We Collect Your Data",
    bullets: [
      {
        label: "Direct Interactions",
        text: "You fill out forms on our Website, upload files through the RFQ Gateway, send emails to @haciensolutions.com addresses, or communicate with HACIEN's sales team via phone or chat.",
      },
      {
        label: "Automated Technologies",
        text: "As you browse the Website, technical diagnostic systems and tracking cookies may collect metadata regarding your equipment, browsing actions, and usage patterns.",
      },
      {
        label: "Third-Party Channels",
        text: "We may receive business contact details from technology manufacturers, OEMs, distributors, or corporate referrals when they request HACIEN to coordinate a local commercial quotation or integration on your behalf.",
      },
    ],
  },
  {
    title: "5. Detailed Legal Bases and Purposes of Processing",
    bullets: [
      {
        label: "Performance of a Contract or Pre-Contractual Steps",
        text: "Reviewing BOQs, specification sheets, and project scopes; checking inventory and pricing; formulating quotations; preparing delivery receipts, packing lists, and sales invoices; arranging transport; activating warranties; and managing returned merchandise authorizations.",
      },
      {
        label: "Legitimate Business Interests",
        text: "Registering opportunities with technology vendors and OEMs, archiving inquiry histories and email logs for relationship continuity, routing support, analyzing submissions and IP logs, blocking spam, securing web forms, preventing fake RFQs, and mitigating cybersecurity attacks.",
      },
      {
        label: "Compliance with Legal and Tax Obligations",
        text: "Recording corporate buyer details, tax identification numbers, and BIR Form 2307 certificates for BIR reporting and audit regulations, reporting security incidents or cyber-attacks, and complying with lawful warrants issued by Philippine courts or the National Privacy Commission.",
      },
    ],
  },
  {
    title: "6. Handling of Uploaded Files, BOQs, and Design Material",
    bullets: [
      {
        label: "Secure Storage",
        text: "Files uploaded through the RFQ Gateway, such as Excel files, PDFs, Word documents, and CAD diagrams, are stored in secure cloud systems or private server directories. Access is restricted to HACIEN's technical estimators, sales managers, and designated engineers.",
      },
      {
        label: "Confidentiality",
        text: "Documents containing proprietary network designs, infrastructure plans, or project specifications are treated as strictly confidential and will not be disclosed to competitors or third parties, except for authorized distributors or OEMs required to price the proposal.",
      },
      {
        label: "Prohibited Uploads",
        text: "Visitors must not upload files containing personal identification documents, private employee records, credit card credentials, or software source code unrelated to the requested IT procurement.",
      },
    ],
  },
  {
    title: "7. Cookies and Web Analytics",
    bullets: [
      {
        label: "Use of Cookies",
        text: "The Website uses small text files called cookies to maintain session integrity, remember form selections, and gather basic web traffic analytics.",
      },
      {
        label: "Analytics Tools",
        text: "We may use analytics services, such as Google Analytics, to understand how visitors interact with the Website. These tools process anonymized IP addresses and usage patterns.",
      },
      {
        label: "Opt-Out Control",
        text: "You can set your browser to refuse all or some cookies, or to alert you when websites set or access cookies. If you disable cookies, some sections of our Website or forms may not function correctly.",
      },
    ],
  },
  {
    title: "8. Technical, Physical, and Organizational Data Safeguards",
    paragraphs: [
      "HACIEN implements industry-standard safeguards to secure personal and corporate information.",
    ],
    bullets: [
      {
        label: "Technical Safeguards",
        text: "We use SSL/TLS encryption for all data transmitted via web forms. Access controls, firewalls, and server-side monitoring are active. Email and file servers are protected by multi-factor authentication.",
      },
      {
        label: "Physical Safeguards",
        text: "Access to offices, paper files, and terminal devices containing customer database registries is restricted to authorized HACIEN staff.",
      },
      {
        label: "Organizational Safeguards",
        text: "HACIEN employees and sub-contractors are bound by strict non-disclosure agreements and receive training on basic data privacy practices in line with RA 10173.",
      },
    ],
  },
  {
    title: "9. Data Sharing, Disclosures, and Cross-Border Transfers",
    paragraphs: [
      "HACIEN does not sell, lease, or trade personal data to marketing companies. We disclose information only to authorized partners under strict operational conditions.",
    ],
    bullets: [
      {
        label: "Principal Manufacturers/OEMs",
        text: "Sharing client names and configurations for deal registration and discount activation, such as registering Microsoft Azure, AWS, Fortinet, or Cisco quotes.",
      },
      {
        label: "Authorized Distributors",
        text: "Sharing specifications to check stock and negotiate project pricing.",
      },
      {
        label: "Logistics and Shipping Providers",
        text: "Disclosing delivery addresses, names, and contact numbers to courier services or shipping companies for delivery.",
      },
      {
        label: "Cross-Border Transfers",
        text: "Some data may be processed on cloud infrastructure hosted outside the Philippines, such as Google Workspace, Microsoft 365, or AWS cloud servers. HACIEN seeks to use cloud providers that maintain strict data privacy compliance standards.",
      },
    ],
  },
  {
    title: "10. Data Retention and Secure Disposal",
    bullets: [
      {
        label: "Active Retention",
        text: "We retain client records and communication history as long as the corporate relationship is active or as long as needed to fulfill warranties, service agreements, and support histories.",
      },
      {
        label: "Tax Retention",
        text: "In compliance with Philippine tax laws, accounting invoices, transaction ledgers, and matching client data are retained for up to ten years.",
      },
      {
        label: "Secure Disposal",
        text: "Physical files are disposed of through secure shredding. Digital records are permanently purged, deleted, or anonymized from active databases using secure deletion protocols.",
      },
    ],
  },
  {
    title: "11. Detailed Rights of the Data Subject",
    paragraphs: [
      "Under the Data Privacy Act of 2012, individuals are entitled to statutory rights over their personal information.",
    ],
    bullets: [
      { label: "Right to be Informed", text: "The right to know if your personal data is being collected, processed, stored, or shared." },
      { label: "Right to Access", text: "The right to request reasonable access to your personal data held by HACIEN." },
      { label: "Right to Rectification", text: "The right to dispute and demand correction of inaccurate, outdated, or incomplete data." },
      { label: "Right to Erasure or Blocking", text: "The right to request removal, suspension, or destruction of personal data from HACIEN's systems, provided there is no outstanding legal, tax, or contractual obligation to retain it." },
      { label: "Right to Object", text: "The right to object to the processing of your personal data, including for marketing purposes." },
      { label: "Right to Portability", text: "The right to obtain a copy of your personal data in a structured, commonly used, and machine-readable format." },
      { label: "Right to Damages", text: "The right to be indemnified for damages sustained due to inaccurate, incomplete, outdated, false, unlawfully obtained, or unauthorized use of personal data." },
      { label: "Right to File a Complaint", text: "The right to file a complaint before the National Privacy Commission if you believe HACIEN has violated your privacy rights." },
    ],
  },
  {
    title: "12. How to Exercise Your Rights",
    paragraphs: [
      `To exercise any data subject right, submit a written request to HACIEN at ${companyContact.email}.`,
      "To protect privacy and security, HACIEN will verify the requester's identity by requesting a government-issued ID or official corporate authorization letter. HACIEN will respond to valid requests within thirty calendar days from receipt unless the complexity of the request requires an extension.",
    ],
  },
  {
    title: "13. Data Breach and Security Incident Protocol",
    paragraphs: [
      "In the event of a security incident or data breach involving personal information, HACIEN will immediately contain the breach and assess the impact.",
      "If the breach involves sensitive personal information that may pose a risk to the rights of affected data subjects, HACIEN will notify the National Privacy Commission and affected individuals within seventy-two hours of discovery, in compliance with applicable NPC circulars.",
    ],
  },
  {
    title: "14. Changes to This Privacy Policy",
    paragraphs: [
      "HACIEN reserves the right to modify, amend, or update this Privacy Policy at any time to comply with new regulations, reflect updates in operational technology, or improve security practices. Any changes will be posted directly on this page with the modified Last Updated date.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Privacy"
          as="h1"
          title="Privacy Policy"
          description="This policy explains how HACIEN collects, uses, processes, stores, shares, retains, and protects information submitted through the public website, RFQ Gateway, contact forms, support modules, and related digital inquiry paths."
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
              HACIEN is committed to protecting the privacy of customers, suppliers, partners, and
              website visitors in compliance with the Data Privacy Act of 2012, Republic Act No.
              10173, its Implementing Rules and Regulations, and applicable circulars and advisories
              issued by the National Privacy Commission of the Republic of the Philippines.
            </p>
            <p className="mt-4">
              The official contact for privacy and data protection queries is{" "}
              <a className="font-semibold text-[#1457d9]" href={`mailto:${companyContact.email}`}>
                {companyContact.email}
              </a>
              .
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            {sections.map((section, sectionIndex) => (
              <section key={section.title} className="rounded-lg border border-slate-200 bg-white p-5">
                <h2 className="text-lg font-bold text-slate-950">{section.title}</h2>
                {section.paragraphs ? (
                  <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50/70 p-4">
                    <h3 className="font-bold text-slate-950">
                      {sectionIndex + 1}.1 General Provisions
                    </h3>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="mt-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
                {section.bullets ? (
                  <div className="mt-4 grid gap-3">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <div
                        key={`${bullet.label ?? ""}${bullet.text}`}
                        className="rounded-lg border border-slate-100 bg-slate-50/70 p-4"
                      >
                        <h3 className="font-bold text-slate-950">
                          {sectionIndex + 1}.{section.paragraphs ? bulletIndex + 2 : bulletIndex + 1}{" "}
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
            This public policy is intended for website and inquiry use. Specific customer contracts,
            master service agreements, non-disclosure agreements, supplier agreements, or formal
            government procurement projects may contain additional privacy, confidentiality, and data
            handling clauses. In the event of a conflict, the terms of the specific signed agreement
            shall supersede this online policy.
          </p>
        </div>
      </div>
    </section>
  );
}
