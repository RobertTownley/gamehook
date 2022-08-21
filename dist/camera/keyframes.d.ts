import { Mesh } from "../mesh";
import { GameCamera } from "./types";
import { LoadedGameModel } from "../models";
export declare function moveCamera(meshes: Record<string, Mesh>, models: Record<string, LoadedGameModel>, camera: GameCamera): void;
