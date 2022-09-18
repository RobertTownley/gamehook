import { Input, Scene, Text } from "../../gamehook";

export function InputsExample() {
  const handleChange = (event: KeyboardEvent) => {
    console.log(event.key);
  };

  return (
    <Scene>
      <Text value="What is your name?" position={{ x: 0, y: 3, z: 0 }} />
      <Input
        type="text"
        placeholder="Enter your name..."
        onChange={handleChange}
      />
    </Scene>
  );
}
