import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CLINICAL_OUT_BEZIER } from "../../lib/motion/timing";

export const colors = {
  obsidian: "#0A0A0A",
  panel: "#171717",
  cyan: "#2563EB",
  blue: "#2563EB",
  amber: "#525252",
  line: "rgba(229, 229, 229, 0.2)",
  text: "#FFFFFF",
  muted: "#A3A3A3",
};

export function useEase(startSeconds: number, durationSeconds: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(frame, [startSeconds * fps, (startSeconds + durationSeconds) * fps], [0, 1], {
    easing: Easing.bezier(...CLINICAL_OUT_BEZIER),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function Stage({ children }: { children: ReactNode }) {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 18% 18%, rgba(37, 99, 235, 0.16), transparent 28%), radial-gradient(circle at 82% 24%, rgba(245, 245, 245, 0.08), transparent 24%), linear-gradient(135deg, #0A0A0A 0%, #0A0A0A 44%, #171717 100%)",
        color: colors.text,
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      <GridOverlay />
      {children}
    </AbsoluteFill>
  );
}

export function GridOverlay() {
  return (
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        opacity: 0.52,
      }}
    />
  );
}

export function Label({ eyebrow, title, style }: { eyebrow: string; title: string; style?: CSSProperties }) {
  const enter = useEase(0, 1.1);
  return (
    <div style={{ position: "absolute", left: 96, bottom: 96, opacity: enter, transform: `translateY(${(1 - enter) * 24}px)`, ...style }}>
      <div style={{ color: colors.cyan, fontSize: 24, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
      <div style={{ marginTop: 18, maxWidth: 980, fontSize: 76, lineHeight: 0.96, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
    </div>
  );
}

export function Panel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.16)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
        boxShadow: "0 30px 90px rgba(0,0,0,0.34)",
        borderRadius: 18,
        backdropFilter: "blur(18px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
