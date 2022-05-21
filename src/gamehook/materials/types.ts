interface BasicMaterialOptions {
  type: "basic";
  color: number;
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
