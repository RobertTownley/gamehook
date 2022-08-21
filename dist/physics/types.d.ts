import { Mesh } from "../mesh";
export declare type XYZArray = [number, number, number];
export declare type XYZObject = {
    x: number;
    y: number;
    z: number;
};
export declare type XYZ = XYZArray | XYZObject;
export declare type Collision = {
    collider: Mesh;
    collidedWith: Mesh;
    colliderLocation: XYZObject;
    collidedWithLocation: XYZObject;
};
export declare type CollisionQualifier = (mesh: Mesh) => boolean;
export declare type CollisionHandler = (collision: Collision) => void;
export interface Physical {
    acceleration?: XYZ;
    position?: XYZ;
    velocity?: XYZ;
    orientation?: XYZ;
    rotation?: XYZ;
    scale?: XYZ;
    growth?: XYZ;
    collides?: boolean;
    collidesWith?: CollisionQualifier;
    onCollision?: (collision: Collision) => void;
    castShadow?: boolean;
    receiveShadow?: boolean;
}
