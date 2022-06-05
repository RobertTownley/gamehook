import { ReactNode } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Interactable } from "../interactions";
import { Nameable } from "../mesh/types";
import { Physical } from "../physics";

export interface UseModelParams extends Physical, Interactable, Nameable {
  id?: string;
  filepath: string;
}

export interface LoadedGameModel {
  gltf: GLTF;
  id: string;
  status: "loaded";
  playAnimation: (animationName: string) => void;
}
export type GameModel =
  | LoadedGameModel
  | { status: "pending" }
  | { status: "error" };

export interface ModelProps extends Physical, Interactable, Nameable {
  id?: string;
  children?: ReactNode;
  value: LoadedGameModel;
}
