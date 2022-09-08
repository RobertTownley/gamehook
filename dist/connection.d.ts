declare type EventEmitter = <T = object>(eventName: string, payload: T) => void;
declare type EventListener = (payload: any) => void;
interface Connection {
    emit: EventEmitter;
    listeners: Record<string, EventListener>;
    ws: WebSocket;
}
interface UseConnection {
    clientId: string;
    lobbyId: string;
}
export declare function useConnection({ clientId, lobbyId, }: UseConnection): Connection;
export declare function useSharedState<T>(id: string, connection: Connection, initialValue: T): [T, (payload: T) => void];
export {};
