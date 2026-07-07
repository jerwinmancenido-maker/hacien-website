"use client";

import dynamic from "next/dynamic";
import { GlassmorphicSkeleton } from "./GlassmorphicSkeleton";

export const ScrollServerAssemblyWrapper = dynamic(
  () => import("./ScrollServerAssembly").then((mod) => mod.ScrollServerAssembly),
  {
    ssr: false,
    loading: () => <GlassmorphicSkeleton label="Loading scroll-bound assembly preview" />,
  },
);
