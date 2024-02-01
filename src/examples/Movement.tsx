import { Scene, Shape } from "gamehook";

export function MovementExample() {
  return (
    <Scene>
      <Shape position={[-1, 1, 0]} />
      <Shape
        position={[1, 1, 0]}
        orientation={[0, 0.5, 0.5]}
        scale={[0.5, 0.5, 0.5]}
      />
      <Shape position={[-1, -1, 0]} rotation={[0.005, 0.005, 0.005]} />
      <Shape position={[1, -1, 0]} velocity={[0, 0, -0.005]} />
    </Scene>
  );
}
