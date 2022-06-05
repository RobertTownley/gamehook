import { useEffect, useMemo, useLayoutEffect } from "react";
import { Mesh } from "../mesh";

import { normalizeXYZ } from "./utils";
import { Physical, XYZ } from "./types";
import { GameCamera } from "../camera";
import { GameLight } from "../lights";

export function usePosition(mesh: Mesh, position: XYZ | undefined) {
  // Set mesh position
  const [x, y, z] = useMemo(() => normalizeXYZ(position), [position]);
  useLayoutEffect(() => {
    mesh.threeMesh.position.set(x, y, z);
  }, [mesh, x, y, z]);
}

export function usePhysics(
  mesh: Mesh,
  {
    acceleration,
    velocity,
    orientation,
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
  const [xOrientation, yOrientation, zOrientation] = useMemo(
    () => normalizeXYZ(orientation),
    [orientation]
  );
  useEffect(() => {
    mesh.threeMesh.rotation.set(xOrientation, yOrientation, zOrientation);
  }, [mesh, xOrientation, yOrientation, zOrientation]);
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

export function useCameraPhysics(
  camera: GameCamera,
  { acceleration, velocity, orientation, rotation }: Physical
) {
  useEffect(() => {
    camera.acceleration = acceleration;
  }, [camera, acceleration]);
  useEffect(() => {
    camera.velocity = velocity;
  }, [camera, velocity]);
  const [xOrientation, yOrientation, zOrientation] = useMemo(
    () => normalizeXYZ(orientation),
    [orientation]
  );
  useEffect(() => {
    camera.camera.rotation.set(xOrientation, yOrientation, zOrientation);
  }, [camera, xOrientation, yOrientation, zOrientation]);
  useEffect(() => {
    camera.rotation = normalizeXYZ(rotation);
  }, [camera, rotation]);
}

export function useLightPhysics(
  light: GameLight,
  { acceleration, velocity, orientation, rotation }: Physical
) {
  useEffect(() => {
    light.acceleration = acceleration;
  }, [light, acceleration]);
  useEffect(() => {
    light.velocity = velocity;
  }, [light, velocity]);
  const [xOrientation, yOrientation, zOrientation] = useMemo(
    () => normalizeXYZ(orientation),
    [orientation]
  );
  useEffect(() => {
    light.threeLight.rotation.set(xOrientation, yOrientation, zOrientation);
  }, [light, xOrientation, yOrientation, zOrientation]);
  useEffect(() => {
    light.rotation = normalizeXYZ(rotation);
  }, [light, rotation]);
}
