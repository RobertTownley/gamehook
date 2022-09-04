import * as THREE from "three";
import { ReactNode } from "react";
import { Theme } from "../theme";
import { CSSMeasure } from "../window";
interface SceneProps {
    background?: THREE.ColorRepresentation;
    castShadow?: boolean;
    children: ReactNode;
    id?: string;
    width?: CSSMeasure;
    height?: CSSMeasure;
    theme?: Theme;
    antialias?: boolean;
    canvas?: HTMLCanvasElement;
}
export declare function Scene(props: SceneProps): JSX.Element;
export {};
