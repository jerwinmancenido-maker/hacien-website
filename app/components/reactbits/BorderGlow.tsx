import type { ReactNode } from "react";

export function BorderGlow({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return <div className={`rb-border-glow rb-border-glow-${tone} ${className}`}>{children}</div>;
}
