import React from "react";

interface BrandMarkProps {
  className?: string;
  size?: number;
  light?: boolean;
}

export function BrandMark({ className = "", size = 32, light = false }: BrandMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill={light ? "#ffffff" : "#071426"} />
      <path
        d="M17 16h8v16h14V16h8v32h-8V39H25v9h-8V16z"
        fill={light ? "#071426" : "#ffffff"}
      />
      <path d="M47 48H17v-5h30v5z" fill="#37a7ff" />
    </svg>
  );
}
