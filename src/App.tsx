import { Light, Box, Game, Scene, Sphere, Collision, Model } from "./gamehook";

function App() {
  const handleCollision = (collision: Collision) => {
    console.log("Collided");
  };

  return (
    <Game>
      <Scene title="Initial">
        <Light variant="ambient" />
        <Model
          filepath="/assets/GamehookCube.glb"
          rotation={{ x: 0, y: 0, z: 0.01 }}
        >
          <Sphere
            position={{ x: 3, y: 0, z: 0 }}
            radius={0.2}
            rotation={{ x: -0.01, y: 0.01, z: 0 }}
          >
            <Sphere position={{ x: 1, y: 0, z: 0 }} radius={0.2} />
          </Sphere>
        </Model>
      </Scene>
    </Game>
  );
}

export default App;
