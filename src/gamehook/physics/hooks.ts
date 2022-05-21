import { useMemo, useLayoutEffect } from "react";
import { Mesh } from "../mesh";

import { normalizeXYZ } from "./utils";
import { XYZ } from "./types";

export function usePosition(mesh: Mesh, position: XYZ | undefined) {
  // Set mesh position
  const [x, y, z] = useMemo(() => normalizeXYZ(position), [position]);
  useLayoutEffect(() => {
    mesh.threeMesh.position.set(x, y, z);
  }, [mesh, x, y, z]);
}
