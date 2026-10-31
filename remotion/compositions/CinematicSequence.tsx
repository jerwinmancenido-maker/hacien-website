import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { CLINICAL_OUT_BEZIER, OVERLAP_FRAMES } from "../../lib/motion/timing";
import { AiScannerDemo } from "./AiScannerDemo";
import { ExplodedHardware } from "./ExplodedHardware";
import { HeroReel } from "./HeroReel";
import { LogisticsMap } from "./LogisticsMap";
import { PortalAssetDashboard } from "./PortalAssetDashboard";
import { remotionMeta } from "./scene-data";

const scenes = [HeroReel, ExplodedHardware, AiScannerDemo, LogisticsMap, PortalAssetDashboard] as const;

export const CINEMATIC_SCENE_FRAMES = remotionMeta.sceneFrames;
export const CINEMATIC_SEQUENCE_FRAMES =
  scenes.length * CINEMATIC_SCENE_FRAMES - (scenes.length - 1) * OVERLAP_FRAMES;

export function CinematicSequence() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#0A0A0A" }}>
      {scenes.map((Scene, index) => {
        const start = index * (CINEMATIC_SCENE_FRAMES - OVERLAP_FRAMES);
        const fadeIn =
          index === 0
            ? 1
            : interpolate(frame, [start, start + OVERLAP_FRAMES], [0, 1], {
                easing: Easing.bezier(...CLINICAL_OUT_BEZIER),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
        const fadeOut = interpolate(
          frame,
          [start + CINEMATIC_SCENE_FRAMES - OVERLAP_FRAMES, start + CINEMATIC_SCENE_FRAMES],
          [1, 0],
          {
            easing: Easing.bezier(...CLINICAL_OUT_BEZIER),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );
        const opacity = Math.min(fadeIn, index === scenes.length - 1 ? 1 : fadeOut);

        return (
          <Sequence key={Scene.name} from={start} durationInFrames={CINEMATIC_SCENE_FRAMES}>
            <AbsoluteFill style={{ opacity }}>
              <Scene />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
