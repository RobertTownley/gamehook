import * as THREE from "three";

import { BasicMeshType } from "./types";
import { Mesh } from "./mesh";

interface CubeProps extends BasicMeshType {
  geometry?: THREE.BoxGeometry;
  size?: number;
}

const DEFAULT_CUBE_SIZE = 1;
const defaultGeometry = new THREE.BoxGeometry(
  DEFAULT_CUBE_SIZE,
  DEFAULT_CUBE_SIZE,
  DEFAULT_CUBE_SIZE
);

export const Cube = ({ geometry, material, size = 1, ...props }: CubeProps) => {
  const _geometry = (() => {
    if (geometry) return geometry;
    if (size === 1) return defaultGeometry; // Memory saving
    return new THREE.BoxGeometry(size, size, size);
  })();

  return <Mesh geometry={_geometry} {...props} />;
};
