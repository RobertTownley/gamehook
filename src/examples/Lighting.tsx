import { Shape, Scene } from "gamehook";

export function LightingExample() {
  return (
    <Scene>
      <Shape position={[0, -4, -10]} scale={[20, 0.1, 20]} name="Floor" />
      <Shape position={[0, 0.1, -10]} />
    </Scene>
  );
}
