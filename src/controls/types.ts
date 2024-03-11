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
  disabled?: boolean;
  enableDamping?: boolean;
  dampingFactor?: number;
  maxDistance?: number;
  minDistance?: number;
  maxPolarAngle?: number;
  screenSpacePanning?: boolean;
  target?: XYZ;
  targetId?: string;
  targetIds?: string[];
  variant: ControlsVariant;
  zoomToCursor?: boolean;
}

// Workaround for not having yet found a unified Controls generic
export interface IControls {
  update: (delta: number) => void;
}
