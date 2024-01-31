import { createContext } from "react";
import * as THREE from "three";

import { SceneDetails } from "./types";

export const SceneDetailsContext = createContext<SceneDetails>({
  scene: new THREE.Scene(),
  canvas: undefined,
});
