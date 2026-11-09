import { LEGAL_PUBLISH_DATE, type LegalBlock, type LegalPageModel, type ListItem } from "@/app/policies/_lib/document";

const published = LEGAL_PUBLISH_DATE;

/** Effective date of the AI-chat legal update (Privacy Policy v2.4 and
 *  Website Terms of Use v2.1, lawyer-approved 2026-11-07). Only those
 *  two documents changed, so they carry their own date; every other
 *  document keeps the shared publish date above. */
const aiChatPublishDate = "November 8, 2026";

/** Effective date of the Privacy Policy v2.5 update (the pre-chat
 *  agreement step, lawyer-approved 2026-11-08). Only the Privacy
 *  Policy changed, so it carries its own date like the v2.4 update. */
const privacyGateDate = "November 9, 2026";

/** Effective date of the Privacy Policy v2.6 update (chat tab browser
 *  storage line, lawyer-approved 2026-11-09). Only the Privacy Policy
 *  changed, so it carries its own date like the v2.5 update. */
const privacyChatTabDate = "November 9, 2026";

function p(text: string): LegalBlock {
  return { kind: "p", text };
}

function ul(items: Array<string | ListItem>): LegalBlock {
  return {
    kind: "ul",
    items: items.map((item) => (typeof item === "string" ? { text: item } : item)),
  };
}

function ol(items: Array<string | ListItem>): LegalBlock {
  return {
    kind: "ol",
    items: items.map((item) => (typeof item === "string" ? { text: item } : item)),
  };
}

function version(number: string, extra?: string) {
  const line = `Version ${number} · Effective ${published}`;
  return extra ? `${line} · ${extra}` : line;
}

export const policiesPage: LegalPageModel = {
  path: "/policies",
  eyebrow: "Policies",
  title: "HACIEN Policies",
  description: "These are the terms and policies that apply to your order and your information.",
  versionLine: "Every document's current version is listed in the table below.",
  historyLink: false,
  showContents: false,
  meta: [],
  intro: [
    p("You probably scanned the QR code on a HACIEN quotation or delivery sheet."),
    p("These are the terms and policies that apply to your order and your information."),
    {
      kind: "table",
      headers: ["Policy", "What it covers", "Current version"],
      rows: [
        [
          "[Terms of Sale](/terms-of-sale)",
          "Quotations, orders, delivery, payment, cancellations and returns",
          "v1.2",
        ],
        [
          "[Warranty and Returns](/warranty)",
          "Manufacturer or supplier warranty, and how to make a claim",
          "v1.1",
        ],
        ["[Privacy Policy](/privacy)", "What personal data we keep, why, and your rights", "v2.6"],
        ["[Website Terms of Use](/terms)", "Rules for using haciensolutions.com", "v2.1"],
        [
          "[Business and Legal Information](/legal)",
          "Who we are, our documents, and where to send notices",
          "v2.0",
        ],
      ],
    },
    p("**Which version applies to my order?**"),
    p("The version printed on your quotation applies. If none is printed, the version in effect on the date of your quotation applies. Older versions stay at [Policy history](/policies/history)."),
    p("**Questions?**"),
    p("Email sales@haciensolutions.com, or message us through the chat on the [Contact page](/contact). Mention your quotation, Delivery Receipt or Sales Invoice number."),
  ],
  sections: [],
};

