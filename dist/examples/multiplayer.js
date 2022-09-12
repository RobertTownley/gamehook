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
import { Box, Scene, useConnection, useSharedState, } from "../../gamehook";
export function MultiplayerExample() {
    var _a = useMemo(function () {
        var params = new URLSearchParams(window.location.search);
        var clientId = params.get("clientId");
        var lobbyId = params.get("lobbyId");
        return { clientId: clientId, lobbyId: lobbyId };
    }, []), clientId = _a.clientId, lobbyId = _a.lobbyId;
    if (!clientId || !lobbyId) {
        return _jsx("p", { children: "Please provide a URL that includes both clientId and lobbyId" });
    }
    return _jsx(Game, { clientId: clientId, lobbyId: lobbyId });
}
var INITIAL_VELOCITY = { x: 0, y: 0.1, z: 0 };
function Game(_a) {
    var clientId = _a.clientId, lobbyId = _a.lobbyId;
    var connection = useConnection({
        clientId: clientId,
        lobbyId: lobbyId,
    });
    var _b = useSharedState("cube-velocity", connection, { x: 0, y: 0, z: 0 }), velocity = _b[0], setVelocity = _b[1];
    return (_jsxs(_Fragment, { children: [_jsx("p", __assign({ style: { display: "fixed", top: 0 } }, { children: "Press a key to make the cube bounce" })), _jsx(Scene, { children: _jsx(Box, { acceleration: { x: 0, y: -0.002, z: 0 }, onKeypress: function () { return setVelocity(INITIAL_VELOCITY); }, id: "bouncing-box", syncProperties: {
                        connection: connection,
                        properties: ["position"],
                        id: "bouncing-box",
                        frequency: 500,
                    }, velocity: velocity }) })] }));
}
//# sourceMappingURL=multiplayer.js.map