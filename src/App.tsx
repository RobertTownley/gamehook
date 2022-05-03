import _ from "lodash";

import { Scene, Sphere } from "./gamehook";
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
    <>
      <Scene width={400} height={400}>
        {pairings.map((pairing) => (
          <Ball
            key={`${pairing[0]}.${pairing[1]}`}
            position={{ x: pairing[0], y: pairing[1], z: -50 }}
          />
        ))}
      </Scene>
      <Scene width={400} height={400}>
        <Sphere position={{ x: 0, y: 0, z: -5 }} />
      </Scene>
    </>
  );
}

export default App;
