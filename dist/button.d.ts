/// <reference types="react" />
import { XYZ } from "./physics/types";
import { MouseHandler } from "./interactions/types";
interface Props {
    onClick: MouseHandler;
    position?: XYZ;
    value: string;
}
export declare function Button({ onClick, position, value }: Props): JSX.Element;
export {};