export const privacyPage: LegalPageModel = {
  path: "/privacy",
  eyebrow: "Privacy",
  title: "Privacy Policy",
  description:
    "We collect business and contact details to answer requests, prepare quotations, deliver orders, issue BIR documents and keep proper records.",
  versionLine: `Version 2.6 · Effective ${privacyChatTabDate} · Replaces version 2.5 (effective November 9, 2026)`,
  historyLink: true,
  showContents: true,
  meta: [
    { label: "Version", value: "2.6" },
    { label: "Effective", value: privacyChatTabDate },
    { label: "Replaces", value: "2.5 (November 9, 2026)" },
  ],
  intro: [],
  sections: [
    {
      title: "In short",
      blocks: [
        ul([
          "We collect business and contact details to answer requests, prepare quotations, deliver orders, issue BIR documents and keep proper records.",
          "For customers and suppliers we also keep tax and registration papers, such as BIR Form 2303. **Only the Proprietor and authorized HACIEN staff can see them.**",
          "We share data only when needed: with suppliers and brands, couriers, government offices when the law requires, and the services that run our website, email, files and order texts.",
          "We text order updates to the mobile number on your order. We never send promotional texts.",
          "We send marketing emails only if you sign up for them, and you can unsubscribe in any email.",
          "Some of these services store data outside the Philippines. Our website and email are hosted by Hostinger in Singapore, and our staff app by Hostinger in Indonesia.",
          "With your consent, we use Google Analytics to see how visitors use our website. It stays off unless you click Accept in our cookie notice.",
          "Our website chat is assisted by AI (see section 9). A real person from HACIEN reviews every request that is submitted.",
          "We do not sell your data.",
          "To see, correct or delete your data, email privacy@haciensolutions.com.",
        ]),
      ],
    },
    {
      title: "1. Who we are",
      blocks: [
        p('HACIEN INFORMATION TECHNOLOGY SOLUTIONS ("HACIEN") is a sole proprietorship registered with the DTI. Our office is at Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio, City of Pasig, Metro Manila, Philippines 1605.'),
        p("HACIEN is the **personal information controller** for the data in this policy, under the Data Privacy Act of 2012 (Republic Act No. 10173), its Implementing Rules, and the rules of the National Privacy Commission (NPC)."),
        p("The Proprietor (Data Protection Officer), privacy@haciensolutions.com."),
      ],
    },
    {
      title: "2. What this policy covers",
      blocks: [
        p("Personal data about:"),
        ul([
          "**Website visitors**, including anyone who uses our chat (for contact, support or a quotation), our request-tracking lookup, or the document reader in the chat;",
          "**Customers**: people who buy from us or act for a buying company or government office, such as owners, buyers, accounting staff and receivers;",
          "**Suppliers**: people who sell to us or act for a supplier or brand;",
          "**Delivery receivers and site contacts** named in an order.",
        ]),
        p('Details about a company itself are not "personal data" under the law, but we protect them the same way.'),
      ],
    },
    {
      title: "3. What we collect",
      blocks: [
        {
          kind: "table",
          headers: ["Kind of data", "Examples", "From whom"],
          rows: [
            [
              "Contact details",
              "Name, position, company, email, phone, Viber number, billing and delivery address",
              "Visitors, customers, suppliers",
            ],
            [
              "Request and order details",
              "RFQs, specifications, uploaded files, quotations, purchase orders, delivery notes",
              "Visitors, customers",
            ],
            [
              "Tax and registration papers",
              "TIN, BIR Form 2303, BIR Form 2307 (withholding tax certificates), DTI or SEC papers, Mayor's/Business Permit, PhilGEPS registration details",
              "Customers, suppliers",
            ],
            [
              "Receiver and pick-up checks",
              "Name of the receiver named on your PO or order, and their signature on our Delivery Receipt. For high-value deliveries or pick-ups, we look at a company or valid ID to confirm who is receiving. We do not photograph, copy, upload or keep the ID.",
              "Customers",
            ],
            [
              "Transaction records",
              "Delivery Receipts, Sales Invoices, Collection Receipts, payment records, warranty claims",
              "Made by HACIEN for each order",
            ],
            [
              "Messages",
              "Emails and Viber messages about quotations, orders and deliveries",
              "Customers, suppliers",
            ],
            [
              "AI chat details",
              "Your work email address, chat messages, and the date, time, and policy version of your Terms of Use and Privacy Policy agreement before starting the chat",
              "Website visitors who use the AI chat",
            ],
            [
              "Order texts",
              "Mobile number, order reference, order status, time sent, delivery result",
              "Made by HACIEN for each order",
            ],
            [
              "Marketing email choices",
              "Email address, name, whether you signed up, when and how, unsubscribe date, and basic email activity such as delivery and unsubscribes",
              "Customers and website visitors who sign up",
            ],
            [
              "Website and security data",
              "IP address, browser type, time of submission, bot-check result",
              "Website visitors (automatic)",
            ],
            [
              "Website use (only if you accept)",
              "Pages viewed, device and browser type, approximate location (city or country), and how you reached our site, through Google Analytics",
              "Website visitors who click Accept",
            ],
            [
              "Browser storage",
              "Your draft RFQ list, kept only in your own browser",
              "Website visitors (stays on your device)",
            ],
          ],
        },
        p("Some tax details of individuals may be **sensitive personal information** under the law. We protect them with the extra limits in sections 6 and 11."),
        p("Please don't send government IDs, tax papers, card numbers or passwords through the chat. If we need a document for your order, we will ask for it and tell you how to send it."),
      ],
    },
    {
      title: "4. Why we use it",
      blocks: [
        {
          kind: "table",
          headers: ["Purpose", "Data used", "Legal basis"],
          rows: [
            [
              "Answer inquiries, prepare quotations, process and deliver orders, handle warranty claims",
              "Contact, request and order details, transaction records",
              "Needed for the contract (RA 10173 Sec. 12(b)), and to protect lawful rights and claims (Sec. 13(f))",
            ],
            [
              "Issue BIR invoices, handle Form 2307, keep tax books for 10 years",
              "TINs, BIR Forms 2303 and 2307, transaction records",
              "Legal obligation under the Tax Code and the Ease of Paying Taxes (EOPT) Act (Sec. 12(c), 13(b))",
            ],
            [
              "Accredit customers, check credit, confirm who receives a delivery or pick-up",
              "DTI/SEC papers, Mayor's Permit, PhilGEPS details, receiver's name and signature, and a sight-check of a company or valid ID for high-value deliveries or pick-ups (not copied or kept)",
              "Steps before a contract and our legitimate interest (Sec. 12(b), 12(f)). For sensitive personal information: your explicit consent, and protecting legal claims (Sec. 13(a), 13(f))",
            ],
            [
              "Share end-user details with brands and distributors for project pricing, deal registration, licensing and warranty",
              "Customer company and contact names, order details",
              "Needed for the contract (Sec. 12(b)), and consent (Sec. 12(a), 13(a))",
            ],
            [
              "Direct 1-to-1 B2B sales outreach, account management, and quotation follow-ups by email, phone, or Viber",
              "Contact details",
              "Legitimate interest (Sec. 12(f)). You can ask us to stop at any time.",
            ],
            [
              'Send order-status texts (order confirmed, ready, out for delivery, delivered) from sender name "HACIEN"',
              "Mobile number, order reference and status",
              "Needed for the contract (Sec. 12(b)). These texts are about your order only. We do not send promotional or marketing texts.",
            ],
            [
              "Send bulk marketing emails, such as new products, offers and newsletters",
              "Email address, name, company",
              "Your consent (Sec. 12(a)). We ask with a separate checkbox that is **not ticked** for you. Every marketing email has an unsubscribe link.",
            ],
            [
              "Understand how visitors use our website so we can improve it",
              "Website use data (Google Analytics)",
              "Your consent (Sec. 12(a)), given by clicking Accept in our cookie notice. You can withdraw it at any time (section 9).",
            ],
            [
              "Run the website AI chat and follow up on your inquiry",
              "Work email address, chat messages, and agreement timestamp/version",
              "Needed to take steps at your request before a contract (RA 10173 Sec. 12(b)) and our legitimate interest in answering B2B inquiries and keeping the chat secure (Sec. 12(f)). Ticking the box before starting the chat records your agreement to our Terms of Use and confirms that you were shown this Privacy Policy (Sec. 16(a)).",
            ],
            ["Keep the website and the chat secure", "Website and security data", "Legitimate interest"],
          ],
        },
        p("**Marketing email is your choice.** Saying no, or unsubscribing later, does not affect your quotation or order. You will still get the order texts and emails needed to complete your order, and the BIR documents we must issue. Unsubscribing stops bulk marketing emails immediately when you click the unsubscribe link in any marketing email, or within 3 business days if you request it by emailing privacy@haciensolutions.com."),
      ],
    },
    {
      title: "5. Where we get it",
      blocks: [
        ul([
          "From you, when you fill in a form, email, message us on Viber, or send a purchase order or document;",
          "From your company or office, when someone there names you as a contact, buyer or receiver;",
          "From suppliers, distributors and brands, who sometimes refer customer leads to us;",
          "Automatically, from the website (section 9).",
        ]),
      ],
    },
    {
      title: "6. Who can see it inside HACIEN",
      blocks: [
        ul([
          "Customer and supplier records are kept in HACIEN's staff app, which only HACIEN personnel can log into.",
          "**TINs, tax papers and other uploaded documents can be seen only by the Proprietor and authorized HACIEN staff.**",
          "We do not give outside accountants or bookkeepers access. Our books are prepared in the staff app and filed directly with the BIR.",
          "All HACIEN staff follow written confidentiality rules.",
        ]),
      ],
    },
    {
      title: "7. Who we share it with",
      blocks: [
        p("We share only what each party needs:"),
        {
          kind: "table",
          headers: ["Who", "Why", "What"],
          rows: [
            [
              "Suppliers, distributors and brands",
              "To source your order, register the deal, get project or government pricing, register software licences, and register or claim warranty",
              "Company name, contact names, product and delivery details",
            ],
            [
              "Couriers and delivery partners",
              "To deliver your order",
              "Receiver name, phone, delivery address",
            ],
            [
              "BIR and other government offices",
              "When the law requires, such as tax filings, audits or lawful orders",
              "As required",
            ],
            [
              "Service providers that store or process our data",
              "To run our website, email, files, messages, order texts and marketing email (section 8)",
              "Data stored in or passing through their systems",
            ],
            [
              "UniSMS (Unisoft Ventures Corporation) or a similar Philippine SMS gateway provider",
              "To send order-status texts",
              "Mobile number and text content (order reference and status)",
            ],
            [
              "Hostinger (Hostinger Reach)",
              "To send marketing emails to people who signed up",
              "Email address, name, company, sign-up and unsubscribe records",
            ],
            [
              "Cloudflare (bot check)",
              "To check that a form is sent by a person",
              "Technical data such as IP address and browser details",
            ],
            [
              "Anthropic (Anthropic PBC)",
              "To generate replies in the website chat",
              "The messages you type into the chat and the details you give during the conversation",
            ],
          ],
        },
        p("These providers act for us as personal information processors. They may use the data only to provide their service to HACIEN."),
        p("We do not sell, rent or trade personal data."),
      ],
    },
    {
      title: "8. Where your data is stored",
      blocks: [
        {
          kind: "table",
          headers: ["Service", "Used for", "Location"],
          rows: [
            [
              "Hostinger",
              "Website hosting and HACIEN email (including sales@ and privacy@)",
              "Hostinger, Singapore",
            ],
            ["HACIEN staff app", "Customer, supplier and order records", "Hostinger, Jakarta, Indonesia"],
            [
              "Google (Gmail, Google Drive)",
              "Email and document storage",
              "Google's servers, which may be outside the Philippines",
            ],
            [
              "Apple iCloud",
              "Document and file storage",
              "Apple's servers, which may be outside the Philippines",
            ],
            ["Viber", "Sales and delivery messages", "Viber's servers, which may be outside the Philippines"],
            [
              "UniSMS (Unisoft Ventures Corporation) or a similar Philippine SMS gateway provider",
              "Order-status texts",
              "UniSMS (Philippines) and its cloud hosting and Philippine telecommunications network providers",
            ],
            [
              "Hostinger Reach",
              "Marketing email list and sending",
              "Hostinger and its cloud service providers, which may be located outside the Philippines",
            ],
            [
              "Google LLC (Google Analytics)",
              "Website visit statistics, only if you accept",
              "Google's servers, which may be outside the Philippines",
            ],
            [
              "Anthropic",
              "AI chat replies",
              "Anthropic PBC, United States (and its cloud infrastructure providers)",
            ],
          ],
        },
        p("**Processing outside the Philippines:** these services, and the companies they use (their sub-processors, such as cloud providers), may store or process data outside the Philippines. We use them under their own data protection terms, and we remain responsible for your data."),
      ],
    },
    {
      title: "9. Website, cookies and the bot check",
      blocks: [
        ul([
          "**Cookies:** we do not use advertising cookies. We use Google Analytics cookies only if you click Accept in our cookie notice. Until then, and if you click Decline, Google Analytics stays off.",
          "**Google Analytics:** it shows us pages viewed, device and browser type, approximate location (city or country), and how visitors reached our site. Google Analytics 4 does not log or store IP addresses. We keep this data for 2 months. Advertising features and Google signals are turned off. To withdraw consent, click **Cookie settings** in the footer and choose Decline, or clear your browser's cookies for our site.",
          "**Cloudflare bot check:** the chat and the request-tracking lookup use Cloudflare Turnstile to stop spam. Cloudflare handles technical data for this under its own privacy policy (https://www.cloudflare.com/privacypolicy/).",
          "**Browser storage:** your RFQ list on our Products pages is saved in your own browser. It is not sent to us until you send it through the chat. You can clear it by clearing your browser's site data.",
          "**Chat in your browser tab:** while you use the chat, a copy of the conversation (your messages, your work email, your answers and your agreement record) is saved in your own browser tab so the chat is not lost if you reload or open another page on our site. This copy stays on your device and is not kept on our servers. It is deleted when you close the tab or tap Start over.",
          "**Document tool (Help page):** files you check with this tool are checked in memory on our web server for file type, size (up to 10 MB) and file name only. No outside or AI service reads them, they are not stored after the check finishes, and the tool does not create an official record.",
          "**AI assistant:** our website chat is assisted by an AI service (Anthropic). The messages you type are sent to that service so it can reply, and are handled under its commercial privacy and data processing terms. Under Anthropic's commercial API terms, chat messages sent through our website are **not** used to train AI models. Please do not send passwords, card numbers, government IDs or tax papers through the chat — we will never ask for them there.",
          "**No decisions by AI:** the assistant's answers are information only. It cannot check live prices or stock, and it does not approve or decide anything. A real person from HACIEN reviews every submitted request.",
        ]),
      ],
    },
    {
      title: "10. How long we keep it",
      blocks: [
        p("These keep times apply while HACIEN is operating. If HACIEN closes, see the paragraph after the table."),
        {
          kind: "table",
          headers: ["Record", "How long", "Why"],
          rows: [
            [
              "Inquiries and RFQs that did not become orders",
              "10 years (or until HACIEN closes)",
              "Follow-up and repeat requests",
            ],
            [
              "Customer and supplier records, quotations, POs, DRs, Sales Invoices, Collection Receipts, payment records, Form 2307",
              "10 years",
              "Tax and accounting rules",
            ],
            [
              "BIR Form 2303, DTI/SEC papers, permits",
              "10 years",
              "Invoicing and tax compliance",
            ],
            ["Warranty claim records", "10 years", "Handling the claim"],
            ["Website security logs and bot-check data", "90 days to 1 year", "Security"],
            ["Google Analytics data (only if you accept)", "2 months", "Website statistics"],
            [
              "Order-text logs (number, status sent, delivery result)",
              "1 year in SMS gateway logs for delivery support; up to 10 years where order status forms part of the main order record",
              "Proof of delivery notices, customer support, and BIR record-keeping rules",
            ],
            [
              "Marketing email sign-up and unsubscribe records",
              "While you are subscribed, plus 4 years after you unsubscribe (we also keep a minimal suppression record so we do not email you again)",
              "Proof of consent and legal compliance (Civil Code Art. 1146)",
            ],
            [
              "Marketing email list entry",
              "Until you unsubscribe or ask us to delete it",
              "Sending the marketing emails you signed up for",
            ],
            [
              "Chat conversations",
              "We do not keep chat transcripts on our servers. Anthropic retains API inputs and outputs for up to 30 days for safety and abuse monitoring before automatic deletion. If you submit a request through the chat, the submitted details are kept under \"Inquiries and RFQs that did not become orders\" above.",
              "To answer the conversation; submitted requests follow the normal record rules",
            ],
          ],
        },
        p("If HACIEN closes or stops operating, we will delete records we no longer need (such as unconverted inquiries) and the Proprietor will keep remaining tax, transaction and active warranty records secure, using equivalent offline and physical safeguards, for the rest of the retention period required by law. We will not sell your data, and we will not transfer it to anyone else except as required by law, with your agreement, or to a successor company that continues HACIEN's business under the same privacy protections. After the retention period ends, paper records will be shredded and digital records permanently deleted. During this time, you can reach us at privacy@haciensolutions.com (or any replacement contact address we post before closing)."),
        p("When a record is no longer needed, we delete it. **Paper records are shredded.**"),
      ],
    },
    {
      title: "11. How we protect it",
      blocks: [
        ul([
          "Encrypted (HTTPS) connections on our website;",
          "Two-step login on our accounts;",
          "Regular backups;",
          "Paper files kept in a locked cabinet;",
          "Access to tax papers and IDs limited to the Proprietor and authorized HACIEN staff;",
          "Written confidentiality rules for all HACIEN staff.",
        ]),
        p("No system is perfectly safe, but we work to protect your data and act fast if something goes wrong."),
      ],
    },
    {
      title: "12. Your rights",
      blocks: [
        p("Under the Data Privacy Act you have the right to:"),
        ul([
          "**be informed** about how your data is used;",
          "**access** your data and get a copy;",
          "**object** to processing, including sales messages;",
          "**withdraw your consent** to marketing emails at any time, using the unsubscribe link in any email or by emailing privacy@haciensolutions.com. This does not affect order texts and emails needed for your order;",
          "**correct** wrong or outdated data;",
          "**have data deleted or blocked** when it is no longer needed, unless the law (such as BIR rules) requires us to keep it (for example, tax records we must keep for 10 years);",
          "**data portability**, where it applies;",
          "**claim damages** if you are harmed by wrong or unlawful use of your data;",
          "**complain** to the National Privacy Commission.",
        ]),
        p("**How to make a privacy request:**"),
        ul([
          "Email **privacy@haciensolutions.com**, addressed to The Proprietor (Data Protection Officer); or",
          'Message us through the chat on the [Contact page](/contact) and say it is a **privacy request**; or',
          "Write to The Proprietor at the office address in section 1.",
        ]),
        p("We may ask you to prove who you are before acting on a request. We will confirm we received your request within **5 business days** and resolve it within **15 to 30 days**, depending on the request."),
      ],
    },
    {
      title: "13. Complaints to the National Privacy Commission",
      blocks: [
        p("If you are not happy with our answer, you may complain to the National Privacy Commission. Details are on the NPC website: https://privacy.gov.ph."),
      ],
    },
    {
      title: "14. Data breaches",
      blocks: [
        p("If a breach affects your personal data, we will contain it and assess the risk. When the NPC rules require it, we will notify the National Privacy Commission and the people affected within **72 hours** of knowing about the breach."),
      ],
    },
    {
      title: "15. Changes to this policy",
      blocks: [
        p("When we change this policy, we publish the new version here with a new version number and date, and keep earlier versions at [Policy history](/policies/history). For big changes, we will also tell customers directly by email."),
        p("**NPC registration:** HACIEN is below the mandatory registration thresholds in NPC Circular 2022-04. We will check again if we get close to them."),
      ],
    },
  ],
};

