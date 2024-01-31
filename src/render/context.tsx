import { createContext } from "react";
import * as THREE from "three";

import { IRenderContext } from "./types";

export const RenderContext = createContext<IRenderContext>({
  renderer: new THREE.WebGLRenderer(),
  render: () => {},
});
