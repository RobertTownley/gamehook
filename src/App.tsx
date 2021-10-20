import _ from "lodash";

import { Light, Box, Game, Scene } from "./gamehook";

function App() {
  const handleClick = () => {
    console.log("Clicking on the cube");
  };
  return (
    <Game>
      <Scene title="Initial">
        <Light variant="ambient" />
        <Box
          position={{ x: 0, y: 0, z: 0 }}
          material={{ type: "standard", color: 0x00aaff }}
          onClick={handleClick}
          rotation={{ x: 0.0, y: 0, z: 0.01 }}
        />
      </Scene>
    </Game>
  );
}

export default App;
