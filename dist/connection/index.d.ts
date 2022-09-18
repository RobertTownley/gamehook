import { Mesh } from "../mesh";
import { Connection, Message } from "./types";
interface UseConnection {
    clientId: string;
    lobbyId: string;
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
declare type SharedEventListener<T> = (message: Message<T>) => void;
interface SharedEvent<T> {
    emit: (payload: T) => void;
    listen: (callback: SharedEventListener<T>) => void;
}
export declare function useSharedEvent<T = any>(id: string, connection: Connection): SharedEvent<T>;
export {};
