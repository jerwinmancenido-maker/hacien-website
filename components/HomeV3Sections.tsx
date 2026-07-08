import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { EnterprisePhotoPanel, PremiumStatementBand, enterpriseImages } from "@/components/EnterpriseImagery";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { categories } from "@/data/products";
import { solutions } from "@/data/solutions";

const ecosystem = [
  ["What is needed", "Users, quantity, site, deadline, and the business reason behind the request."],
  ["What is unclear", "Missing specs, compatibility questions, equivalents, and assumptions that affect review."],
  ["What can be checked", "Supplier inputs, warranty terms, lead time, and commercial conditions when evidence is available."],
  ["What happens next", "A usable RFQ with a reference number and written follow-up."],
];

const howItWorks = [
  ["Send", "Share a list, BOQ, photo, supplier quote, or plain description."],
  ["Clarify", "HACIEN checks what is missing or risky before quotation work begins."],
  ["Review", "Supplier and technical inputs are organized when available."],
  ["Respond", "You receive the next practical step with the original request preserved."],
];

const solutionImages: Record<string, keyof typeof enterpriseImages> = {
  "it-infrastructure": "dataCenter",
  "hardware-software-procurement": "workstation",
  "systems-integration": "commandCenter",
  "managed-it-support": "office",
  "network-connectivity": "network",
  "servers-storage": "storage",
  "cloud-productivity": "cloud",
  cybersecurity: "cybersecurity",
  "security-surveillance": "cabling",
  "software-licensing": "silicon",
  "general-merchandise-procurement": "documentation",
  "project-delivery-support": "workspace",
};

const categoryImages: Record<string, keyof typeof enterpriseImages> = {
  "computers-laptops": "workstation",
  "servers-storage": "storage",
  "network-equipment": "network",
  "printers-peripherals": "office",
  "licensed-software": "silicon",
  "security-surveillance": "cybersecurity",
};

