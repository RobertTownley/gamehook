export declare type CSSMeasure = `${number}px` | `${number}vh` | `${number}vw` | `${number}%` | number | undefined;
export declare function convertCSSMeasureToPixels(measure: CSSMeasure, dimension: "width" | "height", sceneId: string): number | undefined;
