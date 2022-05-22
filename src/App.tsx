import _ from "lodash";

import { Box, Camera, Scene } from "./gamehook";

function Game() {
  return (
    <>
      <Box position={{ x: 0, y: 3, z: -2 }} width={3} height={3} depth={3} />
      <Box position={{ x: -10, y: 3, z: -2 }} width={3} height={3} depth={3} />
      <Box
        position={{ x: -10, y: -5, z: 0 }}
        velocity={{ x: 0.01, y: 0, z: 0 }}
        id="moving-box"
      />
      <Camera follow="moving-box" trackTo="moving-box" />
    </>
  );
}

function App() {
  return (
    <Scene>
      <Game />
    </Scene>
  );
}

export default App;
