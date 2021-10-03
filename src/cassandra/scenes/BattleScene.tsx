import { AmbientLight, CameraControl, Mesh, Scene, Text } from "../../gamehook";

const Floor = () => {
  return (
    <Mesh
      geometry={{
        type: "box",
        width: 10,
        height: 5,
        depth: 0.2,
      }}
      material={{
        type: "normal",
      }}
      position={[3, 3, 0]}
    />
  );
};

export const BattleScene = () => {
  return (
    <Scene>
      <CameraControl />
      <AmbientLight />
      <Text value="Battle" />
      <Floor />
    </Scene>
  );
};
