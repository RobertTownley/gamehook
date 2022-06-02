import { Mesh } from "../mesh";

export type XYZArray = [number, number, number];
export type XYZObject = { x: number; y: number; z: number };

export type XYZ = XYZArray | XYZObject;
export type Collision = {
  collider: Mesh;
  collidedWith: Mesh;
  colliderLocation: XYZObject;
  collidedWithLocation: XYZObject;
};
export type CollisionQualifier = (mesh: Mesh) => boolean;
export type CollisionHandler = (collision: Collision) => void;

export interface Physical {
  // Location
  acceleration?: XYZ;
  position?: XYZ;
  velocity?: XYZ;

  // Rotation
  orientation?: XYZ;
  rotation?: XYZ;

  // Collision
  collides?: boolean; // If the object collides with everything
  collidesWith?: CollisionQualifier; // Callback to determine if two objects collide
  onCollision?: (collision: Collision) => void;
}
