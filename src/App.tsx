import { useEffect } from "react";

import { Game, Scene } from "./gamehook";
import { FadeInText } from "./gamehook/objects/text";
import { Pong } from "./examples/games/pong";

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
  return (
    <Scene title="Intro">
      <Pong />
    </Scene>
  );
};

function App() {
  return (
    <Game>
      <LoadingScene />
      <IntroScene />
    </Game>
  );
}

export default App;
