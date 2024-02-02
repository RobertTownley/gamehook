import * as THREE from "three";
type ClickHandler = () => void;

export interface Interactable {
  onClick?: ClickHandler;
  onHoverEnter?: ClickHandler;
  onHoverExit?: () => void;
}

export type InteractableEntry = [THREE.Object3D, ClickHandler];
type ObjectMap = Record<string, InteractableEntry>;
export interface InteractionStore {
  onClick: ObjectMap;
  onHoverEnter: ObjectMap;
  onHoverExit: ObjectMap;
}
