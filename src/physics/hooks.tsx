import { useEffect } from "react";
import * as THREE from "three";

import { Physical, Positionable } from "./types";

export function usePhysics(obj: THREE.Object3D, props: Physical) {
  usePosition(obj, props);
}

const DEFAULT_POSITION = [0, 0, 0];
function usePosition(obj: THREE.Object3D, { position }: Positionable) {
  const [x, y, z] = position ?? DEFAULT_POSITION;
  useEffect(() => {
    obj.position.setX(x);
  }, [obj.position, x]);
  useEffect(() => {
    obj.position.setY(y);
  }, [obj.position, y]);
  useEffect(() => {
    obj.position.setZ(z);
  }, [obj.position, z]);
}
