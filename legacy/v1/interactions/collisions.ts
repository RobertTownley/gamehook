import * as THREE from "three";
import _ from "lodash";
import { GameObject } from "../objects/types";

import { getVerticesForObject } from "./utils";

type Collision = {
  collider: GameObject;
  collided: GameObject;
};
export type CollisionResolver = (collision: Collision) => void;
type Collides = (other: GameObject) => boolean;

export interface Collidable {
  triggersCollisions?: boolean | Collides;
  onCollision?: CollisionResolver;
}

export const detectCollisions = () => {
  // TODO: Avoid this loop by having the scene object aware of whether
  // or not it contains collidable objects, updated on object add
  const objects: GameObject[] = Object.values(GAME.scene.objects);
  if (!objects.length) return;

  const colliders = objects.filter((o) => o.onCollision);
  if (!colliders) return;

  const collidables = objects.filter((o) => o.triggersCollisions);
  if (!collidables) return;

  colliders.forEach((c1) => {
    const method = "exact"; // TODO: Customize by object
    const collided = detectCollision({
      c1,
      collidables: collidables.filter((c) => c.id !== c1.id),
      method,
    });
    if (collided && c1.onCollision) {
      c1.onCollision({
        collider: c1,
        collided,
      });
    }
  });
};

interface DetectCollisionParams {
  c1: GameObject;
  collidables: GameObject[];
  method: "sample" | "exact";
}
const COLLISION_DISTANCE = 0.01;
const SAMPLE_SIZE = 10;
export const detectCollision = ({
  c1,
  collidables,
  method,
}: DetectCollisionParams): GameObject | undefined => {
  const c1center = getCenterPoint(c1);
  const c1vertices = getVerticesForObject(c1.obj);

  for (const c2 of collidables) {
    // First, detect if it's within the bounding box
    const c2center = getCenterPoint(c2);
    const biggerRadius = Math.min(
      c1.obj.geometry.boundingSphere.radius,
      c2.obj.geometry.boundingSphere.radius
    );
    const distance = c1center.distanceTo(c2center);
    if (distance > biggerRadius) continue;

    // Then, detect if there are overlapping edges
    const c2vertices = getVerticesForObject(c2.obj);

    for (let i = 0; i < c1vertices.length; i++) {
      const p = c1vertices[i];
      const q = c1vertices[i + 1] || c1vertices[0];
      for (const x of c2vertices) {
        const triangle = new THREE.Triangle(p, q, x);
        if (triangle.getArea() < COLLISION_DISTANCE) {
          console.log(triangle.getArea());
          return c2;
        }
        /*
        if (p.distanceTo(x) < COLLISION_DISTANCE) {
          return c2;
        }
        if (triangle.containsPoint(x)) {
          // debugger;
          return c2;
        }
        */
      }
    }
  }
};

const getCenterPoint = (gameObj: GameObject): THREE.Vector3 => {
  if (!gameObj.obj.geometry.boundingSphere) {
    gameObj.obj.geometry.computeBoundingSphere();
  }
  const { position } = gameObj.obj;
  return new THREE.Vector3(position.x, position.y, position.z);
};