export function TechnologyEcosystem() {
  return (
    <AnimatedSection className="glass-section-dark px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">RFQ Readiness</div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Turn incomplete specs into a usable request.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            The first job is not to sell a model. It is to make the request clear enough for responsible checking and practical follow-up.
          </p>
          <StaggerContainer className="mt-7 grid gap-3 sm:grid-cols-2">
            {ecosystem.map(([title, detail]) => (
              <AnimatedCard key={title} className="group rounded-lg border border-white/12 bg-white/[0.06] p-5 backdrop-blur">
                <div className="text-base font-bold">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
        <EnterprisePhotoPanel
          image="silicon"
          eyebrow="Details before quote"
          title="The useful detail is usually hidden in the first conversation."
          caption="HACIEN helps surface assumptions, options, and missing details before a formal quotation path is treated as ready."
        />
      </div>
    </AnimatedSection>
  );
}

export function HowHacienWorks() {
  return (
    <AnimatedSection className="glass-section px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How HACIEN Works"
          title="A short path for requests that are not yet perfect."
          description="The public RFQ experience is designed for real buyers: sometimes you have a BOQ, sometimes a model, and sometimes only the outcome you need."
        />
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <div className="grid divide-y divide-slate-200 md:grid-cols-4 md:divide-x md:divide-y-0">
            {howItWorks.map(([title, text], index) => (
              <details key={title} className="group p-5 open:bg-white">
                <summary className="cursor-pointer list-none">
                  <div className="grid h-10 w-10 place-items-center rounded bg-[#071426] text-sm font-bold text-white">{index + 1}</div>
                  <div className="mt-4 font-bold text-slate-950">{title}</div>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function SolutionsV3() {
  return (
    <AnimatedSection className="bg-transparent px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Solutions"
          title="Common IT needs, organized for review."
          description="These solution areas help buyers describe work across infrastructure, workplace technology, cybersecurity, cloud, and support without needing perfect specifications first."
        />
        <StaggerContainer className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.slice(0, 6).map((solution) => (
            <Link key={solution.slug} href={`/solutions/${solution.slug}`} className="group block">
              <AnimatedCard className="surface lift h-full overflow-hidden rounded-xl">
                <div
                  className="relative h-40 border-b border-slate-200 bg-slate-950 p-5"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.04), rgba(7, 20, 38, 0.76)), url(${enterpriseImages[solutionImages[solution.slug] || "network"]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="grid h-12 w-12 place-items-center rounded bg-white/90 text-xs font-bold text-[#071426] shadow-lg shadow-slate-950/20">{solution.icon}</div>
                </div>
                <div className="p-6">
                  <div className="text-xl font-bold text-slate-950 group-hover:text-[#1457d9]">{solution.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{solution.summary}</p>
                  <div className="mt-5 text-sm font-bold text-[#1457d9]">Explore solution</div>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </StaggerContainer>
        <div className="mt-10">
          <Link href="/solutions" className="interactive-link text-sm font-bold text-[#1457d9] hover:underline">
            View all solutions →
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ProductCatalogV3() {
  return (
    <AnimatedSection className="glass-section px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
          eyebrow="Technology"
          title="Technology categories without fake certainty."
          description="Use product categories to describe what you need. Final models, prices, and commercial terms still require RFQ review."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.slice(0, 6).map((category) => (
            <Link key={category.slug} href={`/products/${category.slug}`} className="group block">
              <AnimatedCard className="h-full rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-950/10">
                <div className="flex gap-3">
                  <div
                    className="h-14 w-16 shrink-0 rounded bg-slate-950"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.06), rgba(7, 20, 38, 0.7)), url(${enterpriseImages[categoryImages[category.slug] || "dataCenter"]})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#1457d9]">Technology</div>
                    <h3 className="mt-1 text-base font-bold tracking-tight text-slate-950 group-hover:text-[#1457d9]">{category.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{category.summary}</p>
                    <div className="mt-3 text-sm font-bold text-[#1457d9]">Build this requirement</div>
                  </div>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ErpPreviewV3() {
  const platformLayers = [
    ["Workspace", "Secure internal operations"],
    ["Timeline", "Relationship memory"],
    ["Guardian", "Operational guidance"],
    ["Customer Workspace", "Future customer continuity"],
  ];

  return (
    <AnimatedSection className="glass-section-dark px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">HACIEN Platform</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">HACIEN keeps each request tied to its history.</h2>
            <p className="mt-5 leading-7 text-slate-300">
              Workspace, Timeline, Guardian, and Customer Workspace help keep inquiries, operations, and account history connected. Public availability is announced only when mature.
            </p>
            <Link href="/platform" className="button-glow mt-8 inline-flex rounded bg-white px-5 py-3 text-sm font-bold text-[#071426]">
              Explore Platform
            </Link>
          </div>
          <StaggerContainer className="grid gap-4 sm:grid-cols-2">
            {platformLayers.map(([title, text], index) => (
              <div key={title} className="rounded-lg border border-white/12 bg-white/[0.07] p-5">
                <div className="text-xs font-bold text-blue-200">0{index + 1}</div>
                <div className="mt-3 text-lg font-bold">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function TrustV3() {
  const trustCards = [
    ["Bounded identity", "Public company information stays limited to what is appropriate for public review."],
    ["Quotation discipline", "Pricing, warranty, delivery, payment, and tax treatment are confirmed through formal quotation and written communication."],
    ["Customer continuity", "Inquiries, quotations, delivery, support, and follow-up are treated as one continuing account record."],
  ];

  return (
    <AnimatedSection className="bg-transparent px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Trust & Confidence"
          title="Trust without overstatement."
          description="HACIEN keeps public claims bounded, formal terms document-controlled, and customer communication clear."
        />
        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {trustCards.map(([title, detail]) => (
            <AnimatedCard key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="font-bold text-slate-950">{title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
            </AnimatedCard>
          ))}
        </StaggerContainer>
        <div className="mt-8">
          <Link
            href="/about/company-profile"
            className="interactive-link inline-flex text-sm font-bold text-[#1457d9] hover:underline"
          >
            Read HACIEN company profile →
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

export { PremiumStatementBand };

export function ExistingCustomerV3() {
  return (
    <AnimatedSection className="glass-section px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Access HACIEN</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Continue through one connected access point.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              Internal personnel can open Workspace. Customers can track requests, learn about the future Customer Workspace, or contact HACIEN for support.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/access"
              className="interactive-link rounded border border-slate-300 bg-white px-5 py-3 text-center text-sm font-bold text-slate-900 hover:border-[#1457d9] hover:text-[#1457d9]"
            >
              Access HACIEN
            </Link>
            <Link
              href="/contact"
              className="button-glow rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
            >
              Contact HACIEN
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export { CTABand };
