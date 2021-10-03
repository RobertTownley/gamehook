import { Game, AmbientLight, Scene } from "./gamehook";
import { GameScene } from "./gamehook/scene/index";
import { ModelExample } from "./examples/usage/modelExample";
import { Text } from "./gamehook/objects";
import { FadeScene } from "./gamehook/scene/FadeInOutScene";

const InitialScene: GameScene = () => {
  return (
    <FadeScene
      startFadeIn={500}
      finishFadeIn={1000}
      startFadeOut={2500}
      finishFadeOut={3000}
      nextScene="Another"
    >
      <Text
        material={{ type: "standard", color: 0xffff99 }}
        value="Built With GameHook"
      />
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
    <div>
      <p style={{ padding: 8 }}>
        A user should be able to embed the game or make it take up the full
        width
      </p>
      <Game>
        <InitialScene key="Initial" />
        <AnotherScene key="Another" />
      </Game>
    </div>
  );
}

export default App;
