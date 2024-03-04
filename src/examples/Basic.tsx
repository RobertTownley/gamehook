import * as THREE from "three";

import { Scene, Shape } from "gamehook";

export function BasicExample() {
  const geometry = new THREE.SphereGeometry();
  return (
    <Scene>
      <Shape rotation={[0.005, 0.005, 0.005]} geometry={geometry} />
    </Scene>
  );
}
