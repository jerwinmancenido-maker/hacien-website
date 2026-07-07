"use client";

import dynamic from "next/dynamic";
import { GlassmorphicSkeleton } from "./GlassmorphicSkeleton";

export const DeliveryGlobeWrapper = dynamic(() => import("./DeliveryGlobe").then((mod) => mod.DeliveryGlobe), {
  ssr: false,
  loading: () => <GlassmorphicSkeleton label="Loading logistics preview" />,
});
