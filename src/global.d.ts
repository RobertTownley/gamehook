import * as THREE from "three";

declare global {
  interface Window {
    scene: THREE.Scene | undefined;
  }
}
