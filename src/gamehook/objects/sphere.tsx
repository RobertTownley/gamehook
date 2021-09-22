import * as THREE from "three";
import { FC } from "react";

import { BasicMeshType } from "./types";

import { Mesh } from "./mesh";

interface Props extends BasicMeshType {
  geometry?: THREE.SphereGeometry;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  size?: string;
}

export const Sphere: FC<Props> = ({
  geometry,
  radius,
  widthSegments,
  heightSegments,
  ...props
}) => {
  const _geometry = getGeometry({
    geometry,
    radius,
    widthSegments,
    heightSegments,
  });
  return <Mesh geometry={_geometry} {...props} />;
};

const DEFAULT_RADIUS = 1;
const DEFAULT_WIDTH_SEGMENTS = 32;
const DEFAULT_HEIGHT_SEGMENTS = 16;
const defaultGeometry = new THREE.SphereGeometry(
  DEFAULT_RADIUS,
  DEFAULT_WIDTH_SEGMENTS,
  DEFAULT_HEIGHT_SEGMENTS
);

interface GetGeometryProps {
  geometry?: THREE.SphereGeometry;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
}
const getGeometry = ({
  geometry,
  radius,
  widthSegments,
  heightSegments,
}: GetGeometryProps): THREE.SphereGeometry => {
  if (geometry) return geometry;
  if (radius || widthSegments || heightSegments) {
    const _radius = radius || DEFAULT_RADIUS;
    const _widthSegments = widthSegments || DEFAULT_WIDTH_SEGMENTS;
    const _heightSegments = heightSegments || DEFAULT_HEIGHT_SEGMENTS;
    return new THREE.SphereGeometry(_radius, _widthSegments, _heightSegments);
  }
  return defaultGeometry;
};
