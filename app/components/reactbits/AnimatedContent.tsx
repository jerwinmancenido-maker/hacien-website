"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type AnimatedContentProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
};

export function AnimatedContent({
  children,
  className = "",
  delay = 0,
  distance = 18,
  direction = "up",
  threshold = 0.16,
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`rb-animated-content ${visible ? "is-visible" : ""} ${className}`}
      style={
        {
          "--rb-delay": `${delay}ms`,
          "--rb-distance": `${distance}px`,
          "--rb-x": direction === "left" ? "var(--rb-distance)" : direction === "right" ? "calc(var(--rb-distance) * -1)" : "0px",
          "--rb-y": direction === "up" ? "var(--rb-distance)" : direction === "down" ? "calc(var(--rb-distance) * -1)" : "0px",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
