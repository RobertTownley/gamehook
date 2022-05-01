import * as THREE from "three";

import { createContext, Dispatch, SetStateAction } from "react";
import { buildCamera } from "../camera";

import { Camera } from "../camera/types";
import { GameObject } from "../objects";
import { GameLight } from "../lights";

export interface SceneContextValues {
  camera: Camera;
  objects: Record<string, GameObject>;
  setObjects: Dispatch<SetStateAction<Record<string, GameObject>>>;
  lights: Record<string, GameLight>;
  setLights: Dispatch<SetStateAction<Record<string, GameObject>>>;
  threeScene: THREE.Scene;
}

interface GetInitialSceneContext {
  objects: Record<string, GameObject>;
  setObjects: Dispatch<SetStateAction<Record<string, GameObject>>>;
  lights: Record<string, GameLight>;
  setLights: Dispatch<SetStateAction<Record<string, GameLight>>>;
}
export function getInitialSceneContext({
  objects,
  setObjects,
  lights,
  setLights,
}: GetInitialSceneContext): SceneContextValues {
  return {
    camera: buildCamera({}),
    threeScene: new THREE.Scene(),
    objects,
    setObjects,
    lights,
    setLights,
  };
}

export const SceneContext = createContext<SceneContextValues>(
  {} as unknown as SceneContextValues
);
