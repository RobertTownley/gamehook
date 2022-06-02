import { Box, Camera, Scene, Text } from "../../gamehook";

export function TextExample() {
  const onClick = () => {
    console.log("Got clicked on!");
  };
  return (
    <Scene>
      <Box
        position={{ x: 0, y: -15, z: 0 }}
        width={15}
        height={15}
        depth={15}
        rotation={{ x: 0.001, y: 0.02, z: 0.02 }}
      ></Box>
      <Text
        onClick={onClick}
        value="Hello World!"
        position={{ x: 0, y: 8, z: 0 }}
      />
      <Camera position={{ x: 0, y: 0, z: 59 }} />
    </Scene>
  );
}
