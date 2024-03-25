import { ReactNode } from "react";
import * as THREE from "three";

import { Hierarchical } from "../hierarchy/types";

type FogProps =
  | {
      variant: "fog";
      color: number;
      near: number;
      far: number;
    }
  | {
      variant: "fogExp2";
      color: number;
      density: number;
    };
interface IScene extends Hierarchical {
  children?: ReactNode;
  id?: string;

  // Scene settings
  backgroundColor?: string | number | THREE.Color;
  fog?: FogProps;

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
  width?: number;
  height?: number;
}

export interface InnerSceneProps extends IScene {
  canvas: HTMLCanvasElement;
  id: string;
  threeScene: THREE.Scene;
}

/** Context Values */
export interface SceneDetails {
  scene: THREE.Scene;

  canvas: HTMLCanvasElement | undefined;
}
