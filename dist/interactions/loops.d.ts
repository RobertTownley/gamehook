import * as THREE from "three";
import { GameCamera } from "../camera";
import { Mesh } from "../mesh";
export declare function detectHoverEntries(meshes: Record<string, Mesh>, camera: GameCamera, renderer: THREE.Renderer): void;
