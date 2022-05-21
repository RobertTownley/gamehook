import * as THREE from "three";

import { createContext } from "react";
import { buildCamera } from "../camera";

import { Camera } from "../camera/types";
import { Mesh } from "../mesh";
import { generateUUID } from "three/src/math/MathUtils";

export interface SceneContextValues {
  camera: Camera;
  id: string;
  meshes: Record<string, Mesh>;
  threeScene: THREE.Scene;
}

export function getInitialSceneContext(): SceneContextValues {
  return {
    id: generateUUID(),
    meshes: {},
    camera: buildCamera({}),
    threeScene: new THREE.Scene(),
  };
}

export const SceneContext = createContext<SceneContextValues>(
  {} as unknown as SceneContextValues
);
