import { Acceleration, Velocity } from "../objects/types";
import { CollisionHandler } from "./collisions";
export interface Physical {
    acceleration?: Acceleration;
    velocity?: Velocity;
    collides?: boolean;
    onCollision?: CollisionHandler;
}
