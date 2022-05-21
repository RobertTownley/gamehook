import * as THREE from "three";
import { useContext, useLayoutEffect, useMemo } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { MeshProps } from "./types";
import { GameObject } from "../objects";
import { SceneContext } from "../scene/context";

// Create the mesh to use in render classes
export function useGameObject(props: MeshProps) {
  return useMemo<GameObject>(() => {
    return {
      id: props.id ?? generateUUID(),
      threeMesh: new THREE.Mesh(),
    };
  }, [props.id]);
}

// Add object to scene on mount, remove on dismount
export function useMount(gameObj: GameObject) {
  const scene = useContext(SceneContext);
  return useLayoutEffect(() => {
    if (!scene.objects[gameObj.id]) {
      scene.addObjectToScene(gameObj);
    }
    return () => {
      scene.removeObjectFromScene(gameObj);
    };
  }, [gameObj, scene]);
}

// Create geometry for object

export function useGeometry(
  gameObj: GameObject,
  geometry: THREE.BufferGeometry
) {
  useLayoutEffect(() => {
    gameObj.threeMesh.geometry = geometry;
  }, [gameObj.threeMesh, geometry]);
}
