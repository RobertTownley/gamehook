import { ReactNode } from "react";
import { BasicMeshType, GameMesh } from "./types";
export interface MeshProps extends BasicMeshType {
    children?: ReactNode;
    objParent?: GameMesh;
}
export declare const Mesh: (props: MeshProps) => JSX.Element;
