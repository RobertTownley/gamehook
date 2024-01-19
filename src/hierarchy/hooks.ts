import * as THREE from "three";
import { useContext, useEffect, useMemo } from "react";
import { Object3D } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

import { useSceneDetails } from "../scene/hooks";
import { HierarchyContext } from "./context";

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

function isGLTF(obj: THREE.Object3D | GLTF): obj is GLTF {
  return obj instanceof THREE.Object3D !== true;
}
