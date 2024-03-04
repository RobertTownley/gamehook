import * as THREE from "three";

import { Scene, Shape } from "gamehook";
import { useMemo } from "react";

export function BasicExample() {
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry();
  }, []);
  return (
    <Scene>
      <Shape rotation={[0.005, 0.005, 0.005]} geometry={geometry} />
    </Scene>
  );
}
