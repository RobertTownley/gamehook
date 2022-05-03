import _ from "lodash";

import { Box, Scene, Sphere } from "./gamehook";
import { XYZ } from "./gamehook/physics/types";

interface Props {
  position: XYZ;
}

function Ball({ position }: Props) {
  return (
    <Sphere
      position={position}
      material={{ type: "normal" }}
      velocity={[0, 0, 0.1]}
      onClick={() => {
        console.log("Clicking!");
      }}
    />
  );
}

function App() {
  const pairings = [];
  for (const x of _.range(-10, 10)) {
    for (const y of _.range(-10, 10)) {
      pairings.push([x * 4, y * 4]);
    }
  }
  return (
    <div style={{ display: "flex" }}>
      <Scene width={window.innerWidth / 2} height={window.innerHeight}>
        {pairings.map((pairing) => (
          <Ball
            key={`${pairing[0]}.${pairing[1]}`}
            position={{ x: pairing[0], y: pairing[1], z: -50 }}
          />
        ))}
      </Scene>
      <Scene width={window.innerWidth / 2} height={window.innerHeight}>
        <Box position={{ x: 0, y: 0, z: -5 }} />
      </Scene>
    </div>
  );
}

export default App;
