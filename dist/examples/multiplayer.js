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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Box, Scene } from "../../gamehook";
import { useConnection, useSharedState } from "./lib";
export function MultiplayerExample() {
    var _a = useMemo(function () {
        var _a, _b;
        var params = new URLSearchParams(window.location.search);
        var clientId = (_a = params.get("clientId")) !== null && _a !== void 0 ? _a : "unknown";
        var lobbyId = (_b = params.get("lobbyId")) !== null && _b !== void 0 ? _b : "unknown";
        return { clientId: clientId, lobbyId: lobbyId };
    }, []), clientId = _a.clientId, lobbyId = _a.lobbyId;
    var connection = useConnection({
        clientId: clientId,
        lobbyId: lobbyId,
    });
    var _b = useSharedState("example-state", connection, { x: 0, y: 0, z: 0 }), exampleState = _b[0], setExampleState = _b[1];
    var handleClick = function () {
        setExampleState(__assign(__assign({}, exampleState), { x: exampleState.x + 1 }));
    };
    return (_jsxs(_Fragment, { children: [_jsx("p", { children: "Click the button to move the box" }), _jsx("button", __assign({ onClick: handleClick }, { children: "Click Me" })), _jsx(Scene, { children: _jsx(Box, { position: exampleState }) })] }));
}
//# sourceMappingURL=multiplayer.js.map