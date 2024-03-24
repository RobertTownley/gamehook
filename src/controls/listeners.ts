import * as THREE from "three";

export function updateControls(scene: THREE.Scene) {
  if (scene.userData["controls"]) {
    scene.userData["controls"].update();
  }
}
