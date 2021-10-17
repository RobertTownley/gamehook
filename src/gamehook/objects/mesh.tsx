import * as THREE from "three";
import { Children, cloneElement, ReactElement, useEffect, useRef } from "react";
import { generateUUID } from "three/src/math/MathUtils";

import { useGame } from "../game";
import { BasicMeshType, GameObject } from "./types";
import { createGeometry } from "./geometries";
import { createMaterial } from "./materials";

interface Props extends BasicMeshType {
  children?: ReactElement<Props> | ReactElement<Props>[];
  objParent?: GameObject;
}

export const Mesh = ({
  children,
  geometry,
  material,
  objParent,
  orientation,
  position,
  rotation,
}: Props) => {
  const { scene } = useGame();
  const gameObject = useRef<GameObject>({
    id: generateUUID(),
    three: new THREE.Mesh(),
  });

  // Observe physical properties
  useEffect(() => {
    gameObject.current.three.material = createMaterial(material);
  }, [material]);
  useEffect(() => {
    gameObject.current.three.geometry = createGeometry(geometry);
  }, [geometry]);
  useEffect(() => {
    if (!orientation) return;
    const quaternion = new THREE.Quaternion(
      orientation.x,
      orientation.y,
      orientation.z,
      orientation.w
    );
    gameObject.current.three.applyQuaternion(quaternion);
  }, [orientation]);

  useEffect(() => {
    if (!rotation) return;
    gameObject.current.three.rotation.set(rotation.x, rotation.y, rotation.z);
  }, [rotation]);

  useEffect(() => {
    const { x, y, z } = position ?? { x: 0, y: 0, z: 0 };
    gameObject.current.three.position.set(x, y, z);
  }, [position]);

  // TODO: Observe other things like collisions, position, and clicks

  useEffect(() => {
    let mounted = true;
    const current = gameObject.current;
    if (mounted) {
      scene.addObjectToScene(current);
    }
    return () => {
      mounted = false;
      scene.removeObjectFromScene(current);
    };
  }, [scene]);

  // If the element has a parent, set the threejs object's parent to
  // that object
  useEffect(() => {
    console.log("REMOVING");
    const cur = gameObject.current;
    if (objParent && objParent.three !== cur.three.parent) {
      if (cur.three.parent) {
        cur.three.removeFromParent();
      }
      objParent.three.add(cur.three);
    }
    return () => {
      cur.three.removeFromParent();
    };
  }, [objParent]);

  return (
    <>
      {Children.map(children, (child) => {
        return child
          ? cloneElement(child, { objParent: gameObject.current })
          : null;
      })}
    </>
  );
};
