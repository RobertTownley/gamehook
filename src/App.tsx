import { useEffect, useState } from "react";
import { MovingCube } from "./examples/objects";

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
  const [clicked, setClicked] = useState(false);
  const color = clicked ? 0x000fff : 0xff00aa;
  const [rotation, setRotation] = useState<ObjectRotation>([0, 0, 0]);
  useAnimation(() => {
    setRotation((prev) => [prev[0], prev[1] + 0.01, prev[2] + 0.01]);
  });

  const handleClick = () => {
    setClicked((prev) => !prev);
  };
  return (
    <Cube
      rotation={rotation}
      position={position}
      color={color}
      interactions={{
        onClick: handleClick,
      }}
    />
  );
};

const LoadingScene = () => {
  const INTRO_DURATION = 5;
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
const IntroScene = () => {
  const positions: ObjectPosition[] = [];
  for (let i = -2; i < 2; i += 0.2) {
    positions.push([i, 2, 0]);
    positions.push([2, -i, 0]);
    positions.push([-2, -i, 0]);
    positions.push([-i, -2, 0]);
  }
  return (
    <Scene title="Intro">
      {positions.map((pos, i) => (
        <MovingCube initialPosition={pos} key={i} />
      ))}
    </Scene>
  );
};

/*
const BattleScene = () => {
  const [hovered, setHovered] = useState(false);
  const color = hovered ? 0xffffff : 0xff00ff;
  return (
    <Scene title="Battle">
      <Text
        value="Click Me"
        interactions={{
          onClick: (event) => {
            setHovered((prev) => !prev);
          },
        }}
        color={color}
        position={[0, 1, 0]}
      />
      <Text value="I am not clickable" position={[0, -1, 0]} color={color} />
      <RotatingCube position={[2, -2, 0]} />
    </Scene>
  );
};
*/

function App() {
  return (
    <Game>
      <LoadingScene />
      <IntroScene />
    </Game>
  );
}

export default App;
