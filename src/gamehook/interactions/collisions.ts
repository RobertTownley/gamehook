import { GameObject } from "../objects/types";

type CollisionResolver = (other: GameObject) => void;
type Collides = (other: GameObject) => boolean;

export interface Collidable {
  triggersCollisions?: boolean | Collides;
  onCollision?: CollisionResolver;
}
export const detectCollisions = () => {
  console.log("Detecting collisions");
};
