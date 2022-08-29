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
import { useState } from "react";
import { Container } from "./container";
import { Text } from "./text";
import { useTheme } from "./theme";
export function Button(_a) {
    var onClick = _a.onClick, position = _a.position, value = _a.value;
    var theme = useTheme();
    var _b = theme.colors.text, base = _b.base, light = _b.light;
    var _c = useState(base), color = _c[0], setColor = _c[1];
    return (_jsx(Container, __assign({ onHoverEnter: function () { return setColor(light); }, onHoverLeave: function () { return setColor(base); }, onClick: onClick }, { children: _jsx(Text, { value: value, position: position, material: { type: "basic", color: color } }) })));
}
//# sourceMappingURL=button.js.map