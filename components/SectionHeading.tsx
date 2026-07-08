export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const HeadingTag = as;

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
          {eyebrow}
        </div>
      ) : null}
      <HeadingTag className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</HeadingTag>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
