import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { Box, Scene, useConnection, useSharedEvent, } from "../../gamehook";
function Game(_a) {
    var clientId = _a.clientId, lobbyId = _a.lobbyId;
    var connection = useConnection({
        clientId: clientId,
        lobbyId: lobbyId,
    });
    var _b = useState({ x: 0, y: 0, z: 0 }), velocity = _b[0], setVelocity = _b[1];
    var interactionEvent = useSharedEvent("player-input", connection);
    var handleKeypress = useCallback(function (sendTime, remote) {
        var newX = velocity.x > 0 ? -0.05 : 0.05;
        var now = Date.now();
        setVelocity({ x: newX, y: 0, z: 0 });
        if (!remote) {
            interactionEvent.emit(now);
        }
        else {
            var duration = now - sendTime;
            console.log("Message took ".concat(duration, "ms to arrive"));
        }
    }, [interactionEvent, velocity.x]);
    interactionEvent.listen(function (message) { return handleKeypress(message.payload, true); });
    return (_jsx(_Fragment, { children: _jsx(Box, { id: "mycube", velocity: velocity, onKeypress: function () {
                var now = Date.now();
                handleKeypress(now, false);
            } }) }));
}
export function MultiplayerExample() {
    var params = new URLSearchParams(window.location.search);
    var clientId = params.get("user");
    var lobbyId = params.get("lobby");
    if (!clientId || !lobbyId) {
        return (_jsx("p", { children: "Please add your user and lobby to the URL search bar. Eg mysite.com?user=myname&lobby=mylobby" }));
    }
    return (_jsx(Scene, { children: _jsx(Game, { clientId: clientId, lobbyId: lobbyId }) }));
}
//# sourceMappingURL=multiplayer.js.map