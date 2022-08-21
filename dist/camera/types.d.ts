import * as THREE from "three";
import { Physical } from "../physics";
export interface CameraProps extends Physical {
    aspect?: number;
    id?: string;
    fov?: number;
    width?: number;
    height?: number;
    near?: number;
    far?: number;
    follow?: string;
    trackTo?: string;
}
export interface GameCamera extends CameraProps {
    id: string;
    camera: THREE.PerspectiveCamera;
    listener: THREE.AudioListener;
}