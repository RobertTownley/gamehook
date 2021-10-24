import _ from "lodash";
import * as THREE from "three";
import { isMesh } from "../objects/guards";

import { GameMesh } from "../objects/types";

export interface Collision {
  self: GameMesh;
  target: GameMesh;
}
export type CollisionHandler = (collision: Collision) => void;

export const detectCollisions = () => {
  // Form a list of collidable objects and the objects they can collide with
  const gameObjects = Object.values(_GAME.scene.gameObjects);
  const colliders = gameObjects
    .filter((o) => o.onCollision !== undefined)
    .filter((o) => isMesh(o.three)) as GameMesh[];
  const collidables = gameObjects
    .filter((o) => o.collides)
    .filter((o) => isMesh(o.three)) as GameMesh[];

  // For each collider, detect whether they have any active collisions
  colliders.forEach((c1: GameMesh) => {
    let collided = false;
    const c1center = getCenterPoint(c1);
    if (!c1center) return;

    const raycaster = new THREE.Raycaster(c1center);
    const dir = new THREE.Vector3();
    let c1vertices: THREE.Vector3[];
    const c1radius = c1.three.geometry.boundingSphere!.radius;

    collidables.forEach((c2: GameMesh) => {
      const c2center = getCenterPoint(c2);
      if (!c2center) return;
      const c2radius = c2.three.geometry.boundingSphere!.radius;

      // On first sweep, detect whether they're close enough to collide
      const centerDistance = c1radius + c2radius;
      if (c1center.distanceTo(c2center) > centerDistance) return;

      // Determine which object is smaller, and cast rays from that object.
      // This is because a smaller object is less likely to slip through
      // the cracks of intersection with a larger one
      if (c1radius >= c2radius) {
        // Lazily compute vertices for objects
        if (!c1vertices) {
          c1vertices = getVerticesForObject(c1);
        }
        c1vertices.forEach((vertex) => {
          raycaster.set(c1center, dir.subVectors(vertex, c1center).normalize());
          const intersections = raycaster.intersectObject(c2.three);
          if (intersections.length) {
            const collision: Collision = {
              self: c1,
              target: c2,
            };
            if (c1.onCollision) {
              c1.onCollision(collision);
            }
            collided = true;
            return;
          }
        });
      } else {
        getVerticesForObject(c2).forEach((vertex) => {
          raycaster.set(c2center, dir.subVectors(vertex, c2center).normalize());
          const intersections = raycaster.intersectObject(c1.three);
          if (intersections.length) {
            const collision: Collision = {
              self: c1,
              target: c2,
            };
            if (c1.onCollision) {
              c1.onCollision(collision);
            }
            collided = true;
            return;
          }
        });
      }
    });
    if (collided) {
      return;
    }
  });
};

const getCenterPoint = (gameMesh: GameMesh): THREE.Vector3 | undefined => {
  if (!isMesh(gameMesh.three)) return undefined;
  if (!gameMesh.three.geometry.boundingSphere) {
    gameMesh.three.geometry.computeBoundingSphere();
  }
  const { position } = gameMesh.three;
  return new THREE.Vector3(position.x, position.y, position.z);
};

const getVerticesForObject = (obj: GameMesh): THREE.Vector3[] => {
  const bufferVertices = obj.three.geometry.attributes.position.array;
  const vertices: THREE.Vector3[] = [];

  for (let i = 0; i < bufferVertices.length; i += 3) {
    vertices.push(
      new THREE.Vector3(
        bufferVertices[i] + obj.three.position.x ?? 0,
        bufferVertices[i + 1] + obj.three.position.y ?? 0,
        bufferVertices[i + 2] + obj.three.position.z ?? 0
      )
    );
  }
  return vertices;
};
