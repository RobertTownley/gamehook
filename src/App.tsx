import { Game } from "./gamehook";

import { GamehookCreditsScene } from "./gamehook/scene/GamehookCreditsScene";
import { BattleScene } from "./cassandra/scenes/BattleScene";
import { ArmySelectionScene } from "./cassandra/scenes/ArmySelectionScene";
import { TitleScene } from "./cassandra/scenes/TitleScene";

function App() {
  return (
    <Game initialScene="Title">
      <GamehookCreditsScene key="Initial" nextScene="Title" />
      <TitleScene key="Title" />
      <ArmySelectionScene key="Force Selection" />
      <BattleScene key="Battle" />
    </Game>
  );
}

export default App;
