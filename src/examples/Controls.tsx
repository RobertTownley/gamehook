import { Shape, Scene, Controls } from "gamehook";

export function ControlsExample() {
  return (
    <Scene>
      <Shape rotation={[0.01, 0.01, 0.01]} />
      <Controls variant="map" />
    </Scene>
  );
}
