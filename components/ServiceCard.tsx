import { AnimatedCard } from "@/components/motion";

export function ServiceCard({
  title,
  description,
  points,
}: {
  title: string;
  description: string;
  points?: string[];
}) {
  return (
    <AnimatedCard className="surface lift rounded-lg p-6">
      <div className="mb-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#2563EB] to-[#2563EB]" />
      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      {points ? (
        <ul className="mt-5 grid gap-2 text-sm text-slate-700">
          {points.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded bg-[#2563EB]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </AnimatedCard>
  );
}
