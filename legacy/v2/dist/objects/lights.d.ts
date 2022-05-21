/// <reference types="react" />
import { GameLightProps } from "./types";
interface AmbientLightProps extends GameLightProps {
    variant: "ambient";
}
export declare const Light: (props: AmbientLightProps) => JSX.Element;
export {};
