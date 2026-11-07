export function BuyingTimeline() {
  const steps = [
    { title: "Request", text: "Send an item list, specifications, files, or a plain description of the need." },
    { title: "Reply within 1 business day", text: "HACIEN replies Monday to Friday, 9:00 AM \u2013 6:00 PM PHT, excluding holidays." },
    { title: "Quotation valid 15 days", text: "The quotation states the exact model, lead time, delivery conditions, and commercial terms." },
    { title: "Accept and confirm payment terms", text: "Payment terms, including any deposit, are stated in your quotation and confirmed before ordering." },
    { title: "Supplier order", text: "HACIEN orders from the supplier after acceptance and confirmation of the payment terms." },
    { title: "Delivery", text: "Delivery is by the agreed date and time. The delivery receipt confirms box count and outside condition only. Report contents problems within 3 days and visible damage within 24 hours." },
  ];
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">How buying works</div>
        <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          How buying from HACIEN works.
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-grey-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-bold text-[#2563EB]">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="mt-3 text-lg font-bold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm leading-6 text-slate-600">
          Full detail is in the{" "}
          <a href="/terms-of-sale" className="font-bold text-slate-950 underline">Terms of Sale</a>.
        </p>
      </div>
    </section>
  );
}
