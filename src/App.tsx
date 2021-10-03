import { Game } from "./gamehook";

import { GamehookCreditsScene } from "./gamehook/scene/GamehookCreditsScene";
import { BattleScene } from "./cassandra/scenes/BattleScene";
import { TitleScene } from "./cassandra/scenes/TitleScene";

function App() {
  const TEMP_SCENE = "Battle";
  return (
    <Game initialScene={TEMP_SCENE}>
      <GamehookCreditsScene key="Initial" nextScene="Title" />
      <TitleScene key="Title" />
      <BattleScene key="Battle" />
    </Game>
  );
}

export default App;
