import { Composition, Folder } from "remotion";
import { AiScannerDemo } from "./compositions/AiScannerDemo";
import { CinematicSequence, CINEMATIC_SEQUENCE_FRAMES } from "./compositions/CinematicSequence";
import { ExplodedHardware } from "./compositions/ExplodedHardware";
import { HeroReel } from "./compositions/HeroReel";
import { LogisticsMap } from "./compositions/LogisticsMap";
import { PortalAssetDashboard } from "./compositions/PortalAssetDashboard";
import { remotionMeta } from "./compositions/scene-data";

const fps = remotionMeta.fps;
const width = 1920;
const height = 1080;

export function RemotionRoot() {
  return (
    <Folder name="HACIEN-Sprint-2">
      <Composition id="CinematicSequence" component={CinematicSequence} durationInFrames={CINEMATIC_SEQUENCE_FRAMES} fps={fps} width={width} height={height} />
      <Composition id="HeroReel" component={HeroReel} durationInFrames={fps * 8} fps={fps} width={width} height={height} />
      <Composition id="ExplodedHardware" component={ExplodedHardware} durationInFrames={fps * 7} fps={fps} width={width} height={height} />
      <Composition id="AiScannerDemo" component={AiScannerDemo} durationInFrames={fps * 7} fps={fps} width={width} height={height} />
      <Composition id="LogisticsMap" component={LogisticsMap} durationInFrames={fps * 7} fps={fps} width={width} height={height} />
      <Composition id="PortalAssetDashboard" component={PortalAssetDashboard} durationInFrames={fps * 8} fps={fps} width={width} height={height} />
    </Folder>
  );
}
