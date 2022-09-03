import * as THREE from "three";
import { ReactNode, useEffect, useRef, useMemo, useState } from "react";

import { SceneContext, SceneContextValues } from "./context";
import { buildGameCamera } from "../camera";
import { useGameLoop, useResize } from "../mount";
import { generateUUID } from "three/src/math/MathUtils";
import { useInteraction } from "../interactions";
import { Theme, DefaultTheme, ThemeContext } from "../theme";

interface SceneProps {
  background?: THREE.ColorRepresentation;
  castShadow?: boolean;
  children: ReactNode;
  id?: string;
  width?: number | string;
  height?: number | string;
  theme?: Theme;
  antialias?: boolean;
  canvas?: HTMLCanvasElement;
}

export function Scene(props: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = props;
  const [canvas, setCanvas] = useState<HTMLCanvasElement | undefined>(
    undefined
  );
  useEffect(() => {
    if (props.canvas) {
      setCanvas(props.canvas);
    } else if (canvasRef.current) {
      setCanvas(canvasRef.current);
    }
  }, [setCanvas, props.canvas]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: width ?? window.innerWidth,
        height: height ?? window.innerHeight,
      }}
    >
      {canvasRef.current && <SceneContent {...props} canvas={canvas} />}
    </canvas>
  );
}

function SceneContent({
  antialias = true,
  background = 0x000000,
  castShadow = false,
  children,
  id,
  theme,
  canvas,
  width,
  height,
}: SceneProps) {
  const sceneId = useMemo(() => id ?? generateUUID(), [id]);
  const camera = useMemo(() => buildGameCamera({}), []);
  const renderer = useMemo(
    () =>
      new THREE.WebGLRenderer({
        antialias,
        canvas,
      }),
    [antialias, canvas]
  );
  if (castShadow) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  // Rendering
  useResize({
    canvas,
    width: canvas?.clientWidth,
    height: canvas?.clientHeight,
    camera,
    renderer,
  });

  // State
  const value = useMemo<SceneContextValues>(() => {
    const threeScene = new THREE.Scene();

    return {
      camera,
      id: sceneId,
      lights: {},
      meshes: {},
      models: {},
      threeScene,
    };
  }, [camera, sceneId]);

  // Update Background color
  useEffect(() => {
    value.threeScene.background = new THREE.Color(background);
  }, [background, value.threeScene]);

  // Render initial and new frames
  useGameLoop({
    camera: value.camera,
    lights: value.lights,
    models: value.models,
    renderer,
    scene: value.threeScene,
    meshes: value.meshes,
  });

  // Listen for user interactions
  useInteraction(value.meshes, renderer, camera.camera);

  return (
    <SceneContext.Provider value={value}>
      <ThemeContext.Provider value={theme ?? DefaultTheme}>
        {children}
      </ThemeContext.Provider>
    </SceneContext.Provider>
  );
}
