import * as THREE from "three";
import { GameMesh } from "../objects/types";
export interface Collision {
    self: GameMesh;
    target: GameMesh;
    intersections: THREE.Intersection[];
}
export declare type CollisionHandler = (collision: Collision) => void;
export declare const detectCollisions: () => void;
