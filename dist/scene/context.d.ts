/// <reference types="react" />
import * as THREE from "three";
import { GameCamera } from "../camera";
import { Mesh } from "../mesh";
import { GameLight } from "../lights";
import { LoadedGameModel } from "../models";
export interface SceneContextValues {
    camera: GameCamera;
    id: string;
    models: Record<string, LoadedGameModel>;
    lights: Record<string, GameLight>;
    meshes: Record<string, Mesh>;
    threeScene: THREE.Scene;
}
export declare const SceneContext: import("react").Context<SceneContextValues>;
