import { useMemo, useRef } from "react";
import * as THREE from "three";

import { CameraProvider } from "../camera/providers";
import { AnimationLoop } from "../animation/AnimationLoop";
import { RenderProvider } from "../render/provider";

import { SceneDetailsContext } from "./context";
import {
  SceneStyles,
  useBackgroundColor,
  useSceneId,
  useSceneReady,
} from "./hooks";
import { InnerSceneProps, SceneDetails, SceneProps } from "./types";

export function Scene(props: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const id = useSceneId(props);
  const ready = useSceneReady();
  // TODO: Optionally don't render canvas, in case the user wants to provide their own canvas

  const scene = useMemo(() => {
    const scene = new THREE.Scene();
    scene.userData["controls"] = [];
    return scene;
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id={id} style={SceneStyles} />
      {ready && canvasRef.current && (
        <GamehookScene
          {...props}
          id={id}
          canvas={canvasRef.current}
          scene={scene}
        />
      )}
    </>
  );
}

function GamehookScene(props: InnerSceneProps) {
  const { canvas, children, scene } = props;

  // TODO: Make this into its own hook
  useBackgroundColor(props, scene);

  const sceneDetails: SceneDetails = useMemo(() => {
    return {
      canvas,
      scene,
    };
  }, [canvas, scene]);

  return (
    <SceneDetailsContext.Provider value={sceneDetails}>
      <CameraProvider>
        <RenderProvider>
          <AnimationLoop />
          {children}
        </RenderProvider>
      </CameraProvider>
    </SceneDetailsContext.Provider>
  );
}
