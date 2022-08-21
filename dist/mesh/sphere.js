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
import * as THREE from "three";
import { useMemo } from "react";
import { useMesh, useGeometry } from "./hooks";
import { useMaterial } from "../materials/hooks";
import { HierarchyContext, useHierarchy } from "../hierarchy";
export function Sphere(props) {
    var children = props.children, radius = props.radius, _a = props.widthSegments, widthSegments = _a === void 0 ? 16 : _a, _b = props.heightSegments, heightSegments = _b === void 0 ? 8 : _b, phiStart = props.phiStart, phiLength = props.phiLength, thetaStart = props.thetaStart, thetaLength = props.thetaLength;
    var mesh = useMesh(props);
    // Give geometry to mesh object
    var geometry = useMemo(function () {
        return new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
    }, [
        radius,
        widthSegments,
        heightSegments,
        phiStart,
        phiLength,
        thetaStart,
        thetaLength,
    ]);
    useGeometry(mesh, geometry);
    // Give material to mesh object
    useMaterial(mesh, props.material);
    var hierarchyValue = useHierarchy(children, mesh);
    if (hierarchyValue) {
        return (_jsx(HierarchyContext.Provider, __assign({ value: hierarchyValue }, { children: children })));
    }
    else {
        return _jsx(_Fragment, { children: children });
    }
}
//# sourceMappingURL=sphere.js.map