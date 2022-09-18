import { useCallback, useEffect, useMemo, useState } from "react";
import { MessageTypes, } from "./types";
var PROD_URL = "wss://oyster-app-bpngv.ondigitalocean.app/connectionws";
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
    var connection = useMemo(function () {
        return {
            emit: emit,
            isAuthoritative: true,
            listeners: listeners,
            ws: ws,
            onNewConnection: function (callback) {
                this.connectionListener = callback;
            },
            onNewDisconnection: function (callback) {
                this.disconnectionListener = callback;
            },
        };
    }, [emit, listeners, ws]);
    useEffect(function () {
        ws.onmessage = function (event) {
            var message = JSON.parse(JSON.parse(event.data));
            if (message.clientId === clientId) {
                // NOOP
            }
            else if (message.eventName in listeners) {
                var callback = listeners[message.eventName];
                callback(message);
            }
            else if (message.eventName === MessageTypes.NEW_CLIENT_CONNECTED) {
                if (connection.connectionListener) {
                    connection.connectionListener(message);
                }
            }
            else if (message.eventName === MessageTypes.NEW_CLIENT_DISCONNECTED) {
                if (connection.disconnectionListener) {
                    connection.disconnectionListener(message);
                }
            }
            else {
                // Unknown message
            }
        };
        return function () {
            ws.onmessage = function () { };
        };
    }, [connection, listeners, clientId, ws]);
    return connection;
}
export function useSharedState(id, connection, initialValue) {
    var _a = useState(initialValue), state = _a[0], setState = _a[1];
    var receiveRemoteState = useCallback(function (message) {
        setState(message.payload);
    }, []);
    useEffect(function () {
        connection.listeners[id] = receiveRemoteState;
        return function () {
            delete connection.listeners[id];
        };
    }, [connection, id, receiveRemoteState]);
    var setSharedState = useCallback(function (payload) {
        connection.emit(id, payload);
        setState(payload);
    }, [connection, id]);
    return [state, setSharedState];
}
export function useSyncProperties(mesh, props) {
    useEffect(function () {
        var interval;
        if (props.syncProperties) {
            var _a = props.syncProperties, connection_1 = _a.connection, id_1 = _a.id, properties_1 = _a.properties, frequency = _a.frequency;
            // Listen for emitted updates to each property
            properties_1.forEach(function (property) {
                var listenerId = "".concat(id_1, "-").concat(property, "-listener");
                connection_1.listeners[listenerId] = function (message) {
                    setProperty(mesh, property, message);
                };
            });
            // If authoritative, emit updates to the event properties at the declared frequency
            if (connection_1.isAuthoritative) {
                interval = setInterval(function () {
                    properties_1.forEach(function (property) {
                        // TODO: Emit property state
                        var value = getValueFromMesh(mesh, property);
                        var listenerId = "".concat(id_1, "-").concat(property, "-listener");
                        connection_1.emit(listenerId, value);
                    });
                }, frequency);
            }
        }
        return function () {
            var _a;
            if (interval && ((_a = props.syncProperties) === null || _a === void 0 ? void 0 : _a.connection.isAuthoritative)) {
                clearInterval(interval);
                interval = undefined;
            }
        };
    }, [mesh, props.syncProperties]);
}
function getValueFromMesh(mesh, property) {
    if (property === "position") {
        return mesh.threeMesh.position;
    }
    else if (property === "orientation") {
        return mesh.orientation;
    }
    return mesh[property];
}
function setProperty(mesh, property, message) {
    // TODO: Message needs to be authorative, or two clients can make each other bounce around
    if (property === "position") {
        mesh.position = message.payload;
    }
    mesh[property] = message.payload;
}
export function useSharedEvent(id, connection) {
    var eventId = "shared-listener-".concat(id);
    var sharedEvent = useMemo(function () {
        return {
            emit: function (payload) { return connection.emit(eventId, payload); },
            listen: function (callback) { return (connection.listeners[eventId] = callback); },
        };
    }, [connection, eventId]);
    useEffect(function () {
        return function () {
            delete connection.listeners[eventId];
        };
    }, [connection.listeners, eventId]);
    return sharedEvent;
}
//# sourceMappingURL=index.js.map