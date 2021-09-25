export type MouseEventHandler = (event: MouseEvent) => void;
export type KeyboardEventHandler = (event: KeyboardEvent) => void;

export type KeyboardEventType = "onKeyUp" | "onKeyDown";

export interface Interactable {
  onClick?: MouseEventHandler;
  onMouseMove?: MouseEventHandler;
  onMouseOver?: MouseEventHandler;
  onMouseOut?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseDown?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;

  onKeyDown?: KeyboardEventHandler;
  onKeyUp?: KeyboardEventHandler;
}

export interface EventHandlerMap {
  onClick: MouseEventHandler;
  onMouseMove: MouseEventHandler;
  onMouseOver: MouseEventHandler;
  onMouseOut: MouseEventHandler;
  onMouseUp: MouseEventHandler;
  onMouseDown: MouseEventHandler;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;

  onKeyDown: KeyboardEventHandler;
  onKeyUp: KeyboardEventHandler;
}
