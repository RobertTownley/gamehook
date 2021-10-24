import { GameMesh } from "../objects/types";

export interface Collision {
  self: GameMesh;
  target: GameMesh;
}
export type CollisionHandler = (collision: Collision) => void;

export const detectCollisions = () => {};
