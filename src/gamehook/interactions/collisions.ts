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

  colliders.forEach((collider) => {
    const method = "sample"; // TODO: Customize by object
    const collided = detectCollision({
      collider,
      collidables: collidables.filter((c) => c.id !== collider.id),
      method,
    });
    if (collided && collider.onCollision) {
      collider.onCollision({
        collider,
        collided,
      });
    }
  });
};

interface DetectCollisionParams {
  collider: GameObject;
  collidables: GameObject[];
  method: "sample" | "exact";
}
const SAMPLE_SIZE = 10;
export const detectCollision = ({
  collider,
  collidables,
  method,
}: DetectCollisionParams): GameObject | undefined => {
  const { geometry, position } = collider.obj;
  if (!geometry.boundingSphere) return;

  const colliderCenter = new THREE.Vector3(position.x, position.y, position.z);
  const colliderSampleVertices =
    method === "sample"
      ? _.sampleSize(getVerticesForObject(collider.obj), SAMPLE_SIZE)
      : getVerticesForObject(collider.obj);

  for (const collidable of collidables) {
    // First, detect if it's within the bounding box
    const { geometry: colGeometry, position: colPosition } = collidable.obj;
    if (!colGeometry.boundingSphere) continue;
    const colCenter = new THREE.Vector3(
      colPosition.x,
      colPosition.y,
      colPosition.z
    );
    const biggerRadius = Math.min(
      geometry.boundingSphere.radius,
      colGeometry.boundingSphere.radius
    );
    const distance = colliderCenter.distanceTo(colCenter);
    if (distance > biggerRadius) continue;

    // Then, detect if there are overlapping edges
    const colSampleVertices =
      method === "sample"
        ? _.sampleSize(getVerticesForObject(collidable.obj), SAMPLE_SIZE)
        : getVerticesForObject(collidable.obj);

    for (let i = 0; i < colliderSampleVertices.length; i++) {
      const p = colliderSampleVertices[i];
      const q = colliderSampleVertices[i + 1] || colliderSampleVertices[0];
      const r = colliderSampleVertices[i + 2] || colliderSampleVertices[1];
      const triangle = new THREE.Triangle(p, q, r);
      for (const x of colSampleVertices) {
        if (triangle.containsPoint(x)) {
          return collidable;
        }
      }
    }
  }
};
