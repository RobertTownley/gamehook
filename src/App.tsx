import { Game, Scene } from "./gamehook";
import { ModelExample } from "./examples/usage/modelExample";

const LoadingScene = () => {
  return (
    <Scene title="Loading">
      <ModelExample />
    </Scene>
  );
};

function App() {
  return (
    <Game>
      <LoadingScene />
    </Game>
  );
}

export default App;
