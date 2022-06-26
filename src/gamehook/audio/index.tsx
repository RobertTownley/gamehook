import * as THREE from "three";

import { useContext, useLayoutEffect, useMemo } from "react";
import { SceneContext } from "../scene/context";

const audioLoader = new THREE.AudioLoader();

interface Props {
  detune?: number;
  duration?: number;
  filepath: string;
  loop?: boolean;
  onEnded?: () => void;
  playbackRate?: number;
  volume?: number;
}

export function Audio({
  detune = 0,
  duration,
  filepath,
  loop = false,
  onEnded,
  playbackRate = 1,
  volume = 1,
}: Props) {
  const scene = useContext(SceneContext);
  const sound = useMemo(() => {
    return new THREE.Audio(scene.camera.listener);
  }, [scene.camera.listener]);

  useLayoutEffect(() => {
    audioLoader.load(filepath, function (buffer) {
      sound.setBuffer(buffer);
      sound.play();
    });
  }, [filepath, sound, loop, volume]);

  useLayoutEffect(() => {
    sound.detune = detune;
  }, [sound, detune]);
  useLayoutEffect(() => {
    sound.setVolume(volume);
  }, [sound, volume]);
  useLayoutEffect(() => {
    sound.setLoop(loop);
  }, [sound, loop]);
  useLayoutEffect(() => {
    sound.duration = duration ?? undefined;
  }, [sound, duration]);
  useLayoutEffect(() => {
    sound.playbackRate = playbackRate;
  }, [sound, playbackRate]);
  useLayoutEffect(() => {
    sound.onEnded = onEnded ?? (() => ({}));
  }, [sound, onEnded]);
  return <></>;
}
