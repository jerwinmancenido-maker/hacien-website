import type { ReactNode } from "react";

export function Marquee({
  items,
  className = "",
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <div className={`rb-marquee ${className}`} aria-label="Procurement focus areas">
      <div>
        {[...items, ...items].map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  );
}
