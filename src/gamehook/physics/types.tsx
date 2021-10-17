import { Acceleration, Velocity } from "../objects/types";
import { CollisionHandler } from "./collisions";

export interface Physical {
  // Attributes
  acceleration?: Acceleration;
  velocity?: Velocity;

  // Handlers
  onCollision?: CollisionHandler;
}
