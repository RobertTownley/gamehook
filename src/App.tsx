import { Game } from "./gamehook";

import { GamehookCreditsScene } from "./gamehook/scene/GamehookCreditsScene";
import { TitleScene } from "./cassandra/scenes/TitleScene";

function App() {
  return (
    <Game>
      <GamehookCreditsScene key="Initial" nextScene="Title" />
      <TitleScene key="Title" />
    </Game>
  );
}

export default App;
