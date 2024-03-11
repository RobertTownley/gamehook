import { XYZ } from "src/physics/types";

type ControlsVariant =
  | "arcball"
  | "drag"
  | "firstPerson"
  | "fly"
  | "map"
  | "orbit"
  | "pointerLock"
  | "trackball"
  | "transform";

export interface ControlsProps {
  minDistance?: number;
  maxDistance?: number;
  minZoom?: number;
  maxZoom?: number;
  minTargetRadius?: number;
  maxTargetRadius?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
  enableDamping?: boolean;
  dampingFactor?: number;
  enableZoom?: boolean;
  zoomSpeed?: number;
  zoomToCursor?: boolean;
  enableRotate?: boolean;
  rotateSpeed?: number;
  enablePan?: boolean;
  panSpeed?: number;
  screenSpacePanning?: boolean;
  keyPanSpeed?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  disabled?: boolean;
  target?: XYZ;
  targetId?: string;
  targetIds?: string[];
  variant: ControlsVariant;
}

// Workaround for not having yet found a unified Controls generic
export interface IControls {
  update: (delta: number) => void;
}
