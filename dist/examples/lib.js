import { useCallback, useEffect, useMemo, useState } from "react";
var PROD_URL = "ws://oyster-app-bpngv.ondigitalocean.app/connectionws";
var DEV_URL = "ws://localhost:8000/connectionws";
var prod = true;
export function useConnection(_a) {
    var clientId = _a.clientId, lobbyId = _a.lobbyId;
    var ws = useMemo(function () {
        var queryParams = new URLSearchParams({
            clientId: clientId,
            lobbyId: lobbyId,
            notSoSecret: "pear2022",
        }).toString();
        var url = prod ? PROD_URL : DEV_URL;
        return new WebSocket("".concat(url, "?").concat(queryParams));
    }, [clientId, lobbyId]);
    var listeners = useMemo(function () { return ({}); }, []);
    var emit = useCallback(function (eventName, payload) {
        var data = JSON.stringify({ clientId: clientId, lobbyId: lobbyId, eventName: eventName, payload: payload });
        ws.send(data);
    }, [clientId, lobbyId, ws]);
    useEffect(function () {
        ws.onmessage = function (event) {
            var message = JSON.parse(JSON.parse(event.data));
            if (message.eventName in listeners) {
                var callback = listeners[message.eventName];
                callback(message.payload);
            }
        };
        return function () {
            ws.onmessage = function () { };
        };
    }, [listeners, ws]);
    var connection = useMemo(function () {
        return {
            emit: emit,
            listeners: listeners,
            ws: ws,
        };
    }, [emit, listeners, ws]);
    return connection;
}
export function useSharedState(id, connection, initialValue) {
    var _a = useState(initialValue), state = _a[0], setState = _a[1];
    var receiveRemoteState = useCallback(function (payload) {
        setState(payload);
    }, []);
    useEffect(function () {
        connection.listeners[id] = receiveRemoteState;
        return function () {
            delete connection.listeners[id];
        };
    }, [connection, id, receiveRemoteState]);
    var setSharedState = useCallback(function (payload) {
        setState(payload);
        connection.emit(id, payload);
    }, [connection, id]);
    return [state, setSharedState];
}
//# sourceMappingURL=lib.js.map