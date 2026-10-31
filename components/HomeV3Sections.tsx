import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { EnterprisePhotoPanel, PremiumStatementBand, enterpriseImages } from "@/components/EnterpriseImagery";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { categories } from "@/data/products";
import { solutions } from "@/data/solutions";
import { getHomepageContent } from "@/lib/cms/content";

const homepageContent = getHomepageContent();

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
    <AnimatedSection className="glass-section-dark px-4 py-9 text-white sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">{homepageContent.rfqReadiness.eyebrow}</div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{homepageContent.rfqReadiness.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-grey-300 sm:mt-4 sm:text-base sm:leading-7">
            {homepageContent.rfqReadiness.description}
          </p>
          <StaggerContainer className="mt-5 grid gap-2 sm:mt-7 sm:grid-cols-2 sm:gap-3">
            {homepageContent.rfqReadiness.cards.map((item, index) => (
              <AnimatedCard key={item.title} className={`group rounded-lg border border-white/12 bg-white/[0.06] p-4 backdrop-blur sm:p-5 ${index > 1 ? "hidden sm:block" : ""}`}>
                <div className="text-base font-bold">{item.title}</div>
                <p className="mt-2 text-sm leading-6 text-grey-300">{item.text}</p>
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
        <EnterprisePhotoPanel
          image="silicon"
          eyebrow={homepageContent.rfqReadiness.imagePanel.eyebrow}
          title={homepageContent.rfqReadiness.imagePanel.title}
          caption={homepageContent.rfqReadiness.imagePanel.caption}
        />
      </div>
    </AnimatedSection>
  );
}

export function HowHacienWorks() {
  return (
    <AnimatedSection className="glass-section px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={homepageContent.howItWorks.eyebrow}
          title={homepageContent.howItWorks.title}
          description={homepageContent.howItWorks.description}
        />
        <div className="mt-6 overflow-hidden rounded border border-slate-200 bg-slate-50 sm:mt-8">
          <div className="grid divide-y divide-slate-200 md:grid-cols-4 md:divide-x md:divide-y-0">
            {homepageContent.howItWorks.steps.map((item, index) => (
              <details key={item.title} className="group p-4 open:bg-white sm:p-5">
                <summary className="cursor-pointer list-none">
                  <div className="grid h-10 w-10 place-items-center rounded bg-[#0A0A0A] text-sm font-bold text-white">{index + 1}</div>
                  <div className="mt-4 font-bold text-slate-950">{item.title}</div>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
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
    <AnimatedSection className="bg-transparent px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={homepageContent.solutionsPreview.eyebrow}
          title={homepageContent.solutionsPreview.title}
          description={homepageContent.solutionsPreview.description}
        />
        <StaggerContainer className="mt-6 grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {solutions.slice(0, 6).map((solution, index) => (
            <Link key={solution.slug} href={`/solutions/${solution.slug}`} className={`group block ${index > 2 ? "hidden md:block" : ""}`}>
              <AnimatedCard className="surface lift h-full overflow-hidden rounded">
                <div
                  className="relative h-28 border-b border-slate-200 bg-slate-950 p-4 sm:h-40 sm:p-5"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.04), rgba(7, 20, 38, 0.76)), url(${enterpriseImages[solutionImages[solution.slug] || "network"]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="grid h-12 w-12 place-items-center rounded bg-white/90 text-xs font-bold text-[#0A0A0A] shadow-lg shadow-slate-950/20">{solution.icon}</div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-lg font-bold text-slate-950 group-hover:text-[#2563EB] sm:text-xl">{solution.title}</div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:line-clamp-none">{solution.summary}</p>
                  <div className="mt-3 text-sm font-bold text-[#2563EB] sm:mt-5">Explore solution</div>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </StaggerContainer>
        <div className="mt-6 sm:mt-10">
          <Link href="/solutions" className="interactive-link text-sm font-bold text-[#2563EB] hover:underline">
            {homepageContent.solutionsPreview.viewAllLabel}
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ProductCatalogV3() {
  return (
    <AnimatedSection className="glass-section px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
          eyebrow={homepageContent.productCatalogPreview.eyebrow}
          title={homepageContent.productCatalogPreview.title}
          description={homepageContent.productCatalogPreview.description}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.slice(0, 6).map((category, index) => (
            <Link key={category.slug} href={`/products/${category.slug}`} className={`group block ${index > 3 ? "hidden sm:block" : ""}`}>
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
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">Technology</div>
                    <h3 className="mt-1 text-base font-bold tracking-tight text-slate-950 group-hover:text-[#2563EB]">{category.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{category.summary}</p>
                    <div className="mt-3 text-sm font-bold text-[#2563EB]">Build this requirement</div>
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
  return (
    <AnimatedSection className="glass-section-dark px-4 py-9 text-white sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">{homepageContent.platformPreview.eyebrow}</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{homepageContent.platformPreview.title}</h2>
            <p className="mt-5 leading-7 text-grey-300">
              {homepageContent.platformPreview.description}
            </p>
            <Link href={homepageContent.platformPreview.action.href} className="button-glow mt-8 inline-flex rounded bg-white px-5 py-3 text-sm font-bold text-[#0A0A0A]">
              {homepageContent.platformPreview.action.label}
            </Link>
          </div>
          <StaggerContainer className="grid gap-4 sm:grid-cols-2">
            {homepageContent.platformPreview.layers.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-white/12 bg-white/[0.07] p-5">
                <div className="text-xs font-bold text-blue-200">0{index + 1}</div>
                <div className="mt-3 text-lg font-bold">{item.title}</div>
                <p className="mt-2 text-sm leading-6 text-grey-300">{item.text}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function TrustV3() {
  return (
    <AnimatedSection className="bg-transparent px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={homepageContent.trustPreview.eyebrow}
          title={homepageContent.trustPreview.title}
          description={homepageContent.trustPreview.description}
        />
        <StaggerContainer className="mt-6 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {homepageContent.trustPreview.cards.map((item) => (
            <AnimatedCard key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="font-bold text-slate-950">{item.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </AnimatedCard>
          ))}
        </StaggerContainer>
        <div className="mt-8">
          <Link
            href={homepageContent.trustPreview.action.href}
            className="interactive-link inline-flex text-sm font-bold text-[#2563EB] hover:underline"
          >
            {homepageContent.trustPreview.action.label}
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
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">{homepageContent.accessPreview.eyebrow}</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {homepageContent.accessPreview.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              {homepageContent.accessPreview.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={homepageContent.accessPreview.actions[0].href}
              className="interactive-link rounded border border-slate-300 bg-white px-5 py-3 text-center text-sm font-bold text-slate-900 hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              {homepageContent.accessPreview.actions[0].label}
            </Link>
            <Link
              href={homepageContent.accessPreview.actions[1].href}
              className="button-glow rounded bg-[#2563EB] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
            >
              {homepageContent.accessPreview.actions[1].label}
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export { CTABand };
