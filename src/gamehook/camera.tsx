import { useLayoutEffect, useRef } from "react";
import { generateUUID } from "three/src/math/MathUtils";

import { useCamera } from "./hooks";
import { GameListener } from "./listeners";
import { ObjectPosition, ObjectRotation } from "./objects/types";

interface AbstractOptions {
  initialPosition?: ObjectPosition;
  initialRotation?: ObjectRotation;
}

interface SkyCamCameraControlOptions extends AbstractOptions {
  step?: number;
  variant?: "skycam";
}
interface FirstPersonCameraControlOptions extends AbstractOptions {
  variant: "firstPerson";
}

type CameraControlOptions =
  | SkyCamCameraControlOptions
  | FirstPersonCameraControlOptions;

export const CameraControl = ({
  variant = "skycam",
  ...props
}: CameraControlOptions) => {
  switch (variant) {
    case "skycam":
      return <SkyCamCameraControl {...props} />;
    case "firstPerson":
      return <FirstPersonCameraControl />;
  }
};

const SkyCamCameraControl = ({
  initialPosition,
  initialRotation,
  step = 0.1,
}: SkyCamCameraControlOptions) => {
  const camera = useCamera();
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowUp":
        camera.position.y += step;
        break;
      case "ArrowDown":
        camera.position.y -= step;
        break;
      case "ArrowRight":
        camera.position.x += step;
        break;
      case "ArrowLeft":
        camera.position.x -= step;
        break;
      default:
        console.log(event);
    }
  };
  const obj = useRef<GameListener>({
    id: generateUUID(),
    onKeyDown: handleKeyDown,
  });

  useLayoutEffect(() => {
    camera.rotation.x = 0.2;
  }, [camera]);
  useLayoutEffect(() => {
    if (!initialPosition) return;
    camera.position.set(
      initialPosition[0],
      initialPosition[1],
      initialPosition[2]
    );
  }, [camera, initialPosition]);
  useLayoutEffect(() => {
    if (!initialRotation) return;
    camera.rotation.set(
      initialRotation[0],
      initialRotation[1],
      initialRotation[2]
    );
  }, [camera, initialRotation]);

  useLayoutEffect(() => {
    let mounted = true;
    const current = obj.current;
    if (mounted) {
      GAME.scene.addListenerToScene(current);
    }
    return () => {
      mounted = false;
      GAME.scene.removeListenerFromScene(current);
    };
  }, []);
  return <></>;
};

const FirstPersonCameraControl = () => {
  return <></>;
};
