import { ReactNode } from "react";
import * as THREE from "three";

import { Hierarchical } from "../hierarchy/types";

interface IScene extends Hierarchical {
  children?: ReactNode;
  id?: string;

  // Scene settings
  backgroundColor?: string | THREE.Color;
  fog?: THREE.Fog | THREE.FogExp2;

  // Renderer settings
  antialias?: boolean;
  preserveDrawingBuffer?: boolean;

  // For clear backgrounds
  alpha?: boolean;
  clearColor?: number;
  clearOpacity?: number;
}
export interface SceneProps extends IScene {
  canvas?: HTMLCanvasElement;
  fog?: THREE.Fog | THREE.FogExp2;
  width?: number;
  height?: number;
}
export interface InnerSceneProps extends IScene {
  canvas: HTMLCanvasElement;
  id: string;
}

/** Context Values */
export interface SceneDetails {
  scene: THREE.Scene;

  canvas: HTMLCanvasElement | undefined;
}
