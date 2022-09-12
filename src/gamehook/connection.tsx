import { useCallback, useEffect, useMemo, useState } from "react";
import { Mesh } from "./mesh";

type EventEmitter = <T = object>(eventName: string, payload: T) => void;
type EventListener = (message: Message) => void;

interface Connection {
  emit: EventEmitter;
  isAuthoritative: boolean;
  listeners: Record<string, EventListener>;
  ws: WebSocket;
}

interface UseConnection {
  clientId: string;
  lobbyId: string;
}

interface Message<T = any> {
  clientId: string;
  lobbyId: string;
  eventName: string;
  payload: T;
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

  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(JSON.parse(event.data)) as unknown as Message;
      if (message.eventName in listeners) {
        const callback = listeners[message.eventName];
        callback(message);
      }
    };
    return () => {
      ws.onmessage = () => {};
    };
  }, [listeners, ws]);

  const connection = useMemo<Connection>(() => {
    return {
      emit,
      isAuthoritative: true, // TODO: Have server determine authoritative status
      listeners,
      ws,
    };
  }, [emit, listeners, ws]);

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
      setState(payload);
      connection.emit<T>(id, payload);
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
    const { x, y, z } = message.payload;
    mesh.position = message.payload;
    mesh.threeMesh.position.set(x, y, z);
  }
  mesh[property] = message.payload;
}
