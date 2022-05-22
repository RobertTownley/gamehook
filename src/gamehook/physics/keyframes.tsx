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
