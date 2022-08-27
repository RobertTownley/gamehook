import * as THREE from "three";
import { ReactNode } from "react";
import { XYZ } from "./physics/types";
interface Props {
    children: ReactNode;
    onClick: (event: MouseEvent) => void;
    id?: string;
}
export declare function useContainer(id: string, threeMesh: THREE.Mesh, position?: XYZ): void;
export declare function Container({ children, id, onClick }: Props): JSX.Element;
export {};
