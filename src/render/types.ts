import * as THREE from "three";

export interface IRenderContext {
  renderer: THREE.WebGLRenderer;
  render: () => void;
}

export interface RendererProps {
  antialias?: boolean;
  enableShadowMaps?: boolean;
  preserveDrawingBuffer?: boolean;
}
