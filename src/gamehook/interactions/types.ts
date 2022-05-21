type MouseHandler = (event: MouseEvent) => void;
// type KeyboardHandler = (event: KeyboardEvent) => void;

interface MouseInteractable {
  onClick?: MouseHandler;
}
export const MouseEventTypeMap: Record<string, keyof MouseInteractable> = {
  click: "onClick",
};
export interface Interactable {
  onClick?: (event: MouseEvent) => void;
}
