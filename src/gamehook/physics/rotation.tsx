import { Mesh } from "../mesh";
import { normalizeXYZ } from "./utils";

export function rotateObjects(meshes: Record<string, Mesh>) {
  Object.values(meshes).forEach((mesh) => {
    if (!mesh.rotation) return;
    const r = normalizeXYZ(mesh.rotation);
    mesh.threeMesh.rotation.x += r[0];
    mesh.threeMesh.rotation.y += r[1];
    mesh.threeMesh.rotation.z += r[2];
  });
}
