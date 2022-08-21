import * as THREE from "three";
import { ReactNode } from "react";
interface SceneProps {
    background?: THREE.ColorRepresentation;
    castShadow?: boolean;
    children: ReactNode;
    id?: string;
    width?: number;
    height?: number;
}
export declare function Scene({ background, castShadow, children, id, width, height, }: SceneProps): JSX.Element;
export {};
