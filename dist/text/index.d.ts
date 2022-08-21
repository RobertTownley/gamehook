/// <reference types="react" />
import { Meshable } from "../mesh/types";
interface Props extends Meshable {
    font?: object;
    size?: number;
    height?: number;
    renderMethod?: "dom" | "proceduralText";
    computeOffset?: boolean;
    bevelOffset?: number;
    bevelSegments?: number;
    value: string;
}
export declare function Text(props: Props): JSX.Element;
export {};
