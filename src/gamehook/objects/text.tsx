import { useEffect, useRef } from "react";
import { Text as TroikaText } from "troika-three-text";
import { generateUUID } from "three/src/math/MathUtils";

import { BasicMeshType, GameObject } from "./types";
import { defaultPosition, defaultRotation } from "./defaults";
import { useEventListener } from "../interactions/eventHandler";
import { createMaterial } from "./materials";

interface TextProps extends BasicMeshType {
  anchorX?: string;
  anchorY?: string;
  curveRadius?: number;
  fontSize?: number;
  value: string;
}

export const Text = ({
  anchorX = "center",
  anchorY = "center",
  curveRadius = 0,
  fontSize = 0.4,
  value,
  position = defaultPosition,
  rotation = defaultRotation,
  material,
  ...props
}: TextProps) => {
  const _material = createMaterial(material);
  const obj = useRef<GameObject>({
    id: generateUUID(),
    obj: new TroikaText(),
    position,
    rotation,
    ...props,
  });

  const textObj = obj.current.obj;
  textObj.anchorX = anchorX;
  textObj.material = _material;
  textObj.anchorY = anchorY;
  textObj.curveRadius = curveRadius;
  textObj.text = value;
  textObj.fontSize = fontSize;

  useEffect(() => {
    obj.current.obj.position.set(...position);
  }, [position]);
  useEffect(() => {
    obj.current.obj.rotation.set(...rotation);
  }, [rotation]);
  useEffect(() => {
    const _material = createMaterial(material);
    textObj.material = _material;
  }, [material, textObj]);

  useEventListener(obj, props);

  useEffect(() => {
    const current = obj.current;
    let mounted = true;
    if (mounted) {
      // Add to current scene
      GAME.scene.addObjectToScene(current);
    }

    return () => {
      mounted = false;
      current.obj.dispose();
      GAME.scene.removeObjectFromScene(current);
    };
  }, []);
  return <></>;
};
