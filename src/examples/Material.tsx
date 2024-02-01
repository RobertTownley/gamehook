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
        name="ground"
        scale={[10, 0.5, 10]}
        position={[0, -2, 0]}
        material={material}
        receiveShadow
      />

      <Light
        variant="ambient"
        castShadow
        intensity={0.1}
        position={[0, 10, 0]}
      />

      <Light variant="spot" castShadow intensity={25} position={[0, 10, 0]} />

      <Camera position={[0, 0, 15]} orientation={[0.5, 0.5, 0.5]} />
      <Controls variant="orbit" />

      <Shape
        position={[0, 0, 0]}
        rotation={[0.01, 0.01, 0.01]}
        material={material}
        castShadow
      />

      <Shape
        position={[-2, 0, 0]}
        rotation={[0.01, 0.01, 0.01]}
        material={material}
        castShadow
      />

      <Shape
        position={[2, 0, 0]}
        rotation={[0.01, 0.01, 0.01]}
        material={material}
      />
    </Scene>
  );
}
