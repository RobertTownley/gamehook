import { ReactNode, useEffect, useRef } from "react";
import * as THREE from "three";
import { generateUUID } from "three/src/math/MathUtils";

import { defaultPosition, defaultRotation } from "./defaults";
import { createGeometry } from "./geometries";
import { createMaterial } from "./materials";
import { BasicMeshType, GameObject } from "./types";

interface MeshProps extends BasicMeshType {
  color?: number;
  children?: ReactNode;
}

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
  const _geometry = createGeometry(geometry);
  const _material = createMaterial(material);

  const obj = useRef<GameObject>({
    id: generateUUID(),
    obj: new THREE.Mesh(_geometry, _material),
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
