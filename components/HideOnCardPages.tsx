"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Renders global chrome (site footer, bottom spacer) everywhere except on
 * the standalone staff contact cards (/c/:id), which are one-screen pages
 * with their own footer line.
 */
export function HideOnCardPages({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/c/")) return null;
  return <>{children}</>;
}
