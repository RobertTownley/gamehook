import { useEffect } from "react";
import { Camera, Light, Model, Scene, useModel } from "../../gamehook";

function ClickableModel() {
  const model = useModel({
    filepath: "/resources/dragon/scene.gltf",
  });
  useEffect(() => {
    if (model.status === "loaded") {
      model.playAnimation("Object_0", { loop: true });
    }
  }, [model]);

  if (model.status === "pending" || model.status === "error") return <></>;

  return <Model name="bird" velocity={{ x: 1, y: 0, z: 0 }} value={model} />;
}

export function ModelExample() {
  return (
    <Scene>
      <ClickableModel />
      <Camera position={{ x: 0, y: 100, z: 300 }} trackTo="bird" />
      <Light type="ambient" />
    </Scene>
  );
}
