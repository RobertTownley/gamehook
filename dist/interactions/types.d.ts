declare type MouseHandler = (event: MouseEvent) => void;
declare type KeyboardHandler = (event: KeyboardEvent) => void;
interface MouseInteractable {
    onClick?: MouseHandler;
}
interface KeyboardInteractable {
    onKeypress?: KeyboardHandler;
}
export declare const MouseEventTypeMap: Record<string, keyof MouseInteractable>;
export declare const KeyboardEventTypeMap: Record<string, keyof KeyboardInteractable>;
export interface Interactable {
    onClick?: (event: MouseEvent) => void;
    onKeypress?: (event: KeyboardEvent) => void;
    onHoverEnter?: (event?: MouseEvent) => void;
    onHoverLeave?: (event?: MouseEvent) => void;
    hoverState?: "active" | "inactive" | undefined;
}
export {};
