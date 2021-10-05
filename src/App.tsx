import { Game } from "./gamehook";

import { GamehookCreditsScene } from "./gamehook/scene/GamehookCreditsScene";
import { BattleScene } from "./cassandra/scenes/BattleScene";
import { ForceSelectionScene } from "./cassandra/scenes/ForceSelectionScene";
import { TitleScene } from "./cassandra/scenes/TitleScene";

function App() {
  return (
    <Game initialScene="Force Selection">
      <GamehookCreditsScene key="Initial" nextScene="Title" />
      <TitleScene key="Title" />
      <ForceSelectionScene key="Force Selection" />
      <BattleScene key="Battle" />
    </Game>
  );
}

export default App;
