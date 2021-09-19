export type MouseEventHandler = (event: MouseEvent) => void;

export interface InteractionMap {
  onClick?: MouseEventHandler;
  onMouseMove?: MouseEventHandler;
  onMouseOver?: MouseEventHandler;
  onMouseOut?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseDown?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

export interface Interactable {
  interactions?: InteractionMap;
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
