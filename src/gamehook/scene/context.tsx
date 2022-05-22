import * as THREE from "three";

import { createContext } from "react";
import { buildGameCamera, GameCamera } from "../camera";

import { Mesh } from "../mesh";
import { generateUUID } from "three/src/math/MathUtils";

export interface SceneContextValues {
  camera: GameCamera;
  id: string;
  meshes: Record<string, Mesh>;
  threeScene: THREE.Scene;
}

export function getInitialSceneContext(): SceneContextValues {
  return {
    id: generateUUID(),
    meshes: {},
    camera: buildGameCamera({}),
    threeScene: new THREE.Scene(),
  };
}

export const SceneContext = createContext<SceneContextValues>(
  {} as unknown as SceneContextValues
);
