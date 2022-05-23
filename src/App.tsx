import _ from "lodash";
import { useState } from "react";

import { Box, Camera, Scene, Sphere } from "./gamehook";

function Floor() {
  return (
    <Box
      id="floor"
      position={{ x: 0, y: 0, z: 0 }}
      width={10}
      height={10}
      depth={0.1}
      material={{ type: "basic", color: 0x00aa00 }}
      collides
    />
  );
}

function Falling() {
  const [z, setZ] = useState(-0.01);
  return (
    <Sphere
      id="focus"
      position={{ x: 0, y: 0, z: 4 }}
      velocity={{ x: 0, y: 0, z }}
      onCollision={({ collider }) => {
        if (collider.threeMesh.position.z < 2) {
          setZ(0.01);
        }
      }}
    />
  );
}

function Game() {
  return (
    <>
      <Floor />
      <Falling />
      <Camera position={{ x: 0, y: -5, z: 5 }} trackTo="focus" follow="focus" />
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
