import { useMemo, useState } from "react";
import { Light, Box, Game, Scene, Sphere, Collision, Model } from "./gamehook";

function App() {
  const [x, setX] = useState(0.01);
  const handleCollision = (collision: Collision) => {
    setX(0 - x);
  };

  const position = useMemo(() => ({ x: -2, y: 0, z: 0 }), []);
  return (
    <Game>
      <Scene title="Initial">
        <Light variant="ambient" />
        <Sphere
          position={position}
          radius={0.2}
          velocity={{ x, y: 0, z: 0 }}
          onCollision={handleCollision}
        />
        <Sphere position={{ x: 2, y: 0, z: 0 }} radius={0.3} collides />
      </Scene>
    </Game>
  );
}

export default App;
