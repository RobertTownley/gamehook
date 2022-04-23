import * as THREE from "three";
import { ReactNode } from "react";
import { BasicMeshType } from "./types";
interface ModelProps extends BasicMeshType {
    children?: ReactNode;
    onError?: () => void;
    filepath: string;
    loadingModel?: THREE.Mesh;
}
export declare const Model: (props: ModelProps) => JSX.Element;
export {};
