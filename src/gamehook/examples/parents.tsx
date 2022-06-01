import _ from "lodash";
import { Box, Sphere, Scene } from "../../gamehook";
import { XYZ } from "../physics";

export function Parents() {
  const numberOfSpheres = 500;
  const positions: XYZ[] = _.range(0, numberOfSpheres).map((_i) => {
    return [
      _.random(-20, 20, true),
      _.random(-20, 20, true),
      _.random(-20, 20, true),
    ];
  });
  return (
    <Scene>
      <Box name="parent-box" rotation={{ x: 0.001, y: 0.001, z: 0.001 }}>
        {positions.map((position, i) => (
          <Sphere key={i} position={position} radius={0.05} />
        ))}
      </Box>
    </Scene>
  );
}
