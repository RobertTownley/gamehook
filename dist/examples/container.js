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
import { Container, Scene, Sphere } from "../../gamehook";
export function ContainerExample() {
    var RED = 0xff0000;
    var BLUE = 0x0000ff;
    var _a = useState(RED), color = _a[0], setColor = _a[1];
    var handleClick = function () {
        setColor(function (c) { return (c === RED ? BLUE : RED); });
    };
    return (_jsx(Scene, { children: _jsxs(Container, __assign({ onClick: handleClick }, { children: [_jsx(Sphere, { position: { x: 3, y: 0, z: 0 }, material: {
                        type: "basic",
                        color: color,
                    } }), _jsx(Sphere, { position: { x: 7, y: 0, z: 0 }, material: {
                        type: "basic",
                        color: 0x0000ff,
                    } }), _jsx(Sphere, { position: { x: 5, y: 0, z: 0 }, material: {
                        type: "basic",
                        color: 0xff0000,
                    } })] })) }));
}
//# sourceMappingURL=container.js.map