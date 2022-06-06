import { useEffect } from "react";
import { Camera, Light, Model, Scene, useModel } from "../../gamehook";

function ClickableModel() {
  const model = useModel({
    filepath: "/resources/phoenix/scene.gltf",
  });
  useEffect(() => {
    if (model.status === "loaded") {
      model.playAnimation("Take 001", { loop: true });
    }
  }, [model]);

  if (model.status === "pending" || model.status === "error") return <></>;

  return <Model value={model} position={{ x: -3, y: 0, z: 0 }} />;
}

export function ModelExample() {
  return (
    <Scene>
      <ClickableModel />
      <Camera position={{ x: 0, y: 0, z: 1000 }} />
      <Light type="ambient" />
    </Scene>
  );
}
