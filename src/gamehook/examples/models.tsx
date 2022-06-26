import { useEffect, useState } from "react";
import {
  Camera,
  deg,
  Light,
  Model,
  Scene,
  Text,
  useModel,
} from "../../gamehook";
import { XYZ } from "../physics";

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

function Phoenix({ growth }: { growth: XYZ }) {
  const model = useModel({
    filepath: "/resources/phoenix/scene.gltf",
    id: "phoenix",
  });
  useEffect(() => {
    if (model.status === "loaded") {
      model.playAnimation("Take 001", { loop: true });
    }
  }, [model]);

  if (model.status === "pending" || model.status === "error") return <></>;

  return (
    <Model
      scale={{ x: 0.2, y: 0.2, z: 0.2 }}
      growth={growth}
      rotation={{ x: 0, y: 0.01, z: 0 }}
      position={{ x: -250, y: 0, z: 0 }}
      value={model}
    />
  );
}

export function ModelExample() {
  const [growth, setGrowth] = useState<XYZ>([0, 0, 0]);
  const handleClick = () => {
    setGrowth([0.01, 0.01, 0.01]);
  };
  return (
    <Scene>
      <Phoenix growth={growth} />
      <Dragon />
      <Camera position={{ x: 0, y: 0, z: 1200 }} />
      <Light type="ambient" />
      <Text
        value="Click to make the bird grow"
        size={100}
        position={{ x: 0, y: -500, z: 0 }}
        onClick={handleClick}
      />
    </Scene>
  );
}
