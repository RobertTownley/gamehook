import { Camera, Scene, Shape } from "gamehook";

export function CameraExample() {
  return (
    <Scene>
      <Shape position={[-2, 0, 0]} />
      <Shape position={[2, 0, 0]} />

      <Camera position={[0, 0, 10]} orientation={[0, 0, 0]} />
    </Scene>
  );
}
