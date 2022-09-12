import { Mesh } from "./mesh";
declare type EventEmitter = <T = object>(eventName: string, payload: T) => void;
declare type EventListener = (message: Message) => void;
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
export declare function useConnection({ clientId, lobbyId, }: UseConnection): Connection;
export declare function useSharedState<T>(id: string, connection: Connection, initialValue: T): [T, (payload: T) => void];
declare type NetworkableProperty = "position" | "orientation";
export interface Networkable {
    syncProperties?: {
        connection: Connection;
        properties: NetworkableProperty[];
        frequency: number;
        id: string;
    };
}
export declare function useSyncProperties(mesh: Mesh, props: Networkable): void;
export {};
