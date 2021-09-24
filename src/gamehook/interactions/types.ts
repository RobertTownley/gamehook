export type MouseEventHandler = (event: MouseEvent) => void;

export interface Interactable {
  onClick?: MouseEventHandler;
  onMouseMove?: MouseEventHandler;
  onMouseOver?: MouseEventHandler;
  onMouseOut?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseDown?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
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
}
