import * as THREE from "three";

export function getDefaultCamera() {
  const camera = new THREE.PerspectiveCamera();
  camera.position.setZ(5);
  return camera;
}

export const DefaultCameraType = "perspective";
