/// <reference types="react" />
import { Material } from "three";
import { MaterialOptions } from "../materials/types";
interface Props {
    activePlaceholder?: string;
    activeMaterial?: MaterialOptions | Material;
    disabled?: boolean;
    hoveredMaterial?: MaterialOptions | Material;
    material?: MaterialOptions | Material;
    disablePointer?: boolean;
    placeholder?: string;
    maxLength?: number;
    type: "text";
    onChange?: (event: KeyboardEvent) => void;
}
export declare function Input({ activePlaceholder, disabled, material, maxLength, activeMaterial, hoveredMaterial, disablePointer, placeholder, onChange, }: Props): JSX.Element;
export {};
