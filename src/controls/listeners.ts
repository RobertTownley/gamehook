import * as THREE from "three";
import { IControls } from "./types";

export function updateControls(scene: THREE.Scene) {
  scene.userData["controls"].forEach((controls: IControls) => {
    controls.update();
  });
}
