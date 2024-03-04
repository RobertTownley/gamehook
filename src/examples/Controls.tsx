import { Camera, Shape, Scene, Controls, XYZ } from "gamehook";
import { useCallback, useState } from "react";

export function ControlsExample() {
  const [cameraPosition, setCameraPosition] = useState<XYZ>([0, 0, 20]);
  const positions: XYZ[] = [
    [8, 3, 3],
    [8, 3, -3],
    [8, -3, 3],
    [8, -3, -3],
    [-8, 3, 3],
    [-8, 3, -3],
    [-8, -3, 3],
    [-8, -3, -3],
  ];

  const onClick = useCallback(() => {
    console.log("MOVING CAMERA");
    setCameraPosition((pos) => [pos[0], pos[1] + 5, pos[2]]);
  }, []);

  return (
    <>
      <button
        style={{
          position: "fixed",
          top: 0,
          zIndex: 20,
          margin: 16,
          padding: 16,
        }}
        onClick={onClick}
      >
        Click Me
      </button>
      <Scene>
        {positions.map((p, i) => {
          return <Shape rotation={[0.01, 0.01, 0.01]} position={p} key={i} />;
        })}
        <Controls variant="map" targetId="foobar" />
        <Shape rotation={[0.01, 0.01, 0.01]} position={[0, 0, 0]} id="foobar" />
        <Camera position={cameraPosition} />
      </Scene>
    </>
  );
}
