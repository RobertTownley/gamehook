import * as THREE from "three";
import { useEffect, useRef } from "react";
import { generateUUID } from "three/src/math/MathUtils";

import { GameObject, Positionalable } from "./types";
import { defaultPosition, defaultRotation } from "./defaults";
import { Interactable } from "../interactions/types";

interface CubeProps extends Interactable, Positionalable {
  color?: number;
  geometry?: THREE.BoxGeometry;
  material?: THREE.MeshBasicMaterial;
}

const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const defaultGeometry = new THREE.BoxGeometry(1, 1, 1);

export const Cube = ({
  color,
  interactions,
  geometry = defaultGeometry,
  material = defaultMaterial,
  position = defaultPosition,
  rotation = defaultRotation,
}: CubeProps) => {
  const obj = useRef<GameObject>({
    id: generateUUID(),
    obj: new THREE.Mesh(geometry, material),
    interactions,
    state: "Ready",
    position,
    rotation,
  });

  useEffect(() => {
    obj.current.obj.material.color.set(color);
  }, [color]);

  useEffect(() => {
    let mounted = true;
    const current = obj.current;

    if (mounted) {
      GAME.scene.addObjectToScene(current);
    }

    return () => {
      mounted = false;
      GAME.scene.removeObjectFromScene(current);
    };
  }, []);
  obj.current.obj.position.set(...position);
  obj.current.obj.rotation.set(...rotation);

  return <></>;
};
