import * as THREE from "three";

type BoxParams = THREE.BoxGeometry["parameters"] & {
  type: "box";
};
type CylinderParams = THREE.CylinderGeometry["parameters"] & {
  type: "cylinder";
};
type SphereParams = THREE.SphereGeometry["parameters"] & {
  type: "sphere";
};
export type GeometryProps = BoxParams | CylinderParams | SphereParams;

export interface Shapeable {
  geometry?: GeometryProps;
}
