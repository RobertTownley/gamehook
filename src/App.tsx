import { useEffect, useState } from "react";

import { Game, Scene, useAnimation } from "./gamehook";
import { Cube } from "./gamehook/objects";

import { ObjectPosition, ObjectRotation } from "./gamehook/objects/types";

const RunawayCube = () => {
  const [position, setPosition] = useState<ObjectPosition>([0, 0, 0]);
  useAnimation(() => {
    setPosition((prev) => [prev[0], prev[1], prev[2] + 0.01]);
  });

  return <Cube position={position} />;
};

interface RotatingCubeProps {
  position?: ObjectPosition;
}
const RotatingCube = ({ position = [0, 0, 0] }: RotatingCubeProps) => {
  const [rotation, setRotation] = useState<ObjectRotation>([0, 0, 0]);
  useAnimation(() => {
    setRotation((prev) => [prev[0], prev[1] + 0.01, prev[2] + 0.01]);
  });
  return <Cube rotation={rotation} position={position} />;
};

const LoadingScene = () => {
  useEffect(() => {
    setTimeout(() => {
      GAME.transitionToScene("Intro");
    }, 3000);
  }, []);

  return (
    <Scene title="Loading">
      <RunawayCube />
    </Scene>
  );
};
const IntroScene = () => (
  <Scene title="Intro">
    <RotatingCube position={[0, 2, 0]} />
    <RotatingCube position={[0, -2, 0]} />
    <RotatingCube position={[2, 0, 0]} />
    <RotatingCube position={[-2, 0, 0]} />
    <RotatingCube position={[-2, 0, -10]} />
    <RotatingCube position={[2, 0, -10]} />
    <RotatingCube position={[0, 2, -10]} />
    <RotatingCube position={[0, -2, -10]} />

    <RotatingCube position={[6, -6, -8]} />
    <RotatingCube position={[-6, 6, -8]} />
    <RotatingCube position={[-6, -6, -8]} />
    <RotatingCube position={[6, 6, -8]} />
  </Scene>
);
const BattleScene = () => (
  <Scene title="Battle">
    <RotatingCube />
    <RunawayCube />
  </Scene>
);

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
