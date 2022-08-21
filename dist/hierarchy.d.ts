import * as THREE from "three";
import { ReactNode } from "react";
import { Mesh } from "./mesh";
import { LoadedGameModel } from "./models";
interface HierarchyContextValues {
    parent: THREE.Mesh;
    parentId: string;
}
export declare const HierarchyContext: import("react").Context<HierarchyContextValues | undefined>;
export declare function useHierarchy(children: ReactNode, mesh: Mesh): HierarchyContextValues | undefined;
export declare const ModelHierarchyContext: import("react").Context<LoadedGameModel | undefined>;
export {};
