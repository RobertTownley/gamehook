import * as THREE from "three";
import { useEffect, useRef } from "react";
import { GameObject } from "../objects/types";
import { generateUUID } from "three/src/math/MathUtils";

interface Props {
  color?: number;
}
export const AmbientLight = ({ color = 0xffffff }: Props) => {
  const light = useRef<GameObject>({
    id: generateUUID(),
    obj: new THREE.AmbientLight(color),
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    state: "Ready",
  });
  useEffect(() => {
    let mounted = true;
    const current = light.current;
    if (mounted) {
      current.obj = new THREE.AmbientLight(color);
      GAME.scene.addObjectToScene(current);
    }
    return () => {
      mounted = false;
      GAME.scene.removeObjectFromScene(current);
    };
  }, [color]);
  return <></>;
};
