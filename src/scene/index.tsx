import { useMemo, useRef } from "react";
import * as THREE from "three";

import { AnimationLoop } from "../animation/AnimationLoop";
import { CameraProvider } from "../camera/providers";
import { buildInitialInteractions } from "../interactions/defaults";
import { InteractionListener } from "../interactions/Component";
import { RenderProvider } from "../render/provider";
import { useStats } from "../stats/hooks";

import { SceneDetailsContext } from "./context";
import {
  SceneStyles,
  useBackgroundColor,
  useSceneId,
  useSceneReady,
} from "./hooks";
import { InnerSceneProps, SceneProps } from "./types";

export function Scene(props: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const id = useSceneId(props);
  const sceneReady = useSceneReady();
  // TODO: Optionally don't render canvas, in case the user wants to provide their own canvas

  useStats();

  return (
    <>
      <canvas ref={canvasRef} id={id} style={SceneStyles} />
      {sceneReady && canvasRef.current && (
        <GamehookScene {...props} id={id} canvas={canvasRef.current} />
      )}
    </>
  );
}

function GamehookScene(props: InnerSceneProps) {
  const { canvas, children } = props;

  const scene = useMemo(() => {
    const scene = new THREE.Scene();
    scene.userData["controls"] = [];
    scene.userData["interactions"] = buildInitialInteractions();
    scene.userData["foo"] = "I AM A SCENE";
    return scene;
  }, []);

  useBackgroundColor(props, scene);

  return (
    <SceneDetailsContext.Provider value={{ canvas, scene }}>
      <CameraProvider>
        <RenderProvider>
          <AnimationLoop />
          <InteractionListener />
          {children}
        </RenderProvider>
      </CameraProvider>
    </SceneDetailsContext.Provider>
  );
}
