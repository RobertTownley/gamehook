import { useContext, useEffect } from "react";
import * as THREE from "three";
import { generateUUID } from "three/src/math/MathUtils";

import { XYZArray } from "../physics/types";
import { normalizeXYZ } from "../physics/utils";
import { SceneContext } from "../scene/context";
import { CameraProps, GameCamera } from "./types";
export { moveCamera } from "./keyframes";

export type { GameCamera } from "./types";

const DEFAULT_CAMERA_POSITION: XYZArray = [0, 0, 10];

export function buildGameCamera({
  fov = 75,
  aspect,
  near,
  far,
  trackTo,
}: CameraProps): GameCamera {
  const a = aspect ?? window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(fov, a, near, far);
  camera.position.set(...DEFAULT_CAMERA_POSITION);
  return {
    id: generateUUID(),
    camera,
    trackTo,
  };
}

export function Camera({ follow, position, trackTo }: CameraProps) {
  const scene = useContext(SceneContext);
  useEffect(() => {
    const p = normalizeXYZ(position ?? DEFAULT_CAMERA_POSITION);
    scene.camera.camera.position.set(...p);
  }, [position, scene.camera.camera.position]);

  // Automated camera moving
  useEffect(() => {
    scene.camera.trackTo = trackTo;
  }, [trackTo, scene.camera]);
  useEffect(() => {
    scene.camera.follow = follow;
  }, [follow, scene.camera]);
  return <></>;
}
