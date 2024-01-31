import * as THREE from "three";
import { Camera, Light, Shape, Scene, Controls } from "gamehook";
import { useMemo } from "react";

export function MaterialExample() {
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({ color: 0x00aaff });
  }, []);

  return (
    <Scene>
      <Shape
        name="floor"
        scale={[10, 0.5, 10]}
        position={[0, -2, 0]}
        material={material}
        receiveShadow
      />

      <Shape position={[0, -1, -8]} rotation={[0.02, 0.02, 0.02]} castShadow />

      <Light type="point" position={[0, 4, -8]} castShadow />
      <Camera />
      <Controls variant="fly" />
    </Scene>
  );
}
