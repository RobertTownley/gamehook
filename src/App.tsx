import _ from "lodash";

import { Box, Scene, Sphere } from "./gamehook";
import { XYZ } from "./gamehook/physics/types";

function DemoBox({ position }: { position: XYZ }) {
  return <Box position={position} rotation={{ x: 0, y: 0.01, z: 0.01 }} />;
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
      <Scene>
        {pairings.map((pairing, i) => (
          <DemoBox key={i} position={[pairing[0], pairing[1], 0]} />
        ))}
      </Scene>
    </div>
  );
}

export default App;
