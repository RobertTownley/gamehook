import { useEffect, useMemo } from "react";
import { getDefaultMaterial } from "./defaults";

import { Materializable } from "./types";

export function useMaterial(props: Materializable["material"]) {
  const material = useMemo(() => {
    return props ?? getDefaultMaterial();
  }, [props]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  return material;
}
