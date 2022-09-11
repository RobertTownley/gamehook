import * as THREE from "three";
import { ReactNode, useEffect, useRef, useMemo, useState } from "react";

import { SceneContext, SceneContextValues } from "./context";
import { buildGameCamera } from "../camera";
import { useGameLoop, useResize } from "../mount";
import { generateUUID } from "three/src/math/MathUtils";
import { useInteraction } from "../interactions";
import { Theme, DefaultTheme, ThemeContext } from "../theme";
import { convertCSSMeasureToPixels, CSSMeasure } from "../window";

interface SceneProps {
  background?: THREE.ColorRepresentation;
  castShadow?: boolean;
  children: ReactNode;
  collisionThreshold?: number;
  id?: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
  theme?: Theme;
  antialias?: boolean;
  canvas?: HTMLCanvasElement;
}

export function Scene(props: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneId = useMemo(() => props.id ?? generateUUID(), [props.id]);
  const width =
    convertCSSMeasureToPixels(props.width, "width", sceneId) ??
    window.innerWidth;
  const height =
    convertCSSMeasureToPixels(props.height, "height", sceneId) ??
    window.innerHeight;
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
        width,
        height,
      }}
      id={sceneId}
    >
      {canvasRef.current && (
        <SceneContent
          {...props}
          canvas={canvas}
          width={props.width}
          height={props.height}
          id={sceneId}
        />
      )}
    </canvas>
  );
}

function SceneContent(props: SceneProps) {
  const {
    antialias = true,
    background = 0x000000,
    castShadow = false,
    children,
    id,
    theme,
    canvas,
    collisionThreshold = 0.005,
    width,
    height,
  } = props;
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

  const sceneId = id!; // Wrapper component ensures it's set

  // Rendering
  useResize({
    width,
    height,
    camera,
    renderer,
    sceneId,
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
    collisionThreshold,
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
