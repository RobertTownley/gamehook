import { useLayoutEffect, useMemo } from "react";

import { createMaterial } from "./index";
import { Mesh } from "../mesh/types";
import { MaterialOptions } from "./types";

export function useMaterial(
  mesh: Mesh,
  materialOptions: MaterialOptions | undefined
) {
  // Give material to mesh object
  const material = useMemo(() => {
    return createMaterial(materialOptions);
  }, [materialOptions]);

  useLayoutEffect(() => {
    mesh.threeMesh.material = material;
  }, [mesh.threeMesh, material]);
}
