import * as THREE from "three";
import { useMemo } from "react";

import { BoxProps } from "./types";
import { useMesh, useGeometry } from "./hooks";
import { useMaterial } from "../materials/hooks";
import { usePosition } from "../physics/hooks";

export function Box(props: BoxProps) {
  const { children, width, height, depth } = props;
  const mesh = useMesh(props);

  // Give geometry to mesh object
  const geometry = useMemo(() => {
    return new THREE.BoxGeometry(width, height, depth);
  }, [width, height, depth]);
  useGeometry(mesh, geometry);

  // Give material to mesh object
  useMaterial(mesh, props.material);

  // Physics
  usePosition(mesh, props.position);

  return <>{children}</>;
}
