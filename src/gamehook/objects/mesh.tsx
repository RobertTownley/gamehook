import { ReactNode, useEffect, useRef } from "react";
import * as THREE from "three";
import { generateUUID } from "three/src/math/MathUtils";

import { Collidable } from "../interactions/collisions";
import { Interactable } from "../interactions/types";
import { defaultPosition, defaultRotation } from "./defaults";
import {
  GameObject,
  Nameable,
  ObjectPosition,
  ObjectRotation,
  Positionable,
} from "./types";

interface MeshProps extends Collidable, Interactable, Nameable, Positionable {
  color?: number;
  children?: ReactNode;
  geometry: THREE.BufferGeometry;
  material?: THREE.Material;
  position?: ObjectPosition;
  rotation?: ObjectRotation;
}

const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const determineMaterial = (
  material?: THREE.Material,
  color?: number
): THREE.Material => {
  if (material) return material;
  if (color) return new THREE.MeshBasicMaterial({ color });
  return defaultMaterial;
};

export const Mesh = ({
  color,
  position = defaultPosition,
  rotation = defaultRotation,
  geometry,
  material,

  onCollision,
  onKeyDown,
  onClick,
  ...gameObjectProps
}: MeshProps) => {
  const _material = determineMaterial(material, color);

  const obj = useRef<GameObject>({
    id: generateUUID(),
    obj: new THREE.Mesh(geometry, _material),
    state: "Ready",
    onKeyDown,
    position,
    rotation,
    ...gameObjectProps,
  });

  useEffect(() => {
    obj.current.obj.position.set(...position);
  }, [position]);
  useEffect(() => {
    obj.current.obj.rotation.set(...rotation);
  }, [rotation]);
  useEffect(() => {
    if (color) {
      obj.current.obj.material = new THREE.MeshBasicMaterial({ color });
    }
  }, [color]);

  // TODO: Do this with every event type, or find a more efficient way
  // to have the new setter event copied to the object
  useEffect(() => {
    if (onKeyDown) {
      obj.current.onKeyDown = onKeyDown;
    }
  }, [onKeyDown]);
  useEffect(() => {
    if (onClick) {
      obj.current.onClick = onClick;
    }
  }, [onClick]);
  useEffect(() => {
    if (onCollision) {
      obj.current.onCollision = onCollision;
    }
  }, [onCollision]);

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
  return <></>;
};
