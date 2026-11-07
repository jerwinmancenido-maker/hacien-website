import Link from "next/link";

export function CTABand({
  title = "Ready to turn an IT requirement into a usable RFQ?",
  description = "Send HACIEN your product list, technical specifications, deadline, and delivery location. We will organize the available inputs and prepare the next quotation step.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-grey-200 bg-blue-tint px-6 py-10 text-center sm:px-10">
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-grey-700">{description}</p>
        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
          <Link href="/quote" className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue px-6 py-3 text-center text-sm font-medium text-white hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue">
            Request a Quote
          </Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-grey-300 bg-white px-6 py-3 text-center text-sm font-medium text-ink hover:bg-grey-50">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
