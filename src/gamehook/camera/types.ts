import * as THREE from "three";

import { XYZ } from "../physics";

export interface CameraProps {
  aspect?: number;
  id?: string;
  fov?: number;
  width?: number;
  height?: number;
  near?: number;
  far?: number;
  position?: XYZ;

  // Panning
  follow?: string;
  trackTo?: string;
}

export interface GameCamera extends CameraProps {
  id: string;
  camera: THREE.PerspectiveCamera;
}
