import { useEffect, useState } from "react";

import { Game, AmbientLight, useCamera, Scene, useAnimation } from "./gamehook";
import { GameScene } from "./gamehook/scene/index";
import { ModelExample } from "./examples/usage/modelExample";
import { useGameRouter } from "./gamehook/hooks";

const InitialScene: GameScene = () => {
  const camera = useCamera();
  const router = useGameRouter();
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

  useEffect(() => {
    setTimeout(() => {
      router.changeScene("Another");
    }, 3000);
  }, [router]);

  return (
    <Scene>
      <AmbientLight />
      <ModelExample />
    </Scene>
  );
};

const AnotherScene: GameScene = () => {
  return (
    <Scene>
      <AmbientLight />
      <ModelExample />
    </Scene>
  );
};

function App() {
  return (
    <Game>
      <InitialScene key="Initial" />
      <AnotherScene key="Another" />
    </Game>
  );
}

export default App;
