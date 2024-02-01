import { Physical } from "./types";

type MovableObject = {
  userData: Physical;
} & THREE.Object3D;
export function animateSceneObjects(scene: THREE.Scene) {
  scene.traverse((child: MovableObject) => {
    if (child.userData.velocity) {
      child.position.x += child.userData.velocity[0];
      child.position.y += child.userData.velocity[1];
      child.position.z += child.userData.velocity[2];
    }

    if (child.userData.acceleration) {
      if (!child.userData.velocity) {
        child.userData.velocity = [0, 0, 0];
      }
      child.userData.velocity[0] += child.userData.acceleration[0];
      child.userData.velocity[1] += child.userData.acceleration[1];
      child.userData.velocity[2] += child.userData.acceleration[2];
    }

    if (child.userData.rotation) {
      child.rotation.x += child.userData.rotation[0];
      child.rotation.y += child.userData.rotation[1];
      child.rotation.z += child.userData.rotation[2];
    }
  });
}
