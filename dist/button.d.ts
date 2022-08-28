/// <reference types="react" />
import { XYZ } from "../gamehook";
interface Props {
    onClick: () => void;
    position?: XYZ;
    value: string;
}
export declare function Button({ onClick, position, value }: Props): JSX.Element;
export {};
