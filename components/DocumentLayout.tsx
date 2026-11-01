import type { ReactNode } from "react";
import { AnimatedContent, BorderGlow } from "@/app/components/reactbits";

type DocumentMeta = {
  label: string;
  value: string;
};

export function DocumentPageShell({
  eyebrow,
  title,
  description,
  meta,
  children,
  plain = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta: DocumentMeta[];
  children: ReactNode;
  plain?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 ${plain ? "bg-white" : ""}`}>
      {plain ? null : (
        <>
          <div className="cinematic-aurora pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-25" />
          <div className="cinematic-lines pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.08]" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">{eyebrow}</div>
            <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
          </AnimatedContent>
          <AnimatedContent delay={90}>
            <BorderGlow className="glass-control rounded-lg p-5">
              <p className="text-sm leading-6 text-slate-700">{description}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {meta.map((item) => (
                  <div key={item.label} className="rounded border border-slate-200/80 bg-white/76 p-3">
                    <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#2563EB]">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-bold text-slate-950">{item.value}</div>
                  </div>
                ))}
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>

        <div className="mt-8 grid gap-4 text-sm leading-6 text-slate-700">{children}</div>
      </div>
    </section>
  );
}

export function DocumentIntro({ children }: { children: ReactNode }) {
  return (
    <AnimatedContent>
      <div className="rounded-lg border border-slate-200/80 bg-white/88 p-5 shadow-sm backdrop-blur">
        <div className="grid gap-3 text-sm leading-6 text-slate-700">{children}</div>
      </div>
    </AnimatedContent>
  );
}

export function DocumentSection({
  title,
  children,
  index,
}: {
  title: string;
  children: ReactNode;
  index: number;
}) {
  return (
    <AnimatedContent delay={Math.min(index * 30, 180)}>
      <section className="grid gap-3 rounded-lg border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur lg:grid-cols-[0.28fr_1fr] lg:p-5">
        <h2 className="text-base font-bold tracking-tight text-slate-950 lg:sticky lg:top-24 lg:self-start">
          {title}
        </h2>
        <div className="grid gap-3">{children}</div>
      </section>
    </AnimatedContent>
  );
}

export function DocumentClause({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/72 p-4">
      <h3 className="text-sm font-bold text-slate-950">{title}</h3>
      <div className="mt-2 grid gap-2">{children}</div>
    </div>
  );
}
