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
  targetIds?: string[];
  variant: ControlsVariant;
}

// Workaround for not having yet found a unified Controls generic
export interface IControls {
  update: () => void;
}
