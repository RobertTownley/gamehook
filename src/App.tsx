import { useState } from "react";

import { Game, Scene, ScenePosition, useAnimation } from "./gamehook";

interface CubeProps {
  initialPosition: ScenePosition;
}

const RunawayCube = ({ initialPosition }: CubeProps) => {
  const [position, setPosition] = useState(initialPosition);
  useAnimation(() => {
    setPosition((prev) => [prev[0], prev[1], prev[2] + 0.1]);
  });

  return (
    <div>
      <p>I am a cube at position {position}</p>
    </div>
  );
};

const LoadingScene = () => {
  return (
    <Scene title="Loading">
      <RunawayCube initialPosition={[0, 0, 0]} />
    </Scene>
  );
};
const IntroScene = () => <div />;
const BattleScene = () => <div />;

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
