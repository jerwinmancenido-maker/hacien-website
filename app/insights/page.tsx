import type { Metadata } from "next";
import Link from "next/link";
import {
  AnimatedContent,
  BorderGlow,
  GradientBackground,
  SpotlightCard,
} from "@/app/components/reactbits";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { insightAuthor } from "@/data/companyContact";
import { insights } from "@/data/insights";

export const metadata: Metadata = {
  title: "Enterprise Technology Knowledge Center | Insights",
  description:
    "Read HACIEN insights for enterprise technology, RFQ preparation, buyer checklists, infrastructure, cybersecurity, cloud, and best practices.",
};

const knowledgeAreas = [
  ["Enterprise Technology", "Practical preparation for RFQs, technology domains, supplier comparison, and technical requirements."],
  ["Institutional Procurement", "Resources for specification review, approved equivalents, documentation, and organizational buying."],
  ["Best Practices", "Decision guidance for infrastructure, cybersecurity, cloud, digital transformation, and operational continuity."],
];

const featured = insights.slice(0, 3);
const remaining = insights.slice(3);
const categories = Array.from(new Set(insights.map((insight) => insight.category)));

const insightImages: Record<string, keyof typeof enterpriseImages> = {
  "Procurement Basics": "strategy",
  "Institutional Procurement": "documentation",
  "Technology Sourcing": "dataCenter",
  "ERP & Platform": "network",
  "Platform Direction": "workspace",
};

const insightImageOverrides: Record<string, keyof typeof enterpriseImages> = {
  "it-procurement-guide": "strategy",
  "how-to-prepare-rfq": "documentation",
  "approved-equivalent-explained": "workspace",
  "server-vs-nas-storage": "storage",
  "network-equipment-buying-guide": "network",
  "business-laptop-procurement-guide": "workstation",
};

function insightImage(category: string, slug?: string) {
  return enterpriseImages[(slug && insightImageOverrides[slug]) || insightImages[category] || "knowledge"];
}

export default function InsightsPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Insights"
        title="Procurement knowledge for better technology buying."
        description="Insights help buyers prepare clearer requirements, compare options, understand RFQs, and navigate technology decisions with more confidence."
        image="knowledge"
        primaryAction={{ href: "/quote", label: "Request a Quote" }}
        secondaryAction={{ href: "/solutions", label: "Explore Solutions" }}
        highlights={[
          { label: "RFQ Preparation", text: "Practical guidance for clearer requirements and supplier review." },
          { label: "Institutional Procurement", text: "Specification, equivalent, documentation, and quotation context." },
          { label: "Infrastructure", text: "Technology foundations explained for better buying decisions." },
          { label: "Best Practices", text: "Operational clarity for security, cloud, continuity, and support." },
        ]}
      />

      <section className="glass-section px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Educational Authority</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Clearer buying starts before the RFQ is submitted.
            </h2>
          </AnimatedContent>
          <div className="grid gap-5">
            {knowledgeAreas.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 80}>
                <SpotlightCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-section-dark px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-400">Featured Guides</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
              Start with the procurement decisions buyers ask about most.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featured.map((insight, index) => (
              <AnimatedContent key={insight.slug} delay={index * 80}>
                <Link href={`/insights/${insight.slug}`} className="group block h-full">
                  <SpotlightCard
                    className="h-full overflow-hidden rounded-lg border border-white/12 bg-white/[0.06]"
                  >
                    <div
                      className="h-40 bg-slate-900"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.76)), url(${insightImage(insight.category, insight.slug)})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                    <div className="p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-grey-400">{insight.category}</div>
                    <h3 className="mt-4 text-xl font-bold text-white group-hover:text-grey-200">{insight.title}</h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-grey-300">{insight.summary}</p>
                    <div className="mt-5 text-xs font-bold text-grey-300">
                      {insightAuthor} · {insight.readingTime}
                    </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-transparent px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Browse the Library</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Articles grouped by buying intent.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Topics are shown as reading categories. Choose an article card to continue.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label="Insight topics">
              {categories.map((category) => (
                <span key={category} className="text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
                  {category}
                </span>
              ))}
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-500">
                Platform
              </span>
            </div>
          </AnimatedContent>
          <div className="grid gap-4">
            {remaining.map((insight, index) => (
              <AnimatedContent key={insight.slug} delay={index * 60}>
                <Link href={`/insights/${insight.slug}`} className="group block">
                  <BorderGlow className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="grid md:grid-cols-[168px_1fr]">
                      <div
                        className="min-h-32 bg-slate-950"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.72)), url(${insightImage(insight.category, insight.slug)})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      />
                      <div className="p-5">
                        <div className="text-xs font-bold uppercase tracking-[0.16em] text-grey-600">{insight.category}</div>
                        <h3 className="mt-3 text-lg font-bold text-slate-950 group-hover:text-[#2563EB]">{insight.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{insight.summary}</p>
                        <p className="mt-3 text-xs font-bold text-slate-600">{insightAuthor}</p>
                      </div>
                    </div>
                  </BorderGlow>
                </Link>
              </AnimatedContent>
            ))}
            <AnimatedContent delay={260}>
              <Link href="/platform" className="group block">
                <BorderGlow className="overflow-hidden rounded-lg bg-white shadow-sm">
                  <div className="grid md:grid-cols-[168px_1fr]">
                    <div
                      className="min-h-32 bg-slate-950"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.72)), url(${enterpriseImages.workspace})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                    <div className="p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-grey-600">Platform Direction</div>
                      <h3 className="mt-3 text-lg font-bold text-slate-950 group-hover:text-[#2563EB]">
                        HACIEN operating platform and procurement continuity
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        The operating platform page explains how HACIEN keeps inquiry, quotation, sourcing, delivery, and support connected.
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </Link>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section className="bg-transparent px-4 py-12 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#0A0A0A] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-400">
                  Ready to act
                </div>
                <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
                  Have a procurement requirement ready to source?
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-grey-300">
                  Use the guides to prepare the context, then submit the requirement for RFQ review.
                </p>
              </div>
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#0A0A0A]"
              >
                Request a Quote
              </Link>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
