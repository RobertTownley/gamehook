import _ from "lodash";
import { useState } from "react";
import { Box, Sphere, Scene } from "../../gamehook";
import { XYZ } from "../physics";

export function ParentsExample() {
  const numberOfSpheres = 4000;
  const red = 0xff0000;
  const green = 0x00ff00;
  const [color, setColor] = useState(red);
  const positions: XYZ[] = _.range(0, numberOfSpheres).map((_i) => {
    return [
      _.random(-20, 20, true),
      _.random(-20, 20, true),
      _.random(-20, 20, true),
    ];
  });
  const handleClick = () => {
    setColor(color === red ? green : red);
  };
  return (
    <Scene>
      <Box rotation={{ x: 0.002, y: 0.002, z: 0.002 }} onClick={handleClick}>
        {positions.map((position, i) => (
          <Sphere
            material={{ type: "basic", color }}
            key={i}
            position={position}
            radius={0.1}
          />
        ))}
      </Box>
    </Scene>
  );
}
