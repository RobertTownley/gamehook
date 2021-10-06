import { useState } from "react";
import {
  AmbientLight,
  CameraControl,
  Mesh,
  ObjectPosition,
  ObjectRotation,
  Scene,
  useAnimation,
} from "../../gamehook";

const Child = ({ position }: { position: ObjectPosition }) => {
  return (
    <Mesh
      geometry={{ type: "sphere", radius: 0.5 }}
      material={{ type: "normal" }}
      position={position}
    />
  );
};

export const BattleScene = () => {
  const [rotation, setRotation] = useState<ObjectRotation>([0, 0, 0]);
  /*useAnimation(() => {
    setRotation([rotation[0] + 0.01, rotation[1] + 0.01, rotation[2]]);
  });*/
  return (
    <Scene>
      <CameraControl
        step={10}
        initialPosition={[0, 0, 5]}
        initialRotation={[0, 0, 0]}
      />
      <AmbientLight />
      <Mesh
        geometry={{ type: "box" }}
        material={{ type: "normal" }}
        rotation={rotation}
      >
        <Child position={[2, 0, 0]} />
        <Child position={[-2, 0, 0]} />
      </Mesh>
    </Scene>
  );
};