export const termsPage: LegalPageModel = {
  path: "/terms",
  eyebrow: "Terms",
  title: "Website Terms of Use",
  description:
    "This website helps you learn about HACIEN and send inquiries and requests for quotation (RFQs).",
  versionLine: `Version 2.1 · Effective ${aiChatPublishDate} · Replaces version 2.0 (effective November 2, 2026)`,
  historyLink: true,
  showContents: false,
  meta: [
    { label: "Version", value: "2.1" },
    { label: "Effective", value: aiChatPublishDate },
    { label: "Replaces", value: "2.0 (November 2, 2026)" },
  ],
  intro: [],
  sections: [
    {
      title: "In short",
      blocks: [
        ul([
          "This website helps you learn about HACIEN and send inquiries and requests for quotation (RFQs).",
          "Nothing on the website is a price, offer or promise. Prices and terms are only in our written quotation.",
          "Buying from HACIEN is covered by our [Terms of Sale](/terms-of-sale).",
          "Please use the site honestly.",
          "The website chat is assisted by AI. Its answers are guidance only — prices and terms are only in our written quotation.",
        ]),
      ],
    },
    {
      title: "1. Who runs this website",
      blocks: [
        p("haciensolutions.com is run by HACIEN INFORMATION TECHNOLOGY SOLUTIONS. See [Business and Legal Information](/legal)."),
      ],
    },
    {
      title: "2. What the website is for",
      blocks: [
        p("You can read about our products and services, build an RFQ list, send inquiries, request quotations, track a request, and contact us. The website does not take orders or payments, and does not issue invoices or receipts."),
      ],
    },
    {
      title: "3. Website information is for reference",
      blocks: [
        p("Product pages, specifications, photos and brand names help you describe what you need. They do not mean an item is in stock or available at a certain price. We buy every item per order and keep no stock, so availability and prices are confirmed only in a written quotation. Brand names and logos belong to their owners."),
      ],
    },
    {
      title: "4. Sending a request does not create an order",
      blocks: [
        p("Sending a form, RFQ or file is a request for a quotation. It is not an order and does not bind you or HACIEN. An order is made only as described in our [Terms of Sale](/terms-of-sale)."),
      ],
    },
    {
      title: "5. The AI chat assistant",
      blocks: [
        p("Our website chat is assisted by an automated AI assistant. Its replies are generated automatically, may be incomplete or wrong, and are provided for guidance only."),
        p("Nothing the assistant says is a price, a binding offer, a promise, or a quotation, and the assistant has no authority to bind HACIEN. Section 3 applies to the assistant's replies as it does to the rest of the website: availability and prices are confirmed only in our written quotation."),
        p("The assistant cannot check live stock, prices, or the status of a request. Use the tracking page for request status."),
        p("When you confirm a summary in the chat and send it, it is a request like any form submission (section 4). A real person from HACIEN reviews every request."),
      ],
    },
    {
      title: "6. Your responsibilities",
      blocks: [
        p("When you use the chat or the tracking lookup, please:"),
        ul([
          "give true and complete details;",
          "upload only files you may share and that relate to your request;",
          "not send government IDs, tax papers, card numbers or passwords through the chat.",
        ]),
        p("We may decline or delete requests that look fake, abusive or unrelated."),
      ],
    },
    {
      title: "7. Things you must not do",
      blocks: [
        ul([
          "Try to get into parts of the site or our systems you are not allowed to use;",
          "Scan or test our systems for weaknesses without written permission;",
          "Copy large parts of the site automatically (scraping);",
          "Send spam, malware, or fake requests.",
          "Flood or abuse the chat with automated tools, or try to make the assistant reveal its internal instructions, ignore its rules, or state prices or promises it is not allowed to give.",
          "We may limit chat usage (for example, message limits) to keep the service available and affordable to run.",
        ]),
        p("Unauthorized access may be a crime under Philippine law, including the Cybercrime Prevention Act of 2012 (RA 10175) and the Electronic Commerce Act (RA 8792)."),
      ],
    },
    {
      title: "8. Our content",
      blocks: [
        p("The website's text, design, logo and graphics belong to HACIEN or its licensors. You may view and print pages for your own business use. Please ask us before using them for anything else."),
      ],
    },
    {
      title: "9. Links to other sites",
      blocks: [p("Links to brands or other websites are for convenience. We are not responsible for their content.")],
    },
    {
      title: "10. Website availability",
      blocks: [
        p('We try to keep the website working and correct, but it is provided "as is". It may sometimes be down or contain mistakes. To the extent allowed by law, we are not liable for losses from using the website.'),
      ],
    },
    {
      title: "11. Privacy",
      blocks: [p("Our [Privacy Policy](/privacy) explains how we use the details you send.")],
    },
    {
      title: "12. Governing law and venue",
      blocks: [
        p("These terms are governed by the laws of the Republic of the Philippines. Any court case about them is filed exclusively in the proper courts of Pasig City."),
      ],
    },
    {
      title: "13. Changes",
      blocks: [
        p("We may update these terms. The new version, with its version number and date, is posted here. Earlier versions stay at [Policy history](/policies/history)."),
      ],
    },
  ],
};

