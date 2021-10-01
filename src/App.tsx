import { Game, AmbientLight, useCamera, Scene, useAnimation } from "./gamehook";
import { ModelExample } from "./examples/usage/modelExample";
import { useState } from "react";

const LoadingScene = () => {
  const camera = useCamera();
  const [heading, setHeading] = useState(0.05);
  useAnimation(() => {
    if (camera.position.z > 10) {
      setHeading(-0.05);
    } else if (camera.position.z < 5) {
      setHeading(0.05);
    }
    camera.position.x -= heading * 1.25;
    camera.position.y += heading * 1.25;
    camera.position.z += heading;
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
