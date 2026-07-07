"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function LenisProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.08,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
    });

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return children;
}
