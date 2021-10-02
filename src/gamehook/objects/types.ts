import * as THREE from "three";
import { Text as TroikaText } from "troika-three-text";
import { Collidable } from "../interactions/collisions";
import { Interactable } from "../interactions/types";

export type ObjectRotation = [number, number, number];
export type ObjectPosition = [number, number, number];

export interface Nameable {
  name?: string;
  labels?: string[];
}
export interface Positionable {
  position?: ObjectPosition;
  rotation?: ObjectRotation;
}

export type ThreeGameObject = THREE.Mesh | typeof TroikaText;

export interface GameObject
  extends Collidable,
    Interactable,
    Nameable,
    Positionable {
  id: string;
  obj: ThreeGameObject;
  position: ObjectPosition;
  rotation: ObjectRotation;
  name?: string;
  labels?: string[];
}

export interface Designable {
  color?: number;
  material?: THREE.Material;
}

export interface BasicMeshType
  extends Collidable,
    Designable,
    Interactable,
    Nameable,
    Positionable {}
