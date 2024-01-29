import { useMemo, useState } from "react";

import { getDefaultCamera } from "./defaults";
import { ThreeCameras } from "./types";

export function useCamera() {
  const defaultCamera = useMemo(() => {
    return getDefaultCamera();
  }, []);
  const cameraState = useState<ThreeCameras>(defaultCamera);
  return cameraState;
}
