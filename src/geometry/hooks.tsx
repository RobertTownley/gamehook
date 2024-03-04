import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { GeometryProps, Shapeable } from "./types";
import { getDefaultGeometry } from "./defaults";

function isGeometryGuard(
  geo: GeometryProps | THREE.BufferGeometry | undefined
): geo is THREE.BufferGeometry {
  return geo instanceof THREE.BufferGeometry;
}
export function useGeometry(props: Shapeable): THREE.BufferGeometry {
  const { geometry: providedGeometry } = props;
  const stringified = !isGeometryGuard(providedGeometry)
    ? JSON.stringify(providedGeometry)
    : undefined;
  const params = useMemo(() => {
    return stringified ? (JSON.parse(stringified) as GeometryProps) : undefined;
  }, [stringified]);

  const geometry = useMemo<THREE.BufferGeometry>(() => {
    if (isGeometryGuard(providedGeometry)) {
      return providedGeometry;
    }
    if (params) {
      switch (params.variant) {
        case "box":
          return new THREE.BoxGeometry(
            params.width,
            params.height,
            params.depth,
            params.widthSegments,
            params.heightSegments,
            params.depthSegments
          );
        case "cylinder":
          return new THREE.CylinderGeometry(
            params.radiusTop,
            params.radiusBottom,
            params.height,
            params.radialSegments,
            params.heightSegments,
            params.openEnded,
            params.thetaStart,
            params.thetaLength
          );

        case "sphere":
          return new THREE.SphereGeometry(
            params.radius,
            params.widthSegments,
            params.heightSegments,
            params.phiStart,
            params.phiLength,
            params.thetaStart,
            params.thetaLength
          );
        default:
          return getDefaultGeometry();
      }
    } else {
      return getDefaultGeometry();
    }
  }, [params, providedGeometry]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return geometry;
}
