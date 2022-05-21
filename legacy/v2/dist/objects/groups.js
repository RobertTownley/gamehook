import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import * as THREE from "three";
import { generateUUID } from "three/src/math/MathUtils";
import { isGroup, isMesh } from "./guards";
import { buildChildren } from "./children";
export var Group = function (_a) {
    var gameGroup = _a.gameGroup, children = _a.children;
    if (!gameGroup) {
        throw new Error("Constructing groups from components is not yet implemented");
    }
    return _jsx(_Fragment, { children: buildChildren(gameGroup, children) }, void 0);
};
/* Parse the ThreeJS group object returned (eg from a gltf loader
 * and return a Gamehook group containing values needed to generate
 * those objects
 *
 * TODO: Currently handling children, but there are other attriubtes
 * that should be given attention, such as animations
 */
export var getGameGroupFromThreeGroup = function (group) {
    var children = group.children.flatMap(function (c) {
        if (isGroup(c))
            return [getGameGroupFromThreeGroup(c)];
        if (isMesh(c))
            return [getGameMeshFromThreeMesh(c)];
        return [];
    });
    return {
        type: "group",
        id: generateUUID(),
        three: new THREE.Group(),
        children: children,
    };
};
export var getGameMeshFromThreeMesh = function (mesh) {
    return {
        type: "mesh",
        id: generateUUID(),
        three: new THREE.Mesh(),
        position: mesh.position,
        geometry: mesh.geometry,
    };
};
//# sourceMappingURL=groups.js.map