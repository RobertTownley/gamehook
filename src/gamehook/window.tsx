export type CSSMeasure =
  | `${number}px`
  | `${number}vh`
  | `${number}vw`
  | `${number}%`
  | number
  | undefined;

export function convertCSSMeasureToPixels(
  measure: CSSMeasure,
  dimension: "width" | "height",
  sceneId: string
): number | undefined {
  if (!measure) {
    return undefined;
  } else if (typeof measure === "number") {
    return measure;
  } else if (measure.endsWith("px")) {
    return parseInt(measure.replace("px", ""), 10);
  } else if (measure.endsWith("vw")) {
    const value = parseInt(measure.replace("vw", ""), 10);
    return window.innerWidth * (value / 100);
  } else if (measure.endsWith("vh")) {
    const value = parseInt(measure.replace("vh", ""), 10);
    return window.innerHeight * (value / 100);
  } else if (measure.endsWith("%")) {
    const value = parseInt(measure.replace("%", ""), 10);
    const parent = document.getElementById(sceneId)?.parentElement;
    if (!parent) {
      return 0;
    }
    const parentDimension =
      dimension === "width" ? parent.offsetWidth : parent.offsetHeight;
    return (value / 100) * parentDimension;
  } else {
    throw new Error(`Could not convert value ${measure} to pixels`);
  }
}
