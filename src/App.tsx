import { Game, Scene } from "./gamehook";
import { Pong } from "./examples/games/pong";

function App() {
  return (
    <Game>
      <Scene title="Initial">
        <Pong />
      </Scene>
    </Game>
  );
}

export default App;
