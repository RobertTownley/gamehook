import * as THREE from "three";
declare type MouseHandler = (event: MouseEvent) => void;
declare type KeyboardHandler = (event: KeyboardEvent) => void;
interface KeyboardInteractable {
    onKeyDown?: KeyboardHandler;
    onKeyPress?: KeyboardHandler;
    onKeyUp?: KeyboardHandler;
}
export declare const handleKeyboardEvent: (event: KeyboardEvent) => void;
interface MouseInteractable {
    onClick?: MouseHandler;
}
export declare const handleMouseEvent: (event: MouseEvent) => void;
export declare const getMouseVectorForEvent: (event: MouseEvent) => THREE.Vector2;
export interface Interactable extends KeyboardInteractable, MouseInteractable {
}
export {};
