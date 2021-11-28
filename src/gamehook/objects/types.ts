import { ReactNode } from "react";

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

export interface BasicGameObject
  extends Designable,
    Interactable,
    Nameable,
    Physical,
    Positionable,
    Shapeable {
  id?: string;
}

export interface BasicMeshType extends BasicGameObject {}
export interface GameMesh extends BasicGameObject {
  id: string;
  type: "mesh";
  three: THREE.Mesh;
}

export interface GameLight extends BasicGameObject {
  id: string;
  type: "light";
  three: THREE.Light;
}

export interface GameGroup extends BasicGameObject {
  id: string;
  type: "group";
  three: THREE.Group;
  children: (GameGroup | GameMesh)[];
}

export type GameObject = GameMesh | GameGroup;

export type Angle = ThreespaceCoords;

type GameCameraType = "orthographic" | "perspective";
export interface GameCameraProps extends BasicGameObject {
  active: boolean;
  type?: GameCameraType;
}

export interface GameMeshProps extends BasicMeshType {
  children?: ReactNode;
  objParent?: GameMesh;
}

export interface GameLightProps extends BasicMeshType {
  objParent?: GameMesh;
}

export interface GameGroupProps extends BasicMeshType {
  children?: ReactNode;
  objParent?: GameMesh | GameGroup;
}
