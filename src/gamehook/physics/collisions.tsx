import { GameObject } from "../objects/types";

export interface Collision {
  self: GameObject;
  target: GameObject;
}
export type CollisionHandler = (collision: Collision) => void;
