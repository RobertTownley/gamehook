import { Pong } from "./gamehook/examples/pong";
import { Scene } from "./gamehook/scene";

function Game() {
  return <Pong />;
}

function App() {
  return (
    <Scene>
      <Game />
    </Scene>
  );
}

export default App;
