import * as THREE from "three";

import { createContext, Dispatch, SetStateAction } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { buildCamera } from "../camera";

import { Camera } from "../camera/types";
import { GameObject } from "../objects";
import { GameLight } from "../lights";

export interface SceneContextValues {
  camera: Camera;
  id: string;
  objects: GameObject[];
  setObjects: Dispatch<SetStateAction<GameObject[]>>;
  lights: GameLight[];
  setLights: Dispatch<SetStateAction<GameObject[]>>;
  threeScene: THREE.Scene;
}

interface GetInitialSceneContext {
  objects: GameObject[];
  setObjects: Dispatch<SetStateAction<GameObject[]>>;
  lights: GameLight[];
  setLights: Dispatch<SetStateAction<GameLight[]>>;
}
export function getInitialSceneContext({
  objects,
  setObjects,
  lights,
  setLights,
}: GetInitialSceneContext): SceneContextValues {
  return {
    camera: buildCamera({}),
    id: generateUUID(),
    threeScene: new THREE.Scene(),
    objects,
    setObjects,
    lights,
    setLights,
  };
}

export const SceneContext = createContext<SceneContextValues>(
  getInitialSceneContext()
);
