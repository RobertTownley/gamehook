import * as THREE from "three";

import { Materializable } from "./types";

export function isThreeMaterial(
  value: unknown
): value is string | Materializable | THREE.Material {
  return value.isMaterial;
}
