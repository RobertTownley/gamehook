import * as THREE from "three";
import _, { sampleSize } from "lodash";
import { GameObject } from "../objects/types";

import { getVerticesForObject } from "./utils";

type CollisionResolver = (other: GameObject) => void;
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
      collidables,
      method,
    });
    if (collided && collider.onCollision) {
      collider.onCollision(collided);
    }
  });
};

interface DetectCollisionParams {
  collider: GameObject;
  collidables: GameObject[];
  method: "sample" | "exact";
}
const COLLISION_DISTANCE = 0.025;
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
      ? _.sampleSize(getVerticesForObject(collider.obj), 10)
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
        ? _.sampleSize(getVerticesForObject(collidable.obj), 10)
        : getVerticesForObject(collidable.obj);
    for (const v1 of colliderSampleVertices) {
      for (const v2 of colSampleVertices) {
        if (v1.distanceTo(v2) < COLLISION_DISTANCE) {
          return collidable;
        }
      }
    }
  }

  /*
  const colliderVertices = _.sampleSize(collection);

  for (const collidable of collidables) {
    const { boundingSphere } = collidable.obj.geometry;
    if (!boundingSphere) continue;
    const { center, radius } = boundingSphere;
    const centerVector = new THREE.Vector3(center.x, center.y, center.z);
    const distance = colliderCenterVector.distanceTo(centerVector);
    const radialDistance = colliderSphere.radius + radius;
    if (_.random(0, 1000) === 1) {
      console.log({
        collider,
        collidable,
      });
    }

    /*
    /*
    if (!collidable.obj.geometry.boundingSphere) {
        console.log(collidable);
      }
      */
  // const { center, radius } = collidable.obj.geometry.boundingSphere;
  /*
  if (method !== "sample") {
    throw new Error("Non-sample methods for detection not yet supported");
  }
  const sampleSize = 10;
  const colliderSamples = _.sampleSize(
    getVerticesForObject(collider.obj),
    sampleSize
  );

  for (const collidable of collidables) {
    const collidableSamples = _.sampleSize(
      getVerticesForObject(collidable.obj),
      sampleSize
    );

    for (const colliderSample of colliderSamples) {
      for (const collidableSample of collidableSamples) {
        const distance = colliderSample.distanceTo(collidableSample);
        if (_.random(1, 5000) === 1) {
          console.log(collidable);
          console.log(distance);
        }
      }
    }
  }

  /*
  const vertices = getVerticesForObject(collider.obj);

  // Choose vertices to ray trace against, rather than test every vertex
  const sampleSize = 10;
  const samples = _.sampleSize(vertices, sampleSize);

  for (const collidable of collidables) {
    console.log({ Distance: collider.obj.distanceTo(collidable.obj) });
  }

  /*
  // Iterate through collidable objects and detect collision
  for (const collidable of collidables) {
    const collidableVertices = getVerticesForObject(collidable.obj);
    const collidableSamples = _.sampleSize(collidableVertices, sampleSize);
    for (const sample of samples) {
      for (const collidableSample of collidableSamples) {
        if (sample.distanceTo(collidableSample) < COLLISION_DISTANCE) {
          return collidable;
        }
      }
    }
  }
  */
};
