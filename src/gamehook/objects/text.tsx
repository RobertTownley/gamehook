import { useCallback, useEffect, useState, useRef } from "react";
import { Text as TroikaText } from "troika-three-text";
import { generateUUID } from "three/src/math/MathUtils";

import { getAnimatedValue } from "../animation";
import { GameObject, Positionable } from "./types";
import { useTimeline } from "../hooks";
import { Interactable } from "../interactions/types";
import { defaultPosition, defaultRotation } from "./defaults";

const DEFAULT_TEXT_COLOR = 0xffffff;

interface TextProps extends Positionable, Interactable {
  anchorX?: string;
  anchorY?: string;
  color?: number;
  curveRadius?: number;
  fontSize?: number;
  value: string;
}

export const Text = ({
  anchorX = "center",
  anchorY = "center",
  color = DEFAULT_TEXT_COLOR,
  curveRadius = 0,
  fontSize = 0.4,
  value,
  position = defaultPosition,
  rotation = defaultRotation,
  ...gameObjectProps
}: TextProps) => {
  const obj = useRef<GameObject>({
    id: generateUUID(),
    obj: new TroikaText(),
    position,
    rotation,
    state: "Ready",
    ...gameObjectProps,
  });

  const textObj = obj.current.obj;
  textObj.anchorX = anchorX;
  textObj.anchorY = anchorY;
  textObj.color = color;
  textObj.curveRadius = curveRadius;
  textObj.text = value;
  textObj.fontSize = fontSize;

  textObj.position.x = position[0];
  textObj.position.y = position[1];
  textObj.position.z = position[2];

  textObj.rotation.x = rotation[0];
  textObj.rotation.y = rotation[1];
  textObj.rotation.z = rotation[2];

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

interface FadeInTextProps extends TextProps {
  start: number;
  end: number;
  onComplete?: () => void;
  step?: number;
  startColor?: number;
}

export const FadeInText = ({
  onComplete,
  startColor = 0x000000,
  start,
  end,
  step = 25,
  color = DEFAULT_TEXT_COLOR,
  ...otherProps
}: FadeInTextProps) => {
  const [intermediateColor, setIntermediateColor] =
    useState<number>(startColor);

  const callback = useCallback(
    (duration) => {
      const value = getAnimatedValue(startColor, color, duration);
      setIntermediateColor(value);
      if (onComplete && duration === 0) {
        setTimeout(() => {
          onComplete();
        }, start + end);
      }
    },
    [startColor, color, start, end, onComplete]
  );

  useTimeline(callback, start, end, step);
  const textProps = {
    ...otherProps,
    color: intermediateColor,
  };
  return <Text {...textProps} />;
};
