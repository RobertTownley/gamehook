import { Box, Sphere, Scene } from "../../gamehook";

export function Parents() {
  return (
    <Scene>
      <Box rotation={{ x: 0, y: 0.01, z: 0.01 }}>
        <Sphere position={{ x: 0, y: 3, z: 0 }} radius={0.25} />
        <Sphere position={{ x: 0, y: -3, z: 0 }} radius={0.25} />
      </Box>
    </Scene>
  );
}
