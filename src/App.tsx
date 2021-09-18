import { useState } from "react";

import { Game, Scene, ScenePosition, useAnimation } from "./gamehook";
import { Cube } from "./gamehook/objects";

interface CubeProps {
  initialPosition: ScenePosition;
}

const RunawayCube = ({ initialPosition }: CubeProps) => {
  const [position, setPosition] = useState(initialPosition);
  useAnimation(() => {
    setPosition((prev) => [prev[0], prev[1], prev[2] + 1]);
  });

  return <Cube position={position} />;
};

const LoadingScene = () => {
  return (
    <Scene title="Loading">
      <h1>I am the loading scene</h1>
      <RunawayCube initialPosition={[0, 0, 0]} />
    </Scene>
  );
};
const IntroScene = () => <div>Intro Scene</div>;
const BattleScene = () => <div>Battle Scene</div>;

function App() {
  return (
    <Game initialSceneTitle="Loading">
      <LoadingScene />
      <IntroScene />
      <BattleScene />
    </Game>
  );
}

export default App;
