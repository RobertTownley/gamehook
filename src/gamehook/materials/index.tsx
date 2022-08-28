import * as THREE from "three";

import {
  BasicMaterialOptions,
  EmissiveMaterial,
  MaterialOptions,
  NormalMaterialOptions,
  StandardMaterialOptions,
} from "./types";

export type { Designable } from "./types";

const cache = new Map<string, THREE.Material>();

const defaultMaterialOptions: NormalMaterialOptions = {
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

export function createStandardMaterial(options: StandardMaterialOptions) {
  return new THREE.MeshStandardMaterial({
    alphaMap: createMap(options?.textures?.alphaMap),
    bumpMap: createMap(options.textures?.bumpMap),
    normalMap: createMap(options.textures?.normalMap),
    map: createMap(options.textures?.colorMap),

    color: options?.color ?? 0xffffff,
    ...createEmissiveParams(options),
    ...createBaseMaterialParams(options),
  });
}

function createBasicMaterial(options: BasicMaterialOptions) {
  return new THREE.MeshBasicMaterial({
    alphaMap: createMap(options?.textures?.alphaMap),
    map: createMap(options.textures?.colorMap),

    ...createBaseMaterialParams(options),
    color: options?.color ?? 0xffffff,
  });
}

function createNormalMaterial(options: NormalMaterialOptions) {
  return new THREE.MeshNormalMaterial({
    wireframe: options.wireframe ?? false,
    ...createBaseMaterialParams(options),
  });
}

export function createMaterial(
  options?: MaterialOptions,
  useCache = true
): THREE.Material {
  const key = JSON.stringify(options);
  if (cache.has(key) && useCache) {
    return cache.get(key) as unknown as THREE.Material;
  }
  const newMaterial = (() => {
    switch (options?.type) {
      case "basic":
        return createBasicMaterial(options as BasicMaterialOptions);
      case "normal":
        return createNormalMaterial(options as NormalMaterialOptions);
      case "standard":
        return createStandardMaterial(options as StandardMaterialOptions);
      default:
        return createNormalMaterial(defaultMaterialOptions);
    }
  })();

  cache.set(key, newMaterial);
  return newMaterial;
}
