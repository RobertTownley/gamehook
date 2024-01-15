import { useMemo, useRef } from "react";
import * as THREE from "three";

import { useCamera } from "../camera/hooks";
import { AnimationLoop } from "../animation/AnimationLoop";

import { SceneDetailsContext } from "./context";
import {
  useBackgroundColor,
  useRender,
  useSceneId,
  useSceneReady,
} from "./hooks";
import { InnerSceneProps, SceneProps } from "./types";

export function Scene(props: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = useSceneId(props);
  const ready = useSceneReady();

  return (
    <>
      <canvas ref={canvasRef} id={id} />
      {ready && canvasRef.current && (
        <GamehookScene {...props} id={id} canvas={canvasRef.current} />
      )}
    </>
  );
}

function GamehookScene(props: InnerSceneProps) {
  const { children } = props;

  const scene = useMemo(() => {
    return new THREE.Scene();
  }, []);

  useBackgroundColor(props, scene);

  const [camera, setCamera] = useCamera();

  const render = useRender(props, scene, camera);

  const sceneDetails = useMemo(() => {
    return {
      render,
      camera,
      setCamera,
      scene,
    };
  }, [camera, setCamera, render, scene]);

  return (
    <SceneDetailsContext.Provider value={sceneDetails}>
      <AnimationLoop />
      {children}
    </SceneDetailsContext.Provider>
  );
}
