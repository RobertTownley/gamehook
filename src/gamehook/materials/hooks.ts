import * as THREE from "three";
import { useLayoutEffect, useMemo } from "react";

import { createMaterial } from "./index";
import { Mesh } from "../mesh/types";
import { MaterialOptions } from "./types";

export function useMaterial(
  mesh: Mesh,
  materialOptions: THREE.Material | MaterialOptions | undefined
) {
  // Give material to mesh object
  const material: THREE.Material = useMemo(() => {
    return createMaterial(materialOptions);
  }, [materialOptions]);

  useLayoutEffect(() => {
    mesh.threeMesh.material = material;
  }, [mesh.threeMesh, material]);
}
