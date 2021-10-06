import { useEffect } from "react";

import { CameraControl, useCamera } from "../../../gamehook";
import { AmbientLight, Scene } from "../../../gamehook";

import { Background } from "./background";
import { Pedistals } from "./pedistal";
// import { Army } from "../../armies/types";
// import { Armies } from "../../armies";

/*
interface GameDetails {
  availableArmies: Army[];
  playerCount: number;
  pointValue: number;
}
const DefaultGameDetails: GameDetails = {
  availableArmies: Armies,
  playerCount: 2,
  pointValue: 1000,
};

interface SelectedForce {
  armies?: Army[];
}
*/

export const ForceSelectionScene = () => {
  const camera = useCamera();
  useEffect(() => {
    camera.setPosition([0, -5, 10]);
    camera.setRotation([(Math.PI * 2) / 5, 0, 0]);
  }, [camera]);

  // const router = useGameRouter();
  // const gameDetails: GameDetails = router.params || DefaultGameDetails;
  // const [selectedForce, setSelectedForce] = useState<SelectedForce>({});

  return (
    <Scene>
      <CameraControl />
      <AmbientLight />
      <Background variant="store" />
      <Pedistals />
    </Scene>
  );
};
