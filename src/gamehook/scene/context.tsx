import * as THREE from "three";

import { createContext } from "react";
import { buildCamera } from "../camera";

import { Camera } from "../camera/types";
import { GameObject } from "../objects";

export interface SceneContextValues {
  camera: Camera;
  objects: Record<string, GameObject>;
  threeScene: THREE.Scene;

  // Actions
  addObjectToScene: (obj: GameObject) => void;
  removeObjectFromScene: (obj: GameObject) => void;
}

export function getInitialSceneContext(): SceneContextValues {
  return {
    addObjectToScene: (_obj) => {},
    objects: {},
    removeObjectFromScene: (_obj) => {},
    camera: buildCamera({}),
    threeScene: new THREE.Scene(),
  };
}

export const SceneContext = createContext<SceneContextValues>(
  {} as unknown as SceneContextValues
);
