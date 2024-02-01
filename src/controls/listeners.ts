import * as THREE from "three";
import { IControls } from "./types";

export function updateControls(scene: THREE.Scene, delta: number) {
  scene.userData["controls"].forEach((controls: IControls) => {
    if (controls.update) {
      controls.update(delta);
    }
  });
}
