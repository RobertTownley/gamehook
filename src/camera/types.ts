import { Hierarchical } from "../hierarchy/types";
import { Physical } from "../physics/types";

export interface CameraProps extends Physical, Hierarchical {
  type?: "perspective" | "orthographic";
  near?: number;
  far?: number;
  // Perspective
  fov?: number;
  aspect?: number;
  // Orthographic
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export type ThreeCameras = THREE.PerspectiveCamera | THREE.OrthographicCamera;
