import { ReactNode } from "react";
import * as THREE from "three";

interface IScene {
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
export interface SceneDetails {
  render: () => void;
  scene: THREE.Scene;

  camera: THREE.Camera;
  setCamera: (camera: THREE.Camera) => void;
}
