"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type SplitTag = "span" | "h1" | "h2" | "p";

export function SplitText({
  text,
  as: Tag = "span",
  className = "",
  delay = 34,
}: {
  text: string;
  as?: SplitTag;
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

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };
  const content = words.map((word, index) => (
        <span
          className="rb-split-word"
          key={`${word}-${index}`}
          style={{ "--rb-delay": `${index * delay}ms` } as CSSProperties}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
  ));
  const classes = `rb-split-text ${visible ? "is-visible" : ""} ${className}`;

  if (Tag === "h1") {
    return (
      <h1 ref={setRef} className={classes}>
        {content}
      </h1>
    );
  }

  if (Tag === "h2") {
    return (
      <h2 ref={setRef} className={classes}>
        {content}
      </h2>
    );
  }

  if (Tag === "p") {
    return (
      <p ref={setRef} className={classes}>
        {content}
      </p>
    );
  }

  return (
    <span ref={setRef} className={classes}>
      {content}
    </span>
  );
}
