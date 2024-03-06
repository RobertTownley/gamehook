import * as THREE from "three";

export interface IRenderContext {
  renderer: THREE.WebGLRenderer;
  render: () => void;
}

export interface RendererProps {
  alpha?: boolean;
  clearColor?: number;
  clearOpacity?: number;
  antialias?: boolean;
  enableShadowMaps?: boolean;
  preserveDrawingBuffer?: boolean;
}
