import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";

export const metadata: Metadata = {
  title: "Access HACIEN",
  description:
    "Access HACIEN Workspace, learn about the future Customer Workspace, or contact HACIEN support.",
};

const erpUrl =
  process.env.NEXT_PUBLIC_ERP_URL?.trim() || "https://erp.haciensolutions.com";

const accessOptions = [
  {
    title: "Internal Workspace",
    eyebrow: "Authorized personnel",
    body: "Secure operational workspace for HACIEN personnel. Used for request review, customer continuity, quotations, operations, and Founder work.",
    href: erpUrl,
    label: "Open Workspace",
    external: erpUrl.startsWith("http"),
  },
  {
    title: "Customer Workspace",
    eyebrow: "Future customer continuity",
    body: "A future customer workspace for tracking requests, viewing quotations, accessing documents, continuing support, and preserving relationship history.",
    href: "/customer-workspace",
    label: "Learn More",
    external: false,
  },
  {
    title: "Support",
    eyebrow: "Need assistance?",
    body: "Contact HACIEN for help with an inquiry, reference number, quotation follow-up, support request, or company communication.",
    href: "/contact",
    label: "Contact HACIEN",
    external: false,
  },
];

export default function AccessPage() {
  return (
    <>
      <section className="bg-[#071426] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Access HACIEN</div>
          <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            One access point for HACIEN’s connected ecosystem.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Open the internal Workspace, learn about the future Customer Workspace, or contact HACIEN for support.
          </p>
        </div>
      </section>

      <AnimatedSection className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <StaggerContainer className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {accessOptions.map((option) => (
            <AnimatedCard key={option.title} className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">{option.eyebrow}</div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">{option.title}</h2>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{option.body}</p>
              <Link
                href={option.href}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noopener noreferrer" : undefined}
                className="mt-8 inline-flex w-fit rounded-full bg-[#071426] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1457d9]"
              >
                {option.label}
              </Link>
            </AnimatedCard>
          ))}
        </StaggerContainer>
      </AnimatedSection>
    </>
  );
}
