import * as THREE from "three";
import { ReactElement, useEffect, useRef } from "react";
import { generateUUID } from "three/src/math/MathUtils";

import { useEventListener } from "../interactions/eventHandler";
import { defaultPosition, defaultRotation } from "./defaults";
import { createGeometry } from "./geometries";
import { createMaterial } from "./materials";
import { BasicMeshType, GameObject } from "./types";

interface MeshProps extends BasicMeshType {
  children?: ReactElement | ReactElement[];
  parent?: GameObject;
}

export const Mesh = (props: MeshProps) => {
  const {
    children,
    position = defaultPosition,
    rotation = defaultRotation,
    geometry,
    material,
    parent,
    ...gameObjectProps
  } = props;

  const obj = useRef<GameObject>({
    id: generateUUID(),
    obj: new THREE.Mesh(createGeometry(geometry), createMaterial(material)),
    position,
    rotation,
    ...gameObjectProps,
  });

  useEffect(() => {
    obj.current.obj.material = createMaterial(material);
  }, [material]);
  useEffect(() => {
    obj.current.obj.geometry = createGeometry(geometry);
  }, [geometry]);

  useEffect(() => {
    obj.current.obj.position.set(...position);
  }, [position]);
  useEffect(() => {
    obj.current.obj.rotation.set(...rotation);
  }, [rotation]);

  useEventListener(obj, props);

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
