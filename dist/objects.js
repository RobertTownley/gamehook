import { useContext } from "react";
import { SceneContext } from "./scene/context";
export function useObject(id) {
    var scene = useContext(SceneContext);
    if (!scene || !scene.meshes) {
        throw new Error("useObject may only be called within a scene context");
    }
    var obj = scene.meshes[id];
    return obj;
}
//# sourceMappingURL=objects.js.map