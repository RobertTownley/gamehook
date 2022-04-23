import * as THREE from "three";
import { ReactNode } from "react";
import { GameScene } from "./scene";
interface Props {
    children?: ReactNode;
    width?: number;
    height?: number;
}
export declare const Game: ({ children, width, height }: Props) => JSX.Element;
export interface GameProperties {
    id: string;
    renderer: THREE.WebGLRenderer;
    resources: {
        geometries: Record<string, THREE.BufferGeometry>;
        materials: Record<string, THREE.Material>;
    };
    scene: GameScene;
    width: number;
    height: number;
    onWindowResize: () => void;
}
export declare const useGame: (props?: Props | undefined) => GameProperties;
export {};
