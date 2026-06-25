"use client";

import { useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(20, 87, 217, 0.16)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      ref={cardRef}
      className={`rb-spotlight-card ${className}`}
      onPointerMove={handlePointerMove}
      style={
        {
          "--rb-spotlight-x": `${position.x}%`,
          "--rb-spotlight-y": `${position.y}%`,
          "--rb-spotlight-color": spotlightColor,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
