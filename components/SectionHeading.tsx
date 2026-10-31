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
        <div className={`mb-3 inline-flex items-center text-xs font-semibold uppercase tracking-[0.08em] text-grey-700 ${align === "center" ? "justify-center" : ""}`}>
          {align === "left" ? <span className="pixel-marker" aria-hidden="true" /> : null}
          {eyebrow}
        </div>
      ) : null}
      <HeadingTag className="font-display text-2xl tracking-tight text-ink sm:text-3xl">{title}</HeadingTag>
      {description ? <p className="mt-4 text-base leading-7 text-grey-600">{description}</p> : null}
    </div>
  );
}
