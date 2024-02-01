import { useMemo } from "react";
import * as THREE from "three";

export function useMesh(
  geometry: THREE.BufferGeometry,
  material: THREE.Material
): THREE.Object3D {
  return useMemo(() => {
    return new THREE.Mesh(geometry, material);
  }, [geometry, material]);
}
