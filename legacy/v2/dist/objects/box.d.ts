/// <reference types="react" />
import { MeshProps } from "./mesh";
import { BoxGeometryOptions } from "./geometries";
interface Props extends MeshProps, BoxGeometryOptions {
}
export declare const Box: (props: Props) => JSX.Element;
export {};
