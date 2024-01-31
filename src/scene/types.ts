import { ReactNode } from "react";
import * as THREE from "three";

import { Hierarchical } from "../hierarchy/types";

interface IScene extends Hierarchical {
  children?: ReactNode;
  id?: string;

  // Scene settings
  backgroundColor?: string | THREE.Color;

  // Renderer settings
  antialias?: boolean;
  preserveDrawingBuffer?: boolean;
}
export interface SceneProps extends IScene {
  canvas?: HTMLCanvasElement;
}
export interface InnerSceneProps extends IScene {
  canvas: HTMLCanvasElement;
  id: string;
  scene: THREE.Scene;
}

/** Context Values */
export interface SceneDetails {
  scene: THREE.Scene;

  canvas: HTMLCanvasElement | undefined;
}
