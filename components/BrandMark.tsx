import { BrandLogo } from "@/components/BrandLogo";

interface BrandMarkProps {
  className?: string;
  size?: number;
  light?: boolean;
}

/** App/icon mark — prefers the SVG icon lockup from brand kit v1.1. */
export function BrandMark({ className = "", size = 32, light = false }: BrandMarkProps) {
  return (
    <BrandLogo
      variant={light ? "icon-dark" : "icon"}
      height={Math.max(size, 16)}
      className={className}
      priority
    />
  );
}
