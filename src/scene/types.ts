import { MutableRefObject, ReactNode } from "react";
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
}

/** Context Values */
type ThreeCameras = THREE.OrthographicCamera | THREE.PerspectiveCamera;
export interface SceneDetails {
  render: () => void;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  canvas: HTMLCanvasElement | undefined;

  camera: MutableRefObject<ThreeCameras>;
  setCamera: (camera: ThreeCameras) => void;
}
