import * as THREE from "three";

import { MaterialOptions, TexturedMaterial } from "./types";

export type { Designable } from "./types";

const cache = new Map<string, THREE.Material>();

const defaultMaterialOptions: MaterialOptions = {
  type: "normal",
  wireframe: false,
};

const loader = new THREE.TextureLoader();

function createColorMap(options: TexturedMaterial): THREE.Texture | undefined {
  const colorMap = options.textures?.colorMap;
  if (!colorMap) {
    return;
  }
  if (typeof colorMap === "string") {
    return loader.load(colorMap);
  } else {
    return colorMap;
  }
}

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
    const colorMap = createColorMap(opts);
    switch (opts?.type) {
      case "basic":
        return new THREE.MeshBasicMaterial({
          color: opts?.color ?? 0xffffff,
          map: colorMap,
        });
      case "normal":
        return new THREE.MeshNormalMaterial({
          wireframe: opts.wireframe ?? false,
        });
      case "standard":
        return new THREE.MeshStandardMaterial({
          color: opts?.color ?? 0xffffff,
          map: colorMap,
        });
    }
  })();
  cache.set(key, newMaterial);
  return newMaterial;
}
