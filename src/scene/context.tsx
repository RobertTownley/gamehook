import { createContext } from "react";
import * as THREE from "three";

import { SceneDetails } from "./types";

export const SceneDetailsContext = createContext<SceneDetails>({
  render: () => {},
  renderer: new THREE.WebGLRenderer(),
  scene: new THREE.Scene(),

  canvas: undefined,
  camera: new THREE.Camera(),
  setCamera: () => {},
});
