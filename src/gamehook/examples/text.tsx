import { Box, Scene, Text } from "../../gamehook";

export function TextExample() {
  return (
    <Scene>
      <Text
        material={{ type: "basic", color: 0x00aaff }}
        value="Hello World!"
        height={0}
        rotation={{ x: 0, y: 0.01, z: 0.01 }}
        position={{ x: 0, y: 0, z: 0 }}
      >
        <Box
          position={{ x: 0, y: -5, z: 0 }}
          width={1}
          height={1}
          depth={15}
        ></Box>
      </Text>
    </Scene>
  );
}
