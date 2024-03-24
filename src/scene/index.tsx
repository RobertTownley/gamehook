import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { AnimationLoop } from "../animation/AnimationLoop";
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
  const threeScene = useMemo(() => {
    const threeScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 200, -400);
    threeScene.userData["camera"] = camera;
    threeScene.userData["controls"] = undefined;
    threeScene.userData["mixers"] = [];
    threeScene.userData["interactions"] = buildInitialInteractions();
    return threeScene;
  }, []);

  useStats();

  return (
    <>
      <canvas ref={canvasRef} id={id} style={SceneStyles} />
      {sceneReady && canvasRef.current && (
        <GamehookScene
          {...props}
          id={id}
          canvas={canvasRef.current}
          threeScene={threeScene}
        />
      )}
    </>
  );
}

function GamehookScene(props: InnerSceneProps) {
  const { canvas, children, threeScene } = props;

  useEffect(() => {
    window.scene = threeScene;
    return () => {
      window.scene = undefined;
    };
  }, [threeScene]);

  useBackgroundColor(props, threeScene);

  const details = useMemo(() => {
    return { canvas, scene: threeScene };
  }, [canvas, threeScene]);

  return (
    <SceneDetailsContext.Provider value={details}>
      <RenderProvider
        alpha={props.alpha}
        clearColor={props.clearColor}
        clearOpacity={props.clearOpacity}
      >
        <AnimationLoop />
        <InteractionListener />
        {children}
      </RenderProvider>
    </SceneDetailsContext.Provider>
  );
}
