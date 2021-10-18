import { Box, Game, Scene } from "./gamehook";

function App() {
  const handleClick = () => {
    console.log("Clicking on the cube");
  };
  return (
    <Game>
      <Scene title="Initial">
        <Box
          position={{ x: 0, y: 0, z: -1 }}
          rotation={{ x: -0.01, y: -0.01, z: -0.001 }}
          onClick={handleClick}
        />
      </Scene>
    </Game>
  );
}

export default App;
