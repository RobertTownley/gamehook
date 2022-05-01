import * as THREE from "three";
import { useContext, useEffect, useLayoutEffect, useMemo } from "react";

import { MeshProps } from "./types";
import { SceneContext } from "../scene/context";
import { generateUUID } from "three/src/math/MathUtils";
import { GameObject } from "../objects";

interface Props extends MeshProps {
  radius?: number;
}

export function Sphere(props: Props) {
  const { children, radius } = props;
  const scene = useContext(SceneContext);
  const gameObj = useMemo<GameObject>(() => {
    return {
      id: props.id ?? generateUUID(),
      threeMesh: new THREE.Mesh(),
    };
  }, [props.id]);

  // Add object to scene on mount, remove on dismount
  useLayoutEffect(() => {
    if (!scene.objects[gameObj.id]) {
      scene.addToScene(gameObj);
    }
    return () => {
      scene.removeFromScene(gameObj);
    };
  }, [gameObj, scene]);

  // Give geometry to mesh object
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(radius);
  }, [radius]);

  useLayoutEffect(() => {
    gameObj.threeMesh.geometry = geometry;
  }, [gameObj.threeMesh, geometry]);

  // Give material to mesh object
  const material = useMemo(() => {
    // return new THREE.MeshNormalMaterial({});
    return new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
  }, []);
  useLayoutEffect(() => {
    gameObj.threeMesh.material = material;
  }, [gameObj.threeMesh, material]);

  return <>{children}</>;
}
