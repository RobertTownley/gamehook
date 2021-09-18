import * as THREE from "three";

type ObjectState =
  | "Ready"
  | "Initializing"
  | "Initialized"
  | "Terminating"
  | "Terminated";

export type ObjectRotation = [number, number, number];
export type ObjectPosition = [number, number, number];

export interface GameObject {
  id: string;
  obj: THREE.Mesh;
  position: ObjectPosition;
  rotation: ObjectRotation;
  state: ObjectState;
}
