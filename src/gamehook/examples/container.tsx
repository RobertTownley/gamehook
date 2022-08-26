import { useState } from "react";
import { Container, Scene, Sphere } from "../../gamehook";

export function ContainerExample() {
  const RED = 0xff0000;
  const BLUE = 0x0000ff;
  const [color, setColor] = useState(RED);
  const handleClick = () => {
    setColor((c) => (c === RED ? BLUE : RED));
  };

  return (
    <Scene>
      <Container onClick={handleClick}>
        <Sphere
          position={{ x: 3, y: 0, z: 0 }}
          material={{
            type: "basic",
            color,
          }}
        />
        <Sphere
          position={{ x: 7, y: 0, z: 0 }}
          material={{
            type: "basic",
            color: 0x0000ff,
          }}
        />
        <Sphere
          position={{ x: 5, y: 0, z: 0 }}
          material={{
            type: "basic",
            color: 0xff0000,
          }}
        />
      </Container>
    </Scene>
  );
}
