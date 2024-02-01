import { ReactNode, useMemo, useState } from "react";
import { CameraContext } from "./context";
import { getDefaultCamera } from "./defaults";
import { CameraContextValues, ThreeCameras } from "./types";

interface Props {
  children: ReactNode;
}

export function CameraProvider({ children }: Props) {
  const [camera, setCamera] = useState<ThreeCameras>(getDefaultCamera());
  const value: CameraContextValues = useMemo(() => {
    return { camera, setCamera };
  }, [camera, setCamera]);

  return (
    <CameraContext.Provider value={value}>{children}</CameraContext.Provider>
  );
}
