"use client";

import type { CSSProperties, ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`motion-fade ${className}`} style={{ "--motion-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
