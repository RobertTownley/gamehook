export type XYZ =
  | [number, number, number]
  | { x: number; y: number; z: number };

export interface Physical {
  // Location
  acceleration?: XYZ;
  position?: XYZ;
  velocity?: XYZ;
  // Rotation
  orientation?: XYZ;
  rotation?: XYZ;
}
