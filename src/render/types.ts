import * as THREE from "three";

export interface IRenderContext {
  renderer: THREE.WebGLRenderer;
  render: () => void;
}
