import Link from "next/link";

export function CTABand({
  title = "Ready to turn an IT requirement into a supplier-ready RFQ?",
  description = "Send HACIEN your product list, technical specifications, deadline, and delivery location. We will help validate availability and prepare the next quotation step.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-[#071426] text-white shadow-2xl shadow-slate-950/15">
        <div className="animated-grid grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-200">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/quote" className="button-glow rounded bg-white px-5 py-3 text-center text-sm font-bold text-[#071426]">
              Submit RFQ
            </Link>
            <Link href="/contact" className="interactive-link rounded border border-white/30 px-5 py-3 text-center text-sm font-bold text-white">
              Talk to HACIEN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
