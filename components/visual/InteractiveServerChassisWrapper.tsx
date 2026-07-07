"use client";

import dynamic from "next/dynamic";
import { GlassmorphicSkeleton } from "./GlassmorphicSkeleton";

export const InteractiveServerChassisWrapper = dynamic(
  () => import("./InteractiveServerChassis").then((mod) => mod.InteractiveServerChassis),
  {
    ssr: false,
    loading: () => <GlassmorphicSkeleton label="Loading server chassis preview" />,
  },
);
