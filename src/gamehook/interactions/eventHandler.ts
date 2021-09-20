import * as THREE from "three";

import { getMouseVectorForEvent } from "./mouse";
import { EventHandlerMap, InteractionMap } from "./types";

const handleMouseEvent = (
  event: MouseEvent,
  eventType: keyof InteractionMap
) => {
  if (eventType !== "onClick") {
    return;
  }
  event.preventDefault();

  // Determine which scene objects are listening for this interaction
  const { scene } = GAME;
  const interactables = Object.values(scene.objects).filter((obj) => {
    const interactions = obj.interactions;
    if (!interactions) return false;

    return (interactions as InteractionMap)[eventType] ? true : false;
  });

  // Cast a ray to see which listening object the mouse click intersects with
  const mouse = getMouseVectorForEvent(event);
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, scene.camera);
  const intersects = raycaster.intersectObjects(
    interactables.map((i) => {
      i.obj.updateMatrixWorld();
      return i.obj;
    })
  );
  // const intersects = raycaster.intersectObjects(interactables.map((i) => i.obj));
  if (!intersects.length) return;

  const selected = interactables.find(
    (i) => i.obj.uuid === intersects[0].object.uuid
  );

  // Call the interacted element's event handler
  const interactions = selected?.interactions;
  if (!interactions) return;
  const handler = interactions[eventType];
  if (handler) {
    handler(event);
  }
};

export const buildEventHandlerMap = (): EventHandlerMap => {
  return {
    onClick: (event: MouseEvent) => handleMouseEvent(event, "onClick"),
    onMouseOver: (event: MouseEvent) => handleMouseEvent(event, "onMouseOver"),
    onMouseMove: (event: MouseEvent) => handleMouseEvent(event, "onMouseMove"),
    onMouseOut: (event: MouseEvent) => handleMouseEvent(event, "onMouseOut"),
    onMouseUp: (event: MouseEvent) => handleMouseEvent(event, "onMouseUp"),
    onMouseDown: (event: MouseEvent) => handleMouseEvent(event, "onMouseDown"),
    onMouseEnter: (event: MouseEvent) =>
      handleMouseEvent(event, "onMouseEnter"),
    onMouseLeave: (event: MouseEvent) =>
      handleMouseEvent(event, "onMouseLeave"),
  };
};

export const initializeEventHandlers = () => {
  window.addEventListener(
    "resize",
    () => {
      window.GAME.onWindowResize();
    },
    false
  );
  const { eventHandlers } = window.GAME;
  window.addEventListener("click", eventHandlers.onClick, false);
  window.addEventListener("mouseup", eventHandlers.onMouseUp, false);
  window.addEventListener("mouseout", eventHandlers.onMouseOut, false);
  window.addEventListener("mousedown", eventHandlers.onMouseDown, false);
  window.addEventListener("mousemove", eventHandlers.onMouseMove, false);
  window.addEventListener("mouseover", eventHandlers.onMouseOver, false);
  window.addEventListener("mouseenter", eventHandlers.onMouseEnter, false);
  window.addEventListener("mouseleave", eventHandlers.onMouseLeave, false);
};
