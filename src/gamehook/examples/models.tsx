import { Box, Model, Scene, useModel } from "../../gamehook";
import { Camera } from "../camera";

function Phoenix() {
  const filepath = "/resources/phoenix/scene.gltf";
  const model = useModel(filepath);
  if (!model) return <></>;
  return <Model value={model} />;
}

export function ModelExample() {
  return (
    <Scene>
      <Phoenix />
      <Box />
      <Camera position={{ x: 0, y: 0, z: 1000 }} />
    </Scene>
  );
}
