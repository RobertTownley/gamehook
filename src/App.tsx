import _ from "lodash";
import { useRef } from "react";

import { Box, Sphere, Game, Scene } from "./gamehook";

const SpinningCube = () => {
  const count = 2000;
  const limit = 200;
  const orbits = _.range(0, count).map((_x, i) => (
    <Sphere
      key={i}
      heightSegments={6}
      widthSegments={6}
      position={{
        x: _.random(0 - limit, limit, true),
        y: _.random(0 - limit, limit, true),
        z: _.random(0 - limit, -1),
      }}
      radius={_.random(0.01, 0.2, true)}
    />
  ));
  const position = useRef({ x: 0, y: 0, z: -20 });
  return (
    <>
      <Box
        key="parent"
        position={position.current}
        width={0.01}
        height={0.01}
        depth={0.01}
        rotation={{ x: 0, y: 0, z: 0.0005 }}
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
