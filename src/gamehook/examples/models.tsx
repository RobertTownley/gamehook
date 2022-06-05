import { Camera, Light, Model, Scene, useModel } from "../../gamehook";

function ClickableModel() {
  const model = useModel({
    filepath: "/resources/phoenix/scene.gltf",
    id: "flapping-phoenix",
  });
  const handleClick = () => {
    if (model.status === "loaded") {
      console.log("About to click");
      model.playAnimation("Take 001");
    }
  };

  if (model.status === "pending" || model.status === "error") return <></>;

  return <Model value={model} onClick={handleClick} />;
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
