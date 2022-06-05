import { Box, Camera, deg, Light, Plane, Scene } from "../../gamehook";

export function LightExample() {
  return (
    <Scene>
      <Box
        position={{ x: -5, y: 0, z: 0 }}
        material={{ type: "basic", color: 0x99aa00 }}
      />
      <Box
        position={{ x: 0, y: 0, z: 0 }}
        material={{ type: "basic", color: 0x00aa98 }}
      />
      <Box position={{ x: 5, y: 0, z: 0 }} />
      <Plane
        position={{ x: -1, y: -2, z: -1 }}
        width={10}
        height={10}
        material={{ type: "basic", color: 0x555555 }}
        orientation={{ x: 0, y: 0, z: 0 }}
      />
      <Light type="ambient" color={0xf000ff} />
      <Camera />
    </Scene>
  );
}
