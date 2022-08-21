import { useMemo } from "react";
import * as THREE from "three";

import { HierarchyContext, useHierarchy } from "../hierarchy";
import { useMaterial } from "../materials/hooks";

import { useGeometry, useMesh } from "./hooks";
import { PlaneProps } from "./types";

export function Plane(props: PlaneProps) {
  const { children, width, height, widthSegments, heightSegments } = props;
  const mesh = useMesh(props);
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(
      width,
      height,
      widthSegments,
      heightSegments
    );
  }, [width, height, widthSegments, heightSegments]);
  useGeometry(mesh, geometry);
  useMaterial(mesh, props.material);

  const hierarchyValue = useHierarchy(children, mesh);
  return hierarchyValue ? (
    <HierarchyContext.Provider value={hierarchyValue}>
      {children}
    </HierarchyContext.Provider>
  ) : (
    <>{children}</>
  );
}
