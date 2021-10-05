import { useState } from "react";

import { useGameRouter } from "../../../gamehook";
import { AmbientLight, Scene } from "../../../gamehook";
import { Background } from "./background";

interface GameDetails {
  playerCount: number;
  pointValue: number;
}
const DefaultGameDetails: GameDetails = {
  playerCount: 2,
  pointValue: 1000,
};
interface SelectedForce {}
export const ForceSelectionScene = () => {
  const router = useGameRouter();
  const gameDetails: GameDetails = router.params || DefaultGameDetails;
  const [selectedForce, setSelectedForce] = useState<SelectedForce>({});
  return (
    <Scene>
      <AmbientLight />
      <Background variant="store" />
    </Scene>
  );
};
