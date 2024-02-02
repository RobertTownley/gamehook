import * as THREE from "three";
type MouseHandler = (event: MouseEvent) => void;
type KeyHandler = (event: KeyboardEvent) => void;

export interface Interactable {
  onClick?: MouseHandler;
  onHoverEnter?: MouseHandler;
  onHoverExit?: MouseHandler;
  onKeyDown?: KeyHandler;
}

export type InteractableEntry = [THREE.Object3D, MouseHandler];
type ObjectMap = Record<string, InteractableEntry>;
export interface InteractionStore {
  onClick: ObjectMap;
  onHoverEnter: ObjectMap;
  onHoverExit: ObjectMap;
}
