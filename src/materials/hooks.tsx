import { useEffect, useMemo } from "react";
import { getDefaultMaterial } from "./defaults";

import { Materializable } from "./types";

export function useMaterial(props: Materializable) {
  const material = useMemo(() => {
    return props.material ?? getDefaultMaterial();
  }, [props]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  return material;
}

export function useModelMaterial(model: THREE.Object3D, props: Materializable) {
  const threeMaterial = useMaterial(props);
  useEffect(() => {
    if (props.material) {
      model?.traverse((child) => {
        if (hasMaterial(child)) {
          child.material = threeMaterial;
        }
      });
    }
    return () => {
      if (threeMaterial) {
        threeMaterial.dispose();
      }
    };
  }, [model, props.material, threeMaterial]);
}

function hasMaterial(obj: THREE.Object3D): obj is THREE.Mesh {
  return obj !== null;
}
