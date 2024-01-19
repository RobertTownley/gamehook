import * as THREE from "three";

type LineBasicMaterialProps = THREE.LineBasicMaterialParameters & {
  type: "line-basic";
};
type LineDashedMaterialProps = THREE.LineDashedMaterialParameters & {
  type: "line-dashed";
};
type MeshBasicMaterialProps = THREE.MeshBasicMaterialParameters & {
  type: "basic";
};
type MeshDepthMaterialProps = THREE.MeshDepthMaterialParameters & {
  type: "depth";
};
type MeshLambertMaterialProps = THREE.MeshLambertMaterialParameters & {
  type: "lambert";
};
type MeshMatcapMaterialProps = THREE.MeshMatcapMaterialParameters & {
  type: "matcap";
};
type MeshNormalMaterialProps = THREE.MeshNormalMaterialParameters & {
  type: "normal";
};
type MeshPhysicalMaterialProps = THREE.MeshPhysicalMaterialParameters & {
  type: "physical";
};
type MeshPhongMaterialProps = THREE.MeshPhongMaterialParameters & {
  type: "phong";
};
type MeshStandardMaterialProps = THREE.MeshStandardMaterialParameters & {
  type: "standard";
};
type MeshToonMaterialProps = THREE.MeshToonMaterialParameters & {
  type: "toon";
};
type PointsMaterialProps = THREE.PointsMaterialParameters & {
  type: "points";
};
type ShaderMaterialProps = THREE.ShaderMaterialParameters & {
  type: "shader";
};
type ShadowMaterialProps = THREE.ShadowMaterialParameters & {
  type: "shadow";
};
type SpriteMaterialProps = THREE.SpriteMaterialParameters & {
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
  | SpriteMaterialProps;
export interface Materializable {
  material?: MaterialProps;
}
