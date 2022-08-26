import * as THREE from "three";

import { GameCamera } from "../camera";
import { Mesh } from "../mesh";

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event: MouseEvent) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

const raycaster = new THREE.Raycaster();

export function detectHoverEntries(
  meshes: Record<string, Mesh>,
  camera: GameCamera,
  renderer: THREE.Renderer
) {
  const hoverables = Object.values(meshes).filter((m) => {
    return (
      (m.onHoverLeave && m.hoverState === "active") ||
      (m.onHoverEnter && m.hoverState !== "active")
    );
  });
  if (hoverables.length < 1) return;

  // Detect objects hovered into
  const mouse = new THREE.Vector2();
  mouse.x = (mouseX / renderer.domElement.width) * 2 - 1;
  mouse.y = -(mouseY / renderer.domElement.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera.camera);
  const intersects = raycaster.intersectObjects(
    hoverables.map((h) => {
      h.threeMesh.updateMatrixWorld();
      return h.threeMesh;
    })
  );

  const firstHoverable = hoverables.find(
    (h) => h.threeMesh.uuid === intersects[0]?.object.uuid
  );
  if (
    firstHoverable &&
    firstHoverable.hoverState !== "active" &&
    firstHoverable.onHoverEnter
  ) {
    firstHoverable.hoverState = "active";
    firstHoverable.onHoverEnter();
  }

  // Detect hover exits
  const intersectIds = intersects.map((i) => i.object.uuid);
  const exitables = hoverables.filter(
    (h) =>
      h.onHoverLeave !== undefined &&
      h.hoverState === "active" &&
      !intersectIds.includes(h.threeMesh.uuid)
  );
  exitables.forEach((exitable) => {
    if (exitable.onHoverLeave) {
      exitable.hoverState = "inactive";
      exitable.onHoverLeave();
    }
  });
}
