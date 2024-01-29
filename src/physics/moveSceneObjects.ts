import { Physical, XYZ } from "./types";

type MovableObject = {
  userData: Physical;
} & THREE.Object3D;
export function animateSceneObjects(scene: THREE.Scene) {
  scene.traverse((child: MovableObject) => {
    // Movement
    const { velocity, acceleration, rotation, orientation } = child.userData;
    if (velocity) {
      child.position.x += velocity[0];
      child.position.y += velocity[1];
      child.position.z += velocity[2];
    }

    if (acceleration && child.userData) {
      const v: XYZ = velocity ?? [0, 0, 0];
      child.userData.velocity = v;
      child.userData.velocity[0] += acceleration[0];
      child.userData.velocity[1] += acceleration[1];
      child.userData.velocity[2] += acceleration[2];
    }

    // Rotation
    if (rotation) {
      child.rotation.x += rotation[0];
      child.rotation.y += rotation[1];
      child.rotation.z += rotation[2];
    }

    if (orientation) {
      const [x, y, z] = orientation;
      child.rotation.set(x, y, z);
    }
  });
}
