import { createContext } from "react";
import * as THREE from "three";

import { SceneDetails } from "./types";

const SampleScene = new THREE.Scene();
SampleScene.userData["foo"] = "I AM THE BAD SCENE";

export const SceneDetailsContext = createContext<SceneDetails>({
  scene: SampleScene,
  canvas: undefined,
});
