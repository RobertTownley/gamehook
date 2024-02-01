import { Camera, Light, Shape, Scene, Controls } from "gamehook";
import { useMemo } from "react";
import * as THREE from "three";

const CubeMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });

export function LightingExample() {
  const floorMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({ color: 0x888888 });
  }, []);

  return (
    <Scene>
      <Camera orientation={[0.2, 0, 0]} rotation={[0, 0, 0]} />
      <Controls variant="arcball" />

      <Shape
        position={[0, -2, 0]}
        scale={[10, 0.1, 10]}
        name="Floor"
        material={floorMaterial}
        receiveShadow
      />
      <Shape rotation={[0, 0.002, 0]} castShadow material={CubeMaterial} />

      <Light variant="ambient" intensity={0.2} />
      <Light
        variant="point"
        position={[0, 10, 0]}
        intensity={25}
        castShadow
        color={0xfff0f0}
      />
    </Scene>
  );
}
