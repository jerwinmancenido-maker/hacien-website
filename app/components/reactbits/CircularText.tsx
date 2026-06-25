import { useId } from "react";
import type { CSSProperties } from "react";

export function CircularText({
  text,
  className = "",
  size = 128,
}: {
  text: string;
  className?: string;
  size?: number;
}) {
  const pathId = useId();
  const center = size / 2;
  const radius = center - 15;

  return (
    <div
      className={`rb-circular-text ${className}`}
      aria-hidden="true"
      style={{ width: size, height: size } as CSSProperties}
    >
      <svg viewBox={`0 0 ${size} ${size}`}>
        <path
          id={pathId}
          d={`M ${center},${center} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          fill="none"
        />
        <text>
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
