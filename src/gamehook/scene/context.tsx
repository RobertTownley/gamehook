import * as THREE from "three";

import { createContext } from "react";
import { buildCamera } from "../camera";

import { Camera } from "../camera/types";
import { MeshProps } from "../mesh";

export interface SceneContextValues {
  camera: Camera;
  meshes: Record<string, MeshProps>;
  threeScene: THREE.Scene;
}

export function getInitialSceneContext(): SceneContextValues {
  return {
    meshes: {},
    camera: buildCamera({}),
    threeScene: new THREE.Scene(),
  };
}

export const SceneContext = createContext<SceneContextValues>(
  {} as unknown as SceneContextValues
);
