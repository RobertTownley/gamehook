import { useEffect, useState } from "react";

import { CameraControl, useCamera, useGameRouter } from "../../../gamehook";
import { AmbientLight, Scene } from "../../../gamehook";

import { Background } from "./background";
import { Pedistal } from "./pedistal";
import { Army } from "../../armies/types";

interface GameDetails {
  availableArmies?: Army[];
  playerCount: number;
  pointValue: number;
}
const DefaultGameDetails: GameDetails = {
  playerCount: 2,
  pointValue: 1000,
};

interface SelectedForce {
  armies?: Army[];
}

export const ForceSelectionScene = () => {
  const camera = useCamera();
  useEffect(() => {
    camera.setPosition([2, 0, 5]);
    camera.setRotation([Math.PI / 3, 0, 0]);
  }, [camera]);

  const router = useGameRouter();
  const gameDetails: GameDetails = router.params || DefaultGameDetails;
  const [selectedForce, setSelectedForce] = useState<SelectedForce>({});
  return (
    <Scene>
      <CameraControl />
      <AmbientLight />
      <Background variant="store" />
      <Pedistal position={[0, 5, 0.5]} />
    </Scene>
  );
};
