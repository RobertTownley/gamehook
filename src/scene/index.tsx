import { useMemo, useRef } from "react";
import * as THREE from "three";

import { useCamera } from "../camera/hooks";
import { AnimationLoop } from "../animation/AnimationLoop";

import { SceneDetailsContext } from "./context";
import {
  SceneStyles,
  useBackgroundColor,
  useRender,
  useSceneId,
  useSceneReady,
} from "./hooks";
import { InnerSceneProps, SceneDetails, SceneProps } from "./types";

export function Scene(props: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = useSceneId(props);
  const ready = useSceneReady();
  // TODO: Optionally don't render canvas, in case the user wants to provide their own canvas

  return (
    <>
      <canvas ref={canvasRef} id={id} style={SceneStyles} />
      {ready && canvasRef.current && (
        <GamehookScene {...props} id={id} canvas={canvasRef.current} />
      )}
    </>
  );
}

function GamehookScene(props: InnerSceneProps) {
  const { canvas, children } = props;

  const scene = useMemo(() => {
    return new THREE.Scene();
  }, []);

  useBackgroundColor(props, scene);

  const [camera, setCamera] = useCamera();

  const { render, renderer } = useRender(props, scene, camera);

  const sceneDetails: SceneDetails = useMemo(() => {
    return {
      canvas,
      render,
      renderer,
      camera,
      setCamera,
      scene,
    };
  }, [camera, canvas, setCamera, render, renderer, scene]);

  return (
    <SceneDetailsContext.Provider value={sceneDetails}>
      <AnimationLoop />
      {children}
    </SceneDetailsContext.Provider>
  );
}
