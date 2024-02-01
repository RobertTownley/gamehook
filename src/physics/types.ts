export type XYZ = [number, number, number];

export interface Rotateable {
  orientation?: XYZ;
  rotation?: XYZ;
}
export interface Moveable {
  position?: XYZ;
  velocity?: XYZ;
}
export interface Scalable {
  growth?: XYZ;
  scale?: XYZ;
}

export interface Physical extends Rotateable, Moveable, Scalable {}
