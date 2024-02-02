import { useContext, useEffect, useMemo } from "react";
import { Object3D } from "three";

import { useSceneDetails } from "../scene/hooks";
import { HierarchyContext } from "./context";
import { isGLTF } from "./guards";

export function useHierarchy(obj: Object3D): Object3D | undefined {
  const hierarchy = useContext(HierarchyContext);
  const { scene } = useSceneDetails();
  const parent = useMemo(() => {
    if (!hierarchy.parent) {
      return undefined;
    } else if (isGLTF(hierarchy.parent)) {
      return hierarchy.parent.scene;
    } else {
      return hierarchy.parent;
    }
  }, [hierarchy.parent]);

  useEffect(() => {
    if (parent) {
      parent.add(obj);
    } else {
      scene.add(obj);
    }
    return () => {
      obj.removeFromParent();
      scene.remove(obj);
    };
  }, [scene, obj, parent]);

  return parent;
}
