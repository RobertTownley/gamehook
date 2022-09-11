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
import _ from "lodash";
import { useState } from "react";
import { Box, Sphere, Scene } from "../../gamehook";
var numberOfSpheres = 1000;
var positions = _.range(0, numberOfSpheres).map(function (_i) {
    return [
        _.random(-30, 30, true),
        _.random(-30, 30, true),
        _.random(-30, 30, true),
    ];
});
export function ParentsExample() {
    var red = 0xff0000;
    var green = 0x00ff00;
    var _a = useState(red), color = _a[0], setColor = _a[1];
    var handleClick = function () { return setColor(color === red ? green : red); };
    return (_jsx(Scene, { children: _jsx(Box, __assign({ rotation: { x: 0.004, y: 0.004, z: 0.002 }, onClick: handleClick }, { children: positions.map(function (position, i) { return (_jsx(Sphere, { material: { type: "basic", color: color }, position: position, radius: 0.1, heightSegments: 8, widthSegments: 8 }, i)); }) })) }));
}
//# sourceMappingURL=parents.js.map