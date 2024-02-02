import * as THREE from "three";

export function updateMixers(scene: THREE.Scene, delta: number) {
  const mixers = scene.userData["mixers"] ?? [];
  mixers.forEach((mixer: THREE.AnimationMixer) => {
    mixer.update(delta);
  });
}
