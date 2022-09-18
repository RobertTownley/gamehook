export type MouseHandler = (event: MouseEvent) => void;
export type KeyboardHandler = (event: KeyboardEvent) => void;

interface MouseInteractable {
  onClick?: MouseHandler;
}
interface KeyboardInteractable {
  onKeyDown?: KeyboardHandler;
  onKeyUp?: KeyboardHandler;
  onKeyPress?: KeyboardHandler;
}
export const MouseEventTypeMap: Record<string, keyof MouseInteractable> = {
  click: "onClick",
};
export const KeyboardEventTypeMap: Record<string, keyof KeyboardInteractable> =
  {
    keydown: "onKeyDown",
    keyup: "onKeyUp",
    keypress: "onKeyPress",
  };
export interface Interactable {
  onClick?: (event: MouseEvent) => void;
  onHoverEnter?: (event?: MouseEvent) => void;
  onHoverLeave?: (event?: MouseEvent) => void;

  hoverState?: "active" | "inactive" | undefined;

  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
}
