import { Box, Input, Scene, Text } from "../../gamehook";

export function InputsExample() {
  return (
    <Scene>
      <Text value="What is your name?" position={{ x: 0, y: 3, z: 0 }} />
      <Input type="text" placeholder="Enter your name..." maxLength={8} />
    </Scene>
  );
}
