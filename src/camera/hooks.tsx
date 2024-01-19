import * as THREE from "three";

import { useMemo, useState } from "react";

export function useCamera() {
  const defaultCamera = useMemo(() => {
    const camera = new THREE.PerspectiveCamera();
    camera.position.setX(0);
    camera.position.setY(0);
    camera.position.setZ(5);
    return camera;
  }, []);
  const cameraState = useState(defaultCamera);
  return cameraState;
}