export const termsOfSalePage: LegalPageModel = {
  path: "/terms-of-sale",
  eyebrow: "Terms of Sale",
  title: "Terms of Sale",
  description: "We buy every item per order and keep no stock. Prices and lead times depend on our suppliers.",
  versionLine: version("1.2", "Replaces version 1.1"),
  historyLink: true,
  showContents: true,
  meta: [
    { label: "Version", value: "1.2" },
    { label: "Effective", value: published },
    { label: "Replaces", value: "1.1" },
  ],
  intro: [],
  sections: [
    {
      title: "In short",
      blocks: [
        ul([
          "We buy every item **per order** and keep no stock. Prices and lead times depend on our suppliers.",
          "A quotation is valid for **15 days** unless the quotation states otherwise.",
          "Payment terms are as stated in your quotation. Unless your quotation states approved credit terms, payment is due before ordering and delivery. Software and special orders are paid **100% upfront**.",
          "When you sign our Delivery Receipt, you confirm the **box count and outside condition** only. You then have **3 days** to report problems with what's inside (**24 hours** for visible physical damage). Your legal rights for hidden defects are not affected.",
          "Warranty is the **manufacturer's or supplier's warranty only**. We help you claim it.",
          "Once we order from the supplier, the order can't be cancelled. No change-of-mind returns, but defective, damaged or wrong items are always covered.",
        ]),
      ],
    },
    {
      title: "1. These terms and your documents",
      blocks: [
        p("These terms apply to every sale by HACIEN unless a signed written agreement says otherwise. The terms printed on our Sales Invoice and Delivery Receipt also apply, and these terms follow them. If documents conflict, this order applies:"),
        ol([
          "a signed written agreement for the order;",
          "our written quotation as accepted, and your purchase order where it matches the quotation;",
          "the terms printed on our Sales Invoice and Delivery Receipt;",
          "these Terms of Sale;",
          "website content.",
        ]),
        p("Standard terms printed on a customer's purchase order do not apply unless we agree to them in writing."),
      ],
    },
    {
      title: "2. Quotations",
      blocks: [
        ul([
          "Our quotation lists the items, quantities, prices, delivery terms and any conditions.",
          "A quotation is valid for **15 days** from its date, unless the quotation states otherwise.",
          "Because we buy per order, supplier prices and stock can change. If they change before we confirm your order, we will send a revised quotation.",
          "**Exchange rates:** prices of imported items may change if the exchange rate moves before we place the supplier order. We will tell you and send a revised quotation before ordering.",
        ]),
      ],
    },
    {
      title: "3. Placing and confirming an order",
      blocks: [
        ol([
          "You accept our quotation in any of these ways: a signed quotation, a purchase order (PO) that refers to it, or an email.",
          "We check availability with our supplier.",
          "We confirm the order by email, by signing your PO back, or by giving you a sales order (SO) number. The order is binding only after we confirm it.",
          "We place the supplier order after we receive the down payment (section 8).",
        ]),
      ],
    },
    {
      title: "4. Per-order sourcing and substitutes",
      blocks: [
        ul([
          "We keep no office stock. Every item is ordered from our suppliers after your order is confirmed.",
          "Lead times on the quotation are **estimates**, not firm promises.",
          "If an item becomes unavailable, we will offer an equal or better item. We deliver a substitute only after you approve it in writing. If you don't approve it, we remove that line from the order and refund or credit any payment for it.",
        ]),
      ],
    },
    {
      title: "5. Prices and taxes",
      blocks: [
        ul([
          "Prices are in **Philippine pesos (PHP)**, as stated on the quotation.",
          "HACIEN is a **non-VAT registered** business. Our prices and Sales Invoices do not include VAT.",
          '**Withholding tax:** if your company withholds tax on payments to us, please tell us before paying and give us BIR Form 2307 for the amount withheld. Our Sales Invoice has a "Less: Withholding Tax" line for this.',
          "**Delivery fee:** quoted separately on the quotation.",
        ]),
      ],
    },
    {
      title: "6. Delivery and acceptance",
      blocks: [
        ul([
          "**Delivery areas:** nationwide.",
          "**Office pick-up:** pick-ups at our Suntree Tower office are by prior appointment (Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays).",
          "**Schedule:** we agree a delivery date and time with your contact person. Please tell us early about gate passes, building rules, receiving hours or site requirements.",
          {
            text: "**Who may receive and delivery contact number:**",
            ordered: [
              "**Naming a receiver:** You may name another person—such as your staff, warehouse personnel, or a building or site guard—to receive and sign for the delivery on your behalf. Their signature on our Delivery Receipt counts as delivery to you. If your PO does not name a specific receiver, anyone present at your delivery address may receive and sign for the order.",
              "**Permission to share their details:** If you give us another person's name and mobile number, you confirm that you have their permission to share those details with HACIEN for the order.",
              "**Order-status texts only (no ads, no links):** We text that mobile number only for order status updates (**order confirmed**, **delivered**, and **payment received**). Our texts never contain ads, promotions, or clickable links.",
              "**Your responsibility:** You are responsible if the mobile number you give us is wrong, out of date, or shared without that person's permission, and for any missed delivery note or claim that results from it.",
            ],
          },
          "**Delivery Receipt (DR):** every delivery comes with our BIR-accredited Delivery Receipt. The receiver writes their printed name, signature, and the date, and adds a company stamp if available.",
          "**What signing the DR means:** the signed DR confirms the **number of boxes** and their **visible outside condition** only. It does not confirm what is inside the boxes. Please note any missing boxes or visible damage on the DR before signing.",
          "**Reporting problems after delivery:** report missing, wrong or damaged contents within **3 days** of delivery. Report **visible physical damage within 24 hours**. Report by email (sales@haciensolutions.com) or Viber, with your DR number and photos.",
          "**Acceptance:** the box count is accepted when the DR is signed. The goods are fully accepted when the 3-day report period ends with no report. **This does not affect your legal rights for hidden defects** (Civil Code: up to 6 months from delivery), or your rights for online orders under the Internet Transactions Act (RA 11967).",
        ]),
      ],
    },
    {
      title: "7. Invoices and other documents",
      blocks: [
        p("HACIEN issues BIR-accredited pre-printed documents:"),
        ul([
          "**Delivery Receipt (DR):** given on delivery;",
          "**Sales Invoice (SI):** issued for the sale;",
          "**Collection Receipt (CR):** issued when we receive payment.",
        ]),
        p('With some deliveries we also attach a **"PACKING LIST & DELIVERY DETAILS (Attachment to DR No. ___ / SI No. ___)"** sheet with a QR code to our policies page (haciensolutions.com/policies). It is not an official receipt or invoice.'),
        p("Website messages, emails, tracking pages and quotations are not invoices or receipts. If a document has a mistake, contact us with its number. We void it and issue a new one following BIR rules."),
      ],
    },
    {
      title: "8. Payment",
      blocks: [
        ul([
          "**Payment terms:** as stated in your quotation. Unless your quotation states approved credit terms, payment is due as stated in your quotation before ordering and delivery.",
          "**Software and special orders:** 100% payment before we order.",
          "**Credit terms:** 30 days, only for approved corporate and government accounts, and only when stated in your quotation.",
          "Payment is applied to your order only when received in the account printed on your quotation.",
          "**Payment methods:** bank transfer, check, or cash.",
          "**Where to pay:** only to the payee name and bank account printed on your HACIEN quotation or Delivery Details sheet. Checks are payable to **HACIEN INFORMATION TECHNOLOGY SOLUTIONS**.",
          "**HACIEN will never change its bank details by email or chat alone.** If anyone asks you to pay a different account, call or email us at sales@haciensolutions.com before paying.",
        ]),
      ],
    },
    {
      title: "9. Late payment, collection and ownership",
      blocks: [
        p("These match the terms printed on our Sales Invoice:"),
        ul([
          "**Ownership:** HACIEN keeps ownership (title) of the goods until they are **fully paid**.",
          "**Interest:** accounts not paid within **30 days** are charged interest of **24% per year**.",
          "**Attorney's fees:** if we must file a court case to collect, you also pay **25% of the amount due** as attorney's fees and costs of collection.",
          "**Court venue:** any court case is filed in the proper courts of **Pasig City**.",
        ]),
      ],
    },
    {
      title: "10. Retention",
      blocks: [
        p("We do not accept retention (holding back part of the payment) on our invoices, unless agreed in writing or required by law for government procurement."),
      ],
    },
    {
      title: "11. Cancellations, changes and returns",
      blocks: [
        p("Because we order every item for you:"),
        ul([
          "**Before we place the supplier order:** you may cancel free of charge.",
          "**After we place the supplier order:** the order can't be cancelled. If we agree to an exception in writing, you pay any fees the supplier charges us.",
          "**Special-order or configured items, and activated software licences or subscriptions:** cannot be cancelled or returned.",
          "**Refunds, when due:** by bank transfer or check, within **15 business days**.",
        ]),
        p("**Change of mind.** We order every item for you, so we don't accept returns or refunds just because you changed your mind, chose the wrong item, or no longer need it. This includes special-order or configured items and software licences once activated."),
        p("**Defective, damaged or wrong items.** This does not affect your rights under Philippine law. If an item is defective, arrives damaged, is not what you ordered, or doesn't match its description or warranty, we will repair it, replace it, or refund you, as the law requires. If you are an individual buying for personal use, you may choose between those remedies where the Consumer Act (RA 7394) gives you that choice. You can bring a warranty claim to us with your receipt or warranty card, and we will pass it to the supplier for you. Hidden defects can be reported within the period the law allows (Civil Code: 6 months from delivery)."),
        p("**Not covered:** damage caused by misuse, mishandling, or unauthorized repair."),
      ],
    },
    {
      title: "12. Warranty",
      blocks: [
        p("HACIEN does not give its own warranty. Each product has the **manufacturer's or supplier's warranty only**, which we pass on to you. See [Warranty and Returns](/warranty)."),
      ],
    },
    {
      title: "13. Risk",
      blocks: [
        p("Risk of loss or damage passes to you when the DR is signed. Ownership stays with HACIEN until full payment (section 9)."),
      ],
    },
    {
      title: "14. Responsibility for loss (liability)",
      blocks: [
        p("To the extent allowed by law:"),
        ul([
          "HACIEN is not liable for indirect, incidental or consequential losses, lost profits, lost data, or penalties charged by third parties; and",
          "HACIEN's total liability for any claim is limited to the net price you actually paid for the specific item (line) the claim is about.",
        ]),
        p("Please back up and remove your data before equipment is installed, replaced or sent for repair. To the extent allowed by law, HACIEN is not responsible for data left on equipment sent for repair. We still protect any personal data we see while handling it."),
      ],
    },
    {
      title: "15. Events outside our control",
      blocks: [
        p("We are not responsible for delays caused by events outside our control (Civil Code Art. 1174), such as natural disasters, government acts, customs holds, port congestion, power or telecom outages, and global shortages from manufacturers. If one happens, we will tell you and the delivery date is extended. These events do not excuse payment for goods already delivered, or for special orders we have already bought from the supplier."),
      ],
    },
    {
      title: "16. Governing law and court venue",
      blocks: [
        p("These terms and every sale are governed by the laws of the Republic of the Philippines. If there is a disagreement, please contact us first. We will both try to settle it for **30 days** before going to court. Any court case is filed exclusively in the proper courts of **Pasig City**, as printed on our Sales Invoice."),
      ],
    },
    {
      title: "17. Changes to these terms",
      blocks: [
        p("We may update these terms. Each order follows the version printed on its quotation, or if none is printed, the version in effect on the quotation date. Earlier versions stay at [Policy history](/policies/history)."),
      ],
    },
  ],
};

