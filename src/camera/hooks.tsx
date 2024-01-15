import * as THREE from "three";

import { useMemo, useState } from "react";

export function useCamera() {
  const defaultCamera = useMemo(() => {
    return new THREE.Camera();
  }, []);
  const cameraState = useState(defaultCamera);
  return cameraState;
}
