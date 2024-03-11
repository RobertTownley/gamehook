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
        <Controls
          variant="map"
          target={[0, 0, 0]}
          minDistance={10}
          maxDistance={50}
        />
        <Shape rotation={[0.01, 0.01, 0.01]} position={[0, 0, 0]} id="foobar" />
        <Camera position={cameraPosition} />
        <Shape scale={[100, 0.1, 100]} position={[0, -4, 0]} />
      </Scene>
    </>
  );
}
