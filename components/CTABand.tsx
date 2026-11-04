import Link from "next/link";

export function CTABand({
  title = "Ready to turn an IT requirement into a usable RFQ?",
  description = "Send HACIEN your product list, technical specifications, deadline, and delivery location. We will organize the available inputs and prepare the next quotation step.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded border border-grey-200 bg-ink text-white">
        <div className="animated-grid grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-display text-2xl leading-snug tracking-tight sm:text-3xl">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-grey-300">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/quote" className="rounded bg-blue px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue">
              Request a Quote
            </Link>
            <Link href="/contact" className="interactive-link rounded border border-white/20 px-5 py-3 text-center text-sm font-medium text-white hover:bg-white/5">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
