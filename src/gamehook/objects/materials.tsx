import * as THREE from "three";

interface AbstractMaterialOptions {
  isMaterial?: boolean;
}
interface BasicMaterialOptions extends AbstractMaterialOptions {
  type: "basic";
  color?: number;
  wireframe?: boolean;
}

interface NormalMaterialOptions extends AbstractMaterialOptions {
  type: "normal";
  wireframe?: boolean;
}

interface StandardMaterialOptions extends AbstractMaterialOptions {
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
// Utility functions to build materials
export const createMaterial = (
  opt: MaterialOptions | THREE.Material | undefined
): THREE.Material => {
  if (!opt) {
    return createMaterial(defaultMaterialOptions);
  } else if (isMaterialGuard(opt)) {
    return opt;
  }
  switch (opt?.type) {
    case "basic":
      return createBasicMaterial(opt);
    case "normal":
      return createNormalMaterial(opt);
    case "standard":
      return createStandardMaterial(opt);
  }
};

function isMaterialGuard(
  opt: THREE.Material | MaterialOptions
): opt is THREE.Material {
  return opt.isMaterial === true;
}

export const createBasicMaterial = ({
  color,
}: BasicMaterialOptions): THREE.MeshBasicMaterial => {
  return new THREE.MeshBasicMaterial({ color });
};

export const createNormalMaterial = ({
  wireframe = false,
}: NormalMaterialOptions): THREE.MeshNormalMaterial => {
  return new THREE.MeshNormalMaterial({ wireframe });
};

export const createStandardMaterial = ({
  color,
}: StandardMaterialOptions): THREE.MeshStandardMaterial => {
  return new THREE.MeshStandardMaterial({ color });
};

// Material options to use for all objects when not specified
const defaultMaterialOptions: MaterialOptions = {
  color: 0xdddddd,
  type: "basic",
};
