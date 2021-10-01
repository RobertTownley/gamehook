import { Game, AmbientLight, useCamera, Scene, useAnimation } from "./gamehook";
import { ModelExample } from "./examples/usage/modelExample";

const LoadingScene = () => {
  const camera = useCamera();
  useAnimation(() => {
    camera.position.z += 0.1;
  });
  return (
    <Scene title="Loading">
      <AmbientLight />
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
