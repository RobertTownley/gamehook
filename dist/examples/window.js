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
import { Box, Scene } from "../../gamehook";
export function WindowExample() {
    return (_jsxs("div", __assign({ style: { display: "flex", flexWrap: "wrap" }, id: "foobar" }, { children: [_jsx(Scene, __assign({ width: "75%" }, { children: _jsx(Box, { rotation: { x: 0.0025, y: 0.0025, z: 0 }, width: 7, height: 7, depth: 7 }) })), _jsx(Scene, __assign({ width: "25%" }, { children: _jsx(Box, { rotation: { x: 0.0025, y: 0.0025, z: 0 }, width: 7, height: 7, depth: 7 }) })), _jsx(Scene, __assign({ width: "25%" }, { children: _jsx(Box, { rotation: { x: 0.0025, y: 0.0025, z: 0 }, width: 2, height: 2, depth: 2 }) })), _jsx(Scene, __assign({ width: "25%", antialias: false }, { children: _jsx(Box, { rotation: { x: 0.0025, y: 0.0025, z: 0 }, width: 2, height: 2, depth: 2 }) })), _jsx(Scene, __assign({ width: "25%" }, { children: _jsx(Box, { rotation: { x: 0.025, y: 0.025, z: 0 }, width: 2, height: 2, depth: 2 }) })), _jsx(Scene, __assign({ width: "25vw" }, { children: _jsx(Box, { rotation: { x: 0.0025, y: 0.0025, z: 0 }, width: 2, height: 2, depth: 2 }) }))] })));
}
//# sourceMappingURL=window.js.map