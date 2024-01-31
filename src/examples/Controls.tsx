import { Shape, Scene, Controls, XYZ } from "gamehook";

export function ControlsExample() {
  const positions: XYZ[] = [
    [3, 3, 3],
    [3, 3, -3],
    [3, -3, 3],
    [3, -3, -3],
    [-3, 3, 3],
    [-3, 3, -3],
    [-3, -3, 3],
    [-3, -3, -3],
  ];

  return (
    <Scene>
      {positions.map((p, i) => {
        return <Shape rotation={[0.01, 0.01, 0.01]} position={p} key={i} />;
      })}
      <Controls variant="fly" />
    </Scene>
  );
}
