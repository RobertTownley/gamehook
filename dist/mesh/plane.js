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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from "react";
import * as THREE from "three";
import { HierarchyContext, useHierarchy } from "../hierarchy";
import { useMaterial } from "../materials/hooks";
import { useGeometry, useMesh } from "./hooks";
export function Plane(props) {
    var children = props.children, width = props.width, height = props.height, widthSegments = props.widthSegments, heightSegments = props.heightSegments;
    var mesh = useMesh(props);
    var geometry = useMemo(function () {
        return new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    }, [width, height, widthSegments, heightSegments]);
    useGeometry(mesh, geometry);
    useMaterial(mesh, props.material);
    var hierarchyValue = useHierarchy(children, mesh);
    return hierarchyValue ? (_jsx(HierarchyContext.Provider, __assign({ value: hierarchyValue }, { children: children }))) : (_jsx(_Fragment, { children: children }));
}
//# sourceMappingURL=plane.js.map