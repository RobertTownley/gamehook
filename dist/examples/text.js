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
import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Scene, Text } from "../../gamehook";
export function TextExample() {
    return (_jsx(Scene, { children: _jsx(Text, __assign({ material: { type: "basic", color: 0x00aaff }, value: "Hello World!", height: 0, rotation: { x: 0, y: 0, z: 0.01 }, position: { x: 0, y: 0, z: -5 } }, { children: _jsx(Box, { position: { x: 0, y: 5, z: 0 }, rotation: { x: 0.0, y: 0.01, z: 0 }, width: 1, height: 1, depth: 15 }) })) }));
}
//# sourceMappingURL=text.js.map