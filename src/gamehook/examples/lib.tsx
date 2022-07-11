import { useLayoutEffect, useMemo, useState } from "react";

interface Peer {
  id: string;
}
export type ConnectionStatus = "pending" | "active" | "error";
interface Payload<T> {
  id: string;
  value: T;
}
interface ActiveConnection {
  emitUpdateToSharedState: <T>(payload: Payload<T>) => void;
  eventListeners: Record<string, object>;
  peers: Peer[];
  status: "active";
}
interface ErrorConnection {
  eventListeners: Record<string, object>;
  status: "error";
}
interface PendingConnection {
  eventListeners: Record<string, object>;
  status: "pending";
}
export type Connection = ActiveConnection | ErrorConnection | PendingConnection;

export function useConnection(): Connection {
  return {
    emitUpdateToSharedState: () => {},
    eventListeners: {},
    peers: [],
    status: "active",
  };
}
export function useSharedState<T>(
  connection: Connection,
  id: string,
  initialState: T
): [T, (t: T) => void] {
  const listeners = useMemo(() => {
    return connection.status === "active" ? connection.eventListeners : {};
  }, [connection.eventListeners, connection.status]);
  const [state, setState] = useState<T>(initialState);
  useLayoutEffect(() => {
    if (connection.status === "active") {
      listeners[id] = (value: T) => {
        // TODO: Rollback netcode or something that doesn't just blow away
        // existing state based on what the remote party says
        setState(value);
      };
    }
    return () => {
      if (connection.status === "active") {
        delete listeners[id];
      }
    };
  }, [connection.status, id, listeners]);

  const setSharedState = (value: T) => {
    // Update local state
    setState(value);
    // Update remote state
    if (connection.status === "active") {
      connection.emitUpdateToSharedState({
        id,
        value,
      });
    }
  };
  return [state, setSharedState];
}
