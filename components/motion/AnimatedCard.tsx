"use client";

import type { CSSProperties, ReactNode } from "react";

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`motion-card ${className}`} style={{ "--motion-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
