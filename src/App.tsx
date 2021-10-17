import _ from "lodash";
import { useRef } from "react";

import { Box, Sphere, Game, Scene } from "./gamehook";

const SpinningCube = () => {
  const count = 1000;
  const orbits = _.range(0, count).map((_x, i) => (
    <Sphere
      key={i}
      heightSegments={8}
      widthSegments={8}
      position={{
        x: _.random(-10, 10, true),
        y: _.random(-10, 10, true),
        z: _.random(-10, 10, true),
      }}
      radius={_.random(0.01, 0.2, true)}
    />
  ));
  const position = useRef({ x: 0, y: 0, z: 0 });
  return (
    <>
      <Box
        key="parent"
        position={position.current}
        rotation={{ x: 0.002, y: 0.001, z: 0.001 }}
      >
        {orbits}
      </Box>
    </>
  );
};

function App() {
  return (
    <Game>
      <Scene title="Initial">
        <SpinningCube />
      </Scene>
    </Game>
  );
}

export default App;
