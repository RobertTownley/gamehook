import * as THREE from "three";

export function getMouse(event: MouseEvent) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / width) * 2 - 1;
  mouse.y = -(event.clientY / height) * 2 + 1;
  return mouse;
}

export function getRaycaster(event: MouseEvent, camera: THREE.Camera) {
  const mouse = getMouse(event);
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  return raycaster;
}
