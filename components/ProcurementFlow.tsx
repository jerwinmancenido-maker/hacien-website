import { StaggerContainer } from "@/components/motion";

const steps = ["Requirement", "Sourcing", "Canvassing", "Quotation", "Delivery"];

export function ProcurementFlow() {
  return (
    <div className="rounded-lg border border-white/70 bg-white/85 p-5 backdrop-blur">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">RFQ workflow</div>
      <StaggerContainer className="mt-5 grid gap-3 sm:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step} className="relative rounded border border-slate-200 bg-white p-4">
            <div className="grid h-9 w-9 place-items-center rounded bg-[#0A0A0A] text-xs font-bold text-white">
              {index + 1}
            </div>
            <div className="mt-3 text-sm font-bold text-slate-950">{step}</div>
            {index < steps.length - 1 ? (
              <div className="hidden absolute left-[calc(100%-0.25rem)] top-8 h-px w-5 bg-[#2563EB]/35 sm:block" />
            ) : null}
          </div>
        ))}
      </StaggerContainer>
    </div>
  );
}
