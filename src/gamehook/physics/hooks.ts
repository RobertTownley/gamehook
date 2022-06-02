import { useEffect, useMemo, useLayoutEffect } from "react";
import { Mesh } from "../mesh";

import { normalizeXYZ } from "./utils";
import { Physical, XYZ } from "./types";

export function usePosition(
  mesh: Mesh,
  position: XYZ | undefined,
  computeOffset = false
) {
  // Set mesh position
  const [x, y, z] = useMemo(() => normalizeXYZ(position), [position]);
  console.log(computeOffset);
  useLayoutEffect(() => {
    let offset = {
      x: 0,
      y: 0,
      z: 0,
    };
    if (computeOffset) {
      const { geometry } = mesh.threeMesh;
      geometry.computeBoundingBox();
      if (geometry.boundingBox) {
        offset.x =
          0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        offset.y =
          0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);
        offset.z =
          0.5 * (geometry.boundingBox.max.z - geometry.boundingBox.min.z);
      }
    }
    mesh.threeMesh.position.set(x - offset.x, y - offset.y, z - offset.z);
  }, [mesh, x, y, z, computeOffset]);
}

export function usePhysics(
  mesh: Mesh,
  {
    acceleration,
    velocity,
    rotation,
    onCollision,
    collides,
    collidesWith,
  }: Physical
) {
  // Physics
  useEffect(() => {
    mesh.acceleration = acceleration;
  }, [mesh, acceleration]);
  useEffect(() => {
    mesh.velocity = velocity;
  }, [mesh, velocity]);
  useEffect(() => {
    mesh.rotation = normalizeXYZ(rotation);
  }, [mesh, rotation]);
  useEffect(() => {
    mesh.onCollision = onCollision;
  }, [mesh, onCollision]);
  useEffect(() => {
    mesh.collides = collides;
    mesh.collidesWith = collidesWith;
  }, [mesh, collides, collidesWith]);
}
