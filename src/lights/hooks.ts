import { useEffect } from "react";
import * as THREE from "three";

import { Lightable } from "./types";

export function useLighting(
  obj: THREE.Object3D,
  { castShadow, receiveShadow }: Lightable
) {
  useEffect(() => {
    obj.receiveShadow = receiveShadow ?? false;
  }, [obj, receiveShadow]);

  useEffect(() => {
    obj.castShadow = castShadow ?? false;
  }, [obj, castShadow]);
}
