import * as THREE from "three";

interface BasicMaterialOptions {
  type: "basic";
  color?: number;
  wireframe?: boolean;
}

interface NormalMaterialOptions {
  type: "normal";
  wireframe?: boolean;
}

interface StandardMaterialOptions {
  color?: number;
  metalness?: number;
  type: "standard";
}

export type MaterialOptions =
  | BasicMaterialOptions
  | NormalMaterialOptions
  | StandardMaterialOptions;

export interface Designable {
  material?: MaterialOptions;
}

const defaultMaterialOptions: MaterialOptions = {
  type: "normal",
};
export const createMaterial = (opts?: MaterialOptions): THREE.Material => {
  const opt = opts ?? defaultMaterialOptions;
  const token = JSON.stringify(opt);
  const { materials } = _GAME.resources;
  if (materials[token]) {
    return materials[token];
  }
  const newMaterial = (() => {
    switch (opt?.type) {
      case "basic":
        return new THREE.MeshBasicMaterial({ color: opt.color });
      case "normal":
        return new THREE.MeshNormalMaterial({ wireframe: opt.wireframe });
      case "standard":
        return new THREE.MeshStandardMaterial({ color: opt.color });
    }
  })();
  materials[token] = newMaterial;
  return newMaterial;
};
