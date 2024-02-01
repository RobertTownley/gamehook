import { useContext } from "react";
import { CameraContext } from "./context";

export function useCamera() {
  return useContext(CameraContext);
}
