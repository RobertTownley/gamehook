import { Mesh, Scene, Text } from "../../gamehook";

const Floor = () => {
  return (
    <Mesh
      geometry={{
        type: "box",
        width: 2,
        height: 1,
        depth: 5,
      }}
    />
  );
};
export const BattleScene = () => {
  return (
    <Scene>
      <Text value="Battle" />
      <Floor />
    </Scene>
  );
};
