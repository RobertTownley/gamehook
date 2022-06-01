import * as THREE from "three";
import { useMemo } from "react";

import { SphereProps } from "./types";
import { useMesh, useGeometry } from "./hooks";
import { useMaterial } from "../materials/hooks";
import { HierarchyContext, useHierarchy } from "../hierarchy";

export function Sphere(props: SphereProps) {
  const {
    children,
    radius,
    widthSegments = 16,
    heightSegments = 8,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength,
  } = props;
  const mesh = useMesh(props);

  // Give geometry to mesh object
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength
    );
  }, [
    radius,
    widthSegments,
    heightSegments,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength,
  ]);
  useGeometry(mesh, geometry);

  // Give material to mesh object
  useMaterial(mesh, props.material);

  const hierarchyValue = useHierarchy(children, mesh);
  if (hierarchyValue) {
    return (
      <HierarchyContext.Provider value={hierarchyValue}>
        {children}
      </HierarchyContext.Provider>
    );
  } else {
    return <>{children}</>;
  }
}