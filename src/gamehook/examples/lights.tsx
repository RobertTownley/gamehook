import { Box, Camera, deg, Light, Plane, Scene } from "../../gamehook";

export function LightExample() {
  return (
    <Scene castShadow>
      <Plane
        position={{ x: -1, y: -2, z: -1 }}
        width={100}
        height={100}
        material={{ type: "standard", color: 0x555555 }}
        orientation={{ x: 0, y: 0, z: 0 }}
        receiveShadow
      />

      <Box
        position={{ x: -3, y: 0, z: 2 }}
        rotation={{ x: 0, y: 0, z: 0.01 }}
        material={{ type: "standard", color: 0x99aa00 }}
        castShadow
      />

      <Box
        position={{ x: 3, y: 0, z: 2 }}
        rotation={{ x: 0, y: 0, z: 0.01 }}
        material={{ type: "standard", color: 0x00ff00 }}
      />

      <Box
        position={{ x: 0, y: 0, z: 2 }}
        rotation={{ x: 0.01, y: 0.01, z: 0.01 }}
        material={{ type: "standard", color: 0x00ff00 }}
        castShadow
      />

      <Light
        type="point"
        position={{ x: 0, y: 0, z: 5 }}
        castShadow
        color={0xffff00}
      />

      <Camera
        orientation={{ x: deg(60), y: 0, z: 0 }}
        position={{ x: 0, y: -5, z: 5 }}
      />
    </Scene>
  );
}
