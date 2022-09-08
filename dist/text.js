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
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useMemo } from "react";
import DefaultFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { createMaterial } from "./materials";
import { useMesh } from "./mesh/hooks";
import { HierarchyContext, useHierarchy } from "./hierarchy";
import { useTheme } from "./theme";
import { useContainer } from "./container";
var loader = new FontLoader();
function ProceduralText(props) {
    var theme = useTheme();
    var children = props.children, _a = props.font, font = _a === void 0 ? DefaultFont : _a, _b = props.computeOffset, computeOffset = _b === void 0 ? true : _b, value = props.value, _c = props.size, size = _c === void 0 ? 2 : _c, _d = props.height, height = _d === void 0 ? 0.01 : _d, _e = props.bevelOffset, bevelOffset = _e === void 0 ? 0 : _e, _f = props.bevelSegments, bevelSegments = _f === void 0 ? 0 : _f, material = props.material;
    var loadedFont = useMemo(function () {
        return loader.parse(font);
    }, [font]);
    var geometry = useMemo(function () {
        var geometry = new TextGeometry(value, {
            font: loadedFont,
            size: size,
            height: height,
            bevelOffset: bevelOffset,
            bevelSegments: bevelSegments,
        });
        geometry.computeBoundingBox();
        return geometry;
    }, [bevelOffset, bevelSegments, height, loadedFont, size, value]);
    // Material
    var threeMaterial = useMemo(function () {
        var opts = material !== null && material !== void 0 ? material : { type: "basic", color: theme.colors.text.base };
        return createMaterial(opts);
    }, [material, theme.colors.text.base]);
    var threeMesh = useMemo(function () {
        var threeMesh = new THREE.Mesh(geometry, threeMaterial);
        if (computeOffset) {
            threeMesh.geometry.computeBoundingBox();
            threeMesh.geometry.center();
        }
        return threeMesh;
    }, [computeOffset, geometry, threeMaterial]);
    var mesh = useMesh(__assign({ threeMesh: threeMesh }, props));
    var hierarchyValue = useHierarchy(children, mesh);
    useContainer(mesh.id, threeMesh, props.position);
    return (_jsx(HierarchyContext.Provider, __assign({ value: hierarchyValue }, { children: children })));
}
export function Text(props) {
    var _a = props.renderMethod, renderMethod = _a === void 0 ? "proceduralText" : _a;
    switch (renderMethod) {
        case "dom":
            // Not implemented
            return _jsx(_Fragment, {});
        default:
            // ProceduralText
            return _jsx(ProceduralText, __assign({}, props));
    }
}
//# sourceMappingURL=text.js.map