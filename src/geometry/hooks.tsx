import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { GeometryProps, Shapeable } from "./types";
import { DefaultGeometry } from "./defaults";

export function useGeometry(props: Shapeable): THREE.BufferGeometry {
  const stringified = useMemo(() => {
    return props.geometry ? JSON.stringify(props.geometry) : undefined;
  }, [props]);

  const params = useMemo(() => {
    return stringified ? (JSON.parse(stringified) as GeometryProps) : undefined;
  }, [stringified]);

  const geometry = useMemo(() => {
    if (!params) return DefaultGeometry;

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
    }
  }, [params]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return geometry;
}
