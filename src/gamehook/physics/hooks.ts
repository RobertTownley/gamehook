import { useEffect, useMemo, useLayoutEffect } from "react";
import { Mesh } from "../mesh";

import { normalizeXYZ } from "./utils";
import { Physical, XYZ } from "./types";
import { GameCamera } from "../camera";
import { GameLight } from "../lights";
import { LoadedGameModel } from "../models";

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

    castShadow,
    receiveShadow,
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
  useEffect(() => {
    mesh.castShadow = castShadow;
    mesh.threeMesh.castShadow = castShadow ?? false;
  }, [mesh, castShadow]);
  useEffect(() => {
    mesh.receiveShadow = receiveShadow;
    mesh.threeMesh.receiveShadow = receiveShadow ?? false;
  }, [mesh, receiveShadow]);
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
  { acceleration, castShadow, velocity, orientation, rotation }: Physical
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
  useEffect(() => {
    light.castShadow = castShadow;
    light.threeLight.castShadow = castShadow ?? false;
  }, [light, castShadow]);
}

export function useModelPhysics(
  model: LoadedGameModel,
  { acceleration, position, velocity, orientation, rotation }: Physical
) {
  useEffect(() => {
    if (model.status === "loaded") {
      model.acceleration = acceleration;
    }
  }, [model, acceleration]);
  useEffect(() => {
    if (model.status === "loaded") {
      model.velocity = velocity;
    }
  }, [model, velocity]);
  const [posX, posY, posZ] = useMemo(() => {
    return normalizeXYZ(position);
  }, [position]);
  useEffect(() => {
    model.position = [posX, posY, posZ];
    model.gltf.scene.position.set(posX, posY, posZ);
  }, [model, posX, posY, posZ]);
  useEffect(() => {
    if (model.status === "loaded") {
      model.rotation = rotation;
    }
  }, [model, rotation]);
  useEffect(() => {
    if (model.status === "loaded") {
      model.orientation = orientation;
    }
  }, [model, orientation]);
}
