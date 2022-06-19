import _ from "lodash";
import { Box, Sphere, Scene } from "../../gamehook";
import { XYZ } from "../physics";

export function ParentsExample() {
  const numberOfSpheres = 50;
  const positions: XYZ[] = _.range(0, numberOfSpheres).map((_i) => {
    return [
      _.random(-20, 20, true),
      _.random(-20, 20, true),
      _.random(-20, 20, true),
    ];
  });
  return (
    <Scene>
      <Box rotation={{ x: 0.002, y: 0.002, z: 0.002 }}>
        {positions.map((position, i) => (
          <Sphere key={i} position={position} radius={0.1} />
        ))}
      </Box>
    </Scene>
  );
}
