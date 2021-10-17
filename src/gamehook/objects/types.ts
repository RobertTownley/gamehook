import { Shapeable } from "./geometries";
import { Designable } from "./materials";
import { Nameable } from "./labels";
import { Physical } from "../physics/types";
import { Positionable } from "./positions";
import { Interactable } from "../interactions";

/* Mesh Properties */
type ThreespaceCoords = { x: number; y: number; z: number };
export type Quaternion = { x: number; y: number; z: number; w: number };
export type Acceleration = ThreespaceCoords;
export type Position = ThreespaceCoords;
export type Rotation = ThreespaceCoords;
export type Orientation = ThreespaceCoords;
export type Velocity = ThreespaceCoords;

interface BasicGameObject
  extends Designable,
    Interactable,
    Nameable,
    Physical,
    Positionable,
    Shapeable {}

export interface BasicMeshType extends BasicGameObject {}
export interface GameObject extends BasicGameObject {
  id: string;
  three: THREE.Mesh;
}

/* Physical Properties */
export type Angle = ThreespaceCoords;
