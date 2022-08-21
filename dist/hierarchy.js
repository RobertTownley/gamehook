import { createContext } from "react";
export var HierarchyContext = createContext(undefined);
export function useHierarchy(children, mesh) {
    return children
        ? {
            parentId: mesh.id,
            parent: mesh.threeMesh,
        }
        : undefined;
}
export var ModelHierarchyContext = createContext(undefined);
//# sourceMappingURL=hierarchy.js.map