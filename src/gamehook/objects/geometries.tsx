import * as THREE from "three";

interface BoxGeometryOptions {
  type: "box";
  width: number;
  height: number;
  depth: number;
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
  radius: number;
  widthSegments: number;
  heightSegments: number;
}

type GeometryOptions =
  | BoxGeometryOptions
  | CircleGeometryOptions
  | CylinderGeometryOptions
  | PlaneGeometryOptions
  | SphereGeometryOptions;
export interface Shapeable {
  geometry?: GeometryOptions;
}

// Utility functions to build geometries
export const createGeometry = (
  opt: GeometryOptions | THREE.BufferGeometry | undefined
): THREE.BufferGeometry => {
  if (!opt) {
    return createGeometry(defaultGeometryOptions);
  } else if (isGeometryGuard(opt)) {
    return opt;
  }
  switch (opt.type) {
    case "box":
      return createBoxGeometry(opt);
    case "circle":
      return createCircleGeometry(opt);
    case "cylinder":
      return createCylinderGeometry(opt);
    case "plane":
      return createPlaneGeometry(opt);
    case "sphere":
      return createSphereGeometry(opt);
  }
};

function isGeometryGuard(
  opt: THREE.BufferGeometry | GeometryOptions
): opt is THREE.BufferGeometry {
  return !opt.type;
}

const defaultGeometryOptions: GeometryOptions = {
  type: "box",
  width: 1,
  height: 1,
  depth: 1,
};

const createBoxGeometry = ({
  width,
  height,
  depth,
}: BoxGeometryOptions): THREE.BoxGeometry => {
  return new THREE.BoxGeometry(width, height, depth);
};

const createCircleGeometry = ({
  radius,
  segments,
}: CircleGeometryOptions): THREE.CircleGeometry => {
  return new THREE.CircleGeometry(radius, segments);
};

const createCylinderGeometry = ({
  radiusTop = 1,
  radiusBottom = 1,
  height = 1,
  radialSegments = 8,
  heightSegments = 1,
  openEnded = false,
  thetaStart = 0,
  thetaLength = 2 * Math.PI,
}: CylinderGeometryOptions): THREE.CylinderGeometry => {
  return new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    radialSegments,
    heightSegments,
    openEnded,
    thetaStart,
    thetaLength
  );
};

const createPlaneGeometry = ({ width, height }: PlaneGeometryOptions) => {
  return new THREE.PlaneGeometry(width, height);
};

const createSphereGeometry = ({
  radius,
  heightSegments,
  widthSegments,
}: SphereGeometryOptions): THREE.SphereGeometry => {
  return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
};
