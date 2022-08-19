import { useState } from "react";
import { Box, Light, Scene } from "../../gamehook";

export function HoverExample() {
  const blue = 0x0000ff;
  const red = 0xff0000;
  const [size, setSize] = useState(1);
  const [color, setColor] = useState(red);

  return (
    <Scene>
      <Box
        rotation={{ x: 0.01, y: 0.01, z: 0.01 }}
        onHoverLeave={() => setColor(red)}
        onHoverEnter={() => setColor(blue)}
        onClick={() => setSize(size + 1)}
        material={{
          type: "standard",
          color,
        }}
        width={size}
        height={size}
        depth={size}
      />
      <Light type="ambient" />
    </Scene>
  );
}
