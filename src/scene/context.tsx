import { createContext } from "react";
import * as THREE from "three";

import { SceneDetails } from "./types";

const SampleScene = new THREE.Scene();

export const SceneDetailsContext = createContext<SceneDetails>({
  scene: SampleScene,
  canvas: undefined,
});
