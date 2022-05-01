export type XYZArray = [number, number, number];
export type XYZObject = { x: number; y: number; z: number };

export type XYZ = XYZArray | XYZObject;

export interface Physical {
  // Location
  acceleration?: XYZ;
  position?: XYZ;
  velocity?: XYZ;
  // Rotation
  orientation?: XYZ;
  rotation?: XYZ;
}
