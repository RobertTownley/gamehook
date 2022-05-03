import { useLayoutEffect, useMemo } from "react";

import { GameObject } from "../objects";
import { createMaterial } from "./index";
import { MaterialOptions } from "./types";

export function useMaterial(
  gameObj: GameObject,
  materialOptions: MaterialOptions | undefined
) {
  // Give material to mesh object
  const material = useMemo(() => {
    return createMaterial(materialOptions);
  }, [materialOptions]);

  useLayoutEffect(() => {
    gameObj.threeMesh.material = material;
  }, [gameObj.threeMesh, material]);
}
