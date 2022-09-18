import { useCallback, useEffect, useMemo, useState } from "react";
import { Mesh } from "../mesh";

import {
  Connection,
  EventListener,
  MessageTypes,
  Message,
  NewConnectionMessage,
  NewDisconnectionMessage,
} from "./types";

/* Connections */

interface UseConnection {
  clientId: string;
  lobbyId: string;
}
const PROD_URL = "wss://oyster-app-bpngv.ondigitalocean.app/connectionws";
const DEV_URL = "ws://localhost:8000/connectionws";
const prod = true;

export function useConnection({
  clientId,
  lobbyId,
}: UseConnection): Connection {
  const ws = useMemo(() => {
    const queryParams = new URLSearchParams({
      clientId,
      lobbyId,
      notSoSecret: "pear2022",
    }).toString();
    const url = prod ? PROD_URL : DEV_URL;
    return new WebSocket(`${url}?${queryParams}`);
  }, [clientId, lobbyId]);

  const listeners = useMemo<Record<string, EventListener>>(() => ({}), []);

  const emit = useCallback(
    (eventName: string, payload: any) => {
      const data = JSON.stringify({ clientId, lobbyId, eventName, payload });
      ws.send(data);
    },
    [clientId, lobbyId, ws]
  );

  const connection = useMemo<Connection>(() => {
    return {
      emit,
      isAuthoritative: true, // TODO: Have server determine authoritative status
      listeners,
      ws,
      onNewConnection: function (callback) {
        this.connectionListener = callback;
      },
      onNewDisconnection: function (callback) {
        this.disconnectionListener = callback;
      },
    };
  }, [emit, listeners, ws]);

  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(JSON.parse(event.data)) as unknown as Message;
      if (message.clientId === clientId) {
        // NOOP
      } else if (message.eventName in listeners) {
        const callback = listeners[message.eventName];
        callback(message);
      } else if (message.eventName === MessageTypes.NEW_CLIENT_CONNECTED) {
        if (connection.connectionListener) {
          connection.connectionListener(
            message as unknown as NewConnectionMessage
          );
        }
      } else if (message.eventName === MessageTypes.NEW_CLIENT_DISCONNECTED) {
        if (connection.disconnectionListener) {
          connection.disconnectionListener(
            message as unknown as NewDisconnectionMessage
          );
        }
      } else {
        // Unknown message
      }
    };
    return () => {
      ws.onmessage = () => {};
    };
  }, [connection, listeners, clientId, ws]);

  return connection;
}

export function useSharedState<T>(
  id: string,
  connection: Connection,
  initialValue: T
): [T, (payload: T) => void] {
  const [state, setState] = useState<T>(initialValue);

  const receiveRemoteState = useCallback<(message: Message<T>) => void>(
    (message: Message<T>) => {
      const time = Date.now();
      console.log(time);
      setState(message.payload);
    },
    []
  );

  useEffect(() => {
    connection.listeners[id] = receiveRemoteState;
    return () => {
      delete connection.listeners[id];
    };
  }, [connection, id, receiveRemoteState]);

  const setSharedState = useCallback(
    (payload: T) => {
      const time = Date.now();
      console.log(time);
      connection.emit<T>(id, payload);
      setState(payload);
    },
    [connection, id]
  );

  return [state, setSharedState];
}

/* Sync object properties over a connection */
type NetworkableProperty = "position" | "orientation";
export interface Networkable {
  syncProperties?: {
    connection: Connection;
    properties: NetworkableProperty[];
    frequency: number;
    id: string;
  };
}

export function useSyncProperties(mesh: Mesh, props: Networkable) {
  useEffect(() => {
    let interval: NodeJS.Timer | undefined;

    if (props.syncProperties) {
      const { connection, id, properties, frequency } = props.syncProperties;

      // Listen for emitted updates to each property
      properties.forEach((property) => {
        const listenerId = `${id}-${property}-listener`;
        connection.listeners[listenerId] = (message: Message) => {
          setProperty(mesh, property, message);
        };
      });

      // If authoritative, emit updates to the event properties at the declared frequency
      if (connection.isAuthoritative) {
        interval = setInterval(() => {
          properties.forEach((property) => {
            // TODO: Emit property state
            const value = getValueFromMesh(mesh, property);
            const listenerId = `${id}-${property}-listener`;
            connection.emit(listenerId, value);
          });
        }, frequency);
      }
    }

    return () => {
      if (interval && props.syncProperties?.connection.isAuthoritative) {
        clearInterval(interval);
        interval = undefined;
      }
    };
  }, [mesh, props.syncProperties]);
}

function getValueFromMesh(mesh: Mesh, property: NetworkableProperty) {
  if (property === "position") {
    return mesh.threeMesh.position;
  } else if (property === "orientation") {
    return mesh.orientation;
  }
  return mesh[property];
}

function setProperty(
  mesh: Mesh,
  property: NetworkableProperty,
  message: Message
) {
  // TODO: Message needs to be authorative, or two clients can make each other bounce around
  if (property === "position") {
    mesh.position = message.payload;
  }
  mesh[property] = message.payload;
}

type SharedEventListener<T> = (message: Message<T>) => void;
interface SharedEvent<T> {
  emit: (payload: T) => void;
  listen: (callback: SharedEventListener<T>) => void;
}

export function useSharedEvent<T = any>(
  id: string,
  connection: Connection
): SharedEvent<T> {
  const eventId = `shared-listener-${id}`;

  const sharedEvent = useMemo<SharedEvent<T>>(() => {
    return {
      emit: (payload: T) => connection.emit(eventId, payload),
      listen: (callback) => (connection.listeners[eventId] = callback),
    };
  }, [connection, eventId]);

  useEffect(() => {
    return () => {
      delete connection.listeners[eventId];
    };
  }, [connection.listeners, eventId]);
  return sharedEvent;
}
