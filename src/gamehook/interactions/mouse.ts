import * as THREE from "three";

export const getMouseVectorForEvent = (event: MouseEvent): THREE.Vector2 => {
  const { renderer } = GAME;
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = (event.clientY / renderer.domElement.clientHeight) * 2 - 1;
  return mouse;
};
