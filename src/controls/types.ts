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
  enableDamping?: boolean;
  dampingFactor?: number;
  maxDistance?: number;
  minDistance?: number;
  maxPolarAngle?: number;
  screenSpacePanning?: boolean;
  targetIds?: string[];
  variant: ControlsVariant;
  zoomToCursor?: boolean;
}

// Workaround for not having yet found a unified Controls generic
export interface IControls {
  update: (delta: number) => void;
}
