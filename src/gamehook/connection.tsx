import { useCallback, useEffect, useMemo, useState } from "react";

type EventEmitter = <T = object>(eventName: string, payload: T) => void;
type EventListener = (payload: any) => void;

interface Connection {
  emit: EventEmitter;
  listeners: Record<string, EventListener>;
  ws: WebSocket;
}

interface UseConnection {
  clientId: string;
  lobbyId: string;
}

interface Message {
  clientId: string;
  lobbyId: string;
  eventName: string;
  payload: any;
}

const PROD_URL = "ws://oyster-app-bpngv.ondigitalocean.app/connectionws";
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
        callback(message.payload);
      }
    };
    return () => {
      ws.onmessage = () => {};
    };
  }, [listeners, ws]);

  const connection = useMemo<Connection>(() => {
    return {
      emit,
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

  const receiveRemoteState = useCallback((payload: T) => {
    setState(payload);
  }, []);

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
