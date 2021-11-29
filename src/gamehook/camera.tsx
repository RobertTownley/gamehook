import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { BasicGameObject, GameCamera } from "./objects/types";
import {
  useCollision,
  useLocation,
  useMovement,
  useName,
} from "./objects/hooks";
import { generateUUID } from "three/src/math/MathUtils";
import { useGame } from "./game";

const Defaults = {
  aspectRatio: window.innerWidth / window.innerHeight,
  fov: 75,
  near: 0.1,
  far: 1000,
};

type GameCameraType = "orthographic" | "perspective";
export interface GameCameraProps extends BasicGameObject {
  active?: boolean;
  aspectRatio?: number;
  far?: number;
  fov?: number;
  id?: string;
  near?: number;
  type?: GameCameraType;
}

const useGameCamera = (
  gameCamera: GameCamera,
  props: GameCameraProps
): GameCamera => {
  useCollision(gameCamera, props);
  useLocation(gameCamera, props);
  useName(gameCamera, props);
  useMovement(gameCamera, props);
  return gameCamera;
};

const useCamera = (props: GameCameraProps): GameCamera => {
  const camera = useMemo<GameCamera>(() => {
    return {
      id: props.id ?? generateUUID(),
      three: new THREE.PerspectiveCamera(),
      type: "camera",
    };
  }, [props.id]);
  return useGameCamera(camera, props);
};

export const Camera = (props: GameCameraProps) => {
  const { active } = props;
  const camera = useCamera(props);
  const game = useGame();
  useEffect(() => {
    if (!active) return;
    game.scene.camera = camera;
    return () => {};
  }, [camera, game.scene, active]);
  return <></>;
};

export function isPerspectiveCamera(
  camera: THREE.Camera
): camera is THREE.PerspectiveCamera {
  return camera.type === "PerspectiveCamera";
}
