import { useState } from "react";
import { Box, Container, Scene, Text } from "../../gamehook";

export function ContainerExample() {
  const RED = 0xff0000;
  const BLUE = 0x0000ff;
  const [color, setColor] = useState(RED);
  const handleClick = () => {
    setColor((c) => (c === RED ? BLUE : RED));
  };

  return (
    <Scene>
      <Container
        onClick={handleClick}
        onHoverEnter={() => setColor(RED)}
        onHoverLeave={() => setColor(BLUE)}
      >
        <Text
          position={{ x: 2, y: 2, z: 0 }}
          value="Hover Over Here"
          name="MYTEXT"
          size={0.4}
        />
        <Text
          position={{ x: 5, y: 5, z: 0 }}
          value="Here too"
          size={0.5}
          name="MYTEXT"
        />
        <Text
          position={{ x: 5, y: -2, z: 0 }}
          value="Anywhere in between"
          size={0.5}
          name="MYTEXT"
        />
      </Container>
      <Box
        position={{ x: 0, y: 0, z: 0 }}
        name="MYBOX"
        material={{ type: "basic", color }}
      />
      <Text
        position={{ x: -5, y: -2, z: 0 }}
        value="Not Here"
        size={0.5}
        name="MYTEXT"
      />
    </Scene>
  );
}
