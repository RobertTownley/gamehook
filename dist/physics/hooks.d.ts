import { Mesh } from "../mesh";
import { Physical, XYZ } from "./types";
import { GameCamera } from "../camera";
import { GameLight } from "../lights";
import { LoadedGameModel } from "../models";
export declare function usePosition(mesh: Mesh, position: XYZ | undefined): void;
export declare function usePhysics(mesh: Mesh, { acceleration, velocity, orientation, rotation, onCollision, collides, collidesWith, castShadow, receiveShadow, }: Physical): void;
export declare function useCameraPhysics(camera: GameCamera, { acceleration, velocity, orientation, rotation }: Physical): void;
export declare function useLightPhysics(light: GameLight, { acceleration, castShadow, velocity, orientation, rotation }: Physical): void;
export declare function useModelPhysics(model: LoadedGameModel | undefined, { acceleration, growth, position, scale, velocity, orientation, rotation, }: Physical): void;
