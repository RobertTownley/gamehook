/// <reference types="react" />
interface Props {
    detune?: number;
    duration?: number;
    filepath: string;
    loop?: boolean;
    onEnded?: () => void;
    playbackRate?: number;
    volume?: number;
}
export declare function Audio({ detune, duration, filepath, loop, onEnded, playbackRate, volume, }: Props): JSX.Element;
export {};
