"use client";

import type { CSSProperties, ReactNode } from "react";

export function SlideUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`motion-slide-up ${className}`} style={{ "--motion-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
