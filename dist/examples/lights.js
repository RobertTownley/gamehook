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
import { Box, Camera, deg, Light, Plane, Scene } from "../../gamehook";
export function LightExample() {
    return (_jsxs(Scene, __assign({ castShadow: true }, { children: [_jsx(Plane, { position: { x: -1, y: -2, z: -1 }, width: 100, height: 100, material: { type: "standard", color: 0x555555 }, orientation: { x: 0, y: 0, z: 0 }, receiveShadow: true }), _jsx(Box, { position: { x: -3, y: 0, z: 2 }, rotation: { x: 0, y: 0, z: 0.01 }, material: { type: "standard", color: 0xff0000 }, castShadow: true }), _jsx(Box, { position: { x: 0, y: 0, z: 2 }, rotation: { x: 0.01, y: 0.01, z: 0.01 }, material: { type: "standard", color: 0x0000ff }, castShadow: true }), _jsx(Box, { position: { x: 3, y: 0, z: 2 }, rotation: { x: 0, y: 0.0, z: 0.01 }, material: { type: "standard", color: 0x00ff00 } }), _jsx(Light, { type: "point", position: { x: 0, y: 0, z: 5 }, castShadow: true }), _jsx(Camera, { orientation: { x: deg(60), y: 0, z: 0 }, position: { x: 0, y: -5, z: 5 } })] })));
}
//# sourceMappingURL=lights.js.map