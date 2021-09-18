import * as THREE from "three";
import { Text as TroikaText } from "troika-three-text";

type ObjectState =
  | "Ready"
  | "Initializing"
  | "Initialized"
  | "Terminating"
  | "Terminated";

export type ObjectRotation = [number, number, number];
export type ObjectPosition = [number, number, number];

export type ThreeGameObject = THREE.Mesh | typeof TroikaText;

export interface GameObject {
  id: string;
  obj: ThreeGameObject;
  position: ObjectPosition;
  rotation: ObjectRotation;
  state: ObjectState;
}
