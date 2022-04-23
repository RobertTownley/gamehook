import { Position, Orientation, Rotation } from "./types";

export interface Positionable {
  orientation?: Orientation;
  position?: Position;
  rotation?: Rotation;
}
