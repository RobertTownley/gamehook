import * as THREE from "three";

import { EmissiveMaterial, MaterialOptions, TexturedMaterial } from "./types";

export type { Designable } from "./types";

const cache = new Map<string, THREE.Material>();

const defaultMaterialOptions: MaterialOptions = {
  type: "normal",
  wireframe: false,
};

const loader = new THREE.TextureLoader();

function createMap(value: THREE.Texture | string | undefined) {
  if (!value) return null;
  if (typeof value === "string") {
    return loader.load(value);
  } else {
    return value;
  }
}

function createMapParams(options: TexturedMaterial) {
  return {
    alphaMap: createMap(options.textures?.alphaMap),
    bumpMap: createMap(options.textures?.bumpMap),
    normalMap: createMap(options.textures?.normalMap),
    map: createMap(options.textures?.colorMap),
  };
}

function createEmissiveParams(options: EmissiveMaterial) {
  const { emissiveColor, emissiveIntensity } = options;
  return {
    ...(emissiveColor && { emissive: emissiveColor }),
    ...(emissiveIntensity && { emissiveIntensity }),
  };
}

function createBaseMaterialParams(options: MaterialOptions) {
  return {
    opacity: options?.opacity ?? 1,
    transparent: options?.transparent ?? false,
  };
}

export function createMaterial(
  options?: MaterialOptions,
  useCache = true
): THREE.Material {
  const opts = options ?? defaultMaterialOptions;
  const baseParams = createBaseMaterialParams(opts);
  const key = JSON.stringify(opts);
  if (cache.has(key) && useCache) {
    return cache.get(key) as unknown as THREE.Material;
  }

  const newMaterial = (() => {
    const emissiveParams = createEmissiveParams(opts);
    const maps = createMapParams(opts);
    switch (opts?.type) {
      case "basic":
        return new THREE.MeshBasicMaterial({
          ...baseParams,
          ...maps,
          color: opts?.color ?? 0xffffff,
        });
      case "normal":
        return new THREE.MeshNormalMaterial({
          wireframe: opts.wireframe ?? false,
          ...baseParams,
        });
      case "standard":
        return new THREE.MeshStandardMaterial({
          ...maps,
          ...baseParams,
          ...emissiveParams,
          color: opts?.color ?? 0xffffff,
        });
    }
  })();
  cache.set(key, newMaterial);
  return newMaterial;
}
