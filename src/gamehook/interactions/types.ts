type MouseHandler = (event: MouseEvent) => void;
type KeyboardHandler = (event: KeyboardEvent) => void;

interface MouseInteractable {
  onClick?: MouseHandler;
}
interface KeyboardInteractable {
  onKeypress?: KeyboardHandler;
}
export const MouseEventTypeMap: Record<string, keyof MouseInteractable> = {
  click: "onClick",
};
export const KeyboardEventTypeMap: Record<string, keyof KeyboardInteractable> =
  {
    keypress: "onKeypress",
  };
export interface Interactable {
  onClick?: (event: MouseEvent) => void;
  onKeypress?: (event: KeyboardEvent) => void;
}
