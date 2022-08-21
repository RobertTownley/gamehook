/// <reference types="react" />
import { CameraProps, GameCamera } from "./types";
export { moveCamera } from "./keyframes";
export type { GameCamera } from "./types";
export declare function buildGameCamera({ fov, aspect, near, far, trackTo, }: CameraProps): GameCamera;
export declare function Camera(props: CameraProps): JSX.Element;
