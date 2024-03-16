import * as THREE from "three";

import { Scene, Shape } from "gamehook";

const BackgroundColor = new THREE.Color(0xcccccc);
const Fog = new THREE.FogExp2(0x000000, 2);

export function FogExample() {
  return (
    <Scene fog={Fog} backgroundColor={BackgroundColor}>
      <Shape />
      <Shape position={[-2, 2, -20]} />
      <Shape scale={[100, 0.1, 100]} position={[0, -2, 0]} />
    </Scene>
  );
}
