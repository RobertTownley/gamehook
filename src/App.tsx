import { Game, AmbientLight, useCamera, Scene, useAnimation } from "./gamehook";
import { GameScene } from "./gamehook/scene/index";
import { ModelExample } from "./examples/usage/modelExample";
import { Text } from "./gamehook/objects";
import { FadeScene } from "./gamehook/scene/FadeInOutScene";

const InitialScene: GameScene = () => {
  return (
    <FadeScene startFadeIn={500} finishFadeIn={1500} nextScene="Another">
      <Text material="basic" value="Built With GameHook" />
    </FadeScene>
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
