import { Scene, Shape } from "gamehook";

export function PositionExample() {
  return (
    <Scene>
      <Shape position={[-1, 1, 0]} />
      <Shape position={[1, 1, 0]} />
      <Shape position={[-1, -1, 0]} />
      <Shape position={[1, -1, 0]} />
    </Scene>
  );
}
