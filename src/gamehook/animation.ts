const breakColor = (value: number): [number, number, number] => {
  return value
    .toString(16)
    .padStart(6, "0")
    .match(/.{1,2}/g)
    ?.map((x) => parseInt(x, 16)) as [number, number, number];
};

export const getAnimatedValue = (
  start: number,
  end: number,
  duration: number
): number => {
  const startParts = breakColor(start);
  const endParts = breakColor(end);
  const diffs = startParts.map((startPart, index) => {
    const endPart = endParts[index];
    const diff = (endPart - startPart) * duration + startPart;
    return Math.floor(diff).toString(16).padStart(2, "0");
  });
  return parseInt(diffs.join(""), 16);
};
