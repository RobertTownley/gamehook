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
  setLights: Dispatch<SetStateAction<Record<string, GameLight>>>;
  threeScene: THREE.Scene;

  // Actions
  addToScene: (obj: GameObject) => void;
  removeFromScene: (obj: GameObject) => void;
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
    addToScene: (_obj) => {},
    removeFromScene: (_obj) => {},
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
