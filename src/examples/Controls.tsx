import { Camera, Shape, Scene, Controls, XYZ } from "gamehook";

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
      <Controls variant="map" targetId="foobar" />
      <Shape rotation={[0.01, 0.01, 0.01]} position={[8, 0, -40]} id="foobar" />
      <Camera position={[0, 0, 0]} />
    </Scene>
  );
}
