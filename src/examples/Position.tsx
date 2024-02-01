import { Controls, Scene, Shape } from "gamehook";

export function PositionExample() {
  return (
    <Scene>
      <Shape position={[-1, 1, 0]} />
      <Shape position={[1, 1, 0]} />
      <Shape
        position={[-1, -1, 0]}
        geometry={{ variant: "sphere", radius: 0.5 }}
      />
      <Shape
        position={[1, -1, 0]}
        geometry={{ variant: "cylinder", radiusTop: 0.5 }}
      />

      <Controls variant="arcball" />
    </Scene>
  );
}
