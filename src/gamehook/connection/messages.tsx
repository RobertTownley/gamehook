import {
  Connection,
  EventListener,
  Message,
  MessageTypes,
  NewConnectionMessage,
  NewDisconnectionMessage,
} from "./types";

interface HandleMessage {
  connection: Connection;
  message: Message;
  listeners: Record<string, EventListener>;
}
export function handleMessage({
  connection,
  message,
  listeners,
}: HandleMessage) {
  if (message.eventName in listeners) {
    const callback = listeners[message.eventName];
    callback(message);
  } else if (message.eventName === MessageTypes.NEW_CLIENT_CONNECTED) {
    if (connection.connectionListener) {
      connection.connectionListener(message as unknown as NewConnectionMessage);
    }
  } else if (message.eventName === MessageTypes.NEW_CLIENT_DISCONNECTED) {
    if (connection.disconnectionListener) {
      connection.disconnectionListener(
        message as unknown as NewDisconnectionMessage
      );
    }
  } else {
    console.log("Unknown message");
    console.log(message);
  }
}
