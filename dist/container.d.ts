import * as THREE from "three";
import { ReactNode } from "react";
import { XYZ } from "./physics/types";
import { Interactable } from "./interactions";
interface Props extends Interactable {
    children: ReactNode;
    id?: string;
}
export declare function useContainer(id: string, threeMesh: THREE.Mesh, position?: XYZ): void;
export declare function Container(props: Props): JSX.Element;
export {};
