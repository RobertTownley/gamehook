/// <reference types="react" />
import { MeshProps } from "./mesh";
import { SphereGeometryOptions } from "./geometries";
interface Props extends MeshProps, SphereGeometryOptions {
}
export declare const Sphere: (props: Props) => JSX.Element;
export {};
