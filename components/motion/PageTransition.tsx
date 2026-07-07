"use client";

import type { ReactNode } from "react";

export function PageTransition({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="page-dissolve">{children}</div>;
}
