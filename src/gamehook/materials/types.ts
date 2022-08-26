import * as THREE from "three";

export interface TexturedMaterial {
  textures?: {
    alphaMap?: THREE.Texture | string;
    bumpMap?: THREE.Texture | string;
    colorMap?: THREE.Texture | string;
    normalMap?: THREE.Texture | string;
  };
}

export interface EmissiveMaterial {
  emissiveColor?: number;
  emissiveIntensity?: number;
}

interface BaseMaterial extends EmissiveMaterial, TexturedMaterial {
  opacity?: number;
  transparent?: boolean;
}

interface BasicMaterialOptions extends BaseMaterial {
  type: "basic";
  color?: number;
  wireframe?: boolean;
}

interface NormalMaterialOptions extends BaseMaterial {
  type: "normal";
  wireframe?: boolean;
}

interface StandardMaterialOptions extends BaseMaterial {
  type: "standard";
  color?: number;
  metalness?: number;
}

export type MaterialOptions =
  | BasicMaterialOptions
  | NormalMaterialOptions
  | StandardMaterialOptions;

export interface Designable {
  material?: MaterialOptions;
}
