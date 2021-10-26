import * as THREE from "three";

type MouseHandler = (event: MouseEvent) => void;
type KeyboardHandler = (event: KeyboardEvent) => void;

// Keyboard Events
interface KeyboardInteractable {
  onKeyDown?: KeyboardHandler;
  onKeyPress?: KeyboardHandler;
  onKeyUp?: KeyboardHandler;
}
type IKeyboardEventTypeMap = Record<string, keyof KeyboardInteractable>;
const KeyboardEventTypeMap: IKeyboardEventTypeMap = {
  keydown: "onKeyDown",
  keyup: "onKeyUp",
  keypress: "onKeyPress",
};
export const handleKeyboardEvent = (event: KeyboardEvent) => {
  const eventType = KeyboardEventTypeMap[event.type];
  Object.values(_GAME.scene.gameObjects)
    .filter((o) => o[eventType] !== undefined)
    .forEach((obj) => {
      const handler = obj[eventType];
      if (handler) {
        handler(event);
      }
    });
};

// Mouse Events
interface MouseInteractable {
  onClick?: MouseHandler;
}
type IMouseEventTypeMap = Record<string, keyof MouseInteractable>;

const MouseEventTypeMap: IMouseEventTypeMap = {
  click: "onClick",
};
export const handleMouseEvent = (event: MouseEvent) => {
  event.preventDefault();
  const eventType = MouseEventTypeMap[event.type];
  const objects = Object.values(_GAME.scene.gameObjects).filter((o) => {
    return o[eventType] !== undefined;
  });

  // Cast a ray to see which listening object the mouse click intersects with
  const mouse = getMouseVectorForEvent(event);
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, _GAME.scene.camera);
  const intersects = raycaster.intersectObjects(
    objects.map((i) => {
      i.three.updateMatrixWorld();
      return i.three;
    })
  );

  if (!intersects.length) return;
  const selected = objects.find(
    (i) => i.three.uuid === intersects[0].object.uuid
  );

  // Call the interacted element's event handler
  const handler = selected ? selected[eventType] : undefined;
  if (handler) {
    handler(event);
  }
};

export const getMouseVectorForEvent = (event: MouseEvent): THREE.Vector2 => {
  const { renderer } = _GAME;
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;
  return mouse;
};

// Mesh Object Type
export interface Interactable extends KeyboardInteractable, MouseInteractable {}
