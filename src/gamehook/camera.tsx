import * as THREE from "three";
import { useEffect } from "react";
import { GameCameraProps } from "./objects/types";

const Defaults = {
  fov: 75,
  near: 0.1,
  far: 1000,
};
const buildCamera = (props: GameCameraProps): THREE.Camera => {
  return new THREE.PerspectiveCamera(
    props.fov ?? Defaults.fov,
    props.aspectRatio ?? window.innerWidth / window.innerHeight,
    props.near ?? Defaults.near,
    props.far ?? Defaults.far
  );
};
export const Camera = (props: GameCameraProps) => {
  const { active } = props;
  useEffect(() => {
    if (active) {
      const camera = buildCamera(props);
      // Add to scene
    }
  }, [active]);
  return <></>;
};
