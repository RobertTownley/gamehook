import { useCallback, useEffect, useState, useRef } from "react";
import { Text as TroikaText } from "troika-three-text";
import { generateUUID } from "three/src/math/MathUtils";

import { getAnimatedValue } from "../animation";
import { GameObject, ObjectPosition, ObjectRotation } from "./types";
import { defaultPosition, defaultRotation } from "./defaults";
import { useTimeline } from "../hooks";

interface TextProps {
  anchorX?: string;
  anchorY?: string;
  color: number;
  curveRadius?: number;
  fontSize?: number;
  position?: ObjectPosition;
  rotation?: ObjectRotation;
  value: string;
}

export const Text = ({
  anchorX = "center",
  anchorY = "center",
  color = 0x9966ff,
  curveRadius = 0,
  fontSize = 0.4,
  position = defaultPosition,
  rotation = defaultRotation,
  value,
}: TextProps) => {
  const obj = useRef<GameObject>({
    id: generateUUID(),
    obj: new TroikaText(),
    state: "Ready",
    position,
    rotation,
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
    GAME.scene.addObjectToScene(current);

    return () => {
      current.obj.dispose();
      GAME.scene.removeObjectFromScene(current);
    };
  }, []);
  return <></>;
};

interface FadeInTextProps extends TextProps {
  start: number;
  end: number;
  step?: number;
  startColor?: number;
}

export const FadeInText = ({
  startColor = 0x000000,
  start,
  end,
  step = 25,
  ...otherProps
}: FadeInTextProps) => {
  const [intermediateColor, setIntermediateColor] =
    useState<number>(startColor);

  useTimeline(
    useCallback(
      (duration) => {
        const value = getAnimatedValue(startColor, otherProps.color, duration);
        setIntermediateColor(value);
      },
      [startColor, otherProps.color]
    ),
    start,
    end,
    step
  );
  const textProps = {
    ...otherProps,
    color: intermediateColor,
  };
  return <Text {...textProps} />;
};
