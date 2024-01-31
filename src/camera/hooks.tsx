import { MutableRefObject, useCallback, useRef } from "react";

import { getDefaultCamera } from "./defaults";
import { ThreeCameras } from "./types";

export function useCamera(): [
  MutableRefObject<ThreeCameras>,
  (c: ThreeCameras) => void
] {
  const camera = useRef<ThreeCameras>(getDefaultCamera());
  const setCamera = useCallback((c: ThreeCameras) => {
    camera.current = c;
  }, []);
  return [camera, setCamera];
}
