import * as THREE from "three";

import { Positionable } from "./types";
import { defaultPosition, defaultRotation } from "./defaults";
import { Interactable } from "../interactions/types";
import { Mesh } from "./mesh";

interface CubeProps extends Interactable, Positionable {
  color?: number;
  geometry?: THREE.BoxGeometry;
  material?: THREE.MeshBasicMaterial;
  size?: number;
}

const DEFAULT_CUBE_SIZE = 1;
const defaultGeometry = new THREE.BoxGeometry(
  DEFAULT_CUBE_SIZE,
  DEFAULT_CUBE_SIZE,
  DEFAULT_CUBE_SIZE
);

export const Cube = ({
  color,
  interactions,
  geometry,
  material,
  position = defaultPosition,
  rotation = defaultRotation,
  size = 1,
}: CubeProps) => {
  const _geometry = (() => {
    if (geometry) return geometry;
    if (size === 1) return defaultGeometry; // Memory saving
    return new THREE.BoxGeometry(size, size, size);
  })();

  return (
    <Mesh
      color={color}
      interactions={interactions}
      position={position}
      material={material}
      geometry={_geometry}
      rotation={rotation}
    />
  );
};
