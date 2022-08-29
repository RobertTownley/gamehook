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
import { Box, Container, Scene, Text } from "../../gamehook";
export function ContainerExample() {
    var RED = 0xff0000;
    var BLUE = 0x0000ff;
    var _a = useState(RED), color = _a[0], setColor = _a[1];
    var handleClick = function () {
        setColor(function (c) { return (c === RED ? BLUE : RED); });
    };
    return (_jsxs(Scene, { children: [_jsxs(Container, __assign({ onClick: handleClick, onHoverEnter: function () { return setColor(RED); }, onHoverLeave: function () { return setColor(BLUE); } }, { children: [_jsx(Text, { position: { x: 2, y: 2, z: 0 }, value: "Hover Over Here", name: "MYTEXT", size: 0.4 }), _jsx(Text, { position: { x: 5, y: 5, z: 0 }, value: "Here too", size: 0.5, name: "MYTEXT" }), _jsx(Text, { position: { x: 5, y: -2, z: 0 }, value: "Anywhere in between", size: 0.5, name: "MYTEXT" })] })), _jsx(Box, { position: { x: 0, y: 0, z: 0 }, name: "MYBOX", material: { type: "basic", color: color } }), _jsx(Text, { position: { x: -5, y: -2, z: 0 }, value: "Not Here", size: 0.5, name: "MYTEXT" })] }));
}
//# sourceMappingURL=container.js.map