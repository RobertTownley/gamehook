import * as THREE from "three";
import { GameCamera } from "../camera";
import { Mesh } from "../mesh";
interface DetectHoverEntries {
    meshes: Record<string, Mesh>;
    camera: GameCamera;
    renderer: THREE.Renderer;
}
export declare function detectHoverEntries({ meshes, camera, renderer, }: DetectHoverEntries): void;
export {};
