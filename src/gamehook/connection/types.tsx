/* Messages */
export enum MessageTypes {
  NEW_CLIENT_CONNECTED = "NEW_CLIENT_CONNECTED",
  NEW_CLIENT_DISCONNECTED = "NEW_CLIENT_DISCONNECTED",
}

export interface Message<T = any> {
  clientId: string;
  lobbyId: string;
  eventName: string;
  payload: T;
}

export interface NewConnectionMessage {
  clientId: string;
  isOwner: boolean;
  eventName: MessageTypes.NEW_CLIENT_CONNECTED;
}
export interface NewDisconnectionMessage {
  clientId: string;
  isOwner: boolean;
  eventName: MessageTypes.NEW_CLIENT_DISCONNECTED;
}

export type EventEmitter = <T = object>(eventName: string, payload: T) => void;
export type EventListener = (message: Message) => void;

/* Connections */
export interface Connection {
  emit: EventEmitter;
  isAuthoritative: boolean;
  listeners: Record<string, EventListener>;
  ws: WebSocket;

  connectionListener?: (message: NewConnectionMessage) => void;
  disconnectionListener?: (message: NewDisconnectionMessage) => void;

  onNewConnection: (callback: (message: NewConnectionMessage) => void) => void;
  onNewDisconnection: (
    callback: (message: NewDisconnectionMessage) => void
  ) => void;
}
