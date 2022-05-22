import _ from "lodash";
import { useState } from "react";

import { Box, Scene, Sphere } from "./gamehook";

function App() {
  const color1 = 0x00aaff;
  const color2 = 0x00ff00;
  const [color, setColor] = useState(color2);
  const pairings: Array<[number, number]> = [];
  /*
  for (const x of _.range(-10, 10)) {
    for (const y of _.range(-10, 10)) {
      pairings.push([x * 4, y * 4]);
    }
  }
  */
  function handleClick() {
    console.log("Thing");
    const newColor = color === color1 ? color2 : color1;
    setColor(newColor);
  }

  return (
    <div style={{ display: "flex" }}>
      <Scene>
        {pairings.map((pairing, i) => (
          <Sphere position={{ x: pairing[0], y: pairing[1], z: -50 }} key={i} />
        ))}
        <Box onClick={handleClick} material={{ type: "normal" }} />
      </Scene>
    </div>
  );
}

export default App;