export const warrantyPage: LegalPageModel = {
  path: "/warranty",
  eyebrow: "Warranty",
  title: "Warranty and Returns",
  description: "HACIEN does not give its own warranty.",
  versionLine: version("1.1", "Replaces version 1.0 (effective November 2, 2026)"),
  historyLink: true,
  showContents: false,
  meta: [
    { label: "Version", value: "1.1" },
    { label: "Effective", value: published },
    { label: "Replaces", value: "1.0 (November 2, 2026)" },
  ],
  intro: [],
  sections: [
    {
      title: "In short",
      blocks: [
        ul([
          "**HACIEN does not give its own warranty.** Your product has the **brand's or distributor's warranty**, and we handle the claim for you.",
          "The warranty period is shown on your quotation, Sales Invoice and the brand's warranty card.",
          "**Dead on arrival within 7 days:** we pay shipping both ways. Shipping is also free whenever the law requires it.",
          "**This does not affect your rights under Philippine law**, including for hidden defects (Civil Code) and online orders (RA 11967).",
        ]),
      ],
    },
    {
      title: "1. What warranty applies",
      blocks: [
        ul([
          "Each item has the warranty of its brand or of the distributor we bought it from.",
          "The warranty period is shown on the **quotation**, the **Sales Invoice** and the **brand's warranty card**.",
          "The brand or distributor checks each claim and decides whether to repair, replace or refund, within what the law requires.",
          "HACIEN does not add to, extend or change their warranty.",
        ]),
      ],
    },
    {
      title: "2. What warranties usually do not cover",
      blocks: [
        p("This depends on each brand. Common exclusions are physical or liquid damage, power surges, unauthorized repairs or opening the unit, misuse, normal wear, consumables (such as ink, toner and batteries), and software problems. Check the warranty card or the brand's website for your product."),
      ],
    },
    {
      title: "3. How to make a warranty claim",
      blocks: [
        ol([
          {
            text: "**Contact us** by email (sales@haciensolutions.com), or request a callback through the chat on the [Contact page](/contact), with:",
            bullets: [
              "your Sales Invoice or DR number, or your warranty card;",
              "the product model and serial number;",
              "a short description of the problem, with photos or a video if you can.",
            ],
          },
          "**Dead on arrival (within 7 days of delivery):** if an item doesn't work when first used, report it within 7 days. **We pay shipping both ways** and swap the item if the supplier allows.",
          "**After 7 days:** bring or ship the item to the brand's service center, or to HACIEN. Drop-offs at our Suntree Tower office are by prior appointment (Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays). If you bring it to us, we handle the claim with the distributor for you. You pay the shipping only for this later warranty help, and only where the law allows. **Shipping is free whenever the law requires it**, for example for defective items bought online (RA 11967 Sec. 20) or under the Consumer Act (RA 7394).",
          "**The brand or distributor checks the item.** Their checking time is outside our control. We update you whenever the claim status changes.",
          "**Before sending equipment**, back up and remove your data (see [Terms of Sale, section 14](/terms-of-sale#14-responsibility-for-loss-liability)).",
        ]),
        p("This does not affect your rights under Philippine law, including for hidden defects (Civil Code) and for online orders (RA 11967)."),
      ],
    },
    {
      title: "4. Items that arrive damaged or wrong",
      blocks: [
        p("These are not warranty claims. Report them within the periods in the [Terms of Sale, section 6](/terms-of-sale#6-delivery-and-acceptance): 3 days for problems with the contents, 24 hours for visible physical damage."),
      ],
    },
    {
      title: "5. Returns",
      blocks: [
        p("Because every item is ordered for you, we don't accept change-of-mind returns. Defective, damaged or wrong items are always covered. See [Terms of Sale, section 11](/terms-of-sale#11-cancellations-changes-and-returns)."),
      ],
    },
    {
      title: "6. Software licences and subscriptions",
      blocks: [
        p("Software and cloud subscriptions follow the publisher's licence terms. Once a licence is activated, we can't take it back for change of mind. If a key is faulty or doesn't work, we will fix or replace it."),
      ],
    },
  ],
};

