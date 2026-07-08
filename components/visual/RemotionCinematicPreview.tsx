"use client";

import { Player } from "@remotion/player";
import { CinematicSequence, CINEMATIC_SEQUENCE_FRAMES } from "@/remotion/compositions/CinematicSequence";
import { remotionMeta, remotionScenes } from "@/remotion/compositions/scene-data";

export function RemotionCinematicPreview() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Remotion Scene System</div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Cinematic previews now read from the Phase 3 scene configuration.
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          This browser preview verifies the five Sprint 2 compositions as a single overlapping sequence. The copy
          is loaded from local configuration and remains RFQ-first: no payment, tax, invoice, stock, or delivery
          commitment is created here.
        </p>
        <div className="mt-6 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
          {Object.values(remotionScenes).map((scene) => (
            <div key={scene.eyebrow} className="rounded-lg border border-white/12 bg-white/[0.06] p-4">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-blue-200">{scene.eyebrow}</div>
              <div className="mt-2 font-semibold text-white">{scene.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/15 bg-black/30 shadow-2xl shadow-blue-950/30">
        <Player
          component={CinematicSequence}
          compositionWidth={1920}
          compositionHeight={1080}
          durationInFrames={CINEMATIC_SEQUENCE_FRAMES}
          fps={remotionMeta.fps}
          controls
          loop
          acknowledgeRemotionLicense
          style={{ width: "100%", aspectRatio: "16 / 9" }}
        />
      </div>
    </div>
  );
}
