import * as THREE from "three";

import { MaterialOptions } from "./types";

export type { Designable } from "./types";

const cache = new Map<string, THREE.Material>();

const defaultMaterialOptions: MaterialOptions = {
  type: "normal",
  wireframe: false,
};

export function createMaterial(
  options?: MaterialOptions,
  useCache = true
): THREE.Material {
  const opts = options ?? defaultMaterialOptions;
  const key = JSON.stringify(opts);
  if (cache.has(key) && useCache) {
    return cache.get(key) as unknown as THREE.Material;
  }

  const newMaterial = (() => {
    switch (opts?.type) {
      case "basic":
        return new THREE.MeshBasicMaterial({ color: opts.color });
      case "normal":
        return new THREE.MeshNormalMaterial({
          wireframe: opts.wireframe ?? false,
        });
      case "standard":
        return new THREE.MeshStandardMaterial({ color: opts.color });
    }
  })();
  cache.set(key, newMaterial);
  return newMaterial;
}
