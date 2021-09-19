import { useEffect, useState } from "react";

import { Game, Scene, useAnimation } from "./gamehook";
import { Cube } from "./gamehook/objects";
import { Text, FadeInText } from "./gamehook/objects/text";

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
  return (
    <Cube
      rotation={rotation}
      position={position}
      interactions={{
        onClick: () => {
          console.log("You clicked into a rotating cube");
        },
      }}
    />
  );
};

const LoadingScene = () => {
  const INTRO_DURATION = 5;
  useEffect(() => {
    setTimeout(() => {
      GAME.transitionToScene("Battle");
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

const BattleScene = () => {
  const [hovered, setHovered] = useState(false);
  const color = hovered ? 0xffffff : 0xff00ff;
  return (
    <Scene title="Battle">
      <Text
        interactions={{
          onClick: () => {
            console.log("I, a block of text, got clicked!");
          },
          onMouseOver: () => {
            console.log("GETTING HOVERED");
            setHovered(true);
          },
          onMouseEnter: () => {
            setHovered(true);
          },
          onMouseOut: () => {
            setHovered(false);
          },
          onMouseLeave: () => {
            setHovered(false);
          },
        }}
        value="Click Me"
        color={0x00aaff}
        position={[0, 1, 0]}
      />
      <Text value="I am not clickable" position={[0, -1, 0]} color={color} />
      <RotatingCube position={[2, -2, 0]} />
    </Scene>
  );
};

function App() {
  return (
    <Game>
      <LoadingScene />
      <IntroScene />
      <BattleScene />
    </Game>
  );
}

export default App;
