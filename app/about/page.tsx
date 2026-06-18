import { SectionHeading } from "@/components/SectionHeading";

export default function AboutPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About HACIEN"
          title="A Philippine IT solutions provider for practical, procurement-ready technology delivery."
          description="HACIEN Information Technology Solutions supports organizations that need reliable sourcing, specification matching, implementation coordination, and project-based IT execution."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            ["Procurement-aware", "We help buyers and project teams translate requirements into clear product and service requests."],
            ["Implementation-focused", "We support delivery, setup, coordination, and documentation beyond simple product selling."],
            ["ERP-minded", "Our internal platform roadmap is designed around real IT trading, procurement, and project workflows."],
          ].map(([title, text]) => (
            <div key={title} className="surface rounded-lg p-6">
              <h2 className="text-lg font-bold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
