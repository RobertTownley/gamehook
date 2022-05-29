import * as THREE from "three";
import { MutableRefObject, ReactNode } from "react";
import { Animation } from "./animations";
import { GameLight, GameObject } from "./objects/types";
export interface SceneProps {
    backgroundColor?: number;
    children?: ReactNode;
    title: string;
}
export declare const Scene: (props: SceneProps) => JSX.Element;
export interface GameScene {
    id: string;
    addObjectToScene: (gameObject: GameObject) => void;
    addLightToScene: (gameLight: GameLight) => void;
    animations: {
        [key: string]: MutableRefObject<Animation>;
    };
    camera: THREE.PerspectiveCamera;
    removeObjectFromScene: (gameObject: GameObject) => void;
    removeLightFromScene: (gameLight: GameLight) => void;
    gameLights: {
        [key: string]: GameLight;
    };
    gameObjects: {
        [key: string]: GameObject;
    };
    three: THREE.Scene;
}
export declare const buildScene: () => GameScene;
export declare const initialScene: GameScene;
export declare const useScene: () => GameScene;
