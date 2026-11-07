"use client";

export function LenisProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  // Native scrolling only. Lenis smooth scrolling was removed 2026-11-05:
  // its smoothWheel replay (1.08s easing through a rAF loop) was the prime
  // suspect for the scroll-lag reports on desktop (fine pointer). PR #32
  // had already restored native scrolling on coarse-pointer phones; desktop
  // still lagged, so Lenis is gone everywhere instead of tuned. The `lenis`
  // package and the html.lenis rules in app/globals.css were removed as
  // dead code 2026-11-07; this provider stays as a no-op so call sites
  // in app/layout.tsx do not need to change.
  return children;
}
