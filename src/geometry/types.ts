interface BoxParams {
  type: "box";
  width?: number;
  height?: number;
  depth?: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
}
interface CylinderParams {
  type: "cylinder";
  radiusTop?: number;
  radiusBottom?: number;
  height?: number;
  radialSegments?: number;
  heightSegments?: number;
  openEnded?: boolean;
  thetaStart?: number;
  thetaLength?: number;
}
interface SphereParams {
  type: "sphere";
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  phiStart?: number;
  phiLength?: number;
  thetaStart?: number;
  thetaLength?: number;
}
export type GeometryProps = BoxParams | CylinderParams | SphereParams;

export interface Shapeable {
  geometry?: GeometryProps;
}
