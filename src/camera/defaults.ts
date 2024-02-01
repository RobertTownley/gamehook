import * as THREE from "three";

import { XYZ } from "../physics/types";

export const DefaultCameraPosition: XYZ = [0, 0, 5];
export function getDefaultCamera() {
  const camera = new THREE.PerspectiveCamera();
  camera.position.set(...DefaultCameraPosition);
  return camera;
}

export const DefaultCameraType = "perspective";
