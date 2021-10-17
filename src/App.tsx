import { useState } from "react";

import { Game, Scene, Mesh, useAnimation } from "./gamehook";

const SpinningCube = () => {
  const [q, setQ] = useState(0);
  useAnimation(() => {
    setQ(q + 0.01);
    return false;
  });

  return (
    <>
      <Mesh
        material={{ type: "normal" }}
        geometry={{ type: "box" }}
        position={{ x: 0, y: 0, z: -5 }}
        rotation={{ x: 0, y: 0, z: q }}
      >
        <Mesh
          geometry={{ type: "sphere", radius: 0.1 }}
          position={{ x: 2, y: 2, z: 0 }}
        />
      </Mesh>
      <Mesh
        geometry={{ type: "sphere", radius: 0.1 }}
        position={{ x: 2, y: 2, z: 0 }}
      />
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
