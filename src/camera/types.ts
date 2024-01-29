import { ReactNode } from "react";
import { Physical } from "../physics/types";

export interface CameraProps extends Physical {
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

  children?: ReactNode;
}

export type ThreeCameras = THREE.PerspectiveCamera | THREE.OrthographicCamera;
