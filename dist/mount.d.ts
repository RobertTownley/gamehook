/// <reference types="react" />
import * as THREE from "three";
import { GameCamera } from "./camera";
import { Mesh } from "./mesh";
import { GameLight } from "./lights";
import { LoadedGameModel } from "./models";
export declare function useGameLoop({ camera, lights, models, renderer, scene, meshes, }: {
    camera: GameCamera;
    lights: Record<string, GameLight>;
    models: Record<string, LoadedGameModel>;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    meshes: Record<string, Mesh>;
}): void;
export declare function useMountRef(renderer: THREE.WebGLRenderer): import("react").RefObject<HTMLDivElement>;
interface UseResize {
    camera: GameCamera;
    width?: number;
    height?: number;
    renderer: THREE.WebGLRenderer;
}
export declare function useResize({ camera, width, height, renderer }: UseResize): void;
export declare function useAddToScene(mesh: Mesh): void;
export declare function useAddLightToScene(light: GameLight): void;
export {};
