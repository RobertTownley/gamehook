import { useState } from "react";
import {
  Animation,
  Audio,
  Camera,
  Light,
  Model,
  Scene,
  Text,
} from "../../gamehook";

export function AudioExample() {
  const [audioState, setAudioState] = useState("Playing campfire noise");
  const campfireDuration = 3;

  return (
    <Scene>
      <Audio
        filepath="/resources/audio/campfire.flac"
        volume={0.5}
        onEnded={() => {
          setAudioState(`Finished after ${campfireDuration} seconds`);
        }}
        duration={campfireDuration}
      />
      <Camera position={{ x: 0, y: 1, z: 2 }} trackTo="campfire" />
      <Light type="ambient" />
      <Model id="campfire" filepath="/resources/campfire/scene.gltf">
        <Animation name="fire armAction" loop />
      </Model>
      <Text
        value={`Status: ${audioState}`}
        size={0.5}
        position={{ x: 0, y: 1, z: -2 }}
        height={0.001}
      />
    </Scene>
  );
}
