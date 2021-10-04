import { CameraControl, useGameRouter } from "../../gamehook";
import { AmbientLight, Scene } from "../../gamehook";

export const ArmySelectionScene = () => {
  const router = useGameRouter();
  console.log(router.params);
  return (
    <Scene>
      <CameraControl
        initialPosition={[0, -3, 5]}
        initialRotation={[1.0, 0, 0]}
      />
      <AmbientLight />
    </Scene>
  );
};
