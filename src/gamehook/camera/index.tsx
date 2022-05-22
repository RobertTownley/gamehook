import * as THREE from "three";
import { generateUUID } from "three/src/math/MathUtils";
import { Camera } from "./types";

export type { Camera } from "./types";

export interface CameraProps {
  aspect?: number;
  id?: string;
  fov?: number;
  width?: number;
  height?: number;
  near?: number;
  far?: number;
}

export function buildCamera({
  fov = 75,
  aspect,
  near,
  far,
}: CameraProps): Camera {
  const a = aspect ?? window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(fov, a, near, far);
  camera.position.set(0, 0, 25);
  return {
    id: generateUUID(),
    camera,
  };
}
