import { KeyboardEventHandler, MouseEventHandler } from "react";

export interface Interactable {
  onClick?: MouseEventHandler;
  onKeyDown?: KeyboardEventHandler;
}
