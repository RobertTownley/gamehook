import { Camera, Scene, Shape } from "gamehook";

export function CameraExample() {
  return (
    <Scene>
      <Shape rotation={[0.005, 0.005, 0.005]} />
      <Camera position={[0, 0, 10]} />
    </Scene>
  );
}
