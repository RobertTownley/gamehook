import _ from "lodash";
import { useState } from "react";
import { Box, Light, Scene } from "../../gamehook";

const NUMBER_OF_BOXES = 50;
const positions = _.range(0, NUMBER_OF_BOXES).map((_i) => ({
  x: _.random(-10, 10),
  y: _.random(-15, 10),
  z: _.random(-5, 10),
}));

export function HoverExample() {
  const blue = 0x0000ff;
  const red = 0xff0000;
  const [color, setColor] = useState(red);

  return (
    <Scene>
      {positions.map((p, i) => (
        <Box
          rotation={{ x: 0.0, y: 0.0, z: 0.01 }}
          position={p}
          key={i}
          onHoverLeave={() => setColor(red)}
          onHoverEnter={() => setColor(blue)}
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
