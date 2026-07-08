import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

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
      "This policy describes how HACIEN intends to handle public website, inquiry, RFQ, and support data under the principles of transparency, legitimate purpose, and proportionality.",
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
        text: "Personal information about an individual's race, ethnic origin, marital status, age, color, religious/philosophical/political affiliations, health, education, genetic or sexual life, regulated identification numbers, or any information specifically established by law to be kept confidential.",
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
        text: "Full name and salutation, corporate/business organization name, official job title or department, business email address and alternative contact emails, landline number, mobile number, fax number, and physical office, billing, and delivery addresses.",
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
        text: "You fill out forms on our Website, upload files through the RFQ Gateway, or communicate through a public HACIEN inquiry path.",
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
        text: "Reviewing BOQs, specification sheets, and project scopes; preparing RFQ context; routing clarification; and preparing request-specific quotation or support communication where appropriate.",
      },
      {
        label: "Legitimate Business Interests",
        text: "Registering opportunities with technology vendors and OEMs, archiving inquiry histories and email logs for relationship continuity, routing support, analyzing submissions and IP logs, blocking spam, securing web forms, preventing fake RFQs, and mitigating cybersecurity attacks.",
      },
      {
        label: "Compliance with Legal and Tax Obligations",
        text: "Handling records, security incidents, lawful requests, and regulatory obligations when applicable to a specific inquiry, transaction, or legal requirement.",
      },
    ],
  },
  {
    title: "6. Handling of Uploaded Files, BOQs, and Design Material",
    bullets: [
      {
        label: "Secure Storage",
        text: "Files uploaded through the RFQ Gateway, such as Excel files, PDFs, Word documents, and CAD diagrams, are stored in website/RFQ systems or private working systems used for request review. Access should be limited to personnel involved in the inquiry or quotation review.",
      },
      {
        label: "Confidentiality",
        text: "Documents containing proprietary network designs, infrastructure plans, or project specifications should be handled as confidential inquiry material and shared only when needed for request review, quotation preparation, supplier coordination, or legal requirements.",
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
        text: "HACIEN retains inquiry, RFQ, support, and relationship records only as long as needed for the relevant business, legal, operational, or support purpose.",
      },
      {
        label: "Tax Retention",
        text: "Where a formal transaction creates accounting, tax, or legal records, retention requirements are handled according to the applicable law, formal document, and finance/accounting review.",
      },
      {
        label: "Secure Disposal",
        text: "Records that no longer need to be retained should be deleted, anonymized, or disposed of using an appropriate method for the record type.",
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
      "To exercise any data subject right, submit a request through HACIEN's public contact path and clearly identify the privacy request.",
      "To protect privacy and security, HACIEN may verify the requester's identity before acting on the request. Response timing depends on the nature of the request and applicable law.",
    ],
  },
  {
    title: "13. Data Breach and Security Incident Protocol",
    paragraphs: [
      "In the event of a security incident or data breach involving personal information, HACIEN will assess the incident, take appropriate containment steps, and handle notifications required by applicable law.",
      "Public privacy statements remain bounded to the website and inquiry paths and do not replace any specific agreement, legal requirement, or regulator instruction.",
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
    <section className="px-4 py-12 sm:px-6 lg:px-8">
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
              HACIEN handles public inquiry, RFQ, support, and website data with care and keeps
              public privacy statements tied to website and inquiry use.
            </p>
            <p className="mt-4">
              For privacy and data protection questions, use the public contact path so the request can
              be routed for review.
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
            institutional procurement projects may contain additional privacy, confidentiality, and data
            handling clauses. In the event of a conflict, the terms of the specific written agreement
            shall supersede this online policy.
          </p>
        </div>
      </div>
    </section>
  );
}
