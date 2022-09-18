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
    function handleMouseMoveEvent(event: MouseEvent) {
      const interactables = [...Object.values(meshes)].filter((obj) => {
        return (
          obj["onHoverLeave"] !== undefined || obj["onHoverEnter"] !== undefined
        );
      });

      const mouse = getMouseVectorForEvent(event, renderer);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        interactables.map((i) => {
          i.threeMesh.updateMatrixWorld();
          return i.threeMesh;
        })
      );

      // Determine if any objects with current active hover states aren't being hovered over
      const activeObjects = [
        ...Object.values(meshes).filter((o) => o.hoverState === "active"),
      ];
      const intersectIds = intersects.map((i) => i.object.uuid);
      activeObjects.forEach((activeObject) => {
        if (!intersectIds.includes(activeObject.threeMesh.uuid)) {
          activeObject.hoverState = "inactive";
          const handler = activeObject["onHoverLeave"];
          if (handler) {
            handler(event);
          }
        }
      });

      if (intersects.length < 1) return;
      const mesh = interactables.find((m) => {
        return m.threeMesh.uuid === intersects[0].object.uuid;
      });
      if (!mesh) {
        return;
      }
      const handler = (() => {
        if (!mesh) return;
        if (mesh["onHoverEnter"] && mesh.hoverState !== "active") {
          mesh.hoverState = "active";
          return mesh["onHoverEnter"];
        } else {
          return undefined;
        }
      })();
      if (handler) {
        handler(event);
      }
    }
    function handleMouseEvent(event: MouseEvent) {
      // Get a list of all objects listening for this mouse event
      const eventType = MouseEventTypeMap[event.type];
      const interactables = [...Object.values(meshes)].filter((obj) => {
        if (obj[eventType] === undefined) {
          return false;
        }
        obj.threeMesh.geometry.computeBoundingSphere();
        if (!obj.threeMesh.geometry.boundingSphere?.radius) {
          return false;
        }
        return true;
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
    window.addEventListener("mousemove", handleMouseMoveEvent);
    window.addEventListener("keydown", handleKeyboardEvent);
    window.addEventListener("keyup", handleKeyboardEvent);
    window.addEventListener("keypress", handleKeyboardEvent);

    return () => {
      window.removeEventListener("click", handleMouseEvent);
      window.removeEventListener("keydown", handleKeyboardEvent);
      window.removeEventListener("keyup", handleKeyboardEvent);
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
