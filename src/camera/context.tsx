import { createContext } from "react";

import { getDefaultCamera } from "./defaults";
import { CameraContextValues } from "./types";

export const CameraContext = createContext<CameraContextValues>({
  camera: getDefaultCamera(),
  setCamera: () => {},
});
