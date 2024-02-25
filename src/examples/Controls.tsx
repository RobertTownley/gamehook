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
      <Controls variant="map" minDistance={10} maxDistance={50} />
      <Camera position={[0, 0, 10]} />
    </Scene>
  );
}
