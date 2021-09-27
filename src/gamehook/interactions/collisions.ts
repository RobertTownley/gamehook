import * as THREE from "three";
import _ from "lodash";
import { GameObject } from "../objects/types";

import { getVerticesForObject } from "./utils";
import { createObjectLiteral } from "typescript";

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
  edgeDetection?: boolean;
  method: "sample" | "exact";
}
const COLLISION_DISTANCE = 0.025;
const SAMPLE_SIZE = 50;
export const detectCollision = ({
  collider,
  collidables,
  edgeDetection = true,
  method,
}: DetectCollisionParams): GameObject | undefined => {
  const { geometry, position } = collider.obj;
  if (!geometry.boundingSphere) return;

  const colliderCenter = new THREE.Vector3(position.x, position.y, position.z);
  const colliderSampleVertices =
    method === "sample"
      ? _.sampleSize(getVerticesForObject(collider.obj), SAMPLE_SIZE)
      : getVerticesForObject(collider.obj);

  if (edgeDetection) {
    // For each consecutive pairing of vertices, append a list of intermediate
    // positions along the edge to act as a collision detection vertex
    // const vertices = [...colliderSampleVertices];
    /*
    vertices.forEach((v1, index) => {
      const v2 = colliderSampleVertices[index + 1];
      if (!v2) return;

      const vDistance = v1.distanceTo(v2);
      const edgeSamples = Math.floor(vDistance / COLLISION_DISTANCE);
      if (edgeSamples < 1) return;
      _.range(0, edgeSamples).forEach((x) => {
        const delta = vDistance / x;
        colliderSampleVertices.push(
          new THREE.Vector3(
            v1.x + delta * (v1.x - v2.x),
            v1.y + delta * (v1.y - v2.y),
            v1.z + delta * (v1.z - v2.z)
          )
        );
      });
    });
    */
  }

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

    // Then, detect if there are overlapping edges
    // TODO: This is probably not accurate angle detection
    const colSampleVertices =
      method === "sample"
        ? _.sampleSize(getVerticesForObject(collidable.obj), SAMPLE_SIZE)
        : getVerticesForObject(collidable.obj);

    for (let i = 0; i < colliderSampleVertices.length; i++) {
      const p = colliderSampleVertices[i];
      const q = colliderSampleVertices[i + 1] || colliderSampleVertices[0];
      const pq = new THREE.Vector3(q.x - p.x, q.y - p.y, q.z - p.z);
      for (const r of colSampleVertices) {
        const pr = new THREE.Vector3(r.x - p.x, r.y - p.y, r.z - p.z);
        if (pq.angleTo(pr) < COLLISION_DISTANCE) {
          return collidable;
        }
      }
    }
  }
};
