export declare type MouseHandler = (event: MouseEvent) => void;
export declare type KeyboardHandler = (event: KeyboardEvent) => void;
interface MouseInteractable {
    onClick?: MouseHandler;
}
interface KeyboardInteractable {
    onKeyDown?: KeyboardHandler;
    onKeyUp?: KeyboardHandler;
    onKeyPress?: KeyboardHandler;
}
export declare const MouseEventTypeMap: Record<string, keyof MouseInteractable>;
export declare const KeyboardEventTypeMap: Record<string, keyof KeyboardInteractable>;
export interface Interactable {
    onClick?: (event: MouseEvent) => void;
    onHoverEnter?: (event?: MouseEvent) => void;
    onHoverLeave?: (event?: MouseEvent) => void;
    hoverState?: "active" | "inactive" | undefined;
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
    onKeyPress?: (event: KeyboardEvent) => void;
}
export {};
