import { useMemo, useLayoutEffect } from "react";
import { GameObject } from "../objects";

import { normalizeXYZ } from "./utils";
import { XYZ } from "./types";

export function usePosition(gameObj: GameObject, position: XYZ | undefined) {
  // Set mesh position
  const [x, y, z] = useMemo(() => normalizeXYZ(position), [position]);
  useLayoutEffect(() => {
    gameObj.threeMesh.position.set(x, y, z);
  }, [gameObj, x, y, z]);
}
