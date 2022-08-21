import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import * as THREE from "three";
import { useContext, useEffect } from "react";
import { ModelHierarchyContext } from "../hierarchy";
export function Animation(_a) {
    var name = _a.name, _b = _a.loop, loop = _b === void 0 ? false : _b, _c = _a.repetitions, repetitions = _c === void 0 ? 1 : _c;
    var hierarchy = useContext(ModelHierarchyContext);
    useEffect(function () {
        if (hierarchy) {
            var animation = THREE.AnimationClip.findByName(hierarchy.gltf.animations, name);
            var action = hierarchy.mixer.clipAction(animation);
            if (loop) {
                action.play();
            }
            else {
                action.setLoop(THREE.LoopOnce, repetitions).play();
            }
        }
    }, [hierarchy, loop, name, repetitions]);
    return _jsx(_Fragment, {});
}
//# sourceMappingURL=index.js.map