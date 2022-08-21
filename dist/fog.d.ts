/// <reference types="react" />
interface ThreeFogParams {
    color: number;
    near?: number;
    far?: number;
    type: "directed";
}
interface ThreeFogExp2Params {
    type: "realistic";
    color: number;
    density?: number;
}
declare type FogProps = ThreeFogParams | ThreeFogExp2Params;
export declare function Fog(props: FogProps): JSX.Element;
export {};
