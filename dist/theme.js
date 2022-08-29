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
import { createContext, useContext } from "react";
export var DefaultTheme = {
    colors: {
        primary: {
            base: 0x00aaff,
            light: 0x22ccff,
            dark: 0x0099dd,
        },
        text: {
            base: 0xdddddd,
            light: 0xffffff,
            dark: 0xbbbbbb,
        },
    },
};
export function createTheme(params) {
    return __assign(__assign({}, DefaultTheme), params);
}
export var ThemeContext = createContext(DefaultTheme);
export function ThemeProvider(_a) {
    var children = _a.children, theme = _a.theme;
    return (_jsx(ThemeContext.Provider, __assign({ value: theme !== null && theme !== void 0 ? theme : DefaultTheme }, { children: children })));
}
export function useTheme() {
    return useContext(ThemeContext);
}
//# sourceMappingURL=theme.js.map