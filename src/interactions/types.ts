import * as THREE from "three";

export interface InteractionEvent extends MouseEvent {
  intersection: THREE.Intersection;
}
type MouseHandler = (event: MouseEvent) => void;
type InteractionHandler = (event: InteractionEvent) => void;
type KeyHandler = (event: KeyboardEvent) => void;

export interface Interactable {
  onClick?: InteractionHandler;
  onHoverEnter?: MouseHandler;
  onHoverExit?: MouseHandler;
  onKeyDown?: KeyHandler;
}

export type InteractableEntry = [THREE.Object3D, MouseHandler];
type ObjectMap = Record<string, InteractableEntry>;
export interface InteractionStore {
  onClick: Record<string, [THREE.Object3D, InteractionHandler]>;
  onHoverEnter: ObjectMap;
  onHoverExit: ObjectMap;
}
