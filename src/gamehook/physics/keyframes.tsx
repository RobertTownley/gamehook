import * as THREE from "three";

import { Mesh } from "../mesh";
import { normalizeXYZ } from "./utils";
import { isXYZArray } from "./guards";

export function accelerateObjects(meshes: Record<string, Mesh>) {
  Object.values(meshes).forEach((mesh) => {
    if (!mesh.acceleration) return;
    const a = normalizeXYZ(mesh.acceleration);
    if (!mesh.velocity) {
      mesh.velocity = [0, 0, 0];
    }
    if (isXYZArray(mesh.velocity)) {
      mesh.velocity[0] += a[0];
      mesh.velocity[1] += a[1];
      mesh.velocity[2] += a[2];
    } else {
      mesh.velocity.x += a[0];
      mesh.velocity.y += a[1];
      mesh.velocity.z += a[2];
    }
  });
}

export function moveObjects(meshes: Record<string, Mesh>) {
  Object.values(meshes).forEach((mesh) => {
    if (!mesh.velocity) return;
    const v = normalizeXYZ(mesh.velocity);
    mesh.threeMesh.position.x += v[0];
    mesh.threeMesh.position.y += v[1];
    mesh.threeMesh.position.z += v[2];
  });
}
export function rotateObjects(meshes: Record<string, Mesh>) {
  Object.values(meshes).forEach((mesh) => {
    if (!mesh.rotation) return;
    const r = normalizeXYZ(mesh.rotation);
    mesh.threeMesh.rotation.x += r[0];
    mesh.threeMesh.rotation.y += r[1];
    mesh.threeMesh.rotation.z += r[2];
  });
}

function getVertexesForObject({ threeMesh }: Mesh): THREE.Vector3[] {
  const bufferVertices = threeMesh.geometry.attributes.position.array;
  const vertices: THREE.Vector3[] = [];

  for (let i = 0; i < bufferVertices.length; i += 3) {
    vertices.push(
      new THREE.Vector3(
        bufferVertices[i] + threeMesh.position.x ?? 0,
        bufferVertices[i + 1] + threeMesh.position.y ?? 0,
        bufferVertices[i + 2] + threeMesh.position.z ?? 0
      )
    );
  }
  return vertices;
}

export function detectCollisions(meshes: Record<string, Mesh>) {
  const meshList = Object.values(meshes);
  const collisionTargets = meshList.filter((m) => m.collides || m.collidesWith);
  const collisionSources = meshList.filter((m) => m.onCollision);
  if (!collisionSources.length || !collisionTargets.length) return;

  collisionSources.forEach((source) => {
    // Get a filtered list of eligible targets
    const targets = collisionTargets.filter((t) => {
      return t.collides || (t.collidesWith && t.collidesWith(source));
    });
    if (!targets.length) return;

    // Get a smaller list of all objects close enough to collide with
    if (!source.threeMesh.geometry.boundingSphere) {
      source.threeMesh.geometry.computeBoundingSphere();
    }
    const sRadius = source.threeMesh.geometry.boundingSphere!.radius;
    const proximateTargets = targets.filter((t) => {
      if (!t.threeMesh.geometry.boundingSphere) {
        t.threeMesh.geometry.computeBoundingSphere();
      }
      const tRadius = t.threeMesh.geometry.boundingSphere!.radius;
      const maxCollisionDistance = sRadius + tRadius;
      return (
        source.threeMesh.position.distanceTo(t.threeMesh.position) <
        maxCollisionDistance
      );
    });
    if (!proximateTargets.length) return;

    // Determine if any of the objects in the collision list have collided
    for (const t of proximateTargets) {
      const colliding = determineIfColliding(source, t);
      if (colliding) {
        const handler = source.onCollision;
        if (handler) {
          handler({
            collider: source,
            collidedWith: t,
            colliderLocation: source.threeMesh.position,
            collidedWithLocation: t.threeMesh.position,
          });
        }
      }
    }
  });
}

function determineIfColliding(
  mesh1: Mesh,
  mesh2: Mesh,
  threshold = 0.01
): boolean {
  const mesh1Vertexes = getVertexesForObject(mesh1);
  const mesh2Vertexes = getVertexesForObject(mesh2);
  for (const v1 of mesh1Vertexes) {
    for (const v2 of mesh2Vertexes) {
      const v2Index = mesh2Vertexes.indexOf(v2);
      if (v2Index < mesh2Vertexes.length) {
        const v3 = mesh2Vertexes[v2Index + 1];
        const triangle = new THREE.Triangle(v1, v2, v3);
        if (triangle.getArea() < threshold) {
          return true;
        }
      }
    }
  }
  return false;
}