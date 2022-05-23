import * as THREE from "three";
import { useLayoutEffect } from "react";

import { Mesh } from "../mesh";
import { KeyboardEventTypeMap, MouseEventTypeMap } from "./types";

export function useInteraction(
  meshes: Record<string, Mesh>,
  renderer: THREE.Renderer,
  camera: THREE.PerspectiveCamera
) {
  useLayoutEffect(() => {
    function handleMouseEvent(event: MouseEvent) {
      // Get a list of all objects listening for this mouse event
      const eventType = MouseEventTypeMap[event.type];
      const interactables = Object.values(meshes).filter((mesh) => {
        return mesh[eventType] !== undefined;
      });
      if (!interactables) return;

      // Cast a ray to see which listening object the mouse click intersects with
      const mouse = getMouseVectorForEvent(event, renderer);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        interactables.map((i) => {
          i.threeMesh.updateMatrixWorld();
          return i.threeMesh;
        })
      );
      if (intersects.length < 1) return;

      // Find the first mesh to be selected
      const mesh = interactables.find((m) => {
        return m.threeMesh.uuid === intersects[0].object.uuid;
      });
      const handler = mesh ? mesh[eventType] : undefined;
      if (handler) {
        handler(event);
      }
    }
    function handleKeyboardEvent(event: KeyboardEvent) {
      const eventType = KeyboardEventTypeMap[event.type];
      Object.values(meshes).forEach((mesh) => {
        if (!mesh[eventType]) return;
        const handler = mesh[eventType];
        if (handler) {
          handler(event);
        }
      });
    }

    window.addEventListener("click", handleMouseEvent);
    window.addEventListener("keypress", handleKeyboardEvent);
    return () => {
      window.removeEventListener("click", handleMouseEvent);
      window.removeEventListener("keypress", handleKeyboardEvent);
    };
  }, [camera, meshes, renderer]);
}

export const getMouseVectorForEvent = (
  event: MouseEvent,
  renderer: THREE.Renderer
): THREE.Vector2 => {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;
  return mouse;
};