export const legalPage: LegalPageModel = {
  path: "/legal",
  eyebrow: "Legal",
  title: "Business and Legal Information",
  description: "Who we are, our documents, and where to send notices.",
  versionLine: version("2.0", "Replaces version 1.0 (effective June 30, 2026)"),
  historyLink: true,
  showContents: false,
  meta: [
    { label: "Version", value: "2.0" },
    { label: "Effective", value: published },
    { label: "Replaces", value: "1.0 (June 30, 2026)" },
  ],
  intro: [],
  sections: [
    {
      title: "Who we are",
      blocks: [
        {
          kind: "pairs",
          rows: [
            ["Business name", "HACIEN INFORMATION TECHNOLOGY SOLUTIONS"],
            ["Type of business", "Sole proprietorship, registered with the DTI"],
            [
              "Office address",
              "Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio, City of Pasig, Metro Manila, Philippines 1605",
            ],
            ["Tax registration", "Registered with the BIR"],
            ["Email", "sales@haciensolutions.com"],
            ["Privacy contact", "The Proprietor (Data Protection Officer), privacy@haciensolutions.com"],
          ],
        },
        p("The BIR Registration Seal Badge is shown in the footer of every page."),
      ],
    },
    {
      title: "Documents we issue",
      blocks: [
        p("We issue BIR-registered pre-printed forms:"),
        ul([
          "**Delivery Receipt:** proves delivery;",
          "**Sales Invoice:** records the sale;",
          "**Collection Receipt:** records payment.",
        ]),
        p("If you get a document that looks like it's from HACIEN but you're not sure, contact us before paying."),
      ],
    },
    {
      title: "How we work",
      blocks: [
        ul([
          "We source every item per order and keep no office stock.",
          "We pass on the brand's or distributor's warranty. We give no warranty of our own.",
          "Prices, terms and delivery are set only in our written quotation and the [Terms of Sale](/terms-of-sale).",
        ]),
      ],
    },
    {
      title: "Contacting us and formal notices",
      blocks: [
        ul([
          "**Day-to-day matters** (quotations, orders, deliveries, claims): email sales@haciensolutions.com.",
          "**Formal or legal notices:** send by email to sales@haciensolutions.com **and** by courier to The Proprietor, HACIEN INFORMATION TECHNOLOGY SOLUTIONS, at the office address above.",
        ]),
        p("Website forms are for business inquiries, not formal legal notices."),
      ],
    },
    {
      title: "Our policies",
      blocks: [
        p("[Terms of Sale](/terms-of-sale) · [Warranty and Returns](/warranty) · [Privacy Policy](/privacy) · [Website Terms of Use](/terms) · [All policies](/policies)"),
      ],
    },
  ],
};

