export type XYZ = [number, number, number];

export interface Positionable {
  position?: XYZ;
}

export interface Physical extends Positionable {}
