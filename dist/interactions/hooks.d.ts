import * as THREE from "three";
import { Mesh } from "../mesh";
export declare function useInteraction(meshes: Record<string, Mesh>, renderer: THREE.Renderer, camera: THREE.PerspectiveCamera): void;
export declare const getMouseVectorForEvent: (event: MouseEvent, renderer: THREE.Renderer) => THREE.Vector2;
