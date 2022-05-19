import _ from "lodash";

import { Box, Scene, Sphere } from "./gamehook";

function App() {
  const pairings = [];
  for (const x of _.range(-10, 10)) {
    for (const y of _.range(-10, 10)) {
      pairings.push([x * 4, y * 4]);
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <Scene>
        {pairings.map((pairing, i) => (
          <Sphere position={{ x: pairing[0], y: pairing[1], z: -50 }} key={i} />
        ))}
        <Box position={{ x: 10, y: 0, z: -10 }} />
      </Scene>
    </div>
  );
}

export default App;
