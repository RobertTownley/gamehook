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

interface BaseMaterial extends EmissiveMaterial, TexturedMaterial {}

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
