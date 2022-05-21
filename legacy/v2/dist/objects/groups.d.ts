import * as THREE from "three";
import { ReactNode } from "react";
import { BasicGameObject, GameGroup, GameMesh } from "./types";
interface Props extends BasicGameObject {
    gameGroup?: GameGroup;
    children?: ReactNode;
}
export declare const Group: ({ gameGroup, children }: Props) => JSX.Element;
export declare const getGameGroupFromThreeGroup: (group: THREE.Group) => GameGroup;
export declare const getGameMeshFromThreeMesh: (mesh: THREE.Mesh) => GameMesh;
export {};
