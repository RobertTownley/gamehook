import { Acceleration, Velocity } from "../objects/types";
import { CollisionHandler } from "./collisions";

export interface Physical {
  // Movement
  acceleration?: Acceleration;
  velocity?: Velocity;

  // Collision
  collides?: boolean;
  onCollision?: CollisionHandler;
}
