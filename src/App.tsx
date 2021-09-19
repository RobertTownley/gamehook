import { useEffect, useState } from "react";

import { Game, Scene, useAnimation } from "./gamehook";
import { Cube } from "./gamehook/objects";
import { FadeInText } from "./gamehook/objects/text";

import { ObjectPosition, ObjectRotation } from "./gamehook/objects/types";

const RunawayCube = () => {
  const [position, setPosition] = useState<ObjectPosition>([0, 0, 0]);
  useAnimation(() => {
    setPosition((prev) => [prev[0], prev[1], prev[2] - 0.01]);
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
  const INTRO_DURATION = 6000;
  useEffect(() => {
    setTimeout(() => {
      GAME.transitionToScene("Intro");
    }, INTRO_DURATION);
  }, []);

  return (
    <Scene title="Loading">
      <FadeInText
        value="Hello World"
        color={0x00aaff}
        start={1500}
        end={2500}
        position={[0, 0.5, 0]}
      />
      <FadeInText
        value="Welcome to GameHook"
        color={0x00aaff}
        start={3000}
        end={4000}
        position={[0, -0.5, 0]}
      />
    </Scene>
  );
};
const IntroScene = () => (
  <Scene title="Intro">
    <RunawayCube />

    <RotatingCube position={[0, 2, 0]} />
    <RotatingCube position={[0, -2, 0]} />
    <RotatingCube position={[2, 0, 0]} />
    <RotatingCube position={[-2, 0, 0]} />

    <RotatingCube position={[-2, 0, -10]} />
    <RotatingCube position={[2, 0, -10]} />
    <RotatingCube position={[0, 2, -10]} />
    <RotatingCube position={[0, -2, -10]} />

    <RotatingCube position={[5, -5, -8]} />
    <RotatingCube position={[-5, 5, -8]} />
    <RotatingCube position={[-5, -5, -8]} />
    <RotatingCube position={[5, 5, -8]} />
  </Scene>
);

function App() {
  return (
    <Game>
      <LoadingScene />
      <IntroScene />
    </Game>
  );
}

export default App;
