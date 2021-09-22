import * as THREE from "three";
import { Text as TroikaText } from "troika-three-text";
import { Collidable } from "../interactions/collisions";
import { Interactable, InteractionMap } from "../interactions/types";

type ObjectState =
  | "Ready"
  | "Initializing"
  | "Initialized"
  | "Terminating"
  | "Terminated";

export type ObjectRotation = [number, number, number];
export type ObjectPosition = [number, number, number];

export interface Positionable {
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

export interface Designable {
  color?: number;
  material?: THREE.Material;
}

export interface BasicMeshType
  extends Collidable,
    Designable,
    Interactable,
    Positionable {}
