import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import _ from "lodash";
import { useState } from "react";
import { Box, Light, Scene } from "../../gamehook";
var NUMBER_OF_BOXES = 50;
var positions = _.range(0, NUMBER_OF_BOXES).map(function (_i) { return ({
    x: _.random(-10, 10),
    y: _.random(-15, 10),
    z: _.random(-10, 10),
}); });
export function HoverExample() {
    var blue = 0x0000ff;
    var red = 0xff0000;
    var _a = useState(red), color = _a[0], setColor = _a[1];
    return (_jsxs(Scene, { children: [positions.map(function (p, i) { return (_jsx(Box, { rotation: { x: 0.01, y: 0.01, z: 0.01 }, position: p, onHoverLeave: function () { return setColor(red); }, onHoverEnter: function () { return setColor(blue); }, material: {
                    type: "standard",
                    color: color,
                } }, i)); }), _jsx(Light, { type: "ambient" })] }));
}
//# sourceMappingURL=hover.js.map