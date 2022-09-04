import * as THREE from "three";
import { GameCamera } from "./camera";
import { Mesh } from "./mesh";
import { GameLight } from "./lights";
import { LoadedGameModel } from "./models";
import { CSSMeasure } from "./window";
export declare function useGameLoop({ camera, lights, models, renderer, scene, meshes, }: {
    camera: GameCamera;
    lights: Record<string, GameLight>;
    models: Record<string, LoadedGameModel>;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    meshes: Record<string, Mesh>;
}): void;
interface UseResize {
    camera: GameCamera;
    height?: CSSMeasure;
    width?: CSSMeasure;
    renderer: THREE.WebGLRenderer;
    sceneId: string;
}
export declare function useResize({ camera, width, height, renderer, sceneId, }: UseResize): void;
export declare function useAddToScene(mesh: Mesh): void;
export declare function useAddLightToScene(light: GameLight): void;
export {};
