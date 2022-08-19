import { Box, Fog, Light, Scene } from "../../gamehook";

export function FogExample() {
  return (
    <Scene>
      <Box
        rotation={{ x: 0.005, y: 0.005, z: 0.005 }}
        width={5}
        height={5}
        depth={5}
        material={{
          type: "standard",
          color: 0x000000,
        }}
      />
      <Fog type="directed" color={0xffffff} near={5} far={10} />
      <Light type="ambient" />
    </Scene>
  );
}
