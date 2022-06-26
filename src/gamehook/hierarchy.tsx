import * as THREE from "three";
import { createContext, ReactNode } from "react";
import { Mesh } from "./mesh";
import { LoadedGameModel } from "./models";

interface HierarchyContextValues {
  parent: THREE.Mesh;
  parentId: string;
}

export const HierarchyContext = createContext<
  HierarchyContextValues | undefined
>(undefined);

export function useHierarchy(
  children: ReactNode,
  mesh: Mesh
): HierarchyContextValues | undefined {
  return children
    ? {
        parentId: mesh.id,
        parent: mesh.threeMesh,
      }
    : undefined;
}

export const ModelHierarchyContext = createContext<LoadedGameModel | undefined>(
  undefined
);
