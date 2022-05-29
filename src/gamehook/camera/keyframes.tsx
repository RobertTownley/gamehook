import * as THREE from "three";

import { Mesh } from "../mesh";
import { GameCamera } from "./types";
import { normalizeXYZ } from "../physics";

export function moveCamera(meshes: Record<string, Mesh>, camera: GameCamera) {
  if (camera.trackTo) {
    const objectToTrack = meshes[camera.trackTo];
    if (!objectToTrack) return;
    camera.camera.lookAt(objectToTrack.threeMesh.position);
  }
  if (camera.follow) {
    const objectToFollow = meshes[camera.follow];
    if (!objectToFollow || !objectToFollow.velocity) return;
    const xyz = normalizeXYZ(objectToFollow.velocity);
    const vector = new THREE.Vector3(...xyz);
    camera.camera.position.add(vector);
  }
}
