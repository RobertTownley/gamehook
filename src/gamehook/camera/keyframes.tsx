import * as THREE from "three";

import { Mesh } from "../mesh";
import { GameCamera } from "./types";
import { normalizeXYZ } from "../physics";
import { isXYZArray } from "../physics/guards";

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

  // Camera Physics
  if (camera.rotation) {
    const r = normalizeXYZ(camera.rotation);
    camera.camera.rotation.x += r[0];
    camera.camera.rotation.y += r[1];
    camera.camera.rotation.z += r[2];
  }
  if (camera.acceleration) {
    const a = normalizeXYZ(camera.acceleration);
    if (!camera.velocity) {
      camera.velocity = [0, 0, 0];
    }
    if (isXYZArray(camera.velocity)) {
      camera.velocity[0] += a[0];
      camera.velocity[1] += a[1];
      camera.velocity[2] += a[2];
    } else {
      camera.velocity.x += a[0];
      camera.velocity.y += a[1];
      camera.velocity.z += a[2];
    }
  }
  if (camera.velocity) {
    const v = normalizeXYZ(camera.velocity);
    camera.camera.position.x += v[0];
    camera.camera.position.y += v[1];
    camera.camera.position.z += v[2];
  }
}
