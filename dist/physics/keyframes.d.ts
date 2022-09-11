import { Mesh } from "../mesh";
import { GameLight } from "../lights";
export declare function accelerateObjects(meshes: Record<string, Mesh>): void;
export declare function moveLights(lights: Record<string, GameLight>, meshes: Record<string, Mesh>): void;
export declare function moveObjects(meshes: Record<string, Mesh>): void;
export declare function rotateObjects(meshes: Record<string, Mesh>): void;
export declare function detectCollisions(meshes: Record<string, Mesh>, threshold: number): void;
