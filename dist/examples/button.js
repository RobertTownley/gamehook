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
            light: 0xe9c46a,
            dark: 0xe9c46a,
        },
    },
});
export function ButtonExample() {
    return (_jsxs(Scene, __assign({ theme: theme }, { children: [_jsx(Button, { position: { x: 0, y: 2, z: 0 }, onClick: function () { return console.log("WHEE"); }, value: "Click me!" }), _jsx(Text, { value: "Don't click me", position: { x: 0, y: -2, z: 0 } })] })));
}
//# sourceMappingURL=button.js.map