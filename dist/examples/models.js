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
import { useState } from "react";
import { Animation, Camera, deg, Light, Model, Scene, Text, } from "../../gamehook";
function Dragon() {
    return (_jsx(Model, __assign({ filepath: "/resources/dragon/scene.gltf", id: "dragon", orientation: { x: 0, y: deg(270), z: 0 }, position: { x: 250, y: 0, z: 600 } }, { children: _jsx(Animation, { name: "Object_0", loop: true }) })));
}
function Phoenix(_a) {
    var growth = _a.growth;
    return (_jsx(Model, __assign({ filepath: "/resources/phoenix/scene.gltf", id: "phoenix", scale: { x: 0.2, y: 0.2, z: 0.2 }, growth: growth, rotation: { x: 0, y: 0.01, z: 0 }, position: { x: -250, y: 0, z: 0 } }, { children: _jsx(Animation, { name: "Take 001", loop: true }) })));
}
export function ModelExample() {
    var _a = useState([0, 0, 0]), growth = _a[0], setGrowth = _a[1];
    var handleClick = function () {
        setGrowth([0.01, 0.01, 0.01]);
    };
    return (_jsxs(Scene, { children: [_jsx(Phoenix, { growth: growth }), _jsx(Dragon, {}), _jsx(Camera, { position: { x: 0, y: 0, z: 1200 } }), _jsx(Light, { type: "ambient" }), _jsx(Text, { value: "Click to make the bird grow", size: 100, position: { x: 0, y: -500, z: 0 }, onClick: handleClick })] }));
}
//# sourceMappingURL=models.js.map