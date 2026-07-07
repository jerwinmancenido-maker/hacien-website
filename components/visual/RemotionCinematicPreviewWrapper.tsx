"use client";

import dynamic from "next/dynamic";
import { GlassmorphicSkeleton } from "./GlassmorphicSkeleton";

export const RemotionCinematicPreviewWrapper = dynamic(
  () => import("./RemotionCinematicPreview").then((mod) => mod.RemotionCinematicPreview),
  {
    ssr: false,
    loading: () => <GlassmorphicSkeleton label="Loading cinematic scene preview" />,
  },
);
