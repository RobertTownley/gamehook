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
import { Button, createTheme, Scene, Text } from "../../gamehook";
var theme = createTheme({
    colors: {
        primary: {
            base: 0x00aaff,
            light: 0x22ccff,
            dark: 0x264653,
        },
        text: {
            base: 0xe9c46a,
            light: 0xffd57b,
            dark: 0xe9c46a,
        },
    },
});
export function ButtonExample() {
    var _a = useState(false), showOther = _a[0], setShowOther = _a[1];
    var _b = useState(false), showFinal = _b[0], setShowFinal = _b[1];
    return (_jsxs(Scene, __assign({ theme: theme }, { children: [_jsx(Button, { position: { x: 0, y: 3, z: 0 }, onClick: function () { return setShowOther(!showOther); }, value: "I am a button" }), showOther && (_jsx(Button, { position: { x: 0, y: 0, z: 0 }, onClick: function () { return setShowFinal(!showFinal); }, value: "So am I" })), showFinal && (_jsx(Text, { position: { x: 0, y: -3, z: 0 }, onClick: function () { return setShowFinal(!showFinal); }, value: "I am not" }))] })));
}
//# sourceMappingURL=button.js.map