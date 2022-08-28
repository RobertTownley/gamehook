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
    var boundingBox = useMemo(function () {
        var box = new THREE.Box3();
        Object.values(meshes).forEach(function (mesh) {
            var _a;
            var newObject = mesh.threeMesh.clone();
            (_a = newObject.position).set.apply(_a, normalizeXYZ(mesh.position));
            box.expandByObject(newObject);
        });
        return box;
    }, [meshes]);
    var containerId = useMemo(function () {
        return id !== null && id !== void 0 ? id : generateUUID();
    }, [id]);
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
    var position = useMemo(function () {
        var positions = Object.values(meshes).map(function (m) {
            return normalizeXYZ(m.position);
        });
        return [
            _.mean(positions.map(function (p) { return p[0]; })),
            _.mean(positions.map(function (p) { return p[1]; })),
            _.mean(positions.map(function (p) { return p[2]; })),
        ];
    }, [meshes]);
    var _b = (function () {
        var max = boundingBox.max, min = boundingBox.min;
        return {
            width: max.x - min.x,
            height: max.y - min.y,
            depth: max.z - min.z,
        };
    })(), width = _b.width, height = _b.height, depth = _b.depth;
    var value = { addChild: addChild, removeChild: removeChild, containerId: containerId };
    var passThroughProps = ["onClick", "onHoverEnter", "onHoverLeave"];
    return (_jsxs(ContainerContext.Provider, __assign({ value: value }, { children: [_jsx(Box, __assign({}, _.pick(props, passThroughProps), { material: {
                    opacity: 0,
                    transparent: true,
                    type: "basic",
                }, width: width, height: height, depth: depth, position: position, id: containerId })), children] })));
}
//# sourceMappingURL=container.js.map