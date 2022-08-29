var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as THREE from "three";
import _ from "lodash";
import { createContext, useContext, useState, useMemo, useEffect, useCallback, } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { Box } from "./mesh/box";
import { normalizeXYZ } from "./physics/utils";
import { createMaterial } from "./materials";
var ContainerContext = createContext({
    addChild: function (_id, _bounds, _position) { return ({}); },
    removeChild: function (_id) { return ({}); },
    containerId: "",
});
export function useContainer(id, threeMesh, position) {
    var _a = useContext(ContainerContext), addChild = _a.addChild, containerId = _a.containerId, removeChild = _a.removeChild;
    useEffect(function () {
        if (containerId !== id) {
            addChild(id, threeMesh, normalizeXYZ(position));
            return function () {
                removeChild(id);
            };
        }
    }, [addChild, containerId, removeChild, id, threeMesh, position]);
}
export function Container(props) {
    var children = props.children, id = props.id;
    var _a = useState({}), meshes = _a[0], setMeshes = _a[1];
    var containerId = useMemo(function () {
        return id !== null && id !== void 0 ? id : generateUUID();
    }, [id]);
    var _b = useMemo(function () {
        var box = new THREE.Box3();
        var group = new THREE.Group();
        Object.values(meshes).forEach(function (mesh) {
            box.expandByObject(mesh.threeMesh);
            group.add(mesh.threeMesh.clone());
        });
        var position = new THREE.Box3()
            .setFromObject(group)
            .getCenter(group.position);
        return [box, position];
    }, [meshes]), boundingBox = _b[0], position = _b[1];
    var addChild = useCallback(function (id, threeMesh, position) {
        setMeshes(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[id] = {
                threeMesh: threeMesh,
                position: position,
            }, _a)));
        });
    }, []);
    var removeChild = useCallback(function (id) {
        setMeshes(function (prev) { return _.omit(prev, id); });
    }, []);
    var _c = (function () {
        var max = boundingBox.max, min = boundingBox.min;
        return {
            width: max.x - min.x,
            height: max.y - min.y,
            depth: max.z - min.z,
        };
    })(), width = _c.width, height = _c.height, depth = _c.depth;
    var value = { addChild: addChild, removeChild: removeChild, containerId: containerId };
    var material = useMemo(function () {
        return createMaterial({
            opacity: 0,
            transparent: true,
            type: "basic",
        });
    }, []);
    return (_jsxs(ContainerContext.Provider, __assign({ value: value }, { children: [_jsx(Box, { onClick: props.onClick, onHoverEnter: props.onHoverEnter, onHoverLeave: props.onHoverLeave, material: material, width: width, height: height, depth: depth, position: position, id: containerId }), children] })));
}
//# sourceMappingURL=container.js.map