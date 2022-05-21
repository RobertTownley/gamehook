import * as THREE from "three";
import { useMemo } from "react";

import { SphereProps } from "./types";
import { useMesh, useGeometry } from "./hooks";
import { useMaterial } from "../materials/hooks";
import { usePosition } from "../physics/hooks";

export function Sphere(props: SphereProps) {
  const { children, radius } = props;
  const mesh = useMesh(props);

  // Give geometry to mesh object
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(radius);
  }, [radius]);
  useGeometry(mesh, geometry);

  // Give material to mesh object
  useMaterial(mesh, props.material);

  // Physics
  usePosition(mesh, props.position);

  return <>{children}</>;
}
