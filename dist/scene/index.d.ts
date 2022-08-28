import * as THREE from "three";
import { ReactNode } from "react";
import { Theme } from "../theme";
interface SceneProps {
    background?: THREE.ColorRepresentation;
    castShadow?: boolean;
    children: ReactNode;
    id?: string;
    width?: number;
    height?: number;
    theme?: Theme;
}
export declare function Scene({ background, castShadow, children, id, width, height, theme, }: SceneProps): JSX.Element;
export {};
