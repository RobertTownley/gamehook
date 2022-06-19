import { useEffect } from "react";
import { Camera, Light, Model, Scene, useModel } from "../../gamehook";

function ClickableModel() {
  const model = useModel({
    filepath: "/resources/phoenix/scene.gltf",
    id: "modelToTrack",
  });
  useEffect(() => {
    if (model.status === "loaded") {
      model.playAnimation("Take 001", { loop: true });
    }
  }, [model]);

  if (model.status === "pending" || model.status === "error") return <></>;

  return <Model velocity={{ x: 0, y: 0, z: 0 }} value={model} />;
}

export function ModelExample() {
  return (
    <Scene>
      <ClickableModel />
      <Camera position={{ x: 0, y: 100, z: 900 }} trackTo="modelToTrack" />
      <Light type="ambient" />
    </Scene>
  );
}
