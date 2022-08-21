interface GameEvent<T> {
    name: string;
    emit: (data: T) => void;
    listeners: {
        id: string;
        callback: (data: T) => void;
    }[];
    removeListener: (id: string) => void;
}
export declare function createEvent<T>(eventName: string): GameEvent<T>;
export declare function useEventListener<T>(event: GameEvent<T>, callback: (data: T) => void): void;
export {};
