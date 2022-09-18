import { Connection, EventListener, Message } from "./types";
interface HandleMessage {
    connection: Connection;
    message: Message;
    listeners: Record<string, EventListener>;
}
export declare function handleMessage({ connection, message, listeners, }: HandleMessage): void;
export {};
