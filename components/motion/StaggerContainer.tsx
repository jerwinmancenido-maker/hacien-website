"use client";

import type { ReactNode } from "react";

export function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`motion-stagger ${className}`}>{children}</div>;
}
