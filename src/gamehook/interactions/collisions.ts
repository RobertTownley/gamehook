import * as THREE from "three";
import _ from "lodash";
import { GameObject } from "../objects/types";

import { getVerticesForObject } from "./utils";

type CollisionResolverParams = {
  collider: GameObject;
  collided: GameObject;
};
export type CollisionResolver = ({
  collider,
  collided,
}: CollisionResolverParams) => void;
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
const COLLISION_DISTANCE = 0.025;
const SAMPLE_SIZE = 50;
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
    const bothRadiuses =
      geometry.boundingSphere.radius + colGeometry.boundingSphere.radius;
    const distance = colliderCenter.distanceTo(colCenter);
    if (distance > bothRadiuses) continue;

    // Then, detect if there are overlapping vectors
    const colSampleVertices =
      method === "sample"
        ? _.sampleSize(getVerticesForObject(collidable.obj), SAMPLE_SIZE)
        : getVerticesForObject(collidable.obj);
    for (const v1 of colliderSampleVertices) {
      for (const s1 of colSampleVertices) {
        if (v1.distanceTo(s1) < COLLISION_DISTANCE) {
          return collidable;
        }
      }
    }

    // Finally, do edge detectCollision
    // TODO: This is not really good edge detection. Make it better
    let edgeCollision: GameObject | undefined = undefined;
    colliderSampleVertices.forEach((v1, v1index) => {
      const v2 = colliderSampleVertices[v1index + 1];
      if (!v2) return;

      colSampleVertices.forEach((s1, s1index) => {
        const s2 = colSampleVertices[s1index + 1];
        if (!s2) return;

        // Generate a random point along the edge created by
        // two sets of vertices and check if the two random
        // points are within the collision distance
        const vNew = new THREE.Vector3(
          v1.x + Math.random() * Math.abs(v1.x - v2.x),
          v1.y + Math.random() * Math.abs(v1.y - v2.y),
          v1.z + Math.random() * Math.abs(v1.z - v2.z)
        );
        const sNew = new THREE.Vector3(
          s1.x + Math.random() * Math.abs(s1.x - s2.x),
          s1.y + Math.random() * Math.abs(s1.y - s2.y),
          s1.z + Math.random() * Math.abs(s1.z - s2.z)
        );
        if (vNew.distanceTo(sNew) < COLLISION_DISTANCE) {
          edgeCollision = collidable;
        }
      });
    });
    return edgeCollision;
  }
};
