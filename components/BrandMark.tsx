import Image from "next/image";

interface BrandMarkProps {
  className?: string;
  size?: number;
  light?: boolean;
}

export function BrandMark({ className = "", size = 32 }: BrandMarkProps) {
  return (
    <Image
      src="/brand/hacien-mark.png"
      alt="HACIEN logo"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
