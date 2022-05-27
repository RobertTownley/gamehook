import * as THREE from "three";
import { useMemo } from "react";

import { BoxProps } from "./types";
import { useMesh, useGeometry } from "./hooks";
import { useMaterial } from "../materials/hooks";

export function Box(props: BoxProps) {
  const {
    children,
    width,
    height,
    depth,
    widthSegments = 8,
    heightSegments = 1,
    depthSegments = 1,
  } = props;
  const mesh = useMesh(props);

  // Give geometry to mesh object
  const geometry = useMemo(() => {
    return new THREE.BoxGeometry(
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments
    );
  }, [width, height, depth, widthSegments, heightSegments, depthSegments]);
  useGeometry(mesh, geometry);

  // Give material to mesh object
  useMaterial(mesh, props.material);

  return <>{children}</>;
}
