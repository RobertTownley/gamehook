import { createContext } from "react";
import * as THREE from "three";

import { SceneDetails } from "./types";

export const SceneDetailsContext = createContext<SceneDetails>({
  render: () => {},
  scene: new THREE.Scene(),

  camera: new THREE.Camera(),
  setCamera: () => {},
});
