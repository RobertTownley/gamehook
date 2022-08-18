import * as THREE from "three";

export interface TexturedMaterial {
  textures?: {
    colorMap: THREE.Texture | string;
  };
}

interface BasicMaterialOptions extends TexturedMaterial {
  type: "basic";
  color?: number;
  wireframe?: boolean;
}

interface NormalMaterialOptions extends TexturedMaterial {
  type: "normal";
  wireframe?: boolean;
}

interface StandardMaterialOptions extends TexturedMaterial {
  color: number;
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
