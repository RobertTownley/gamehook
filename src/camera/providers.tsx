import { ReactNode, useState } from "react";
import { CameraContext } from "./context";
import { getDefaultCamera } from "./defaults";
import { ThreeCameras } from "./types";

interface Props {
  children: ReactNode;
}

export function CameraProvider({ children }: Props) {
  const [camera, setCamera] = useState<ThreeCameras>(getDefaultCamera());

  return (
    <CameraContext.Provider value={{ camera, setCamera }}>
      {children}
    </CameraContext.Provider>
  );
}
