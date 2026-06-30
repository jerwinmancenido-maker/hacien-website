import Link from "next/link";
import type { Metadata } from "next";
import {
  AnimatedContent,
  BlurReveal,
  BorderGlow,
  GradientBackground,
  SplitText,
  SpotlightCard,
} from "@/app/components/reactbits";
import { ProductGrid } from "@/components/ProductGrid";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "IT Product Sourcing and RFQ Catalog Philippines | HACIEN",
  description:
    "Browse HACIEN's RFQ-first IT product sourcing catalog for computers, servers, networking, licensed software, security, peripherals, UPS, accessories, and general merchandise in the Philippines.",
};

const sourcingPrinciples = [
  {
    title: "Representative categories for RFQ review.",
    text: "The catalog helps buyers describe requirements. Stock, exact model, warranty, lead time, and pricing are confirmed during RFQ review.",
  },
  {
    title: "Products are evaluated in context.",
    text: "A laptop, switch, firewall, UPS, license, or CCTV package is only useful when the site, users, compatibility, and delivery conditions are understood.",
  },
  {
    title: "Quote-first buying protects accuracy.",
    text: "HACIEN keeps product buying quote-first so pricing, stock, warranty, lead time, and delivery terms are confirmed before commitment.",
  },
];

const sourcingFlow = [
  ["Select", "Choose representative products or categories that match the requirement."],
  ["Describe", "Add specifications, quantity, warranty, delivery site, and deadline context."],
  ["Validate", "HACIEN reviews availability, equivalent options, supplier terms, and fit."],
  ["Quote", "A formal quotation is prepared after supplier inputs are confirmed."],
];

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Products
            </AnimatedContent>
            <SplitText
              as="h1"
              text="What can be sourced through HACIEN."
              className="mt-5 max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Products are organized as a quote-first procurement catalog. Browse the classes,
                build an RFQ, and let HACIEN validate supplier availability before any formal offer.
              </p>
            </BlurReveal>
            <AnimatedContent delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Open RFQ Cart
              </Link>
              <Link
                href="/solutions"
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                Explore Solutions
              </Link>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                RFQ Catalog
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                No fake checkout. No unverified stock claims. Just a clearer way to start sourcing.
              </h2>
              <div className="mt-8 grid gap-3">
                {["Browse", "Add to RFQ", "Describe Need", "Validate", "Quote"].map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#071426] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{step}</span>
                  </div>
                ))}
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Sourcing Philosophy</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A catalog should help buyers ask better questions.
            </h2>
          </AnimatedContent>
          <div className="grid gap-5">
            {sourcingPrinciples.map((item, index) => (
              <AnimatedContent key={item.title} delay={index * 80}>
                <SpotlightCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Product Classes</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Representative categories for business, project, institutional, and government requirements.
            </h2>
          </AnimatedContent>
          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <AnimatedContent key={category.slug} delay={index * 40}>
                <Link
                  href={`/products/${category.slug}`}
                  className="interactive-link inline-flex rounded border border-white/12 bg-white/[0.06] px-4 py-3 text-sm font-bold text-slate-100 hover:border-blue-300"
                >
                  {category.name}
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">RFQ Starting Points</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Start from a representative item, then refine the requirement.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Product cards support sourcing conversations. Exact specifications, supplier availability,
              warranty terms, and delivery conditions are confirmed before formal quotation.
            </p>
          </AnimatedContent>
          <div className="mt-10">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">RFQ Workflow</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Buying starts with clarity, not a checkout button.
            </h2>
          </AnimatedContent>
          <div className="progress-line mt-12 grid gap-4">
            {sourcingFlow.map(([step, text], index) => (
              <AnimatedContent key={step} delay={index * 70}>
                <BorderGlow className="rounded-lg bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1457d9] text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-950">{step}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                </BorderGlow>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#071426] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Quote-first Commerce
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Product discovery should lead to a better RFQ, not premature checkout.
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                  Browse representative products, describe the requirement, attach files when needed,
                  and let HACIEN confirm the commercial details before a formal offer.
                </p>
              </div>
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]"
              >
                Submit RFQ
              </Link>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
