import { ThreeCameras } from "./types";

export function isPerspectiveCamera(
  camera: ThreeCameras
): camera is THREE.PerspectiveCamera {
  return camera.type === "PerspectiveCamera";
}
