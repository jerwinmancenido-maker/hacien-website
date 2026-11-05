"use client";

export function LenisProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  // Native scrolling only. Lenis smooth scrolling was removed 2026-11-05:
  // its smoothWheel replay (1.08s easing through a rAF loop) was the prime
  // suspect for the scroll-lag reports on desktop (fine pointer). PR #32
  // had already restored native scrolling on coarse-pointer phones; desktop
  // still lagged, so Lenis is gone everywhere instead of tuned. The `lenis`
  // package and the html.lenis rules in app/globals.css are left in place
  // for now (unused, harmless) and can be removed as a follow-up.
  return children;
}