export const policyHistoryPage: LegalPageModel = {
  path: "/policies/history",
  eyebrow: "Policies",
  title: "Policy history",
  description: `Version 1.0 · Effective ${published}`,
  versionLine: `Version 1.0 · Effective ${published}`,
  historyLink: false,
  showContents: false,
  meta: [
    { label: "Version", value: "1.0" },
    { label: "Effective", value: published },
  ],
  intro: [
    {
      kind: "table",
      headers: ["Policy", "Version", "Effective"],
      rows: [
        ["[Terms of Sale](/terms-of-sale)", "v1.2", published],
        ["[Warranty and Returns](/warranty)", "v1.1", published],
        ["[Privacy Policy](/privacy)", "v2.6", privacyChatTabDate],
        ["[Website Terms of Use](/terms)", "v2.1", aiChatPublishDate],
        ["[Business and Legal Information](/legal)", "v2.0", published],
        ["[HACIEN Policies](/policies)", "v1.0", published],
      ],
    },
  ],
  sections: [
    {
      title: "Earlier versions",
      blocks: [
        {
          kind: "table",
          headers: ["Policy", "Version", "Effective"],
          rows: [
            ["Terms of Sale", "v1.1", "November 2, 2026"],
            ["Terms of Sale", "v1.0", "November 2, 2026"],
            ["Warranty and Returns", "v1.0", "November 2, 2026"],
            ["Privacy Policy", "v2.5", privacyGateDate],
            ["Privacy Policy", "v2.4", "November 8, 2026"],
            ["Privacy Policy", "v2.3", "November 2, 2026"],
            ["Privacy Policy", "v2.2", "November 2, 2026"],
            ["Privacy Policy", "v2.1", "November 2, 2026"],
            ["Privacy Policy", "v2.0", "November 2, 2026"],
            ["Privacy Policy", "v1.0", "July 1, 2026"],
            ["Website Terms of Use", "v2.0", "November 2, 2026"],
            ["Website Terms of Use", "v1.0", "July 1, 2026"],
            ["Business and Legal Information", "v1.0", "June 30, 2026"],
          ],
        },
        p("**Terms of Sale: changes from v1.0**"),
        ul([
          "Terms of Sale v1.1: Section 6 now explains naming a receiver, sharing their mobile number, order-status texts only (no ads, no links), and your responsibility for the number; quotation validity now reads 15 days unless the quotation states otherwise; added office pick-up by prior appointment.",
        ]),
        p("**Terms of Sale: changes from v1.1**"),
        ul([
          "Terms of Sale v1.2: Payment terms are as stated in your quotation. Unless your quotation states approved credit terms, payment is due before ordering and delivery. The 50% down / 50% on delivery default is removed; software and special orders remain 100% upfront; credit terms apply only when stated in your quotation.",
        ]),
        p("**Warranty and Returns: changes from v1.0**"),
        ul([
          "Warranty and Returns v1.1: warranty drop-offs at our Suntree Tower office are by prior appointment (Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays).",
        ]),
        p("**Privacy Policy: Changes from v2.5**"),
        ul([
          `Version 2.6 (${privacyChatTabDate}): Added that an in-progress chat is saved in the visitor's own browser tab until the tab is closed or Start over is tapped.`,
        ]),
        p("**Privacy Policy: Changes from v2.4**"),
        ul([
          `Version 2.5 (${privacyGateDate}): Updated the AI chat section to reflect the start-screen step where visitors enter their work email and confirm the Terms of Use and Privacy Policy (with timestamp and version recorded) before starting a chat.`,
        ]),
        p("**Privacy Policy: Changes from v2.3**"),
        ul([
          "Added the AI-assisted website chat: chat messages are collected, and Anthropic (Anthropic PBC) is named as the service that generates chat replies, processing in the United States. Under Anthropic's commercial API terms, chat messages are not used to train AI models, and Anthropic keeps API inputs and outputs for up to 30 days for safety and abuse monitoring. We do not keep chat transcripts. Added the legal basis for chat processing, and a note that the assistant makes no decisions — a person reviews every submitted request.",
        ]),
        p("**Website Terms of Use: Changes from v2.0**"),
        ul([
          "Added a section on the AI chat assistant: its answers are guidance only and are not a price, a binding offer, a promise or a quotation. Added chat wording to the responsibilities and misuse sections, including that chat usage may be limited.",
        ]),
        p("**Privacy Policy: Changes from v2.2**"),
        ul([
          "Added Google Analytics, used only if you click Accept in our cookie notice; data kept 2 months; no advertising features; Google LLC added as a service provider.",
        ]),
        p("**Privacy Policy: Changes from v2.1**"),
        ul([
          "We no longer collect or keep copies of receiving staff's government IDs. For high-value deliveries or pick-ups we only look at a company or valid ID (no photo, upload or storage).",
          "Named where our hosting is: website and email in Singapore, staff app in Jakarta, Indonesia.",
        ]),
        p("**Privacy Policy: Changes from v2.0**"),
        ul([
          'Added order-status texts: we text order updates from sender name "HACIEN" to the mobile number on an order. No promotional texts.',
          "Added opt-in bulk marketing email through Hostinger Reach, with a separate unticked checkbox and an unsubscribe link in every email. Removed the line saying we don't send promo newsletters.",
          "Clarified that 1-to-1 B2B sales outreach and quotation follow-ups (email, phone or Viber) stay under legitimate interest.",
          "Added UniSMS (Unisoft Ventures Corporation) or a similar Philippine SMS gateway provider, and Hostinger Reach, as service providers.",
          "Added keep times for order-text logs, marketing email sign-up and unsubscribe records, and marketing list entries.",
          "Added the right to withdraw marketing email consent. Unsubscribing never stops order texts and emails.",
        ]),
      ],
    },
  ],
};

export const legalPages = [
  policiesPage,
  privacyPage,
  termsPage,
  termsOfSalePage,
  warrantyPage,
  legalPage,
  policyHistoryPage,
] as const;
