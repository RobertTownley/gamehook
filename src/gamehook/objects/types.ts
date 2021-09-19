import * as THREE from "three";
import { Text as TroikaText } from "troika-three-text";
import { InteractionMap } from "../interactions/types";

type ObjectState =
  | "Ready"
  | "Initializing"
  | "Initialized"
  | "Terminating"
  | "Terminated";

export type ObjectRotation = [number, number, number];
export type ObjectPosition = [number, number, number];

export interface Positionalable {
  position?: ObjectPosition;
  rotation?: ObjectRotation;
}

export type ThreeGameObject = THREE.Mesh | typeof TroikaText;

export interface GameObject {
  id: string;
  interactions?: InteractionMap;
  obj: ThreeGameObject;
  position: ObjectPosition;
  rotation: ObjectRotation;
  state: ObjectState;
}

// Interactions
