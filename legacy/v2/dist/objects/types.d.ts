import { ReactNode } from "react";
import { Shapeable } from "./geometries";
import { Designable } from "./materials";
import { Nameable } from "./labels";
import { Physical } from "../physics/types";
import { Positionable } from "./positions";
import { Interactable } from "../interactions";
declare type ThreespaceCoords = {
    x: number;
    y: number;
    z: number;
};
export declare type Quaternion = {
    x: number;
    y: number;
    z: number;
    w: number;
};
export declare type Acceleration = ThreespaceCoords;
export declare type Position = ThreespaceCoords;
export declare type Rotation = ThreespaceCoords;
export declare type Orientation = ThreespaceCoords;
export declare type Velocity = ThreespaceCoords;
export interface BasicGameObject extends Designable, Interactable, Nameable, Physical, Positionable, Shapeable {
    id?: string;
}
export interface BasicMeshType extends BasicGameObject {
}
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
export declare type GameObject = GameMesh | GameGroup;
export declare type Angle = ThreespaceCoords;
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
export {};
