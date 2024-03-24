import { createContext } from "react";

import { DefaultCamera } from "./defaults";
import { CameraContextValues } from "./types";

export const CameraContext = createContext<CameraContextValues>({
  camera: DefaultCamera,
  setCamera: () => {},
});
