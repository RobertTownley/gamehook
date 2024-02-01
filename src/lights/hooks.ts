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

const DEFAULT_SHADOW_MAP_SIZE = 2048;
export function useShadowMaps(obj: THREE.Light, { shadows }: Lightable) {
  const width = shadows?.mapSize?.width ?? DEFAULT_SHADOW_MAP_SIZE;
  const height = shadows?.mapSize?.height ?? DEFAULT_SHADOW_MAP_SIZE;
  const bias = shadows?.bias ?? 0;

  useEffect(() => {
    if (obj?.shadow) {
      obj.shadow.mapSize.height = height;
      obj.shadow.mapSize.width = width;
      obj.shadow.bias = bias;
    }
  }, [obj.shadow, width, height, bias]);
}
