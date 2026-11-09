"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type EnterpriseMediaFrameProps = Omit<ImageProps, "onError">;

/**
 * Same as next/image, except a failed load becomes a quiet ink panel.
 * The alt stays available to assistive tech and is not painted into the card.
 */
export function EnterpriseMediaFrame({
  className = "",
  alt,
  ...props
}: EnterpriseMediaFrameProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 bg-ink ${className}`}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
