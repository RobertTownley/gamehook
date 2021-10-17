import { Text } from "../objects";
import { GameScene } from "./index";
import { FadeScene, FadeSceneProps } from "./FadeInOutScene";

interface Props {
  nextScene: FadeSceneProps["nextScene"];
}
export const GamehookCreditsScene: GameScene<Props> = ({ nextScene }) => {
  return (
    <FadeScene
      startFadeIn={500}
      finishFadeIn={1500}
      startFadeOut={2500}
      finishFadeOut={3000}
      nextScene={nextScene}
    >
      <Text
        material={{ type: "standard", color: 0xffff99 }}
        value="Built With GameHook"
      />
    </FadeScene>
  );
};
