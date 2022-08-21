import { useLayoutEffect, useMemo } from "react";
import { createMaterial } from "./index";
export function useMaterial(mesh, materialOptions) {
    // Give material to mesh object
    var material = useMemo(function () {
        return createMaterial(materialOptions);
    }, [materialOptions]);
    useLayoutEffect(function () {
        mesh.threeMesh.material = material;
    }, [mesh.threeMesh, material]);
}
//# sourceMappingURL=hooks.js.map