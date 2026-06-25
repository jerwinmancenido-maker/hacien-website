"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType } from "react";

export function SplitText({
  text,
  as: Tag = "span",
  className = "",
  delay = 34,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

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
      { threshold: 0.2 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`rb-split-text ${visible ? "is-visible" : ""} ${className}`}>
      {words.map((word, index) => (
        <span
          className="rb-split-word"
          key={`${word}-${index}`}
          style={{ "--rb-delay": `${index * delay}ms` } as CSSProperties}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
