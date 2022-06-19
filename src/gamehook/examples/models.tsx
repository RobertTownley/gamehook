import { useEffect } from "react";
import { Camera, deg, Light, Model, Scene, useModel } from "../../gamehook";

function Dragon() {
  const model = useModel({
    filepath: "/resources/dragon/scene.gltf",
  });
  useEffect(() => {
    if (model.status === "loaded") {
      model.playAnimation("Object_0", { loop: true });
    }
  }, [model]);

  if (model.status === "pending" || model.status === "error") return <></>;

  return (
    <Model
      orientation={{ x: 0, y: deg(270), z: 0 }}
      position={{ x: 250, y: 0, z: 600 }}
      value={model}
    />
  );
}

function Phoenix() {
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

  return <Model position={{ x: -400, y: 0, z: 0 }} value={model} />;
}

export function ModelExample() {
  return (
    <Scene>
      <Phoenix />
      <Dragon />
      <Camera position={{ x: 0, y: 100, z: 900 }} />
      <Light type="ambient" />
    </Scene>
  );
}
