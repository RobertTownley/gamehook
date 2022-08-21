import { useState } from "react";
import {
  Animation,
  Camera,
  deg,
  Light,
  Model,
  Scene,
  Text,
  XYZ,
} from "../../gamehook";

function Dragon() {
  return (
    <Model
      filepath="/resources/dragon/scene.gltf"
      id="dragon"
      orientation={{ x: 0, y: deg(270), z: 0 }}
      position={{ x: 250, y: 0, z: 600 }}
    >
      <Animation name="Object_0" loop />
    </Model>
  );
}

function Phoenix({ growth }: { growth: XYZ }) {
  return (
    <Model
      filepath="/resources/phoenix/scene.gltf"
      id="phoenix"
      scale={{ x: 0.2, y: 0.2, z: 0.2 }}
      growth={growth}
      rotation={{ x: 0, y: 0.01, z: 0 }}
      position={{ x: -250, y: 0, z: 0 }}
    >
      <Animation name="Take 001" loop />
    </Model>
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
