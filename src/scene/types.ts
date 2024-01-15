import { ReactNode } from "react";

interface IScene {
  antialias?: boolean;
  children?: ReactNode;
  id?: string;
}
export interface SceneProps extends IScene {
  canvas?: HTMLCanvasElement;
}
export interface InnerSceneProps extends IScene {
  canvas: HTMLCanvasElement;
  id: string;
}
