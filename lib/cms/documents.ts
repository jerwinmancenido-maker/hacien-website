import { assertCmsContentSafe } from "@/lib/cms/content";

export type CmsDocumentKey = "legal" | "privacy" | "terms" | "trust-center";

export type CmsDocumentBullet = string | { label?: string; text: string };

export type CmsDocumentClause = {
  heading: string;
  status?: string;
  paragraphs?: string[];
  bullets?: CmsDocumentBullet[];
};

export type CmsDocumentSection = {
  title: string;
  clauses: CmsDocumentClause[];
};

export type CmsDocumentRecord = {
  key: CmsDocumentKey;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  version: string;
  effectiveDate: string;
  updatedAt: string;
  introParagraphs: string[];
  sections: CmsDocumentSection[];
  finalNote?: string;
  relatedLinks?: Array<{ href: string; label: string }>;
};

type LegacyLegalSection = {
  title: string;
  items: CmsDocumentClause[];
};

type LegacyPolicySection = {
  title: string;
  paragraphs?: string[];
  bullets?: Array<{ label?: string; text: string }>;
};

const legalSections: LegacyLegalSection[] = [
  {
    title: "1. Legal Entity and Registered Office for Formal Notices",
    items: [
      {
        heading: "1.1 Corporate Identity",
        paragraphs: [
          "HACIEN Information Technology Solutions is the company name and HACIEN brand used for this public website. Public identity statements are limited to bounded company information suitable for public review.",
          "Additional company details, signatory details, payment information, supplier accreditation materials, or tax interpretations are shared only when verified, approved for release, and relevant to a qualified business request.",
        ],
      },
      {
        heading: "1.2 Published Office Location",
        paragraphs: [
          "The published office location is Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio, City of Pasig, Metro Manila, Philippines 1605.",
        ],
      },
      {
        heading: "1.3 Legal Notice Requirements",
        paragraphs: [
          "Public website forms and inquiry channels are for business communication, RFQ review, and support routing. They do not by themselves create valid service of process or a binding legal notice path.",
          "Formal legal notice handling should be confirmed through written business communication for the specific matter.",
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
          "These Terms serve as the public website baseline. In the event of a conflict between website text and a specific formal document approved for a transaction, the more specific formal document controls:",
        ],
        bullets: [
          "A formal written agreement approved by the relevant parties.",
          "A formal HACIEN quotation, purchase order, billing document, or written transaction record that states the applicable scope and terms.",
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
          "Users are granted a limited, revocable, non-exclusive, and non-transferable license to access the HACIEN website solely for legitimate business inquiries, product research, requesting quotations, support routing, and related communication.",
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
          "Fraudulent transactions, including false RFQs, fraudulent purchase orders, impersonation, or misrepresentation of affiliation with a business or organization.",
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
          "Quotations are valid for 15 days unless the quotation states otherwise. Cost estimates and commercial proposals are valid only for the period and conditions stated in the specific written document. The website does not set default pricing, availability, warranty, delivery, payment, or tax terms.",
        ],
      },
      {
        heading: "4.2 Acceptance Mechanisms",
        paragraphs: [
          "A quotation or proposal is not a binding transaction merely because it was requested, discussed, or acknowledged through the website. Any acceptance mechanism must be stated in the applicable formal document or written business communication.",
        ],
        bullets: [
          "Formal written acceptance of the specific quotation.",
          "A purchase order or written approval that references the applicable quotation or scope.",
          "Other acceptance steps expressly stated in the formal transaction document.",
        ],
      },
      {
        heading: "4.3 Quotation Revision, Price Adjustments, and Cancellation",
        paragraphs: [
          "Pricing, availability, supplier stock, product lifecycle, foreign exchange, delivery timing, and technical assumptions can change before a transaction is finalized. Any revision, cancellation, or revalidation process must be handled through the relevant written commercial communication.",
          "The website does not create a refund, cancellation, fulfillment, or delivery obligation by itself.",
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
          "Where delivery, installation, or site work is included in a formal transaction, the Customer may need to secure building clearances, gate passes, work permits, security badges, or local access requirements for the relevant personnel to access the site.",
          "The Customer must provide accurate, complete, and safe delivery addresses, on-site contact persons, and telephone numbers.",
          "Where delivery or completion acceptance is part of a formal transaction, receiver authority and proof-of-delivery rules should be stated in the relevant quotation, order, or written project communication.",
        ],
      },
      {
        heading: "5.3 Data Protection, Backups, and Security",
        paragraphs: [
          "Before any agreed diagnostic, maintenance, installation, or configuration work affects a Customer's servers, workstations, databases, cloud instances, or network equipment, the Customer should perform complete, verifiable, and secure backups.",
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
          "HACIEN may review, source, coordinate, or support third-party products such as computer hardware, software licenses, SaaS subscriptions, cloud resources, and network appliances when the specific request supports that work. Third-party products remain subject to the applicable manufacturer's, developer's, distributor's, or service provider's standard agreements.",
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
          "HACIEN does not own the intellectual property of third-party software or manufacture third-party hardware. Third-party outages, software bugs, security vulnerabilities, warranty limits, policy changes, or product lifecycle decisions remain governed by the relevant third-party provider and the applicable formal transaction documents.",
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
          "To the maximum extent permitted by applicable law in the Republic of the Philippines, and unless otherwise agreed in a separate formal written contract, HACIEN's total cumulative liability for any and all claims, disputes, losses, damages, or actions arising out of or in connection with any transaction, quotation, website use, or service provision shall be strictly limited to the actual amount paid by the Customer to HACIEN for the specific transaction or affected service giving rise to the claim.",
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
          "Delays caused by force majeure events, natural disasters, typhoons, floods, earthquakes, labor strikes, civil unrest, or external restrictions.",
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
          "HACIEN processes personal data submitted through public forms or commercial inquiries for legitimate business purposes such as inquiry review, RFQ handling, support routing, and customer relationship communication.",
        ],
      },
      {
        heading: "9.2 Operational Information Sharing",
        paragraphs: [
          "When needed to review an inquiry or prepare a quotation, HACIEN may share relevant request details with appropriate third parties. Sharing should be limited to the business context needed for the inquiry or transaction.",
        ],
        bullets: [
          "Suppliers, distributors, manufacturers, software providers, or service providers relevant to the request.",
          "Logistics or delivery contacts when delivery context is part of the request.",
          "Warranty centers or vendor support channels when warranty or support context is relevant.",
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

const privacySections: LegacyPolicySection[] = [
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
        text: "With your consent, we use Google Analytics 4 to see which pages are visited. It stays off until you click Accept in our cookie notice, and Google Analytics 4 does not store IP addresses. See our Privacy Policy, section 9.",
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
        text: "Sharing client names and configurations for deal registration and discount activation, such as registering Microsoft Azure, AWS, or Cisco quotes.",
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
        text: "Some data may be processed on cloud infrastructure hosted outside the Philippines, such as Hostinger (Singapore and Indonesia), Google (Gmail, Google Drive), and Apple iCloud, matching section 8 of our Privacy Policy. HACIEN seeks to use cloud providers that maintain strict data privacy compliance standards.",
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

const termsSections: LegacyPolicySection[] = [
  {
    title: "1. Definitions and Parties",
    bullets: [
      {
        label: "HACIEN",
        text: "Refers to HACIEN Information Technology Solutions and the HACIEN brand used for this public website. Public company identity statements are limited to bounded company information suitable for public review.",
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
        text: "A quotation is valid for 15 days unless the quotation states otherwise.",
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
    title: "12. Tax Treatment",
    bullets: [
      {
        label: "Tax Boundary",
        text: "VAT, withholding tax, receipt, invoice, exemption, and other tax treatment must be confirmed through finance/accounting review and the applicable formal transaction document.",
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
    title: "14. Institutional Procurement",
    bullets: [
      {
        label: "Preparation Support",
        text: "HACIEN may support institutional procurement preparation by reviewing buyer-provided specifications, RFQ context, equivalent options, quotation inputs, and documentation requirements.",
      },
      {
        label: "Specification Decisions",
        text: "HACIEN does not claim buyer-side authority, award authority, accreditation, or approval authority through this website. Final procurement, specification, compliance, and award decisions remain with the buyer or purchasing organization.",
      },
    ],
  },
  {
    title: "15. Verification and Corporate Documents",
    paragraphs: [
      "Public company verification statements are limited to bounded company information suitable for public review. Additional documents, signatory details, bank/payment information, supplier accreditation materials, or tax interpretations are shared only when verified, approved for release, and relevant to a qualified business request.",
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

const trustPolicyGroups = [
  ["Company identity", "Bounded facts", "HACIEN publishes only company information that is suitable for public review."],
  ["RFQ and quotation", "Review first", "An RFQ starts a review. Commercial terms belong in a request-specific written response."],
  ["Payment and billing", "Not published", "The public website does not publish bank details, payment instructions, default payment terms, or billing treatment."],
  ["Warranty and returns", "Request-specific", "Warranty, replacement, return, and refund handling must be checked against supplier, vendor, manufacturer, or formal HACIEN evidence."],
  ["Delivery and acceptance", "Confirmed per request", "Delivery charges, receiver rules, and site requirements are confirmed in formal documents or written business communication."],
  ["Support", "Inquiry path", "Support requests are routed through the appropriate inquiry, RFQ, or follow-up path."],
  ["Privacy", "Policy available", "Public forms collect voluntarily submitted inquiry and RFQ details. Supplier sharing may occur only when needed for review."],
  ["Security", "Bounded statements", "Security statements stay tied to implemented controls and verified operating evidence."],
] as string[][];

const trustDocumentRules = [
  "Public company facts should be supported by evidence before they appear on customer-facing pages.",
  "Customer-facing policies should show owner, version, effective date, review date, and status when published.",
  "ERP documents should reference the policy version that applied when issued.",
  "Commercial commitments should be made through formal quotations, orders, and written business communication.",
];

function policySectionsToDocumentSections(sections: LegacyPolicySection[]): CmsDocumentSection[] {
  return sections.map((section, sectionIndex) => {
    const clauses: CmsDocumentClause[] = [];

    if (section.paragraphs) {
      clauses.push({
        heading: String(sectionIndex + 1) + ".1 General Provisions",
        paragraphs: section.paragraphs,
      });
    }

    if (section.bullets) {
      clauses.push(
        ...section.bullets.map((bullet, bulletIndex) => ({
          heading:
            String(sectionIndex + 1) +
            "." +
            String(section.paragraphs ? bulletIndex + 2 : bulletIndex + 1) +
            " " +
            (bullet.label ?? "Clause"),
          paragraphs: [bullet.text],
        })),
      );
    }

    return { title: section.title, clauses };
  });
}

function trustSectionsToDocumentSections(): CmsDocumentSection[] {
  return [
    {
      title: "Public boundaries",
      clauses: trustPolicyGroups.map(([title, status, text], index) => ({
        heading: String(index + 1) + ". " + title,
        status,
        paragraphs: [text],
      })),
    },
    {
      title: "Document rules",
      clauses: trustDocumentRules.map((rule, index) => ({
        heading: String(index + 1) + ". Rule",
        paragraphs: [rule],
      })),
    },
  ];
}

export const cmsDocumentRecords: Record<CmsDocumentKey, CmsDocumentRecord> = {
  legal: {
    key: "legal",
    eyebrow: "Legal",
    title: "Legal Information and Inquiry Boundaries",
    description: "The legal baseline for HACIEN's public pages, RFQ paths, support routing, and formal written business communication.",
    summary: "By accessing this website, submitting inquiries, requesting quotations, or engaging in business communications with HACIEN, the User, Customer, or Counterparty agrees to be bound by these Terms.",
    version: "1.0",
    effectiveDate: "June 30, 2026",
    updatedAt: "June 30, 2026",
    introParagraphs: [
      "By accessing this website, submitting inquiries, requesting quotations, or engaging in business communications with HACIEN, the User, Customer, or Counterparty agrees to be bound by these Terms. If you do not agree to these Terms, you must immediately cease all use of HACIEN's website and public systems.",
    ],
    sections: legalSections.map((section) => ({ title: section.title, clauses: section.items })),
    finalNote: "Related policies: review HACIEN's Terms of Use and Privacy Policy for website, RFQ, and data handling details.",
    relatedLinks: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
  privacy: {
    key: "privacy",
    eyebrow: "Privacy",
    title: "Privacy Policy",
    description: "How HACIEN handles information submitted through public forms, RFQ intake, support requests, and related website paths.",
    summary: "HACIEN handles public inquiry, RFQ, support, and website data with care and keeps public privacy statements tied to website and inquiry use.",
    version: "1.0",
    effectiveDate: "July 1, 2026",
    updatedAt: "July 1, 2026",
    introParagraphs: [
      "HACIEN handles public inquiry, RFQ, support, and website data with care and keeps public privacy statements tied to website and inquiry use.",
      "For privacy and data protection questions, use the public contact path so the request can be routed for review.",
    ],
    sections: policySectionsToDocumentSections(privacySections),
    finalNote: "This public policy is intended for website and inquiry use. Specific customer contracts, master service agreements, non-disclosure agreements, supplier agreements, or formal institutional procurement projects may contain additional privacy, confidentiality, and data handling clauses. In the event of a conflict, the terms of the specific written agreement shall supersede this online policy.",
  },
  terms: {
    key: "terms",
    eyebrow: "Terms",
    title: "Terms of Use",
    description: "Plain-language boundaries for HACIEN's website, RFQ intake, product information, and formal business communication.",
    summary: "These terms explain how visitors should understand HACIEN's public website, technology information, RFQ Gateway, and inquiry paths.",
    version: "1.0",
    effectiveDate: "July 1, 2026",
    updatedAt: "July 1, 2026",
    introParagraphs: [
      "These terms explain how visitors should understand HACIEN's public website, technology information, RFQ Gateway, and inquiry paths. Use of this website indicates that the visitor understands that public content supports business review and does not replace formal written documents.",
      "For formal business communication, use HACIEN's public inquiry paths so the request can be routed through the correct review path.",
    ],
    sections: policySectionsToDocumentSections(termsSections),
    finalNote: "If a formal quotation, purchase order, invoice, contract, or written agreement conflicts with general website content, the formal business document controls for that transaction.",
  },
  "trust-center": {
    key: "trust-center",
    eyebrow: "Trust Center",
    title: "Clear boundaries make better business conversations.",
    description: "HACIEN keeps public claims narrow, routes requests through review, and separates website information from formal commercial documents.",
    summary: "Public pages should help a buyer start a serious conversation without implying instant pricing, stock, payment, warranty, or tax commitments.",
    version: "1.0",
    effectiveDate: "July 1, 2026",
    updatedAt: "July 1, 2026",
    introParagraphs: [
      "Public pages should help a buyer start a serious conversation without implying instant pricing, stock, payment, warranty, or tax commitments.",
    ],
    sections: trustSectionsToDocumentSections(),
  },
};

export function getCmsDocumentRecord(key: CmsDocumentKey) {
  const record = cmsDocumentRecords[key];
  assertCmsContentSafe(record);
  return record;
}

export function getCmsDocumentRecords() {
  const records = Object.values(cmsDocumentRecords);
  assertCmsContentSafe(records);
  return records;
}
