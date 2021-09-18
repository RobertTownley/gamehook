import * as THREE from "three";
import { useEffect, useRef } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { GameObject, ObjectPosition, ObjectRotation } from "./types";

interface CubeProps {
  geometry?: THREE.BoxGeometry;
  material?: THREE.MeshBasicMaterial;
  position?: ObjectPosition;
  rotation?: ObjectRotation;
}

const defaultPosition: ObjectPosition = [0, 0, 0];
const defaultRotation: ObjectRotation = [0, 0, 0];
const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const defaultGeometry = new THREE.BoxGeometry(1, 1, 1);

export const Cube = ({
  geometry = defaultGeometry,
  material = defaultMaterial,
  position = defaultPosition,
  rotation = defaultRotation,
}: CubeProps) => {
  const obj = useRef<GameObject>({
    id: generateUUID(),
    obj: new THREE.Mesh(geometry, material),
    state: "Ready",
    position,
    rotation,
  });

  useEffect(() => {
    const current = obj.current;
    GAME.scene.addObjectToScene(current);

    return () => {
      GAME.scene.removeObjectFromScene(current);
    };
  }, []);
  obj.current.obj.position.set(...position);
  obj.current.obj.rotation.set(...rotation);

  return <></>;
};
