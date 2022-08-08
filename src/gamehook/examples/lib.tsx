import Peer, { DataConnection } from "peerjs";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

export type ConnectionStatus = "pending" | "active" | "error";
type EventEmitter = (channel: string, payload: any) => void;
interface Connection {
  addEventListener: (id: string, listener: (payload: any) => void) => void;
  connect: (id: string) => void;
  disconnect: (id: string) => void;
  emit: EventEmitter;
  eventListeners: Record<string, (payload: any) => void>;
  userId: string | undefined;
  localPeer: Peer | undefined;
  remoteConnections: Record<string, DataConnection>;
}

const connectionSettings = {
  host: "localhost",
  port: 9000,
  path: "/",
  debug: 2,
  metadata: {
    foo: "bar",
  },
};

interface UseConnectionParams {
  lobby: string;
  token: string;
  username: string;
}
interface ChannelPayload {
  channel: string;
  payload: any;
}
export function useConnection({
  lobby,
  token,
  username,
}: UseConnectionParams): Connection {
  // TODO: Expose error of user choosing non-unique username
  const [connections, setConnections] = useState<
    Record<string, DataConnection>
  >({});
  const [eventListeners, setEventListeners] = useState<Record<string, any>>({});
  const userId = `${lobby}_${username}`;
  const localPeer = useMemo(() => {
    return new Peer(userId, connectionSettings);
  }, [userId]);

  const handleDataPayload = useCallback(
    (data: ChannelPayload) => {
      const listener = eventListeners[data.channel];
      if (listener) {
        listener(data.payload);
      }
    },
    [eventListeners]
  );

  const connect = useCallback(
    (remote: string) => {
      if (!connections[remote]) {
        const dataConnection = localPeer.connect(remote);
        dataConnection.on("open", () => {
          connections[remote] = dataConnection;
          setConnections(connections);
          dataConnection.on("data", (data) => {
            handleDataPayload(data as unknown as ChannelPayload);
          });
        });
      }
    },
    [connections, handleDataPayload, localPeer]
  );

  localPeer.on("connection", (dataConnection) => {
    dataConnection.on("open", () => {
      connections[dataConnection.peer] = dataConnection;
      setConnections(connections);
      dataConnection.on("data", (data) => {
        handleDataPayload(data as unknown as ChannelPayload);
      });
    });
  });

  return {
    addEventListener: (id, listener) => {
      eventListeners[id] = listener;
      setEventListeners(eventListeners);
    },
    connect,
    disconnect: function (remoteId: string) {
      if (this.remoteConnections[remoteId]) {
        const conn = this.remoteConnections[remoteId];
        delete this.remoteConnections[remoteId];
        conn.close();
      }
    },
    emit: function (channel: string, payload: any) {
      Object.values(connections).forEach((c) => {
        c.send({
          channel,
          payload,
        });
      });
    },
    eventListeners,
    userId,
    localPeer,
    remoteConnections: {},
  };
}
export function useSharedState<T>(
  connection: Connection,
  id: string,
  initialState: T
): [T, (t: T) => void] {
  const listeners = useMemo(() => {
    return connection.eventListeners;
  }, [connection.eventListeners]);
  const [state, setState] = useState<T>(initialState);

  useLayoutEffect(() => {
    connection.eventListeners[id] = (payload) => {
      setState(payload);
    };
    return () => {
      delete connection.eventListeners[id];
    };
  }, [connection, id, listeners]);

  const setSharedState = (value: T) => {
    // Update local state
    setState(value);
    // Update remote state
    connection.emit(id, value);
  };
  return [state, setSharedState];
}
