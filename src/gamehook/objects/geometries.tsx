import * as THREE from "three";

interface BoxGeometryOptions {
  type: "box";
  width?: number;
  height?: number;
  depth?: number;
}

interface CircleGeometryOptions {
  type: "circle";
  radius: number;
  segments: number;
}

interface CylinderGeometryOptions {
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

interface PlaneGeometryOptions {
  type: "plane";
  width: number;
  height: number;
}

interface SphereGeometryOptions {
  type: "sphere";
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
}

export type GeometryOptions =
  | BoxGeometryOptions
  | CircleGeometryOptions
  | CylinderGeometryOptions
  | PlaneGeometryOptions
  | SphereGeometryOptions;

export interface Shapeable {
  geometry?: GeometryOptions;
}

const defaultGeometryOptions: BoxGeometryOptions = {
  type: "box",
};
export const createGeometry = (
  opts?: GeometryOptions
): THREE.BufferGeometry => {
  const opt = opts ?? defaultGeometryOptions;
  const token = JSON.stringify(opts);
  const { geometries } = _GAME.resources;
  if (geometries[token]) {
    return geometries[token];
  }
  const newGeometry = (() => {
    switch (opt.type) {
      case "box":
        return new THREE.BoxGeometry(
          opt.width ?? 1,
          opt.height ?? 1,
          opt.depth ?? 1
        );
      case "circle":
        return new THREE.CircleGeometry(opt.radius ?? 1, opt.segments ?? 32);
      case "cylinder":
        return new THREE.CylinderGeometry(
          opt.radiusTop ?? 1,
          opt.radiusBottom ?? 1,
          opt.height ?? 1,
          opt.radialSegments ?? 8,
          opt.heightSegments ?? 1,
          opt.openEnded ?? false,
          opt.thetaStart ?? 0,
          opt.thetaLength ?? 2 * Math.PI
        );
      case "plane":
        return new THREE.PlaneGeometry(opt.width ?? 1, opt.height ?? 1);
      case "sphere":
        return new THREE.SphereGeometry(
          opt.radius ?? 1,
          opt.widthSegments ?? 32,
          opt.heightSegments ?? 16
        );
    }
  })();
  geometries[token] = newGeometry;
  return newGeometry;
};
