import * as THREE from "three";
import { Physical } from "../physics";
interface AbstractLightParams extends Physical {
    color?: number;
    id?: string;
    castsShadow?: boolean;
}
interface AbstractLight extends Physical {
    castsShadow: boolean;
}
interface AmbientLightParams {
    type: "ambient";
    intensity?: number;
}
interface AmbientLightProps extends AmbientLightParams, AbstractLightParams {
}
export interface AmbientLight extends AmbientLightParams, AbstractLight {
    id: string;
    threeLight: THREE.AmbientLight;
}
interface DirectionalLightParams {
    type: "directional";
    intensity?: number;
}
interface DirectionalLightProps extends DirectionalLightParams, AbstractLightParams {
}
export interface DirectionalLight extends DirectionalLightParams, AbstractLight {
    id: string;
    threeLight: THREE.DirectionalLight;
}
interface HemisphereLightParams {
    type: "hemisphere";
    skyColor?: number;
    groundColor?: number;
    intensity?: number;
}
interface HemisphereLightProps extends HemisphereLightParams, AbstractLightParams {
}
export interface HemisphereLight extends HemisphereLightParams, AbstractLight {
    id: string;
    threeLight: THREE.HemisphereLight;
}
interface PointLightParams {
    type: "point";
    intensity?: number;
    distance?: number;
    decay?: number;
}
interface PointLightProps extends PointLightParams, AbstractLightParams {
}
export interface PointLight extends PointLightParams, AbstractLight {
    id: string;
    threeLight: THREE.PointLight;
}
interface RectAreaLightParams {
    type: "rectarea";
    intensity?: number;
    width?: number;
    height?: number;
}
interface RectAreaLightProps extends RectAreaLightParams, AbstractLightParams {
}
export interface RectAreaLight extends RectAreaLightParams, AbstractLight {
    id: string;
    threeLight: THREE.RectAreaLight;
}
interface SpotLightParams {
    type: "spot";
    intensity?: number;
    distance?: number;
    angle?: number;
    penumbra?: number;
    decay?: number;
    target?: string;
}
interface SpotLightProps extends SpotLightParams, AbstractLightParams {
}
export interface SpotLight extends SpotLightParams, AbstractLight {
    id: string;
    threeLight: THREE.SpotLight;
}
export declare type GameLightProps = AmbientLightProps | DirectionalLightProps | HemisphereLightProps | PointLightProps | RectAreaLightProps | SpotLightProps;
export declare type GameLight = AmbientLight | DirectionalLight | HemisphereLight | PointLight | RectAreaLight | SpotLight;
export {};
