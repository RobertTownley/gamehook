import * as THREE from "three";

/*
export type LineBasicMaterialProps = THREE.LineBasicMaterialParameters & {
  type: "line-basic";
};
export type LineDashedMaterialProps = THREE.LineDashedMaterialParameters & {
  type: "line-dashed";
};
export type MeshBasicMaterialProps = THREE.MeshBasicMaterialParameters & {
  type: "basic";
};
export type MeshDepthMaterialProps = THREE.MeshDepthMaterialParameters & {
  type: "depth";
};
export type MeshLambertMaterialProps = THREE.MeshLambertMaterialParameters & {
  type: "lambert";
};
export type MeshMatcapMaterialProps = THREE.MeshMatcapMaterialParameters & {
  type: "matcap";
};
export type MeshNormalMaterialProps = THREE.MeshNormalMaterialParameters & {
  type: "normal";
};
export type MeshPhysicalMaterialProps = THREE.MeshPhysicalMaterialParameters & {
  type: "physical";
};
export type MeshPhongMaterialProps = THREE.MeshPhongMaterialParameters & {
  type: "phong";
};
export type MeshStandardMaterialProps = THREE.MeshStandardMaterialParameters & {
  type: "standard";
};
export type MeshToonMaterialProps = THREE.MeshToonMaterialParameters & {
  type: "toon";
};
export type PointsMaterialProps = THREE.PointsMaterialParameters & {
  type: "points";
};
export type ShaderMaterialProps = THREE.ShaderMaterialParameters & {
  type: "shader";
};
export type ShadowMaterialProps = THREE.ShadowMaterialParameters & {
  type: "shadow";
};
export type SpriteMaterialProps = THREE.SpriteMaterialParameters & {
  type: "sprite";
};
type MaterialProps =
  | LineBasicMaterialProps
  | LineDashedMaterialProps
  | MeshBasicMaterialProps
  | MeshDepthMaterialProps
  | MeshLambertMaterialProps
  | MeshMatcapMaterialProps
  | MeshNormalMaterialProps
  | MeshPhysicalMaterialProps
  | MeshPhongMaterialProps
  | MeshStandardMaterialProps
  | MeshToonMaterialProps
  | PointsMaterialProps
  | ShadowMaterialProps
  | ShaderMaterialProps
  | SpriteMaterialProps
  | THREE.Material;
*/
export interface Materializable {
  material?: THREE.Material;
}
