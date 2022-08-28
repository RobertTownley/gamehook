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
import _ from "lodash";
import { useState } from "react";
import { Box, Container, Light, Scene, Text } from "../../gamehook";
var NUMBER_OF_BOXES = 50;
var positions = _.range(0, NUMBER_OF_BOXES).map(function (_i) { return ({
    x: _.random(-10, 10),
    y: _.random(-15, 0),
    z: _.random(-5, 10),
}); });
export function HoverExample() {
    var blue = 0x0000ff;
    var red = 0xff0000;
    var _a = useState(red), color = _a[0], setColor = _a[1];
    var handleHoverEnter = function () { return setColor(blue); };
    var handleHoverLeave = function () { return setColor(red); };
    var material = { type: "standard", color: color };
    return (_jsxs(Scene, { children: [_jsx(Container, __assign({ onHoverEnter: handleHoverEnter, onHoverLeave: handleHoverLeave }, { children: _jsx(Text, { value: "Hover Over Me", material: material, size: 1, position: { x: 0, y: 2, z: 0 } }) })), positions.map(function (p, i) { return (_jsx(Box, { rotation: { x: 0.0, y: 0.0, z: 0.01 }, position: p, onHoverLeave: handleHoverLeave, onHoverEnter: handleHoverEnter, material: {
                    type: "standard",
                    color: color,
                } }, i)); }), _jsx(Light, { type: "ambient" })] }));
}
//# sourceMappingURL=hover.js.map