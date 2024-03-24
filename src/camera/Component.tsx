import { useEffect } from "react";
import * as THREE from "three";

import { DefaultCameraPosition } from "./defaults";
import { CameraProps } from "./types";
import { useCamera } from "./hooks";

export function Camera(props: CameraProps) {
  const { camera } = useCamera();
  const { fov, aspect, near, far, position = DefaultCameraPosition } = props;

  const [x, y, z] = position;
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov ?? 50;
      camera.aspect = aspect ?? window.innerWidth / window.innerHeight;
      camera.near = near ?? 0.1;
      camera.far = far ?? 2000;
    }
  }, [aspect, camera, fov, near, far]);

  useEffect(() => {
    const deltaX = x - camera.position.x;
    const deltaY = y - camera.position.y;
    const deltaZ = z - camera.position.z;

    camera.position.setX(x);
    camera.position.setY(y);
    camera.position.setZ(z);
    if (camera.userData["controls"]) {
      const controls = camera.userData["controls"];
      controls.target.x += deltaX;
      controls.target.y += deltaY;
      controls.target.z += deltaZ;
      controls.cursor.x += deltaX;
      controls.cursor.y += deltaY;
      controls.cursor.z += deltaZ;
      console.log("UPDATING");
      controls.update();
    }
  }, [camera, x, y, z]);
  return null;
}
