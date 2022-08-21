import { ReactNode } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Interactable } from "../interactions";
import { Nameable } from "../mesh/types";
import { Physical } from "../physics";
export interface UseModelParams extends Physical, Interactable, Nameable {
    id?: string;
    filepath: string;
}
export interface AnimationOptions {
    loop?: boolean;
    repetitions?: number;
}
export interface LoadedGameModel extends Physical, Interactable, Nameable {
    gltf: GLTF;
    id: string;
    mixer: THREE.AnimationMixer;
    clock: THREE.Clock;
}
export declare type GameModel = LoadedGameModel | {
    status: "pending";
} | {
    status: "error";
};
export interface ModelProps extends Physical, Interactable, Nameable {
    children?: ReactNode;
    filepath: string;
    id?: string;
}
