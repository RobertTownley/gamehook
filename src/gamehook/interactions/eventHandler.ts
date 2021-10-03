import * as THREE from "three";
import { GameListener } from "../listeners";
import { GameObject } from "../objects/types";

import { getMouseVectorForEvent } from "./mouse";
import { EventHandlerMap, KeyboardEventType, Interactable } from "./types";

const handleMouseEvent = (event: MouseEvent, eventType: keyof Interactable) => {
  if (eventType !== "onClick") {
    return;
  }
  event.preventDefault();

  // Determine which scene objects are listening for this interaction
  const { scene } = GAME;
  const sceneObjects: GameObject[] = Object.values(scene.objects);
  const interactables: GameObject[] = sceneObjects.filter((obj) => {
    if (obj.obj.type !== "Mesh") return false;
    return obj[eventType] ? true : false;
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

  if (!intersects.length) return;

  const selected = interactables.find(
    (i) => i.obj.uuid === intersects[0].object.uuid
  );

  // Call the interacted element's event handler
  const handler = selected ? selected[eventType] : undefined;
  if (handler) {
    handler(event);
  }
};

const handleKeyboardEvent = (event: KeyboardEvent) => {
  const listenerName = {
    keyup: "onKeyUp",
    keydown: "onKeyDown",
  }[event.type] as KeyboardEventType;

  // Unlike mouse events, call for each object listening for keypresses
  // TODO: Allow a user to filter by objects listening for specific key presses
  const sceneObjects: GameObject[] = Object.values(GAME.scene.objects);
  sceneObjects.forEach((obj) => {
    const handler = obj[listenerName];
    if (!handler) return;
    handler(event as KeyboardEvent);
  });

  const listeners: GameListener[] = Object.values(GAME.scene.listeners);
  listeners.forEach((listener) => {
    const handler = listener[listenerName];
    if (!handler) return;
    handler(event as KeyboardEvent);
  });
};

export const buildEventHandlerMap = (): EventHandlerMap => {
  return {
    // Mouse
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
    // Keyboard
    onKeyDown: (event: KeyboardEvent) => handleKeyboardEvent(event),
    onKeyUp: (event: KeyboardEvent) => handleKeyboardEvent(event),
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

  // Mouse
  window.addEventListener("click", eventHandlers.onClick, false);
  window.addEventListener("mouseup", eventHandlers.onMouseUp, false);
  window.addEventListener("mouseout", eventHandlers.onMouseOut, false);
  window.addEventListener("mousedown", eventHandlers.onMouseDown, false);
  window.addEventListener("mousemove", eventHandlers.onMouseMove, false);
  window.addEventListener("mouseover", eventHandlers.onMouseOver, false);
  window.addEventListener("mouseenter", eventHandlers.onMouseEnter, false);
  window.addEventListener("mouseleave", eventHandlers.onMouseLeave, false);

  // Keyboard
  window.addEventListener("keyup", eventHandlers.onKeyUp, false);
  window.addEventListener("keydown", eventHandlers.onKeyDown, false);
};
