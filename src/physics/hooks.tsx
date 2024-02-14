import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { Physical } from "./types";

export function usePhysics(obj: THREE.Object3D, props: Physical) {
  useMovement(obj, props);
  useRotation(obj, props);
  useScale(obj, props);
}

const DEFAULT_POSITION = [0, 0, 0];
function useMovement(obj: THREE.Object3D, { position, velocity }: Physical) {
  const [x, y, z] = position ?? DEFAULT_POSITION;
  useEffect(() => {
    obj.position.set(x, y, z);
  }, [obj.position, x, y, z]);

  useEffect(() => {
    obj.userData["velocity"] = velocity;
  }, [obj, velocity]);
}

const DEFAULT_ORIENTATION = [0, 0, 0];
function useRotation(obj: THREE.Object3D, { orientation, rotation }: Physical) {
  const [x, y, z] = orientation ?? DEFAULT_ORIENTATION;
  const threeRotation = useMemo(() => {
    return [x, y, z];
  }, [x, y, z]);

  useEffect(() => {
    obj.rotation.x += threeRotation[0];
    obj.rotation.y += threeRotation[1];
    obj.rotation.z += threeRotation[2];
  }, [obj, threeRotation]);

  useEffect(() => {
    obj.userData["rotation"] = rotation;
  }, [obj, rotation]);
}

const DEFAULT_SCALE = [1, 1, 1];
function useScale(obj: THREE.Object3D, { scale, growth }: Physical) {
  const [x, y, z] = scale ?? DEFAULT_SCALE;
  useEffect(() => {
    obj.scale.setX(x);
  }, [obj, x]);
  useEffect(() => {
    obj.scale.setY(y);
  }, [obj, y]);
  useEffect(() => {
    obj.scale.setZ(z);
  }, [obj, z]);

  useEffect(() => {
    obj.userData["growth"] = growth;
  }, [obj, growth]);
}
