import sceneConfig from "../../config/remotion-scenes.json";

export const remotionMeta = sceneConfig.meta;
export const remotionScenes = sceneConfig.scenes;

export type RemotionSceneId = keyof typeof remotionScenes;
