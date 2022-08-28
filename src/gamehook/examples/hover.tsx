import _ from "lodash";
import { useState } from "react";
import { Box, Container, Light, Scene, Text } from "../../gamehook";
import { MaterialOptions } from "../materials/types";

const NUMBER_OF_BOXES = 50;
const positions = _.range(0, NUMBER_OF_BOXES).map((_i) => ({
  x: _.random(-10, 10),
  y: _.random(-15, 0),
  z: _.random(-5, 10),
}));

export function HoverExample() {
  const blue = 0x0000ff;
  const red = 0xff0000;
  const [color, setColor] = useState(red);

  const handleHoverEnter = () => setColor(blue);
  const handleHoverLeave = () => setColor(red);
  const material: MaterialOptions = { type: "standard", color };

  return (
    <Scene>
      <Container
        onHoverEnter={handleHoverEnter}
        onHoverLeave={handleHoverLeave}
      >
        <Text
          value="Hover Over Me"
          material={material}
          size={1}
          position={{ x: 0, y: 2, z: 0 }}
        />
      </Container>
      {positions.map((p, i) => (
        <Box
          rotation={{ x: 0.0, y: 0.0, z: 0.01 }}
          position={p}
          key={i}
          onHoverLeave={handleHoverLeave}
          onHoverEnter={handleHoverEnter}
          material={{
            type: "standard",
            color,
          }}
        />
      ))}
      <Light type="ambient" />
    </Scene>
  );
}
