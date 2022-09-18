import { MessageTypes, } from "./types";
export function handleMessage(_a) {
    var connection = _a.connection, message = _a.message, listeners = _a.listeners;
    if (message.eventName in listeners) {
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
        console.log("Unknown message");
        console.log(message);
    }
}
//# sourceMappingURL=messages.js.map